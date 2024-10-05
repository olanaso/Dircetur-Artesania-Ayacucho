import { baseUrl, getDataFromLocalStorage } from '../utils/config';

export async function getprogramasbyIESTP (iestpid) {
  try {

    const myHeaders = new Headers();
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch(baseUrl + "/api/listarProgramasIESTP?iestpid=" + iestpid, requestOptions);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log('error', error);
  }

}




export async function buscarArtesano (filtro) {

  try {
    const params = new URLSearchParams(filtro);
    const response = await fetch(baseUrl + `/artesanos?${params}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al buscar las artesano:", error);
  }
}





export async function deleteArtesano (usuario) {
  const settings = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(usuario),
  };

  try {
    const response = await fetch(baseUrl + "/artesano", settings);
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error:", error);
  }
}





