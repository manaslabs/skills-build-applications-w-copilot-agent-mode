from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer
from pymongo import MongoClient
import bson

client = MongoClient('localhost', 27017)
db = client['octofit_db']

class UserViewSet(viewsets.ViewSet):
    def list(self, request):
        users = list(db.users.find())
        for u in users:
            u['id'] = str(u['_id'])
        return Response(UserSerializer(users, many=True).data)
    def retrieve(self, request, pk=None):
        user = db.users.find_one({'_id': bson.ObjectId(pk)})
        if user:
            user['id'] = str(user['_id'])
            return Response(UserSerializer(user).data)
        return Response(status=status.HTTP_404_NOT_FOUND)

class TeamViewSet(viewsets.ViewSet):
    def list(self, request):
        teams = list(db.teams.find())
        for t in teams:
            t['id'] = str(t['_id'])
            t['members'] = [str(m) for m in t.get('members', [])]
        return Response(TeamSerializer(teams, many=True).data)
    def retrieve(self, request, pk=None):
        team = db.teams.find_one({'_id': bson.ObjectId(pk)})
        if team:
            team['id'] = str(team['_id'])
            team['members'] = [str(m) for m in team.get('members', [])]
            return Response(TeamSerializer(team).data)
        return Response(status=status.HTTP_404_NOT_FOUND)

class ActivityViewSet(viewsets.ViewSet):
    def list(self, request):
        activities = list(db.activities.find())
        for a in activities:
            a['id'] = str(a['_id'])
            a['user_id'] = str(a['user_id'])
        return Response(ActivitySerializer(activities, many=True).data)
    def retrieve(self, request, pk=None):
        activity = db.activities.find_one({'_id': bson.ObjectId(pk)})
        if activity:
            activity['id'] = str(activity['_id'])
            activity['user_id'] = str(activity['user_id'])
            return Response(ActivitySerializer(activity).data)
        return Response(status=status.HTTP_404_NOT_FOUND)

class LeaderboardViewSet(viewsets.ViewSet):
    def list(self, request):
        leaderboard = list(db.leaderboard.find())
        for l in leaderboard:
            l['id'] = str(l['_id'])
            l['team_id'] = str(l['team_id'])
        return Response(LeaderboardSerializer(leaderboard, many=True).data)
    def retrieve(self, request, pk=None):
        entry = db.leaderboard.find_one({'_id': bson.ObjectId(pk)})
        if entry:
            entry['id'] = str(entry['_id'])
            entry['team_id'] = str(entry['team_id'])
            return Response(LeaderboardSerializer(entry).data)
        return Response(status=status.HTTP_404_NOT_FOUND)

class WorkoutViewSet(viewsets.ViewSet):
    def list(self, request):
        workouts = list(db.workouts.find())
        for w in workouts:
            w['id'] = str(w['_id'])
        return Response(WorkoutSerializer(workouts, many=True).data)
    def retrieve(self, request, pk=None):
        workout = db.workouts.find_one({'_id': bson.ObjectId(pk)})
        if workout:
            workout['id'] = str(workout['_id'])
            return Response(WorkoutSerializer(workout).data)
        return Response(status=status.HTTP_404_NOT_FOUND)
