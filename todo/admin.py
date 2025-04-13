# admin.py
from django.contrib import admin
from .models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed', 'is_completed')  # Add is_completed to list_display

    def is_completed(self, obj):
        return "Completed" if obj.completed else "Pending"
    is_completed.short_description = 'Completion Status'  # Custom header name

admin.site.register(Task, TaskAdmin)
