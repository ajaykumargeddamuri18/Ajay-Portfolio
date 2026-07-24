from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
from pathlib import Path
from .models import Project, Skill, Certification, ContactMessage

BASE_DIR = Path(__file__).resolve().parent.parent

def home(request):
    try:
        projects = Project.objects.all()
        skills = Skill.objects.all()
        certs = Certification.objects.all()
        return render(request, 'index.html', {
            'projects': projects,
            'skills': skills,
            'certs': certs
        })
    except Exception as e:
        template_path = BASE_DIR / 'templates' / 'index.html'
        if os.path.exists(template_path):
            with open(template_path, 'r', encoding='utf-8') as f:
                return HttpResponse(f.read())
        return HttpResponse(f"Django Server Error: {str(e)}", status=500)

def api_projects(request):
    projects = list(Project.objects.values())
    return JsonResponse(projects, safe=False)

@csrf_exempt
def api_contact(request):
    if request.method == 'POST':
        try:
            if request.content_type == 'application/json':
                data = json.loads(request.body)
            else:
                data = request.POST

            name = data.get('name')
            email = data.get('email')
            subject = data.get('subject', 'Portfolio Inquiry')
            message = data.get('message')

            if not name or not email or not message:
                return JsonResponse({'status': 'error', 'message': 'Missing fields'}, status=400)

            ContactMessage.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message
            )
            return JsonResponse({'status': 'success', 'message': 'Message saved to Django database!'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)
