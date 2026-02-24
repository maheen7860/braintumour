import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
import os

# -----------------------------
# 1. Dataset Paths (UPDATED)
# -----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

TRAIN_DIR = os.path.join(BASE_DIR, "dataset", "Train")
TEST_DIR = os.path.join(BASE_DIR, "dataset", "Test")

print("Training Directory:", TRAIN_DIR)
print("Testing Directory:", TEST_DIR)

# -----------------------------
# 2. Hyperparameters
# -----------------------------
IMG_SIZE = 160
BATCH_SIZE = 32
EPOCHS = 15

# -----------------------------
# 3. Image Preprocessing
# -----------------------------
train_datagen = ImageDataGenerator(
    preprocessing_function=tf.keras.applications.mobilenet_v2.preprocess_input,
    rotation_range=15,
    zoom_range=0.15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    horizontal_flip=True
)

test_datagen = ImageDataGenerator(
    preprocessing_function=tf.keras.applications.mobilenet_v2.preprocess_input
)

train_generator = train_datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode="categorical"
)

test_generator = test_datagen.flow_from_directory(
    TEST_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode="categorical"
)

# 🔥 IMPORTANT: Print class order
print("Class Indices:", train_generator.class_indices)

# -----------------------------
# 4. Load Pretrained Base Model
# -----------------------------
base_model = MobileNetV2(
    input_shape=(IMG_SIZE, IMG_SIZE, 3),
    include_top=False,
    weights="imagenet"
)

base_model.trainable = False  # Freeze base model

# -----------------------------
# 5. Custom Classification Head
# -----------------------------
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dropout(0.5)(x)
x = Dense(128, activation="relu")(x)
output = Dense(4, activation="softmax")(x)

model = Model(inputs=base_model.input, outputs=output)

# -----------------------------
# 6. Compile Model
# -----------------------------
model.compile(
    optimizer=Adam(learning_rate=0.0001),
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

model.summary()

# -----------------------------
# 7. Callbacks
# -----------------------------
early_stop = EarlyStopping(
    monitor="val_loss",
    patience=3,
    restore_best_weights=True
)

checkpoint = ModelCheckpoint(
    os.path.join(BASE_DIR, "brain_tumor_model.h5"),  # ✅ save directly in ml_api
    monitor="val_accuracy",
    save_best_only=True,
    save_format="h5"
)

# -----------------------------
# 8. Train Model
# -----------------------------
history = model.fit(
    train_generator,
    epochs=EPOCHS,
    validation_data=test_generator,
    callbacks=[early_stop, checkpoint]
)

print("✅ Model trained and saved as brain_tumor_model.h5")