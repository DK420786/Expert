from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


# =========================================================
# DOCTOR DATA
# =========================================================

doctors = [
    {
        "id": 1,
        "name": "Dr. Rahul Sharma",
        "specialization": "Cardiologist",
        "area": "Delhi",
        "experience": "10 Years",
        "timing": "10:00 AM - 2:00 PM",
        "image": "images/doctors/doctor1.jpg"
    },
    {
        "id": 2,
        "name": "Dr. Priya Verma",
        "specialization": "Gynecologist",
        "area": "Noida",
        "experience": "8 Years",
        "timing": "11:00 AM - 3:00 PM",
        "image": "images/doctors/doctor2.jpg"
    },
    {
        "id": 3,
        "name": "Dr. Amit Kumar",
        "specialization": "Orthopedic",
        "area": "Gurgaon",
        "experience": "12 Years",
        "timing": "9:00 AM - 1:00 PM",
        "image": "images/doctors/doctor3.jpg"
    },
    {
        "id": 4,
        "name": "Dr. Neha Singh",
        "specialization": "Dermatologist",
        "area": "Delhi",
        "experience": "7 Years",
        "timing": "2:00 PM - 6:00 PM",
        "image": "images/doctors/doctor4.jpg"
    },
    {
        "id": 5,
        "name": "Dr. Arjun Mehta",
        "specialization": "Neurologist",
        "area": "Noida",
        "experience": "11 Years",
        "timing": "10:00 AM - 4:00 PM",
        "image": "images/doctors/doctor5.jpg"
    },
    {
        "id": 6,
        "name": "Dr. Anjali Gupta",
        "specialization": "Pediatrician",
        "area": "Gurgaon",
        "experience": "9 Years",
        "timing": "9:00 AM - 12:00 PM",
        "image": "images/doctors/doctor6.jpg"
    }
]


# =========================================================
# HOME PAGE
# =========================================================

@app.route("/")
def home():
    return render_template(
        "index.html",
        doctors=doctors
    )


# =========================================================
# DOCTOR SEARCH / FILTER
# =========================================================

@app.route("/search-doctors", methods=["GET"])
def search_doctors():

    area = request.args.get("area", "").strip().lower()
    specialization = request.args.get(
        "specialization", ""
    ).strip().lower()
    search = request.args.get("search", "").strip().lower()

    filtered_doctors = []

    for doctor in doctors:

        doctor_area = doctor["area"].lower()
        doctor_specialization = doctor["specialization"].lower()
        doctor_name = doctor["name"].lower()

        # Area filter
        if area and area != "all":
            if area not in doctor_area:
                continue

        # Specialization filter
        if specialization and specialization != "all":
            if specialization not in doctor_specialization:
                continue

        # Name/search filter
        if search:
            if (
                search not in doctor_name
                and search not in doctor_area
                and search not in doctor_specialization
            ):
                continue

        filtered_doctors.append(doctor)

    return jsonify(filtered_doctors)


# =========================================================
# APPOINTMENT
# =========================================================

@app.route("/book-appointment", methods=["POST"])
def book_appointment():

    name = request.form.get("name", "").strip()
    phone = request.form.get("phone", "").strip()
    email = request.form.get("email", "").strip()
    doctor = request.form.get("doctor", "").strip()
    date = request.form.get("date", "").strip()
    time = request.form.get("time", "").strip()
    message = request.form.get("message", "").strip()

    # Basic validation
    if not name or not phone or not doctor or not date:
        return jsonify({
            "success": False,
            "message": "Please fill all required fields."
        }), 400

    # -----------------------------------------------------
    # Abhi database nahi laga rahe.
    # Baad mein appointment ko SQLite database mein save
    # kar sakte hain.
    # -----------------------------------------------------

    appointment = {
        "name": name,
        "phone": phone,
        "email": email,
        "doctor": doctor,
        "date": date,
        "time": time,
        "message": message
    }

    print("\n========================================")
    print("NEW APPOINTMENT")
    print("========================================")
    print("Name       :", appointment["name"])
    print("Phone      :", appointment["phone"])
    print("Email      :", appointment["email"])
    print("Doctor     :", appointment["doctor"])
    print("Date       :", appointment["date"])
    print("Time       :", appointment["time"])
    print("Message    :", appointment["message"])
    print("========================================\n")

    return jsonify({
        "success": True,
        "message": "Appointment request submitted successfully."
    })


# =========================================================
# DOCTOR DETAILS
# =========================================================

@app.route("/doctor/<int:doctor_id>")
def doctor_details(doctor_id):

    doctor = None

    for item in doctors:
        if item["id"] == doctor_id:
            doctor = item
            break

    if doctor is None:
        return "Doctor not found", 404

    return jsonify(doctor)


# =========================================================
# HEALTH CHECK
# =========================================================

@app.route("/health")
def health():
    return jsonify({
        "status": "running",
        "message": "ExpertCare Flask application is running."
    })


# =========================================================
# RUN APPLICATION
# =========================================================

if __name__ == "__main__":
    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )
