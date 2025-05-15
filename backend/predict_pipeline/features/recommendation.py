import requests

API_URL = "http://localhost:11434/api/generate"

def get_disease_recommendation(disease_name, percentage_infected):
    if disease_name == "Healthy":
        return "✅ No disease detected. Keep monitoring and maintain healthy conditions."

    prompt = f"""
You are an expert in cotton plant disease management.

Provide a short and clear recommendation for treating '{disease_name}' in cotton farming.

Include:
1. Disease Summary (1 line)
2. Cure Method (natural & chemical options)
3. Prevention Tips

Keep the total response under 100 words. No thinking text or explanations. Start directly.
"""

    payload = {
        "model": "mistral",
        "prompt": prompt.strip(),
        "stream": False
    }

    response = requests.post(API_URL, json=payload)

    if response.status_code == 200:
        return response.json().get("response", "").strip()
    else:
        return f"⚠️ Error: {response.text}"
