from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return open("index.html", encoding="utf-8").read()

@app.route("/submit", methods=["POST"])
def submit():
    name = request.form.get("name")
    phone = request.form.get("phone")
    email = request.form.get("email")
    date = request.form.get("date")
    service = request.form.get("service")

    print("New Booking:")
    print("Name:", name)
    print("Phone:", phone)
    print("Email:", email)
    print("Date:", date)
    print("Service:", service)

    return jsonify({
        "success": True,
        "message": "Request submitted successfully"
    })

if __name__ == "__main__":
    app.run(debug=True)
