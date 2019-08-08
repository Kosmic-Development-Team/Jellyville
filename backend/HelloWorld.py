from flask import Flask
import flask
import os.path
from os import path

iphost = "192.168.8.24"
ipport = 8080

if path.isfile("config.py"):
    from config import *

app = Flask(__name__, root_path = "../frontend")

@app.route("/")
def hello_world():
    print("test")
    return "Hello World!"

@app.route("/template", methods = ["GET"])
def run_template():
    return flask.render_template("index.html")

if __name__ == "__main__":
    app.run(host = iphost, debug = True, port = ipport)
