from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from ultralytics import YOLO
import pyodbc

app = FastAPI()

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
        f"Trusted_Connection=yes;"
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

# --- SMART WEIGHT ESTIMATOR (Matches YOLO's 80 classes) ---
def estimate_data(label):
    # Standard data for the most common YOLO classes
    knowledge_base = {
        "mouse": {"w": 0.1, "dim": (12, 6, 4), "f": "Low"},
        "laptop": {"w": 2.2, "dim": (35, 24, 2), "f": "High"},
        "bottle": {"w": 1.0, "dim": (7, 7, 25), "f": "Medium"},
        "cup": {"w": 0.3, "dim": (10, 10, 12), "f": "High"},
        "cell phone": {"w": 0.2, "dim": (16, 8, 1), "f": "High"},
        "remote": {"w": 0.15, "dim": (20, 5, 3), "f": "Medium"},
        "keyboard": {"w": 0.7, "dim": (44, 14, 3), "f": "Medium"}
    }
    return knowledge_base.get(label.lower(), {"w": 1.0, "dim": (20, 15, 10), "f": "Medium"})

# --- RECOMMENDATION LOGIC ---
def hybrid_ai_recommend(product, is_estimated=False):
    length, width, height = product.get("Length"), product.get("Width"), product.get("Height")
    weight = float(product.get("Weight", 1.0))
    fragility = str(product.get("Fragility", "Medium")).lower()
    volume = length * width * height

    if volume < 3000: box = "Small Box"
    elif volume < 12000: box = "Medium Box"
    else: box = "Large Box"

    material = "Bubble Wrap (3 layers)" if "high" in fragility else "Foam Sheets" if "medium" in fragility else "Paper"
    vehicle = "Mini Truck" if weight > 10 else "Van" if weight > 2 else "Bike"

    return {
        "recommendedBox": box,
        "protectiveMaterials": material,
        "vehicleType": vehicle,
        "packagingLayers": 3 if "high" in fragility else 1,
        "damageRiskScore": 40 if "high" in fragility else 15,
        "aiConfidenceScore": 75 if is_estimated else 95 
    }

@app.post("/analyze")
async def analyze_image(image: UploadFile = File(...)):
    print(f"\n>>> Analyzing: {image.filename}")
    contents = await image.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    results = get_model()(img)[0]
    detected_label = "unknown"
    is_estimated = True
    
    # Default fallback specs
    specs = {"Length": 20, "Width": 15, "Height": 10, "Weight": 1.0, "Fragility": "Medium"}

    if len(results.boxes) > 0:
        cls_id = int(results.boxes[0].cls[0])
        detected_label = results.names[cls_id]
        
        # Pull "Smart Guess" if DB fails
        smart_guess = estimate_data(detected_label)
        specs.update({
            "Weight": smart_guess["w"], "Length": smart_guess["dim"][0],
            "Width": smart_guess["dim"][1], "Height": smart_guess["dim"][2],
            "Fragility": smart_guess["f"]
        })

    # DATABASE LOOKUP
    db_matched_product = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "SELECT ProductName, Category, Weight, Length, Width, Height, Fragility FROM ProductMaster WHERE LOWER(ProductName) LIKE LOWER(?)"
        cursor.execute(query, (f"%{detected_label}%",))
        row = cursor.fetchone()
        
        if row:
            is_estimated = False
            db_matched_product = {
                "productName": str(row[0]), "category": str(row[1]),
                "weightKg": float(row[2]), "lengthCm": float(row[3]),
                "widthCm": float(row[4]), "heightCm": float(row[5]),
                "fragilityLevel": str(row[6])
            }
            specs.update({"Length": float(row[3]), "Width": float(row[4]), "Height": float(row[5]), "Weight": float(row[2]), "Fragility": str(row[6])})
        conn.close()
    except: pass # Fallback to smart_guess if DB fails

    recommendation = hybrid_ai_recommend(specs, is_estimated)
    return {"label": detected_label, "dbMatchedProduct": db_matched_product, "recommendation": recommendation, "isEstimated": is_estimated}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5001)