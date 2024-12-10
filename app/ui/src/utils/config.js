
//export const baseUrl = 'https://api-certificados.centrodegestion.org'; 
// export const baseUrl = 'http://148.113.196.34:80/api';

export const baseUrl = 'http://localhost:3002/api';
// export const baseUrl = 'https://app.artesaniasdeayacucho.pe/api';

export const urlSeguimientoPedido = 'http://localhost:4200/';
// export const urlSeguimientoPedido = 'https://seguimiento.artesaniasdeayacucho.pe/';

//export const baseUrl = 'https://fantastic-zebra-65wpjr4xvjh5xgv-3002.app.github.dev/api';
export const baseUrldni = 'https://dni.biblio-ideas.com/api';
/*Seccion de la llamda al wordpress*/
export const URL_GLOBAL = 'https://blog.artesaniasdeayacucho.pe/';
export const categoryNews = 4;
export const sizeNews = 10;

//} Function to save data in localStorage
export function saveDataToLocalStorage (key, data) {
  try {
    // Convert the data to a JSON string
    const dataJSON = JSON.stringify(data);
    // Save the data in localStorage with the given key
    localStorage.setItem(key, dataJSON);
    console.log(`Data with key "${key}" saved to localStorage.`);
  } catch (error) {
    console.error('Error while saving data to localStorage:', error);
  }
}


export function getBasePathWithPort () {
  const parsedUrl = new URL(baseUrl);
  // Si no hay un puerto explícito, utiliza el puerto por defecto según el protocolo
  const port = parsedUrl.port || (parsedUrl.protocol === 'https:' ? '443' : '80');
  return `${parsedUrl.protocol}//${parsedUrl.hostname}:${port}`;
}

export function getBaseUrl (url) {
  const urlObj = new URL(url);
  return `${urlObj.protocol}//${urlObj.hostname}:${urlObj.port}`;
}

// Function to get data from localStorage
export function getDataFromLocalStorage (key) {
  return JSON.parse(localStorage.getItem(key))
  // try {
  //   // Get the data from localStorage using the given key
  //   const dataJSON = localStorage.getItem(key);
  //
  //   // If the data exists, parse it from JSON back to an object
  //   if (dataJSON !== null) {
  //     const data = JSON.parse(dataJSON);
  //     return data;
  //   }
  //
  //   // If the data does not exist or if it's not a valid JSON, return null or handle accordingly
  //   return null;
  // } catch (error) {
  //   console.error('Error while getting data from localStorage:', error);
  //   return null;
  // }
}