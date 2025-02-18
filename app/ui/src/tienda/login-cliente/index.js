import { loadPartials } from "../../utils/viewpartials.js";
import { custom, menuselec } from "../utils/common.js";
import { loginCliente, recuperarCuenta, registerCliente } from "./api.js";
import { AlertDialog } from "../../utils/alert";
const alertDialog = new AlertDialog();

(async function () {
  let partials = [
    { path: "../partials/tienda/header.html", container: "header" },
    { path: "../partials/tienda/footer.html", container: "footer" },
  ];
  try {
    await loadPartials(partials);

    custom();
    menuselec();

    console.log("Las vistas parciales se han cargado correctamente!");

    startApp();
  } catch (e) {
    console.error(e);
  }
})();

function startApp() {
  login();
  recovery();
  register();
}

const login = () => {
  // Obtener los elementos del formulario
  const emailInput = document.getElementById("correo");
  const passwordInput = document.getElementById("password");
  const loginForm = document.getElementById("loginForm");

  const loader = document.getElementById("loader");

  // Agregar un event listener al formulario
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevenir el envío del formulario

    const isValid = validateLoginForm();

    if (!isValid) {
      return;
    }

    loader.style.display = "block";

    // Obtener los valores de los campos de entrada
    const email = emailInput.value;
    const password = passwordInput.value;

    const resp = await loginCliente(email, password);

    if (resp.error) {
      loader.style.display = "none";
      console.log("Error login:", resp.error);
      alert(resp.error);
    } else {
      loader.style.display = "none";
      localStorage.setItem("token", resp.token);
      localStorage.setItem("id", resp.id);
      localStorage.setItem("idCliente", resp.idCliente);
      window.location.href = "/tienda/index.html";
    }
  });
};

const register = () => {
  const loaderRegistro = document.getElementById("loaderRegistro");

  document
    .getElementById("registerForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault(); // Evitar el envío tradicional del formulario

      // Mostrar el loader
      loaderRegistro.style.display = "block";

      // Obtener los valores del formulario
      const tipoDocumento = document.getElementById("tipoDocumento").value;
      const dni = document.getElementById("dni").value;
      const nombres = document.getElementById("nombres").value;
      const apellidos = document.getElementById("apellidos").value;
      const correo = document.getElementById("correoRegistro").value;
      const telefono = document.getElementById("telefono").value
        ? document.getElementById("countryCode").value +
          document.getElementById("telefono").value
        : "";
      const pais = document.getElementById("pais").value;
      const region = document.getElementById("region").value;
      const ciudad = document.getElementById("ciudad").value;
      const direccion_envio = document.getElementById("direccion_envio").value;

      // Construir el objeto de datos en el formato solicitado
      const datos = {
        datosusuario: {
          usuario: dni,
          nombre: nombres,
          apellidos: apellidos,
          nombre_completo: `${nombres} ${apellidos}`,
          correo: correo,
          createdat: new Date().toISOString(), // Usar la fecha actual
          updatedat: new Date().toISOString(),
        },
        datoscliente: {
          nombres: nombres,
          apellidos: apellidos,
          correo: correo,
          telefono: telefono,
          direccion: direccion_envio,
          pais: pais,
          region: region,
          ciudad: ciudad,
          tipo_documento: tipoDocumento,
          numero_documento: dni,
          direccion_envio: direccion_envio,
          foto_perfil: "", // Este campo está vacío según el formato dado
        },
      };

      try {
        const data = await registerCliente(datos);

        if (data.error) {
          throw new Error(data.error || "Error en el registro");
        }

        document.getElementById("registerForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        alert(
          "Registro exitoso, su contraseña es su DNI. Para cambiarla, por favor, ve a la recuperacion de contraseña."
        );
      } catch (error) {
        console.error("Error:", error);
        alert(error.message);
      } finally {
        loaderRegistro.style.display = "none";
      }
    });
};

const recovery = () => {
  const recoveryForm = document.getElementById("recoveryForm");

  const emailInput = document.getElementById("correoRecuperar");
  const emailError = document.getElementById("emailErrorRecuperar");
  const loaderRecuperar = document.querySelector("#loaderRecuperar");

  recoveryForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const isValid = validateRecoveryForm();

    if (!isValid) {
      return;
    }

    loaderRecuperar.style.display = "block";

    const email = emailInput.value;

    const result = await recuperarCuenta(email);
    loaderRecuperar.style.display = "none";

    if (result.isRecuperado) {
      document.getElementById("recoveryForm").style.display = "none";
      document.getElementById("loginForm").style.display = "block";

      alertDialog.createAlertDialog(
        "success",
        "Mensaje",
        "Las credenciales han sido enviadas a su correo.",
        "Aceptar",
        "Cerrar",
        () => {}
      );
    } else {
      emailError.textContent =
        result.message || "Error al recuperar la contraseña.";
    }
  });
};

function validateLoginForm() {
  console.log("Validating login form");
  const email = document.getElementById("correo").value;
  const password = document.getElementById("password").value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  if (!emailPattern.test(email)) {
    emailError.textContent = "Por favor, ingrese un correo electrónico válido.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  if (password.length < 6) {
    passwordError.textContent =
      "La contraseña debe tener al menos 6 caracteres.";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  return isValid;
}

function validateRegisterForm() {
  console.log("Validating register form");
  const email = document.getElementById("correoRegistro").value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  const emailError = document.getElementById("emailErrorRegistro");

  if (!emailPattern.test(email)) {
    emailError.textContent = "Por favor, ingrese un correo electrónico válido.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  return isValid;
}

function validateRecoveryForm() {
  console.log("Validating recovery form");
  const email = document.getElementById("correoRecuperar").value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  const emailError = document.getElementById("emailErrorRecuperar");

  if (!emailPattern.test(email)) {
    emailError.textContent = "Por favor, ingrese un correo electrónico válido.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  return isValid;
}
