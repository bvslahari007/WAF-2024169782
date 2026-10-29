
from flask import Flask, request, render_template

app = Flask(__name__)

students = []

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        department = request.form.get("department", "").strip()

        if name and department:
            students.append({
                "name": name,
                "department": department
            })

    return render_template("index.html", students=students)

if __name__ == "__main__":
    app.run(debug=True)
