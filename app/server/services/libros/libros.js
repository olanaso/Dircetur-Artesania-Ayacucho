const models = require('../../models/libro');

module.exports = {

    librosrecientes,librosguardados,buscarLibros,contarbuscarLibros,
    listarProgramasbyIESTP,mislibrosguardados,leerLibro,tiposdeLibro
}

// async function librosrecientes ({ usuarioId }) {
//     try {

//         let sql = `
//         select DISTINCT c.* from accesos a 
//         inner join usuario b on a.usuarioid=b.id 
//         inner join libro c on c.id=a.libroid 
//         where b.id=${usuarioId} limit 5;
//      `;
//         console.log(sql)
//         const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
//         if (!list) {
//             throw {
//                 error: new Error("No existen datos"),
//                 message: "No existen Datos",
//                 status: 401
//             };
//         }
//         return { list };
//     }
//     catch (err) {
//         throw err;
//     }
// }



async function librosrecientes({ usuarioId }) {
    try {

        let sql = `
        select DISTINCT c.id ,c.titulo ,c.autores  ,c.url_portada  
        ,(SELECT FLOOR(AVG(valor)) FROM valoracion where libroid= c.id  ) valor
        from accesos a 
        inner join usuario b on a.usuarioid=b.id 
        inner join libro c on c.id=a.libroid 
        where b.id=${usuarioId} order by a.id desc limit 5;
     `;
        console.log(sql)
        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        console.log(list)
        if (!list) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }
        return list;
    }
    catch (err) {
        throw err;
    }
}




async function librosguardados({ usuarioId }) {
    try {

        let sql = `

        SELECT c.id ,c.titulo ,c.autores  ,c.url_portada  
        ,(SELECT  FLOOR(AVG(valor)) FROM valoracion where libroid= c.id  ) valor 
        FROM mislibros a 
        inner join usuario b on a.usuarioid=b.id 
        inner join libro c on a.libroid=c.id
        where  b.id=${usuarioId} limit 5
        
     `;
        console.log(sql)
        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        console.log(list)
        if (!list) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }
        return list ;
    }
    catch (err) {
        throw err;
    }
}



async function mislibrosguardados({ usuarioId }) {
    try {

        let sql = `

        SELECT c.id ,c.titulo ,c.autores  ,c.url_portada  
        ,(SELECT  FLOOR(AVG(valor)) FROM valoracion where libroid= c.id  ) valor 
        FROM mislibros a 
        inner join usuario b on a.usuarioid=b.id 
        inner join libro c on a.libroid=c.id
        where  b.id=${usuarioId} 
        
     `;
        console.log(sql)
        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        console.log(list)
        if (!list) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }
        return list ;
    }
    catch (err) {
        throw err;
    }
}




async function buscarLibros({ limit, offset,textobusqueda,programaid,iestpid,tipolibroid }) {
    try {

        let where=``
        if(parseInt(programaid)>0){
            where=` and b.programa_id=${programaid}`
        }

        let sql = `
        select distinct a.id, a.titulo,a.autores,a.url_portada,
        (SELECT  FLOOR(AVG(valor)) FROM valoracion where libroid=a.id  ) valor 
        from libro a 
        inner join libro_programa b on a.id=b.libro_id
        inner join programas c on c.id=b.programa_id
        inner join iestp_programa d on d.progid=c.id
        where 
        (concat(UPPER(COALESCE(a.titulo,'')),UPPER(COALESCE(a.autores,'')),UPPER(COALESCE(a.temas,'')),UPPER(COALESCE(a.editorial,'')),UPPER(COALESCE(a.resenia,'')),UPPER(COALESCE(a.isbn,''))) LIKE '%${String(textobusqueda).toUpperCase()}%'
        or SOUNDEX(UPPER(COALESCE(a.titulo,'')))=SOUNDEX('${String(textobusqueda).toUpperCase()}')   
         or SOUNDEX(UPPER(COALESCE(a.autores,'')))=SOUNDEX('${String(textobusqueda).toUpperCase()}')   
        )
       ${where} and d.iestpid=${iestpid} and a.tipolibroId=${tipolibroid} order by a.id desc
        limit ${limit} offset ${offset}
     `;
        console.log(sql)
        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        if (!list) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }
        return list;
    }
    catch (err) {
        throw err;
    }
}



async function contarbuscarLibros({textobusqueda,programaid,iestpid,tipolibroid }) {
    try {

        let where=``
        if(parseInt(programaid)>0){
            where=` and b.programa_id=${programaid}`
        }

        let sql = `
        select count(*) as cantidadtotal
        from libro a 
        inner join libro_programa b on a.id=b.libro_id
        inner join programas c on c.id=b.programa_id
        inner join iestp_programa d on d.progid=c.id
        where
        (concat(UPPER(COALESCE(a.titulo,'')),UPPER(COALESCE(a.autores,'')),UPPER(COALESCE(a.temas,'')),UPPER(COALESCE(a.editorial,'')),UPPER(COALESCE(a.resenia,'')),UPPER(COALESCE(a.isbn,''))) LIKE '%${String(textobusqueda).toUpperCase()}%'
        or SOUNDEX(UPPER(COALESCE(a.titulo,'')))=SOUNDEX('${String(textobusqueda).toUpperCase()}')   
         or SOUNDEX(UPPER(COALESCE(a.autores,'')))=SOUNDEX('${String(textobusqueda).toUpperCase()}')   
        )
        ${where} and d.iestpid=${iestpid} and a.tipolibroId=${tipolibroid}
       
     `;
        console.log(sql)
        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        if (!list) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }
        return parseInt(list[0].cantidadtotal);
    }
    catch (err) {
        throw err;
    }
}



async function listarProgramasbyIESTP({iestpid }) {
    try {

       

        let sql = `
        select b.* from iestp_programa a inner join programas b on a.progid=b.id where a.iestpid=${iestpid}
       
     `;
        console.log(sql)
        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        if (!list) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }
        return  list;
    }
    catch (err) {
        throw err;
    }
}

async function leerLibro({dni, usuario, usuarioid, libro, libroid, autor, programa, programaid, ip, iestp, iestpid }) {
    try {

       

        let sql = `
        INSERT INTO accesos( dni, usuario, usuarioid, libro, libroid, autor, programa, programaid, ip, iestp, iestpid) 
        VALUES ('${dni}','${usuario}',${usuarioid},'${libro}',${libroid},'${autor}','${programa}',${programaid},'${ip}'
        ,'${iestp}',${iestpid});
     `;
        console.log(sql)
        await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.INSERT  });
       
        return  {insertado: true};
    }
    catch (err) {
        throw err;
    }
}



async function tiposdeLibro({  }) {
    try {

        let sql = `

        SELECT id,tipolibro FROM tipolibro WHERE activo=1
        
     `;
        console.log(sql)
        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        console.log(list)
        if (!list) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }
        return list ;
    }
    catch (err) {
        throw err;
    }
}

