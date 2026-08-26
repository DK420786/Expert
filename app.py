from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


# =========================================================
# HOME PAGE
# =========================================================

@app.route("/")
def home():
    return render_template("index.html")


# =========================================================
# APPOINTMENT
# =========================================================

@app.route("/appointment", methods=["POST"])
def appointment():

    patient_name = request.form.get("patient_name", "").strip()
    phone = request.form.get("phone", "").strip()
    area = request.form.get("area", "").strip()
    service = request.form.get("service", "").strip()
    date = request.form.get("date", "").strip()
    time = request.form.get("time", "").strip()
    message = request.form.get("message", "").strip()

    # Basic validation
    if not patient_name:
        return jsonify({
            "success": False,
            "message": "Patient name is required."
        }), 400

    if not phone:
        return jsonify({
            "success": False,
            "message": "Mobile number is required."
        }), 400

    if len(phone) != 10 or not phone.isdigit():
        return jsonify({
            "success": False,
            "message": "Please enter a valid 10-digit mobile number."
        }), 400

    if not area:
        return jsonify({
            "success": False,
            "message": "Please select an area."
        }), 400

    if not service:
        return jsonify({
            "success": False,
            "message": "Please select a service."
        }), 400

    if not date:
        return jsonify({
            "success": False,
            "message": "Please select a date."
        }), 400

    if not time:
        return jsonify({
            "success": False,
            "message": "Please select a time."
        }), 400


    # -----------------------------------------------------
    # TEMPORARY
    # -----------------------------------------------------
    # Abhi database nahi hai, isliye data terminal mein
    # print hoga.
    #
    # Baad mein yahin SQLite/MySQL database add karenge.
    # -----------------------------------------------------

    appointment_data = {
        "patient_name": patient_name,
        "phone": phone,
        "area": area,
        "service": service,
        "date": date,
        "time": time,
        "message": message
    }

    print("\n===================================")
    print("NEW APPOINTMENT")
    print("===================================")

    for key, value in appointment_data.items():
        print(f"{key}: {value}")

    print("===================================\n")


    return jsonify({
        "success": True,
        "message": "Appointment request submitted successfully.",
        "appointment": appointment_data
    })


# =========================================================
# HEALTH CHECK
# =========================================================

@app.route("/health")
def health():
    return jsonify({
        "status": "running",
        "message": "ExpertCare Flask server is working."
    })


# =========================================================
# ERROR HANDLERS
# =========================================================

@app.errorhandler(404)
def page_not_found(error):
    return """
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    """, 404


@app.errorhandler(500)
def internal_server_error(error):
    return """
    <h1>500 - Internal Server Error</h1>
    <p>Something went wrong on the server.</p>
    """, 500


# =========================================================
# RUN APPLICATION
# =========================================================

if __name__ == "__main__":
    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )
