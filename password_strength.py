from flask import Flask, render_template, request, jsonify
import csv

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check_password', methods=['POST'])
def check_password():
    password = request.form['password']
    is_strong = check_strength(password)

    with open('passwords.csv', 'a', newline='') as csvfile:
        csv_writer = csv.writer(csvfile)
        csv_writer.writerow([password, 'strong' if is_strong else 'weak'])

    return jsonify({'strong': is_strong})

def check_strength(password):
    # Implement your password strength checking logic here
    # For example, you can check length, complexity, etc.
    return len(password) >= 8

if __name__ == '__main__':
    app.run(debug=True)

