# predict_pipeline/predict.py
import numpy as np
import tensorflow as tf
from keras.models import load_model
from keras.preprocessing import image
import joblib
import os

from predict_pipeline.features.infection import estimate_infection_percentage
from predict_pipeline.features.recommendation import get_disease_recommendation

model_path = "cotton_disease_model.keras"
label_mappings_path = "label_mappings.pkl"

if not os.path.exists(model_path) or not os.path.exists(label_mappings_path):
    raise FileNotFoundError("Model or label mapping file not found!")

model = tf.keras.models.load_model(model_path)
label_mappings = joblib.load(label_mappings_path)
class_labels = {v: k for k, v in label_mappings.items()}

def preprocess_image(img_path, img_size=(64, 64)):
    img = image.load_img(img_path, target_size=img_size)
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def get_intensity_level(percentage):
    if percentage <= 20:
        return "Level 1"
    elif percentage <= 40:
        return "Level 2"
    elif percentage <= 60:
        return "Level 3"
    elif percentage <= 80:
        return "Level 4"
    else:
        return "Level 5"

def predict_disease(img_path):
    img_array = preprocess_image(img_path)
    predictions = model.predict(img_array)

    predicted_class_index = np.argmax(predictions)
    predicted_class = class_labels.get(predicted_class_index, "Unknown")
    confidence = np.max(predictions)
    infection_percentage = estimate_infection_percentage(img_path)
    intensity_level = get_intensity_level(infection_percentage)
    cure = get_disease_recommendation(predicted_class, infection_percentage)

    return {
        "disease": predicted_class,
        "confidence": round(confidence * 100, 2),
        "infection_percentage": round(infection_percentage, 2),
        "intensity_level": intensity_level,
        "recommendation": cure
    }
