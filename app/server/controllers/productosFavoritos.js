const sequelize = require('sequelize')
const {handleHttpError} = require('../utils/handleError')
const productosFavoritos = require('../models/productos_favoritos')

async function getAllByClientId(req, res){
    const {idCliente} = req.params
    try{
        response = await productosFavoritos.findAllWishProductsByClientId(idCliente)
        res.status(200).send({data: response})
    }catch(e){
        console.error(e)
        handleHttpError(res, "Error obteniendo recursos", 500)
    }
}
async function save (req, res){
    try{
        const body = req.body
        console.log(body)
        const data = await productosFavoritos.create(body)
        res.status(200).send({data})
    }catch(e) {
        console.error(e)
        handleHttpError(res,"Error creando recuro", 500)
    }
}

async function deleted(req, res){
    const {idCliente, idProducto} = req.params
    try{
        await productosFavoritos.destroy({where: {id_cliente: idCliente, id_producto: idProducto}})
        res.status(200).send({message: "Recurso eliminado"})
    }catch(e){
        handleHttpError(res, "Error eliminando recurso", 500)
        console.log(e)
    }
}

module.exports ={save, deleted, getAllByClientId}