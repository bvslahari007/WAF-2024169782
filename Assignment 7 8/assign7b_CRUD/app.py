
from flask import Flask, request, render_template, redirect, url_for
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect("students.db")
    conn.row_factory = sqlite3.Row
    return conn

def create_table():
    conn = get_db_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS students (
            student_id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            department TEXT NOT NULL,
            email TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

# Create student
@app.route("/add", methods=["POST"])
def add_student():
    student_id = request.form.get("student_id", "").strip()
    name = request.form.get("name", "").strip()
    department = request.form.get("department", "").strip()
    email = request.form.get("email", "").strip()

    if not student_id or not name or not department or not email:
        return redirect(url_for("view_students"))

    try:
        conn = get_db_connection()
        conn.execute(
            "INSERT INTO students VALUES (?, ?, ?, ?)",
            (student_id, name, department, email)
        )
        conn.commit()
        conn.close()
    except sqlite3.IntegrityError:
        return "Error: Student ID already exists."

    return redirect(url_for("view_students"))


# Read all students
@app.route("/students", methods=["GET"])
def view_students():
    conn = get_db_connection()
    students = conn.execute(
        "SELECT * FROM students ORDER BY student_id"
    ).fetchall()
    conn.close()

    return render_template("student_crud.html", students=students)


# Update student
@app.route("/update", methods=["POST"])
def update_student():
    student_id = request.form.get("student_id", "").strip()
    name = request.form.get("name", "").strip()
    department = request.form.get("department", "").strip()
    email = request.form.get("email", "").strip()

    if not student_id or not name or not department or not email:
        return redirect(url_for("view_students"))

    conn = get_db_connection()
    conn.execute("""
        UPDATE students
        SET name = ?, department = ?, email = ?
        WHERE student_id = ?
    """, (name, department, email, student_id))
    conn.commit()
    conn.close()

    return redirect(url_for("view_students"))


# Delete student
@app.route("/delete", methods=["POST"])
def delete_student():
    student_id = request.form.get("student_id", "").strip()

    if not student_id:
        return redirect(url_for("view_students"))

    conn = get_db_connection()
    conn.execute(
        "DELETE FROM students WHERE student_id = ?",
        (student_id,)
    )
    conn.commit()
    conn.close()

    return redirect(url_for("view_students"))


# Home page
@app.route("/", methods=["GET"])
def home():
    return redirect(url_for("view_students"))


if __name__ == "__main__":
    create_table()
    app.run(debug=True)
