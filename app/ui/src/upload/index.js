import { FileUploader } from '../utils/upload.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeFileUploader({
        fileInputId: 'myfile',
        progressBarId: 'progressBar',
        statusElementId: 'status',
        uploadUrl: 'http://localhost:3001/api/fileupload2',
        callback: handleUploadResponse
    });
});

function initializeFileUploader ({ fileInputId, progressBarId, statusElementId, uploadUrl, callback }) {

    const fileInput = document.getElementById(fileInputId);
    const inputName = fileInput.name;
    const progressBar = document.getElementById(progressBarId);
    const statusElement = document.getElementById(statusElementId);

    if (fileInput && progressBar && statusElement) {
        const uploader = new FileUploader(uploadUrl, progressBar, statusElement, callback, inputName);
        uploader.attachToFileInput(fileInput);
    } else {
        console.error('Initialization failed: One or more elements not found.');
    }
}

function handleUploadResponse (response) {
    // Manejar la respuesta del servidor
    console.log('Server response:', response);
    alert('registro correcto')
    // Ejemplo: Usar el resultado en otro lugar
    // document.getElementById('someElement').innerText = response.someValue;
}
