import os
import csv
import minizinc_model
import utils
from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/")
def index():
    return "hello world!"


@app.route("/api")
def api_call():
    return jsonify({"status": "is flask api working??"})


@app.route("/plaid")
def try_plaid():
    mz = minizinc_model.MinizincModel("./plate_design/plate-design.mzn", "gecode")
    mz.populate_instance(dzn_file_path="./plate_design/dzn_examples/pl-example06.dzn")
    result = mz.solve_instance()
    mz.create_csv(result)
    mz.create_json(result)
    return str(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=os.getenv("PORT"))
