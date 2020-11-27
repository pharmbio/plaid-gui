import os
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return "testing testing"

@app.route('/api')
def api_call():
    return jsonify({'status': 'is flask api working??'})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.getenv('PORT'))