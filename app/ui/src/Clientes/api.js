import { baseUrl, getDataFromLocalStorage } from "../utils/config";

export async function listarClientes(page, limit) {
  try {
    const response = await fetch(
      `${baseUrl}/cliente?page=${page}&limit=${limit}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al encontrar las clientes:", error);
    throw error;
  }
}

export async function filtrarClientes(filtro) {
  try {
    const params = new URLSearchParams(filtro);
    const response = await fetch(baseUrl + `/clientes?${params}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al buscar las clientes:", error);
    throw error;
  }
}

export async function borrarCliente(id) {
  console.log({ id });
  try {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    };

    console.log(baseUrl + "/cliente", requestOptions);

    const response = await fetch(`${baseUrl}/cliente/${id}`, requestOptions);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function actualizarCliente(id, data) {
  try {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(`${baseUrl}/cliente/${id}`, requestOptions);

    if (!response.ok) {
      throw new Error(
        `Error al actualizar la categoría: ${response.statusText}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Relanzar el error para manejo posterior
  }
}

export async function guardarcliente(data) {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(baseUrl + "/cliente", requestOptions);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function obtenerCliente(id) {
  try {
    const response = await fetch(baseUrl + `/cliente/${id}`, { method: "GET" });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export const resetearContraseniaCliente = async (clienteId, claveNueva) => {
  const settings = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ claveNueva }),
  };

  try {
    const response = await fetch(
      baseUrl + `/resetear-contrasenia-cliente/${clienteId}`,
      settings
    );

    if (!response.ok) {
      throw new Error(
        `Error al resetear la contraseña del cliente: ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log({ dataReset: data });
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
