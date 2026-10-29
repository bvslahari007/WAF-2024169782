
from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/7a/form_student", methods=["GET", "POST"])
def studentManagement():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        department = request.form.get("department", "").strip()

        if not name or not department:
            return render_template(
                "student.html",
                error="Please fill in all the details."
            )

        return render_template(
            "student.html",
            name=name,
            department=department,
            success="Student details submitted successfully!"
        )

    return render_template("student.html")


if __name__ == "__main__":
    app.run(debug=True)
