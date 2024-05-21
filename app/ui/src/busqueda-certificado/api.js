import { baseUrl } from '../utils/config'


export async function buscarCertificados (search) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(baseUrl + "/api/" + `search?search=${encodeURIComponent(search)}`, requestOptions);

    // Si esperas un JSON en la respuesta, usa response.json() en vez de response.text()
    const result = await response.json();

    //console.log(result);

    // Si necesitas retornar los resultados para ser usados posteriormente
    return result;
  } catch (error) {
    console.error("Error al buscar los certificados:", error);

    // Si necesitas que la función arroje el error hacia el código que la llame
    throw error;
  }
}