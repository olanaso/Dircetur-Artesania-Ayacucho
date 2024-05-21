const models = require('../../models/usuario');

module.exports = {

    obtenerUsuarioToken,listarUsuaRoles,listarProgIESTP,listarProgramasIESTP,
    reporteUsuarios,reporteLibros,reporteaccesos,listarProgramasIESTPSelecionado
}

async function obtenerUsuarioToken ({ dni }) {
    try {

        let sql = `
            select * from usuario where dni=${dni}
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
        return { list };
    }
    catch (err) {
        throw err;
    }
}

async function listarProgIESTP(iestpid ) {
    try {
        let sql = `
        select b.* from iestp_programa a inner join programas b on a.progid=b.id 
        where a.iestpid=${iestpid}
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


async function listarUsuaRoles() {
    try {
        let sql = `
        SELECT * from rol
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




async function listarProgramasIESTP(iestpid) {
    try {
        let sql = `
        SELECT a.*, CASE WHEN b.id IS NULL THEN 0 ELSE 1 END seleccionado 
        FROM programas a inner JOIN (SELECT * FROM iestp_programa WHERE iestpid=${iestpid}) b ON a.id=b.progid order by a.id
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
        return  list;
    }
    catch (err) {
        throw err;
    }
}




async function listarProgramasIESTPSelecionado(iestpid) {
    try {
        let sql = `
        SELECT a.*, CASE WHEN b.id IS NULL THEN 0 ELSE 1 END seleccionado 
        FROM programas a LEFT JOIN (SELECT * FROM iestp_programa WHERE iestpid=${iestpid}) b ON a.id=b.progid order by a.id
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
        return  list;
    }
    catch (err) {
        throw err;
    }
}


async function reporteUsuarios(iestpid) {
    try {
        let sql = `
        SELECT c.denominacion progrograma, a.*,d.denominacion rol FROM usuario a inner join iestps b on b.id=a.iestpid left join programas c on a.programaid=c.id inner join rol d on a.rolid=d.id where 
        b.id=${iestpid} order by c.denominacion,a.apellidos,a.nombres

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
        return  list;
    }
    catch (err) {
        throw err;
    }
}



async function reporteLibros(iestpid) {
    try {
        let sql = `
        select c.denominacion programa, a.id, a.titulo,a.autores,a.editorial,a.nropaginas,a.tomo,a.isbn,a.resenia,a.ref_apa7
        ,a.ref_ieee,a.ref_vancuver,a.ref_iso,a.temas
        ,a.url_portada, (SELECT FLOOR(AVG(valor)) FROM valoracion where libroid=a.id ) valor from libro a inner join libro_programa b on a.id=b.libro_id inner join programas c on c.id=b.programa_id inner join iestp_programa d on d.progid=c.id 
        where d.iestpid=${iestpid} order by programa,a.titulo
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
        return  list;
    }
    catch (err) {
        throw err;
    }
}

async function reporteaccesos(iestpid,fechaini,fechafin) {
    try {
        let sql = `
        SELECT * FROM accesos WHERE iestpid=${iestpid} and (createdat >='${fechaini}' and createdat <= '${fechafin}')

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
        return  list;
    }
    catch (err) {
        throw err;
    }
}




