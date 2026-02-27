# AI Disclosure: Google Gemini was used to assist with rewritting ap.py

from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

products = [
    {
        "id": 1,
        "name": "Dog Food",
        "price": 19.99,
        "description": "Premium dry food for adult dogs"
    },
    {
        "id": 2,
        "name": "Cat Food",
        "price": 24.99,
        "description": "Organic wet food for cats"
    },
    {
        "id": 3,
        "name": "Hamster Wheel",
        "price": 12.50,
        "description": "Silent spinner for active hamsters"
    }
]

@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)

@app.route('/', methods=['GET'])
def home():
    return "Product Service (Python) is Running!"

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)