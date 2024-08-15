import { baseUrl } from "../utils/config";



export async function obtenerArtesanoById(idArtesano) {
  try {
    const response = await fetch(`${baseUrl}/artesano/${idArtesano}`, {
      method: "GET",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function obtenerProducByArtesano(idArtesano) {
  try {
    const response = await fetch(`${baseUrl}/v1/productos/artesanos/${idArtesano}`, {
      method: "GET",
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}


