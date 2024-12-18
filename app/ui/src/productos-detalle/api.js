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


export async function listarArtesanosCombo (filtro) {

  try {
    //  const params = new URLSearchParams(filtro);
    const response = await fetch(baseUrl + `/artesanos-combo`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al buscar las artesano:", error);
  }
}




export async function buscarProducto (filtro) {

  try {
    const params = new URLSearchParams(filtro);
    const response = await fetch(baseUrl + `/productos?${params}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al buscar las producto:", error);
  }
}


export async function guardarProducto (producto) {
  if (producto.productId != 0) {
    producto.id = producto.productId;
  }

  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Cambiado a JSON
    },
    body: JSON.stringify(producto), // Convertir objeto a JSON
  };

  try {
    const response = await fetch(baseUrl + "/producto/save", settings);
    const data = await response.json();
    return data; // Ahora data contiene el ID del objeto creado y otros datos
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function geteditarproducto (id) {
  try {

    const myHeaders = new Headers();
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch(baseUrl + "/producto/" + id, requestOptions);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log('error', error);
  }

}



export async function lstcategoria () {
  try {

    const myHeaders = new Headers();
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch(baseUrl + "/categoria", requestOptions);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log('error', error);
  }

}






export async function buscarartesanoDNI (dni) {
  try {

    const myHeaders = new Headers();
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch(baseUrl + "/artesano-dni/" + dni, requestOptions);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log('error', error);
  }

}
export async function buscarartesanoid (id) {
  try {

    const myHeaders = new Headers();
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch(baseUrl + "/artesano/" + id, requestOptions);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log('error', error);
  }

}





export async function getusuariocapacitacion (dni) {
  try {

    const myHeaders = new Headers();
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch(baseUrl + "/api/nota/" + dni, requestOptions);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log('error', error);
  }

}

export async function deleteUserCapacitacion (usuario) {
  const settings = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(usuario),
  };

  try {
    const response = await fetch(baseUrl + "/api/nota", settings);
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error:", error);
  }
}





export async function nuevoUserCapacitacion (usuario) {
  if (usuario.programaid == 0) {
    usuario.programaid = null;
  }

  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(usuario),
  };

  try {
    const response = await fetch(baseUrl + "/api/nota", settings);
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error:", error);
  }
}