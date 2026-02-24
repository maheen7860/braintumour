import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import os

# -----------------------------
# 1. Load Trained Model
# -----------------------------
MODEL_PATH = "model/brain_tumor_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

# -----------------------------
# 2. Class Labels (MUST MATCH TRAINING)
# -----------------------------
class_names = ['glioma', 'meningioma', 'pituitary', 'no_tumor']

# -----------------------------
# 3. Image Path (CHANGE THIS)
# -----------------------------
IMAGE_PATH = "C:\Brain-Tumor-Detection\dataset\Test\meningioma\Te-me_0013.jpg"   # example image

# -----------------------------
# 4. Load & Preprocess Image
# -----------------------------
img = image.load_img(IMAGE_PATH, target_size=(224, 224))
img_array = image.img_to_array(img)
img_array = img_array / 255.0
img_array = np.expand_dims(img_array, axis=0)

# -----------------------------
# 5. Predict
# -----------------------------
predictions = model.predict(img_array)
predicted_class = np.argmax(predictions)
confidence = np.max(predictions)

# -----------------------------
# 6. Output Result
# -----------------------------
print("🧠 Predicted Tumor Type:", class_names[predicted_class])
print("📊 Confidence:", round(confidence * 100, 2), "%")
