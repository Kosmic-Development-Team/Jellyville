from flask import Flask
import flask

app = Flask(__name__, template_folder = "../frontend/templates")

@app.route("/")
def hello_world():
    print("test")
    return "Hello World!"

@app.route("/template", methods = ["GET"])
def run_template():
    return flask.render_template("index.html")

if __name__ == "__main__":
    app.run(host = "192.168.8.24", debug = True, port = 8080)
