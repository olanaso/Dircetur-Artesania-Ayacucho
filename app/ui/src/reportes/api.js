import { baseUrl, getDataFromLocalStorage } from '../utils/config';
/*
export async function reporteGeneral(tipo_reporte, atributos) {
    try {
        console.log(atributos)
        console.log(`${baseUrl}/reporte?reportType=${tipo_reporte} junto a los atributos: ${atributos}`)
        const response = await fetch(`${baseUrl}/reporte?reportType=${tipo_reporte}&attributes=${atributos}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error al encontrar las clientes:", error);
        throw error;
    }
}
*/
export async function reporteGeneral(tipo_reporte, atributos) {
    try {
        console.log(atributos)
        console.log(`${baseUrl}/reporte?reportType=${tipo_reporte}`)
        const response = await fetch(`${baseUrl}/reporte?reportType=${tipo_reporte}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error al encontrar las clientes:", error);
        throw error;
    }
}