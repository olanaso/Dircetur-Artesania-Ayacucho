# app.py
from flask import Flask, jsonify, request
from models import db, Pedido
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/pedidos', methods=['GET'])
def get_pedidos():
    pedidos = Pedido.query.all()
    return jsonify([pedido.to_dict() for pedido in pedidos])

@app.route('/pedidos/<int:num_pedido>', methods=['GET'])
def get_pedido(num_pedido):
    pedido = Pedido.query.get(num_pedido)
    if pedido:
        return jsonify(pedido.to_dict())
    return jsonify({'message': 'Pedido not found'}), 404

@app.route('/pedidos', methods=['POST'])
def add_pedido():
    data = request.get_json()
    nuevo_pedido = Pedido(
        artesano_id=data.get('artesano_id'),
        cliente_id=data.get('cliente_id'),
        fecha_pedido=data.get('fecha_pedido'),
        list_productos=data.get('list_productos'),
        imagen_pago=data.get('imagen_pago'),
        list_reclamo=data.get('list_reclamo'),
        comprobante_solic=data.get('comprobante_solic'),
        estado=data.get('estado', 'Pendiente'),
        list_atencion=data.get('list_atencion'),
        usuariocreacion_id=data.get('usuariocreacion_id'),
        usuariomodificacion_id=data.get('usuariomodificacion_id'),
        createdAt=data.get('createdAt'),
        updatedAt=data.get('updatedAt')
    )
    db.session.add(nuevo_pedido)
    db.session.commit()
    return jsonify(nuevo_pedido.to_dict()), 201

@app.route('/pedidos/<int:num_pedido>', methods=['PUT'])
def update_pedido(num_pedido):
    pedido = Pedido.query.get(num_pedido)
    if pedido:
        data = request.get_json()
        pedido.artesano_id = data.get('artesano_id', pedido.artesano_id)
        pedido.cliente_id = data.get('cliente_id', pedido.cliente_id)
        pedido.fecha_pedido = data.get('fecha_pedido', pedido.fecha_pedido)
        pedido.list_productos = data.get('list_productos', pedido.list_productos)
        pedido.imagen_pago = data.get('imagen_pago', pedido.imagen_pago)
        pedido.list_reclamo = data.get('list_reclamo', pedido.list_reclamo)
        pedido.comprobante_solic = data.get('comprobante_solic', pedido.comprobante_solic)
        pedido.estado = data.get('estado', pedido.estado)
        pedido.list_atencion = data.get('list_atencion', pedido.list_atencion)
        pedido.usuariocreacion_id = data.get('usuariocreacion_id', pedido.usuariocreacion_id)
        pedido.usuariomodificacion_id = data.get('usuariomodificacion_id', pedido.usuariomodificacion_id)
        pedido.createdAt = data.get('createdAt', pedido.createdAt)
        pedido.updatedAt = data.get('updatedAt', pedido.updatedAt)
        db.session.commit()
        return jsonify(pedido.to_dict())
    return jsonify({'message': 'Pedido not found'}), 404

@app.route('/pedidos/<int:num_pedido>', methods=['DELETE'])
def delete_pedido(num_pedido):
    pedido = Pedido.query.get(num_pedido)
    if pedido:
        db.session.delete(pedido)
        db.session.commit()
        return jsonify({'message': 'Pedido deleted'})
    return jsonify({'message': 'Pedido not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
