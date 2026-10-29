
from flask import Flask, request, render_template, redirect, url_for
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect("employees.db")
    conn.row_factory = sqlite3.Row
    return conn

def create_table():
    conn = get_db_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS employees (
            employee_id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            department TEXT NOT NULL,
            designation TEXT NOT NULL,
            salary REAL NOT NULL,
            email TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()


@app.route("/", methods=["GET", "POST"])
def employee_management():
    error = None

    if request.method == "POST":
        employee_id = request.form.get("employee_id", "").strip()
        name = request.form.get("name", "").strip()
        department = request.form.get("department", "").strip()
        designation = request.form.get("designation", "").strip()
        salary = request.form.get("salary", "").strip()
        email = request.form.get("email", "").strip()

        if not all([
            employee_id, name, department,
            designation, salary, email
        ]):
            error = "Please fill in all the fields."

        else:
            try:
                employee_id = int(employee_id)
                salary = float(salary)

                if employee_id <= 0 or salary < 0:
                    raise ValueError

                conn = get_db_connection()
                conn.execute("""
                    INSERT INTO employees
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (
                    employee_id, name, department,
                    designation, salary, email
                ))
                conn.commit()
                conn.close()

                return redirect(url_for("employee_management"))

            except ValueError:
                error = "Enter a valid employee ID and salary."

            except sqlite3.IntegrityError:
                error = "Employee ID already exists."

    conn = get_db_connection()
    employees = conn.execute(
        "SELECT * FROM employees ORDER BY employee_id"
    ).fetchall()
    conn.close()

    return render_template(
        "employee.html",
        employees=employees,
        error=error
    )


if __name__ == "__main__":
    create_table()
    app.run(debug=True)
