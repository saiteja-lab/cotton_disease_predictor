import numpy as np
import cv2

def estimate_infection_percentage(img_path):
    img = cv2.imread(img_path)
    img = cv2.resize(img, (256, 256))  # Resize for consistency
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # Define HSV ranges for infected areas (tunable based on dataset)
    lower_bound = np.array([10, 40, 40])   # Lower HSV values (Yellow/Brown)
    upper_bound = np.array([180, 255, 255])  # Upper HSV values

    # Create mask for infected regions
    mask = cv2.inRange(hsv, lower_bound, upper_bound)

    # Apply morphological operations to remove small noise
    kernel = np.ones((5, 5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)  # Remove noise
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)  # Fill small holes

    # Calculate percentage of infected area
    infected_pixels = np.count_nonzero(mask)
    total_pixels = mask.size
    infection_percentage = (infected_pixels / total_pixels) * 100

    return round(infection_percentage, 2)

# print(estimate_infection_percentage("a.jpg"))