import os
import numpy as np
import tensorflow as tf
from keras.models import Model
from keras.applications import VGG16, InceptionV3
from keras.layers import Dense, Flatten, Dropout, GlobalAveragePooling2D
from keras.preprocessing.image import ImageDataGenerator
import joblib
import time
from sklearn.metrics import f1_score, classification_report
from keras.optimizers import Adam

start = time.time()

# Dataset Paths
dataset_dirs = [
    "cotton\\5 Black and white",
    "cotton\\Cotton leaves",
    "cotton\\Cotton plant disease",
    "cotton\\HOG brighter",
    "cotton\\HOG_data",
    "cotton\\Main dataset-20230209T170929Z-001",
    "cotton\\Main dataset-20230209T191052Z-001"
]

# Parameters
img_size = (128, 128)  # Increased image size for better feature extraction
batch_size = 32
epochs_per_dataset = 25
initial_epochs = 30

# Data Augmentation
datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=30,
    width_shift_range=0.3,
    height_shift_range=0.3,
    shear_range=0.2,
    zoom_range=0.3,
    horizontal_flip=True,
    vertical_flip=True,
    validation_split=0.2
)

# Function to create data generators
def create_generators(dataset_path, class_mode="binary"):
    train_generator = datagen.flow_from_directory(
        dataset_path, target_size=img_size, batch_size=batch_size, class_mode=class_mode, subset='training'
    )
    val_generator = datagen.flow_from_directory(
        dataset_path, target_size=img_size, batch_size=batch_size, class_mode=class_mode, subset='validation', shuffle=False
    )
    return train_generator, val_generator

# Function to build VGG16 model for binary classification

def build_vgg16_model():
    base_model = VGG16(weights='imagenet', include_top=False, input_shape=(img_size[0], img_size[1], 3))
    base_model.trainable = True  # Allow fine-tuning

    for layer in base_model.layers[:10]:  # Freeze first 10 layers
        layer.trainable = False

    x = GlobalAveragePooling2D()(base_model.output)  # Use GlobalAveragePooling2D instead of Flatten
    x = Dense(128, activation='relu')(x)
    x = Dropout(0.5)(x)
    outputs = Dense(1, activation='sigmoid')(x)  # Binary classification

    model = Model(inputs=base_model.input, outputs=outputs)
    model.compile(optimizer=Adam(learning_rate=0.0001), loss='binary_crossentropy', metrics=['accuracy'])
    return model

# Function to build InceptionV3 model for multi-class classification

def build_inception_model(num_classes):
    base_model = InceptionV3(weights='imagenet', include_top=False, input_shape=(img_size[0], img_size[1], 3))
    base_model.trainable = True  # Allow fine-tuning

    for layer in base_model.layers[:10]:  # Freeze first 10 layers
        layer.trainable = False

    x = GlobalAveragePooling2D()(base_model.output)
    x = Dense(128, activation='relu')(x)
    x = Dropout(0.5)(x)
    outputs = Dense(num_classes, activation='softmax')(x)  # Multi-class classification

    model = Model(inputs=base_model.input, outputs=outputs)
    model.compile(optimizer=Adam(learning_rate=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])
    return model

# Function to calculate F1 Score

def calculate_f1_score(model, val_generator, is_binary):
    y_true = val_generator.classes
    y_pred = model.predict(val_generator)

    if is_binary:
        y_pred = (y_pred > 0.5).astype("int32")  # Convert to binary output
    else:
        y_pred = np.argmax(y_pred, axis=1)  # Multi-class classification

    f1 = f1_score(y_true, y_pred, average='weighted')
    print("\n🔹 Classification Report:\n", classification_report(y_true, y_pred))
    print(f"\n📌 Weighted F1 Score: {f1:.4f}")
    return f1

# Training Binary Model

binary_model = build_vgg16_model()
print("🔹 Training Binary Classifier (Healthy vs Diseased)")

for dataset_path in dataset_dirs:
    train_generator, val_generator = create_generators(dataset_path, class_mode="binary")
    binary_model.fit(train_generator, validation_data=val_generator, epochs=initial_epochs)
    f1 = calculate_f1_score(binary_model, val_generator, is_binary=True)
    print(f"\n🚀 F1 Score after training on {dataset_path}: {f1:.4f}")

binary_model.save("cotton_binary_classifier.keras")
print("\n✅ Binary Classification Model Saved!")

# Multi-class classification model training
for dataset_path in dataset_dirs:
    train_generator, val_generator = create_generators(dataset_path, class_mode="categorical")
    num_classes = len(train_generator.class_indices)

    # Save label mappings for consistency
    joblib.dump(train_generator.class_indices, "label_mappings.pkl")

    # Build a new model with the correct number of classes
    multi_class_model = build_inception_model(num_classes)

    multi_class_model.fit(train_generator, validation_data=val_generator, epochs=epochs_per_dataset)
    f1 = calculate_f1_score(multi_class_model, val_generator, is_binary=False)
    print(f"\n🚀 Multi-class F1 Score after training on {dataset_path}: {f1:.4f}")

multi_class_model.save("cotton_disease_classifier.keras")
print("\n✅ Multi-Class Model Saved!")

end = time.time()
print(f"\n⏱ Total training time: {end - start:.2f} seconds")
