from django.contrib import admin
from pymongo import MongoClient

class UserAdmin(admin.ModelAdmin):
    pass

class TeamAdmin(admin.ModelAdmin):
    pass

class ActivityAdmin(admin.ModelAdmin):
    pass

class LeaderboardAdmin(admin.ModelAdmin):
    pass

class WorkoutAdmin(admin.ModelAdmin):
    pass

# Optionally, you can register models if you define Django models for admin usage.
# Otherwise, admin will only show built-in Django models.
