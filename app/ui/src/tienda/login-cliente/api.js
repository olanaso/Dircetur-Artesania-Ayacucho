// File: app/ui/src/lista-artesanos/api.js
import { baseUrl } from "../../utils/config";

export async function loginCliente(email, clave) {
  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ email, clave}),
  };

  try {
    const response = await fetch(baseUrl + "/v1/login-clientes", settings);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export const registerCliente = async (data) => {
  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(baseUrl + "/cliente", settings);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export const recuperarCuenta = async (email) => {
  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  };

  try {
    const response = await fetch(baseUrl + "/recuperarcuenta", settings);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
