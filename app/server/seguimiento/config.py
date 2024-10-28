# config.py
class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://usuario:contraseña@localhost/nombre_base_datos'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
