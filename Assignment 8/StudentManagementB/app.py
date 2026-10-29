
from flask import Flask, request, render_template

app = Flask(__name__)

students = []

@app.route("/", methods=["GET", "POST"])
def home():
    message = ""

    if request.method == "POST":
        name = request.form.get("name", "").strip()
        department = request.form.get("department", "").strip()
        email = request.form.get("email", "").strip()

        if not name or not department or not email:
            message = "Please fill in all fields."
        else:
            students.append({
                "name": name,
                "department": department,
                "email": email
            })
            message = "Student details saved successfully!"

    return render_template(
        "index.html",
        students=students,
        message=message
    )

if __name__ == "__main__":
    app.run(debug=True)
