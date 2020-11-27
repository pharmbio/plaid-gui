import os
import minizinc
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    ## minizinc test taken from minizinc-python github
    model = minizinc.Model()
    model.add_string("""
        var -100..100: x;
        int: a; int: b; int: c;
        constraint a*(x*x) + b*x = c;
        solve satisfy;
    """)
    gecode = minizinc.Solver.lookup("gecode")
    inst = minizinc.Instance(gecode, model)
    inst["a"] = 1
    inst["b"] = 4
    inst["c"] = 0
    result = inst.solve(all_solutions=True)
    res  = ""
    for i in range(len(result)):
        res += " x = {}".format(result[i, "x"])
    return res

@app.route('/api')
def api_call():
    return jsonify({'status': 'is flask api working??'})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.getenv('PORT'))