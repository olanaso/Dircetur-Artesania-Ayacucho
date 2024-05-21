const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const fs = require('fs');
const pdf = require('pdf-parse');
const { Readable } = require('stream');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const model = require('../models/libro');
const valoracion = require('../models/valoracion');
const accesos = require('../models/accesos2');
const mislibros = require('../models/mislibros');
const { librosguardados, librosrecientes, buscarLibros, contarbuscarLibros, mislibrosguardados, leerLibro, tiposdeLibro } = require('../services/libros/libros');
const {
  Op
} = require('sequelize');
module.exports = {
  guardar,
  actualizar,
  eliminar,
  obtener,
  listar,
  save,
  listarUltimosRecienteyGuardados,
  leerlibros, valorarlibro, guardarlibro, mostrarLibro, mostrarLibroParte
  , busquedaLibros, listarMisLibros,obtenertipoLibro
};

function guardar (req, res) {

  model.create(req.body)
    .then(object => {
      res.status(200).json(object);
    })
    .catch(error => {
      res.status(400).send(error)
    })
}

function actualizar (req, res) {
  model.findOne({
    where: {
      id: req.params.id
    }

  })
    .then(object => {
      object.update(req.body)
        .then(object => res.status(200).json(object))
        .catch(error => res.status(400).send(error))
    })
    .catch(error => res.status(400).send(error));
}

function eliminar (req, res) {

  model
    .findOne({
      where: {
        id: req.body.id
      }
    })
    .then(object => {
      object.destroy();
      res.status(200).json(object);
    })
    .catch(error => res.status(400).send(error));
}

function obtener (req, res) {

  model.findOne({
    where: {
      id: req.query.id
    }
  })
    .then(resultset => {
      res.status(200).json(resultset)
    })
    .catch(error => {
      res.status(400).send(error)
    })
}

function listar (req, res) {
  model.findAll({
    where: {},
  })
    .then(resultset => {
      res.status(200).json(resultset)
    })
    .catch(error => {
      res.status(400).send(error)
    })
}

async function save (req, res, next) {
  const t = await model.sequelize.transaction();
  try {

    let object = await model.findOne({
      where: {
        id: req.body.id ? req.body.id : 0
      }
    });

    if (object != null) {
      let obj = {
        ...object.dataValues,
        ...req.body
      }
      for (const prop in obj) {
        object[prop] = obj[prop]
      }
      object.usuaregistra_id = req.userId;
      await object.save({
        t
      });
    } else {
      object = await model.create({
        ...req.body
      }, {
        t
      });
    }
    t.commit().then();
    return res.status(200).send(object);
  } catch (e) {
    t.rollback();
    return next(e);
  }
}


async function listarUltimosRecienteyGuardados (req, res) {

  let libguardados = await librosguardados({ usuarioId: req.query.usuarioid })
  let librecientes = await librosrecientes({ usuarioId: req.query.usuarioid })
  return res.status(200).send({ libguardados, librecientes });

}

async function listarMisLibros (req, res) {

  let libguardados = await mislibrosguardados({ usuarioId: req.query.usuarioid })
  return res.status(200).send(libguardados);

}


async function valorarlibro (req, res) {

  valoracion.create(req.body)
    .then(object => {
      res.status(200).json(object);
    })
    .catch(error => {
      res.status(400).send(error)
    })


}

async function guardarlibro (req, res) {

  if (req.body.ope == 1) {

    mislibros.create(req.body)
      .then(object => {
        res.status(200).json(object);
      })
      .catch(error => {
        res.status(400).send(error)
      })

  } else {

    mislibros.findOne({
      where: {
        [Op.and]: [
          { libroid: req.body.libroid }, // Buscar por correo
          { usuarioid: req.body.usuarioid }, // Buscar por DNI
        ]
      }
    })
      .then(object => {
        if (!object) {
          throw {
            error: "No se encontro",
            message: "Ha habido un error",
            status: 400
          }
        }
        object.destroy();
        res.status(200).json(object);
      })
      .catch(error => res.status(400).send(error));


  }




}

async function leerlibros (req, res) {
  console.log(req.body)
  req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let result = await leerLibro(req.body)
  res.status(200).json(result);
}


async function mostrarLibro (req, res) {

  let libroid = req.query.libroid
  let token = req.query.token

  jwt.verify(token, '2C44-4D44-WppQ38S', async (err, decoded) => {
    if (err) {
      return res.status(200).json({ isvalid: false, message: 'Token no valido' });
    }

    model.findOne({
      where: {
        id: libroid
      }
    })
      .then(object => {
        console.log('-----------')
        console.log(object)

        axios({
          url: object.dataValues.url_digital,
          method: 'GET',
          responseType: 'stream', // Specify the response type as arraybuffer
          responseEncoding: 'utf8',  // default
        })
          .then(async response => {
            // Set the appropriate headers for the client to download the file
            //let buffer = Buffer.from(response.data, 'binary');
            //const uint8Array = new Uint8Array(response.data);
            //console.log(typeof uint8Array)
            let filename = generarNombreArchivo()
            const relativePath = './public/books/' + filename;
            const realPath = path.resolve(relativePath);
            console.log('guardando')
            console.log('guardando')
            await guardarPDF(response, realPath)
            //res.setHeader('Content-Type', 'application/pdf');
            console.log('fin guardando')
            // Send the response data as the content of the file
            return res.status(200).json({ valid: true, path: filename });
            // res.send(response.data);
          })
          .catch(error => {
            console.error('Error al descargar el archivo:', error.message);
            res.status(500).send('Error al descargar el archivo.');
          });

      })
      .catch(error => res.status(400).send(error));


  });




}

