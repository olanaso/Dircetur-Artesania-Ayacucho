import { baseUrl, getDataFromLocalStorage } from '../utils/config';

export async function getprogramasbyIESTP(iestpid){
    try {
        
        const myHeaders = new Headers();
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
    
        const response = await fetch(baseUrl+"/api/listarProgramasIESTP?iestpid="+iestpid, requestOptions);
        const result = await response.json();

        return result;
      } catch (error) {
        console.log('error', error);
      }

}


/*export async function buscarProducto (search) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  try {
    const response = await fetch(baseUrl+"/api/producto/buscar" + `search?search=${encodeURIComponent(search)}`, requestOptions);

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
}*/

 

export async function buscarProducto(filtro) {
  
  try {
      const params = new URLSearchParams(filtro);
      const response = await fetch(baseUrl + `/productoartesano?${params}`);
      const result = await response.json();
      return result;
  } catch (error) {
      console.error("Error al buscar las producto:", error);
  }
}

export async function deleteProducto (usuario) {
  const settings = {
      method: "DELETE",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(usuario),
  };

  try {
      const response = await fetch(baseUrl + "/producto", settings);
      const data = await response.json();
      return data
  } catch (error) {
      console.error("Error:", error);
  }
}







export async function getusuariocapacitacion(dni){
  try {
      
      const myHeaders = new Headers();
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
  
      const response = await fetch(baseUrl+"/api/nota/"+dni, requestOptions);
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

export async function saveUserCapacitacion (usuario) {
  if(usuario.programaid==0){
      usuario.programaid=null;
  }

  const settings = {
      method: "POST",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(usuario),
  };

  try {
      const response = await fetch(baseUrl + "/api/nota_save", settings);
      const data = await response.json();
      return data
  } catch (error) {
      console.error("Error:", error);
  }
}


export async function nuevoUserCapacitacion (usuario) {
  if(usuario.programaid==0){
      usuario.programaid=null;
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