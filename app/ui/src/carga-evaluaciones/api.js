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


export async function getusuarioDNI(dni){
    try {
        
        const myHeaders = new Headers();
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
    
        const response = await fetch(baseUrl+"/api/usuario_dni?dni="+dni, requestOptions);
        const result = await response.json();

        return result;
      } catch (error) {
        console.log('error', error);
      }

}

export async function getusuariocurso(dni){
    try {
        
        const myHeaders = new Headers();
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
    
        const response = await fetch(baseUrl+"/api/usuario_dni?dni="+dni, requestOptions);
        const result = await response.json();

        return result;
      } catch (error) {
        console.log('error', error);
      }

}




export async function saveUser (usuario) {
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
        const response = await fetch(baseUrl + "/api/usuario_save", settings);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error:", error);
    }
}



export async function deleteUser (usuario) {
    const settings = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(usuario),
    };

    try {
        const response = await fetch(baseUrl + "/api/usuario", settings);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error:", error);
    }
}


export async function importarNotas (listanotas) {
    console.log(listanotas)
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:  JSON.stringify({ listanotas }),
    };

    try {

       // const response = await fetch(baseUrl + "/api/importarUsuarios", settings);
        const response = await fetch(baseUrl + "/api/importarNotas", settings);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error:", error);
    }
}
