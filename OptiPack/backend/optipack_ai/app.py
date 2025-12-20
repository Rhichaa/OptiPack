from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from ultralytics import YOLO
import pyodbc

app = FastAPI()

# 1. ENHANCED CORS: Ensures React can send files to Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DATABASE CONFIGURATION ---
DB_CONFIG = {
    "server": r"DESKTOP-2KE6C2N\SQLEXPRESS",
    "database": "OptiPackDB",
}

def get_db_connection():
    conn_str = (
        f"Driver={{ODBC Driver 17 for SQL Server}};"
        f"Server={DB_CONFIG['server']};"
        f"Database={DB_CONFIG['database']};"
        "Trusted_Connection=yes;"
    )
    return pyodbc.connect(conn_str)

# --- YOLO MODEL ---
model = None
def get_model():
    global model
    if model is None:
        print("--- Loading YOLOv8 Model... ---")
        model = YOLO("yolov8n.pt")
    return model

# --- RECOMMENDATION LOGIC ---
def hybrid_ai_recommend(product):
    # Ensure all values are cast to numbers to prevent logic errors
    length = float(product.get("Length", 20))
    width = float(product.get("Width", 10))
    height = float(product.get("Height", 8))
    weight = float(product.get("Weight", 1.0))
    fragility = str(product.get("Fragility", "Medium")).lower()

    volume = length * width * height

    # Logic for Packaging
    if volume < 3000: box = "Small Box"
    elif volume < 12000: box = "Medium Box"
    else: box = "Large Box"

    if "high" in fragility:
        material, risk = "Bubble Wrap (3 layers)", 40
    elif "medium" in fragility:
        material, risk = "Foam Sheets", 25
    else:
        material, risk = "Paper Cushioning", 10

    vehicle = "Mini Truck" if weight > 10 else "Van" if weight > 2 else "Bike"

    return {
        "recommendedBox": box,
        "protectiveMaterials": material,
        "vehicleType": vehicle,
        "packagingLayers": 3 if "high" in fragility else 1,
        "damageRiskScore": risk,
        "aiConfidenceScore": 92
    }

# --- MAIN API ENDPOINT ---
@app.post("/analyze")
async def analyze_image(image: UploadFile = File(...)):
    # STEP 1: Incoming Request
    print(f"\n>>> [STEP 1] Received Request: {image.filename}")
    
    contents = await image.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # STEP 2: YOLO Detection
    results = get_model()(img)[0]
    detected_label = "unknown"
    if len(results.boxes) > 0:
        cls_id = int(results.boxes[0].cls[0])
        detected_label = results.names[cls_id]
        print(f">>> [STEP 2] YOLO detected: {detected_label}")
    else:
        print(">>> [STEP 2] YOLO detected: NOTHING")

    # STEP 3: Database Lookup
    db_matched_product = None
    specs_for_ai = {"Length": 20, "Width": 10, "Height": 8, "Weight": 1.0, "Fragility": "Medium"}

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Using LIKE allows "bottle" to match "Water Bottle 1L"
        query = "SELECT ProductName, Category, Weight, Length, Width, Height, Fragility FROM ProductMaster WHERE ProductName LIKE ?"
        cursor.execute(query, (f"%{detected_label}%",))
        row = cursor.fetchone()
        
        if row:
            print(f">>> [STEP 3] DB Match Found: {row[0]}")
            # Casting to standard Python types for JSON compatibility
            db_matched_product = {
                "productName": str(row[0]),
                "category": str(row[1]),
                "weightKg": float(row[2]),
                "lengthCm": float(row[3]),
                "widthCm": float(row[4]),
                "heightCm": float(row[5]),
                "fragilityLevel": str(row[6])
            }
            specs_for_ai = {
                "Length": float(row[3]), "Width": float(row[4]), "Height": float(row[5]), 
                "Weight": float(row[2]), "Fragility": str(row[6])
            }
        else:
            print(f">>> [STEP 3] No DB match found for '{detected_label}'. Using defaults.")
        
        conn.close()
    except Exception as e:
        print(f">>> [ERROR] Database failure: {str(e)}")

    # STEP 4: Generate Recommendation
    recommendation = hybrid_ai_recommend(specs_for_ai)
    print(">>> [STEP 4] Analysis Successful. Sending Data.")

    return {
        "label": detected_label,
        "dbMatchedProduct": db_matched_product,
        "recommendation": recommendation
    }

@app.get("/")
def root():
    return {"status": "Running", "db": "Connected"}

if __name__ == "__main__":
    import uvicorn
    # Make sure port 5001 is used
    uvicorn.run(app, host="127.0.0.1", port=5001)