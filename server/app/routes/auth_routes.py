from flask import Blueprint
from app.controllers.auth_controller import register_user, login_user

auth_route = Blueprint('auth_route', __name__)

auth_route.add_url_rule('/api/register', 'register_user', register_user, methods=['POST'])
auth_route.add_url_rule('/api/login', 'login_user', login_user, methods=['POST'])