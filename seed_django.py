import os
import sys

def seed():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_django.settings')
    import django
    django.setup()

    from portfolio_app.models import Project, Skill, Certification

    # Clear existing
    Project.objects.all().delete()
    Skill.objects.all().delete()
    Certification.objects.all().delete()

    # Seed Projects
    projects_data = [
        {"title": "Smart Supermarket Management System", "category": "Full-Stack", "description": "A full-stack supermarket management system developed to simplify retail operations and inventory management with role-based authentication, sales tracking, and reporting.", "tech_stack": "Full-Stack, Python, SQL, Auth", "icon": "fas fa-shopping-cart"},
        {"title": "Event Hub Website", "category": "Web Platform", "description": "Smart event management platform simplifying event creation, ticket booking, attendee tracking, online registrations, and QR-based tickets.", "tech_stack": "JavaScript, Node.js, QR Tickets", "icon": "fas fa-calendar-check"},
        {"title": "Predictive Maintenance for Industrial Equipment", "category": "Machine Learning", "description": "Developed an ML-based Predictive Maintenance System for industrial equipment predicting equipment failure before downtime occurs using sensor data analytics.", "tech_stack": "Python, Scikit-learn, Pandas", "icon": "fas fa-tools"},
        {"title": "Fraud Detection in Financial Transactions", "category": "Machine Learning", "description": "ML-based Fraud Detection System identifying fraudulent financial transactions using anomaly detection while minimizing false positives.", "tech_stack": "Python, Machine Learning, Anomaly Detection", "icon": "fas fa-shield-alt"}
    ]
    for p in projects_data:
        Project.objects.create(**p)

    # Seed Skills
    skills_data = [
        {"name": "Python", "category": "Languages", "icon": "fab fa-python"},
        {"name": "Java", "category": "Languages", "icon": "fab fa-java"},
        {"name": "C Language", "category": "Languages", "icon": "fas fa-code"},
        {"name": "SQL", "category": "Languages", "icon": "fas fa-database"},
        {"name": "Data Preprocessing (EDA)", "category": "Data Science", "icon": "fas fa-chart-line"},
        {"name": "Scikit-Learn", "category": "Data Science", "icon": "fas fa-brain"},
        {"name": "Pandas & NumPy", "category": "Data Science", "icon": "fas fa-table"},
        {"name": "Cloud Computing", "category": "Cloud & Platforms", "icon": "fas fa-cloud"},
        {"name": "ServiceNow System Admin", "category": "Cloud & Platforms", "icon": "fas fa-cogs"},
        {"name": "ServiceNow App Dev", "category": "Cloud & Platforms", "icon": "fas fa-code-branch"},
        {"name": "Git & GitHub", "category": "Tools", "icon": "fab fa-github"},
        {"name": "Power BI", "category": "Tools", "icon": "fas fa-chart-bar"},
        {"name": "Problem Solving", "category": "Soft Skills", "icon": "fas fa-lightbulb"},
        {"name": "Communication", "category": "Soft Skills", "icon": "fas fa-comments"}
    ]
    for s in skills_data:
        Skill.objects.create(**s)

    # Seed Certifications
    certs_data = [
        {"name": "Certified System Administrator", "issuer": "ServiceNow", "icon": "fas fa-cog"},
        {"name": "Certified Application Developer", "issuer": "ServiceNow", "icon": "fas fa-code-branch"},
        {"name": "Java Programming", "issuer": "Coursera – Learn Quest", "icon": "fab fa-java"},
        {"name": "Python Course", "issuer": "Cisco", "icon": "fab fa-python"},
        {"name": "Cloud Computing", "issuer": "Simplilearn", "icon": "fas fa-cloud"},
        {"name": "Prompt Engineering", "issuer": "Infosys Spring Board", "icon": "fas fa-terminal"}
    ]
    for c in certs_data:
        Certification.objects.create(**c)

    print("Django SQLite Database successfully seeded with Ajay's resume data!")

if __name__ == '__main__':
    seed()
