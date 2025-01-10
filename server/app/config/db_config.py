from flask_sqlalchemy import SQLAlchemy
from pymysql import install_as_MySQLdb

# Register PyMySQL as the MySQL driver
install_as_MySQLdb()

db = SQLAlchemy()

def init_app(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:rocket5%25@localhost:3306/plantcare'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'DFASDHFJKSE42480DFSKFHS8R9WKJSFH'
    db.init_app(app)