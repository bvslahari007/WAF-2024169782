
from flask import Flask, request, render_template
from datetime import date

app = Flask(__name__)

@app.route("/7a/appointment", methods=["GET", "POST"])
def hospitalAppointment():
    if request.method == "POST":
        patient_name = request.form.get("patient_name", "").strip()
        doctor = request.form.get("doctor", "").strip()
        appointment_date = request.form.get("appointment_date", "").strip()
        contact = request.form.get("contact", "").strip()

        if not patient_name or not doctor or not appointment_date or not contact:
            return render_template(
                "appointment.html",
                error="Please fill in all the details."
            )

        try:
            selected_date = date.fromisoformat(appointment_date)
        except ValueError:
            return render_template(
                "appointment.html",
                error="Please enter a valid appointment date."
            )

        if selected_date < date.today():
            return render_template(
                "appointment.html",
                error="Appointment date cannot be in the past."
            )

        if not contact.isdigit() or len(contact) != 10:
            return render_template(
                "appointment.html",
                error="Enter a valid 10-digit contact number."
            )

        return render_template(
            "appointment.html",
            patient_name=patient_name,
            doctor=doctor,
            appointment_date=appointment_date,
            contact=contact,
            success="Appointment booked successfully!"
        )

    return render_template("appointment.html")


if __name__ == "__main__":
    app.run(debug=True)
