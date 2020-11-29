import os
import minizinc_model
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pandas as pd

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def index():
    return "hello world!"
""" 
@app.route('/plaid', methods=['GET', 'POST'])
def postTest():
    if not request.json:
        return "not a json post"
    response = Flask.jsonify({'test':'data'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
 """
def output_to_csv(self, results):
    header = results[0]
    df = pd.DataFrame(results[1:])
    df.to_csv('results.csv', index=False, header=[header])

def output_to_json(result):
    d_list = []
    header = result[0].split(",")
    for row in result[1:]:
        pieces = row.split(",")
        d_list.append(dict(zip(header,pieces)))
    return jsonify(d_list)

@app.route("/plaid", methods=['GET'])
def test_plaid():
    mz = minizinc_model.MinizincModel("./plate_design/plate-design.mzn", "gecode")
    mz.populate_instance(dzn_file_path="./plate_design/dzn_examples/pl-example06.dzn")
    result = mz.solve_instance()

    j_res = output_to_json(result)
    return j_res

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=os.getenv("PORT"))
