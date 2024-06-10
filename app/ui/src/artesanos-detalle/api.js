import { baseUrl,baseUrldni, getDataFromLocalStorage } from '../utils/config';

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

 

export async function buscarDNI(dni){
  try {
      
      const myHeaders = new Headers();
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
  
      const response = await fetch(baseUrldni+"/dni/"+dni, requestOptions);
      const result = await response.json();

      return result;
    } catch (error) {
      console.log('error', error);
    }

}


 

export async function buscarArtesano(filtro) {
  
  try {
      const params = new URLSearchParams(filtro);
      const response = await fetch(baseUrl + `/artesanos?${params}`);
      const result = await response.json();
      return result;
  } catch (error) {
      console.error("Error al buscar las Artesano:", error);
  }
}


export async function guardarArtesano(artesano) {
  if (artesano.artesanoId != 0) {
    artesano.id = artesano.artesanoId;
  } 

  const settings = {
      method: "POST",
      headers: {
          "Content-Type": "application/json", // Cambiado a JSON
      },
      body: JSON.stringify(artesano), // Convertir objeto a JSON
  };

  try {
      const response = await fetch(baseUrl + "/artesano/save/", settings);
      const data = await response.json();
      return data; // Ahora data contiene el ID del objeto creado y otros datos
  } catch (error) {
      console.error("Error:", error);
  }
}

export async function guardarUsuario(usuario) {
  if (usuario.usuarioid != 0) {
    usuario.id = usuario.usuarioid;
  } 

  const settings = {
      method: "POST",
      headers: {
          "Content-Type": "application/json", // Cambiado a JSON
      },
      body: JSON.stringify(usuario), // Convertir objeto a JSON
  };

  try {
      const response = await fetch(baseUrl + "/usuario_save/", settings);
      const data = await response.json();
      return data; // Ahora data contiene el ID del objeto creado y otros datos
  } catch (error) {
      console.error("Error:", error);
  }
}


export async function geteditarArtesano(id){
  try {
      
      const myHeaders = new Headers();
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
  
      const response = await fetch(baseUrl+"/artesano/"+id, requestOptions);
      const result = await response.json();

      return result;
    } catch (error) {
      console.log('error', error);
    }

}


export async function geteditarLogin(id){
  try {
      
      const myHeaders = new Headers();
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
  
      const response = await fetch(baseUrl+"/usuario/"+id, requestOptions);
      const result = await response.json();

      return result;
    } catch (error) {
      console.log('error', error);
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