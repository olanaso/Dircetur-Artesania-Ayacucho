export function showToast(mensaje) {
    // Crear el elemento del toast
    const toastElement = document.createElement("div");
    toastElement.className = "toast-bi";
    toastElement.textContent = mensaje;

    // Agregar el toast al cuerpo del documento
    document.body.appendChild(toastElement);

    // Eliminar el toast después de un tiempo (por ejemplo, 3 segundos)
    setTimeout(() => {
      toastElement.remove();
    }, 3000);
  }