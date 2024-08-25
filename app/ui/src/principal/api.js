import {baseUrl} from '../utils/config'
export async function login(usuario,clave){
    const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          usuario: usuario,
          clave: clave,
        }),
      };
    
      try {
        const response = await fetch(baseUrl+"/login", settings);
        const data = await response.json();
        return data
      } catch (error) {
        console.error("Error:", error);
      }
}

export async function listarSliders(page, limit) {
  try {
      const response = await fetch(`${baseUrl}/sliders?page=${page}&limit=${limit}`, { method: 'GET' });
      const result = await response.json();
      return result;
  } catch (error) {
      console.error('Error:', error);
  }
}

export async function listarCategorias() {
  try {
      const response = await fetch(`${baseUrl}/categoria`, { method: 'GET' });
      const result = await response.json();
      return result;
  } catch (error) {
      console.error('Error:', error);
  }
}

export async function listarProductosRecientes(filtro) {
    try {
        const params = new URLSearchParams(filtro);
        const response = await fetch(`${baseUrl}/prductosFiltrados?${params}`, { method: 'GET' });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}
