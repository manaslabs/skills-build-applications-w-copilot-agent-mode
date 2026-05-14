from rest_framework import serializers

# User Serializer
class UserSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    team_id = serializers.CharField()

# Team Serializer
class TeamSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100)
    members = serializers.ListField(child=serializers.CharField(), required=False)

# Activity Serializer
class ActivitySerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    user_id = serializers.CharField()
    activity = serializers.CharField(max_length=100)
    duration = serializers.IntegerField()

# Leaderboard Serializer
class LeaderboardSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    team_id = serializers.CharField()
    points = serializers.IntegerField()

# Workout Serializer
class WorkoutSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100)
    suggested_for = serializers.CharField(max_length=100)
