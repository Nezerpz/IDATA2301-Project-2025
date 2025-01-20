from flask import Flask, render_template
import argparse

# Parse command-line arguments
parser = argparse.ArgumentParser()
parser.add_argument('--host', default="127.0.0.1")
parser.add_argument('--port', default="5000")
parser.add_argument('--api-url', default="http://127.0.0.1:8080")
args = parser.parse_args()


# Prepare endpoints
app = Flask(__name__)

def page(filename):
    return render_template(filename, title="Rental Roulette")

@app.route("/", methods=["GET"])
def home():
    return page("home.jinja")

@app.route("/about", methods=["GET"])
def about():
    return page("about.jinja")


# Start webserver
app.run(args.host, args.port)
