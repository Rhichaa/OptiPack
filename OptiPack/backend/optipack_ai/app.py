from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from ultralytics import YOLO

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# YOLO MODEL (lazy load)
# -------------------------------
model = None

def get_model():
    global model
    if model is None:
        model = YOLO("yolov8n.pt")
    return model

# -------------------------------
# CATEGORY MAPPING (CV OUTPUT)
# -------------------------------
def map_category(label: str):
    label = label.lower()

    if label in ["mouse", "keyboard", "laptop", "cell phone", "tv"]:
        return "Electronics"
    if label in ["bottle", "cup", "wine glass"]:
        return "Liquid"
    if label in ["banana", "apple", "pizza", "sandwich"]:
        return "Food"
    return "General"

# -------------------------------
# HYBRID AI RECOMMENDATION LOGIC
# -------------------------------
def hybrid_ai_recommend(product):
    length = product["length"]
    width = product["width"]
    height = product["height"]
    weight = product["weight"]
    fragility = product["fragility"]

    volume = length * width * height

    # Box logic (AI + rules)
    if volume < 3000:
        box = "Small Box"
    elif volume < 12000:
        box = "Medium Box"
    else:
        box = "Large Box"

    # Protection logic
    if fragility == "high":
        material = "Bubble Wrap (3 layers)"
        risk = 40
    elif fragility == "medium":
        material = "Foam Sheets"
        risk = 25
    else:
        material = "Paper Cushioning"
        risk = 10

    # Vehicle logic
    if weight > 10:
        vehicle = "Mini Truck"
    elif weight > 2:
        vehicle = "Van"
    else:
        vehicle = "Bike"

    return {
        "recommendedBox": box,
        "protectiveMaterial": material,
        "vehicle": vehicle,
        "damageRiskPercent": risk,
        "confidence": 92,
        "alternatives": [
            {"box": "Next Larger Box", "risk": risk + 5},
            {"box": "Cheaper Material Option", "risk": risk + 3}
        ]
    }

# -------------------------------
# CV ENDPOINT (IMAGE → FEATURES)
# -------------------------------
@app.post("/analyze")
async def analyze_image(image: UploadFile = File(...)):
    contents = await image.read()
    img_array = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

    results = get_model()(img)[0]

    label = "unknown"

    if len(results.boxes) > 0:
        cls_id = int(results.boxes[0].cls[0])
        label = results.names[cls_id]

        x1, y1, x2, y2 = results.boxes[0].xyxy[0].tolist()
        width = int(x2 - x1)
        height = int(y2 - y1)
        length = max(width, height)
    else:
        length, width, height = 20, 10, 8

    category = map_category(label)

    return {
        "label": label,
        "category": category,
        "length": length,
        "width": width,
        "height": height
    }

# -------------------------------
# RECOMMENDATION ENDPOINT
# (THIS REPLACES DUMMY VALUES)
# -------------------------------
@app.post("/recommend")
async def recommend(product: dict):
    """
    Expected input from backend:
    {
      "category": "Electronics",
      "length": 120,
      "width": 60,
      "height": 40,
      "weight": 0.3,
      "fragility": "medium"
    }
    """
    return hybrid_ai_recommend(product)

# -------------------------------
# HEALTH CHECK
# -------------------------------
@app.get("/")
def root():
    return {"message": "OptiPack AI running"}

