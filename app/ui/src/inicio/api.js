import { baseUrl, getDataFromLocalStorage } from '../utils/config'
export async function checkSession () {

  const token = getDataFromLocalStorage('accessToken')
  console.log("primer", token)
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',

  }
  if (token) {
    headers['Authorization'] = 'Bearer ' + token
  }
  console.log("Headers", headers)
  const settings = {
    method: "POST",
    headers: headers,
    body: new URLSearchParams({
      token: token
    }),
  };
  console.log('fetch settings', settings)

  try {
    const response = await fetch(baseUrl + "/api/protegido", settings);
    const data = await response.json();
    console.log("El data del token", getDataFromLocalStorage('accessToken'))
    return data
  } catch (error) {
    console.log('Token:', getDataFromLocalStorage('accessToken'))
    console.error("Error:", error);
  }
}


export async function obtenerLibrosLeidosGuardados (usuario) {
  try {

    const myHeaders = new Headers();


    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch(baseUrl + "/api/libro-inicio?usuarioid=" + usuario.id, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('error', error);
  }



}




export async function getreportegeneral () {
  try {

    const myHeaders = new Headers();
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch(baseUrl + "/reportegeneral", requestOptions);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log('error', error);
  }

}



export async function obtenerEstadisticas () {
  try {

    const myHeaders = new Headers();


    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch(baseUrl + "/estadisticas-dashboard", requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('error', error);
  }



}

