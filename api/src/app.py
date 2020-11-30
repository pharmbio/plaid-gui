import os
import minizinc_model
from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

@app.route("/")
def index():
    return "hello world!"

@app.route("/plaid")
def test_plaid():
    mz = minizinc_model.MinizincModel("./plate_design/plate-design.mzn", "gecode")
    mz.populate_instance(dzn_file_path="./plate_design/dzn_examples/pl-example06.dzn")
    result = mz.solve_instance()

    j_res = mz.output_to_json(result)

    return j_res

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=os.getenv("PORT"))