function generarNombreArchivo () {
  // Crear un nuevo objeto de fecha
  const fecha = new Date();

  // Convertir la fecha y la hora en una cadena de formato YYYYMMDDHHMMSS
  const nombreArchivo = fecha.toISOString().replace(/[:.-]/g, '');

  // Agregar la extensión .pdf
  return nombreArchivo + '.pdf';
}
async function mostrarLibroParte (req, res) {

  let libroid = req.query.libroid
  let token = req.query.token
  let pagini = parseInt(req.query.pagini)
  let pagfin = parseInt(req.query.pagfin) //req.query.pagfin

  const relativePath = './tmp/' + generarNombreArchivo();
  const relativePath_extract = path.resolve('./tmp/' + generarNombreArchivo());
  const realPath = path.resolve(relativePath);

  jwt.verify(token, '2C44-4D44-WppQ38S', async (err, decoded) => {
    if (err) {
      return res.status(200).json({ isvalid: false, message: 'Token no valido' });
    }
    model.findOne({
      where: {
        id: libroid
      }
    })
      .then(object => {
        axios({
          url: object.dataValues.url_digital,
          method: 'GET',
          responseType: 'stream', // Specify the response type as arraybuffer
          responseEncoding: 'utf8', // default
        })
          .then(async response => {
            console.log('guardando')

            await guardarPDF(response, realPath)
            console.log('termino')

            let dataBuffer = fs.readFileSync(realPath);
            const pdfDoc = await PDFDocument.load(dataBuffer);
            console.log('convirtiendo');

            let pdfExtrac = await extractPdfPage(pdfDoc, pagini, pagfin)
            fs.writeFileSync(relativePath_extract, pdfExtrac);

            const fileBuffer = fs.readFileSync(relativePath_extract);
            res.setHeader('Content-Disposition', 'attachment; filename="libroparte.pdf"');
            res.setHeader('Content-Type', 'application/pdf');

            //Eliminado los archivos temporales
            setTimeout(function () {
              fs.unlink(realPath, function (err) {
                if (err) throw err;
                console.log('Archivo eliminado exitosamente!');
              });

              fs.unlink(relativePath_extract, function (err) {
                if (err) throw err;
                console.log('Archivo eliminado exitosamente!');
              });

            }, 600000)


            res.send(fileBuffer);


          })
          .catch((error) => {
            console.error(error);
          });

      })
      .catch(error => res.status(400).send(error));



  })
}

function guardarPDF (response, realPath) {
  return new Promise((resolve, reject) => {
    const writer = response.data.pipe(fs.createWriteStream(realPath));
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

function range (start, end) {
  let length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i - 1);
}

async function extractPdfPage (pdfSrcDoc, pinicio, pfinal) {
  let totopages = pdfSrcDoc.getPageCount()

  //Pagina final maximo de las paginas
  if (pfinal > totopages) {
    pfinal = totopages
  }

  let pini_aux = pinicio
  let pfin_aux = pfinal

  if (pinicio >= pfinal) {
    pinicio = pfin_aux
    pfinal = pini_aux
  }

  /*if (pfinal - pinicio > 30) {
    pfinal = pinicio + 29
  }*/

  const pdfNewDoc = await PDFDocument.create();
  const pages = await pdfNewDoc.copyPages(pdfSrcDoc, range(pinicio, pfinal));
  const font = await pdfNewDoc.embedFont(StandardFonts.Helvetica);
  const watermarkText = 'USO EDUCATIVO LECTURA - BiblioIDEAS';
  const textSize = 30;

  pages.forEach((page) => {

    /*const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(watermarkText, textSize);
    const textHeight = font.heightAtSize(textSize);
    page.drawText(watermarkText, {
      x: (width / 2) - (textWidth / 2) + 180,
      y: (height / 2) - (textHeight / 2) + 300,
      size: textSize,
      font: font,
      color: rgb(1, 0.9, 0.9,), // Ajusta el color al de tu elección
      rotate: { // Este código rotará tu marca de agua en diagonal
        type: 'degrees',
        angle: -65,
      },
    });*/

    pdfNewDoc.addPage(page)
  });
  const newpdf = await pdfNewDoc.save();
  return newpdf;
}


async function busquedaLibros (req, res) {

  console.log('ingreso de busqueda')

  let page = req.query.page || 1;  // page number
  let limit = 10;  // number of records per page
  let offset = 0 + (page==1 ? page-1: page) * limit;
  let textobusqueda = req.query.textobusqueda
  let programaid = req.query.programaid
  let iestpid = req.query.iestpid
  let tipolibroid = req.query.tipolibroid


  let libros = await buscarLibros({ limit, offset, textobusqueda, programaid, iestpid,tipolibroid })
  let cantidadTotal = await contarbuscarLibros({ textobusqueda, programaid, iestpid,tipolibroid })
  let cantLibros = libros.length

  return res.status(200).send({
    totalPages: Math.floor(cantidadTotal / limit),
    data: libros,
    total: cantidadTotal,
    currentPage: parseInt(page)
  });
}




async function obtenertipoLibro (req, res) {


  let tipolibros = await tiposdeLibro({})
  return res.status(200).send(tipolibros);
}
