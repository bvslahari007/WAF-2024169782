
from flask import Flask, request, render_template

app = Flask(__name__)

courses = [
    "Python Programming",
    "Web Development",
    "Data Structures",
    "Database Management"
]

registrations = []

@app.route("/", methods=["GET", "POST"])
def home():
    message = ""

    if request.method == "POST":
        name = request.form.get("name", "").strip()
        student_id = request.form.get("student_id", "").strip()
        course = request.form.get("course", "").strip()

        if not name or not student_id or not course:
            message = "Please fill in all fields."
        elif course not in courses:
            message = "Please select a valid course."
        elif any(
            r["student_id"] == student_id and r["course"] == course
            for r in registrations
        ):
            message = "Already registered for this course."
        else:
            registrations.append({
                "name": name,
                "student_id": student_id,
                "course": course
            })
            message = "Course registration successful!"

    return render_template(
        "index.html",
        courses=courses,
        registrations=registrations,
        message=message
    )

if __name__ == "__main__":
    app.run(debug=True)
