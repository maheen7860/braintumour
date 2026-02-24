import numpy as np
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

def preprocess_image(image):
    image = image.resize((160, 160))
    image_array = np.array(image, dtype=np.float32)
    image_array = preprocess_input(image_array)
    image_array = np.expand_dims(image_array, axis=0)
    return image_array
