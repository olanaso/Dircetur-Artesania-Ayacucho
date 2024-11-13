// File: app/ui/src/lista-artesanos/api.js
import { baseUrl } from "../../utils/config";

export async function loginCliente(usuario, clave) {
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
    const response = await fetch(baseUrl + "/v1/login-clientes", settings);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
