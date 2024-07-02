/**
 * Exporta datos a un archivo XLSX.
 *
 * Esta función toma un conjunto de datos en formato JSON, los convierte en un objeto GeoJSON,
 * y luego los exporta a un archivo XLSX con el nombre especificado.
 *
 * @param {Array} data - El conjunto de datos a exportar. Debe ser un arreglo de objetos JSON.
 * @param {string} reportfilename - El nombre del archivo XLSX que se generará, sin la extensión.
 *
 * El proceso sigue los siguientes pasos:
 * 1. Convierte el conjunto de datos JSON en un objeto GeoJSON utilizando una consulta SQL de alasql.
 * 2. Configura las opciones para la hoja de cálculo, especificando el nombre de la hoja ('Reporte') y
 *    que debe incluir encabezados.
 * 3. Exporta los datos a un archivo XLSX utilizando otra consulta SQL de alasql, aplicando las opciones
 *    configuradas y los datos convertidos.
 *
 * Ejemplo de uso:
 * const data = [
 *   { id: 1, nombre: 'Juan', edad: 30 },
 *   { id: 2, nombre: 'María', edad: 25 }
 * ];
 * const filename = 'ReporteUsuarios';
 * createXLS(data, filename);
 *
 * Este ejemplo generará un archivo 'ReporteUsuarios.xlsx' con los datos proporcionados.
 */
export function createXLS (data, reportfilename, query='SELECT * FROM') {
    var resultgeojson = alasql(query+` ? `, [data]);
    var opts = [{
      sheetid: 'Reporte',
      headers: true
    }];
    var res = alasql(`SELECT INTO XLSX("${reportfilename}.xlsx",?) FROM ?`, [opts, [resultgeojson]]);
  }
  