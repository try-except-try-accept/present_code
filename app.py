from flask import Flask, render_template, url_for

from uuid import uuid4


app = Flask(__name__)
app.secret_key = uuid4()

@app.route("/")
def main():
    return render_template("base.html")




app.run(host="0.0.0.0", port=8080)