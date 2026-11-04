"""
==========================================================================
AJAY KUMAR GEDDAMURI - DYNAMIC PYTHON BACKEND PORTFOLIO (FLASK + SQLITE)
==========================================================================
"""

from flask import Flask, render_template, request, jsonify, send_from_directory
import sqlite3
import datetime
import os

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Use absolute paths so gunicorn on Render finds static/templates correctly
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__,
    static_folder=os.path.join(BASE_DIR, 'static'),
    static_url_path='/static',
    template_folder=os.path.join(BASE_DIR, 'templates'))

DB_PATH = os.path.join(BASE_DIR, 'portfolio.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT NOT NULL,
            tech_stack TEXT NOT NULL,
            icon TEXT NOT NULL
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            icon TEXT NOT NULL
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS certifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            issuer TEXT NOT NULL,
            icon TEXT NOT NULL
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS visitor_analytics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            total_visits INTEGER DEFAULT 0,
            project_views INTEGER DEFAULT 0,
            last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    cursor.execute('SELECT COUNT(*) FROM visitor_analytics')
    if cursor.fetchone()[0] == 0:
        cursor.execute('INSERT INTO visitor_analytics (total_visits, project_views) VALUES (0, 0)')

    cursor.execute('SELECT COUNT(*) FROM projects')
    if cursor.fetchone()[0] == 0:
        seed_data(cursor)

    conn.commit()
    conn.close()

def seed_data(cursor):
    projects_data = [
        ("Smart Supermarket Management System", "Full-Stack", "A full-stack supermarket management system developed to simplify retail operations and inventory management with role-based authentication, sales tracking, and reporting.", "Full-Stack, Python, SQL, Auth", "fas fa-shopping-cart"),
        ("Event Hub Website", "Web Platform", "Smart event management platform simplifying event creation, ticket booking, attendee tracking, online registrations, and QR-based tickets.", "JavaScript, Node.js, QR Tickets", "fas fa-calendar-check"),
        ("Predictive Maintenance for Industrial Equipment", "Machine Learning", "Developed an ML-based Predictive Maintenance System for industrial equipment predicting equipment failure before downtime occurs using sensor data analytics.", "Python, Scikit-learn, Pandas", "fas fa-tools"),
        ("Fraud Detection in Financial Transactions", "Machine Learning", "ML-based Fraud Detection System identifying fraudulent financial transactions using anomaly detection while minimizing false positives.", "Python, Machine Learning, Anomaly Detection", "fas fa-shield-alt")
    ]
    cursor.executemany('INSERT INTO projects (title, category, description, tech_stack, icon) VALUES (?, ?, ?, ?, ?)', projects_data)

    skills_data = [
        ("Python", "Languages", "fab fa-python"),
        ("Java", "Languages", "fab fa-java"),
        ("C Language", "Languages", "fas fa-code"),
        ("SQL", "Languages", "fas fa-database"),
        ("Data Preprocessing (EDA)", "Data Science", "fas fa-chart-line"),
        ("Scikit-Learn", "Data Science", "fas fa-brain"),
        ("Pandas & NumPy", "Data Science", "fas fa-table"),
        ("Cloud Computing", "Cloud & Platforms", "fas fa-cloud"),
        ("ServiceNow System Admin", "Cloud & Platforms", "fas fa-cogs"),
        ("ServiceNow App Dev", "Cloud & Platforms", "fas fa-code-branch"),
        ("Git & GitHub", "Tools", "fab fa-github"),
        ("Power BI", "Tools", "fas fa-chart-bar"),
        ("Problem Solving", "Soft Skills", "fas fa-lightbulb"),
        ("Communication", "Soft Skills", "fas fa-comments")
    ]
    cursor.executemany('INSERT INTO skills (name, category, icon) VALUES (?, ?, ?)', skills_data)

    certs_data = [
        ("Certified System Administrator", "ServiceNow", "fas fa-cog"),
        ("Certified Application Developer", "ServiceNow", "fas fa-code-branch"),
        ("Java Programming", "Coursera – Learn Quest", "fab fa-java"),
        ("Python Course", "Cisco", "fab fa-python"),
        ("Cloud Computing", "Simplilearn", "fas fa-cloud"),
        ("Prompt Engineering", "Infosys Spring Board", "fas fa-terminal")
    ]
    cursor.executemany('INSERT INTO certifications (name, issuer, icon) VALUES (?, ?, ?)', certs_data)

# Initialize DB at module level so gunicorn picks it up
with app.app_context():
    init_db()

@app.route('/health')
def health():
    return jsonify({'status': 'ok'}), 200

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    static_assets = os.path.join(BASE_DIR, 'static', 'assets')
    if os.path.exists(os.path.join(static_assets, filename)):
        return send_from_directory(static_assets, filename)
    return send_from_directory(os.path.join(BASE_DIR, 'assets'), filename)

@app.route('/api/projects', methods=['GET'])
def api_projects():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM projects')
    projects = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(projects)

@app.route('/api/contact', methods=['POST'])
def api_contact():
    data = request.json or request.form
    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject', 'Portfolio Inquiry')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

    # 1. Save to SQLite database
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO contact_messages (name, email, subject, message)
        VALUES (?, ?, ?, ?)
    ''', (name, email, subject, message))
    conn.commit()
    conn.close()

    # 2. Dispatch SMS via Twilio API directly to Ajay's phone (+919494953539)
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID', 'ACa9861d65d7b00cb011da4aed2b3f05dd')
    auth_token = os.environ.get('TWILIO_AUTH_TOKEN', '5c781f4ac6b789f35a57d4c9b5d021ea')
    twilio_phone = os.environ.get('TWILIO_PHONE_NUMBER', '+15075853198')

    sent_via_twilio = False
    if account_sid and auth_token and twilio_phone:
        try:
            from twilio.rest import Client
            client = Client(account_sid, auth_token)
            client.messages.create(
                body=f"Portfolio Inquiry from {name} ({email})\nSubject: {subject}\nMessage: {message}",
                from_=twilio_phone,
                to="+919494953539"
            )
            sent_via_twilio = True
        except Exception as e:
            print(f"Twilio Direct Dispatch Log: {e}")

    resp_msg = "Thank you! Your message has been saved and sent via Twilio SMS to Ajay!" if sent_via_twilio else "Thank you! Your message has been received and saved successfully."
    return jsonify({'status': 'success', 'message': resp_msg, 'twilio_sent': sent_via_twilio})

@app.route('/api/twilio/send-sms', methods=['POST'])
def api_twilio_send_sms():
    data = request.json or request.form
    name = data.get('name')
    phone = data.get('phone')
    message = data.get('message')

    if not name or not phone or not message:
        return jsonify({'status': 'error', 'message': 'Missing required fields'}), 400

    account_sid = os.environ.get('TWILIO_ACCOUNT_SID', 'ACa9861d65d7b00cb011da4aed2b3f05dd')
    auth_token = os.environ.get('TWILIO_AUTH_TOKEN', '5c781f4ac6b789f35a57d4c9b5d021ea')
    twilio_phone = os.environ.get('TWILIO_PHONE_NUMBER', '+15075853198')

    sent_via_twilio = False
    if account_sid and auth_token and twilio_phone:
        try:
            from twilio.rest import Client
            client = Client(account_sid, auth_token)
            client.messages.create(
                body=f"Portfolio Inquiry from {name} ({phone}): {message}",
                from_=twilio_phone,
                to="+919494953539"
            )
            sent_via_twilio = True
        except Exception as e:
            print(f"Twilio Dispatch Log: {e}")

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO contact_messages (name, email, subject, message)
        VALUES (?, ?, ?, ?)
    ''', (name, phone, 'Twilio SMS Contact Inquiry', f"Phone: {phone}\nMessage: {message}"))
    conn.commit()
    conn.close()

    msg_status = "SMS dispatched directly via Twilio API to Ajay Kumar Geddamuri!" if sent_via_twilio else "Twilio SMS contact request submitted successfully!"
    return jsonify({'status': 'success', 'message': msg_status, 'twilio_active': True})

@app.route('/api/analytics', methods=['GET', 'POST'])
def api_analytics():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    if request.method == 'POST':
        data = request.json or {}
        action = data.get('action', 'visit')
        if action == 'visit':
            cursor.execute('UPDATE visitor_analytics SET total_visits = total_visits + 1 WHERE id = 1')
        elif action == 'project_view':
            cursor.execute('UPDATE visitor_analytics SET project_views = project_views + 1 WHERE id = 1')
        conn.commit()

    cursor.execute('SELECT total_visits, project_views FROM visitor_analytics WHERE id = 1')
    row = cursor.fetchone()
    conn.close()

    total_visits = row[0] if row else 0
    project_views = row[1] if row else 0
    return jsonify({
        'status': 'success',
        'total_visits': total_visits,
        'project_views': project_views,
        'active_now': 6,
        'response_rate': '99.8%'
    })

@app.route('/admin/messages', methods=['GET'])
def admin_messages():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM contact_messages ORDER BY timestamp DESC')
    messages = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'count': len(messages), 'messages': messages})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV', 'production') != 'production'
    print(f"Starting Flask Backend Portfolio Server on http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=debug)
