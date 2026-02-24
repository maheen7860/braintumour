import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"  # Force CPU

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import time
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

# ==============================
# APP INIT
# ==============================
app = FastAPI(
    title="Brain Tumor Detection API",
    version="1.0"
)

# Enable CORS (important for React + Node)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("⚙️ Configuring CPU performance settings...")

tf.config.threading.set_inter_op_parallelism_threads(1)
tf.config.threading.set_intra_op_parallelism_threads(1)

# ==============================
# MODEL LOADING
# ==============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "brain_tumor_model.h5")

print("🧠 Loading model from:", MODEL_PATH)

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")

model = tf.keras.models.load_model(MODEL_PATH, compile=False)

# Warmup to prevent first-request delay
dummy_input = np.zeros((1, 160, 160, 3), dtype=np.float32)
model(dummy_input, training=False)

print("🔥 Model warmed up")
print("✅ Model loaded successfully")

# ==============================
# CLASS LABELS
# ==============================
CLASS_NAMES = ["glioma", "meningioma", "notumor", "pituitary"]

# ==============================
# IMAGE PREPROCESSING
# ==============================
def preprocess_image(image: Image.Image):
    image = image.resize((160, 160))
    image_array = np.array(image, dtype=np.float32)
    image_array = preprocess_input(image_array)
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

# ==============================
# ROUTES
# ==============================

@app.get("/")
def home():
    return {
        "status": "FastAPI Brain Tumor Model Running",
        "model": "MobileNetV2",
        "inputSize": "160x160"
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        processed = preprocess_image(image)

        start_time = time.time()
        predictions = model(processed, training=False).numpy()
        inference_time = time.time() - start_time

        confidence = float(np.max(predictions) * 100)
        class_index = int(np.argmax(predictions))
        tumor_type = CLASS_NAMES[class_index]

        return {
            "tumorType": tumor_type,
            "confidence": round(confidence, 2),
            "hasTumor": tumor_type != "notumor",
            "inferenceTime": round(inference_time, 3)
        }

    except Exception as e:
        return {
            "error": str(e)
        }