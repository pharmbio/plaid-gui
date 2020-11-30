import os
import models.minizinc_model
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors= CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/", methods=['POST', 'GET'])
def test_plaid():
    if request.method  == 'GET':
        return 'Hello!'
    if request.method == 'POST':
        data = request.get_json()
    return data

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=os.getenv("PORT"))
