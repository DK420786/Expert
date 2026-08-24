from flask import Flask, request, render_template
import resend

app = Flask(__name__)

# =====================================
# RESEND SETTINGS
# =====================================

import os
resend.api_key = os.environ.get("re_7cpoWco7_Gnwp6Hb6JEPGLPDL4QCzgMX3")

CLIENT_EMAIL = os.environ.get("safahomecare@gmail.com")


# =====================================
# HOME PAGE
# =====================================

@app.route("/")
def home():
    return render_template("index.html")


# =====================================
# FORM SUBMISSION
# =====================================

@app.route("/submit", methods=["POST"])
def submit():

    name = request.form.get("name")
    phone = request.form.get("phone")
    user_email = request.form.get("email")
    message = request.form.get("message")

    resend.Emails.send({
        "from": "onboarding@resend.dev",
        "to": CLIENT_EMAIL,
        "subject": "New Home Care Enquiry",
        "reply_to": user_email,
        "text": f"""
New enquiry received:

Name: {name}
Phone: {phone}
Email: {user_email}

Message:
{message}
"""
    })

    return "Your message has been submitted successfully!"


# =====================================
# RUN FLASK
# =====================================

if __name__ == "__main__":
    app.run(debug=True)