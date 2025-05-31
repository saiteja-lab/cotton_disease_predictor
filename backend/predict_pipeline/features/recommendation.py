import os
import requests
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def get_disease_recommendation(disease_name, percentage_infected):
    if disease_name == "Healthy":
        return "✅ No disease detected. Keep monitoring and maintain healthy conditions."

    prompt = f"""
You are an expert agronomist specializing in cotton plant diseases.

Give a professional yet concise recommendation for managing the disease '{disease_name}' affecting cotton crops.

Respond with the following format:

Disease: <Disease Name>  
Overview: <1-line description of the disease>  
Symptoms: <List key symptoms>  
Treatment:  
 - Natural: <Natural or organic treatment methods>  
 - Chemical: <Effective chemical treatment options>  
Prevention: <Tips to avoid future infections>  

Keep the response under 120 words. Do not add any extra explanation. Start directly with the formatted response.
"""

    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
    headers = {
        "Content-Type": "application/json",
    }
    params = {
        "key": GEMINI_API_KEY,
    }
    data = {
        "contents": [{"parts": [{"text": prompt.strip()}]}]
    }

    try:
        response = requests.post(url, headers=headers, params=params, json=data)
        response.raise_for_status()
        reply = response.json()["candidates"][0]["content"]["parts"][0]["text"]
        return reply.strip()
    except Exception as e:
        return f"⚠️ Error: {e}"
