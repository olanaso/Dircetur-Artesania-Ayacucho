# models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Pedido(db.Model):
    __tablename__ = 'pedido'
    num_pedido = db.Column(db.Integer, primary_key=True, autoincrement=True)
    artesano_id = db.Column(db.Integer, nullable=True)
    cliente_id = db.Column(db.Integer, nullable=True)
    fecha_pedido = db.Column(db.DateTime, nullable=True)
    list_productos = db.Column(db.Text, nullable=True)
    imagen_pago = db.Column(db.String(155), nullable=True)
    list_reclamo = db.Column(db.Text, nullable=True)
    comprobante_solic = db.Column(db.String(50), nullable=True)
    estado = db.Column(db.String(50), default="Pendiente", nullable=True)
    list_atencion = db.Column(db.Text, nullable=True)
    usuariocreacion_id = db.Column(db.Integer, nullable=True)
    usuariomodificacion_id = db.Column(db.Integer, nullable=True)
    createdAt = db.Column(db.DateTime, nullable=True)
    updatedAt = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'num_pedido': self.num_pedido,
            'artesano_id': self.artesano_id,
            'cliente_id': self.cliente_id,
            'fecha_pedido': self.fecha_pedido,
            'list_productos': self.list_productos,
            'imagen_pago': self.imagen_pago,
            'list_reclamo': self.list_reclamo,
            'comprobante_solic': self.comprobante_solic,
            'estado': self.estado,
            'list_atencion': self.list_atencion,
            'usuariocreacion_id': self.usuariocreacion_id,
            'usuariomodificacion_id': self.usuariomodificacion_id,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
