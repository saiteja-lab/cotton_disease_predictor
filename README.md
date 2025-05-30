# 🧠🌱 Cotton Plant Disease Predictor using Ollama Mistral LLM

This project is a full-stack web application designed to predict diseases in cotton plants using image input. It utilizes deep learning for image analysis and the **Ollama Mistral local LLM** to generate human-readable disease descriptions, treatment suggestions, and prevention tips.

---

## 🚀 Features

- 🌿 Upload images of cotton leaves to detect diseases.
- 🤖 Deep learning-based image classification.
- 🧾 Descriptive and helpful disease insights using the **Mistral model** via **Ollama**.
- 🌐 Clean and responsive web interface.

---

## 🧰 Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Flask (Python)
- **Model**: Local image classifier (CNN or custom model)
- **LLM**: [Mistral](https://ollama.com/library/mistral) via [Ollama](https://ollama.com/)
- **Database (optional)**: Firebase or MongoDB (for storing user data and prediction history)

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cotton-disease-predictor.git
cd cotton-disease-predictor
```

### 2. Setup Backend (Flask)

#### 🔹 Create a virtual environment (optional but recommended)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
```
#### 🔹 Install dependencies
```bash
pip install -r requirements.txt
```

#### 🔹 Run the Flask server
```bash
python app.py
```

### 3. Setup Frontend (React)
#### 🔹 Installing packages
```bash
npm install
```
#### 🔹 Run the frontend
```bash
npm run dev
```

code run at http://localhost:5173
