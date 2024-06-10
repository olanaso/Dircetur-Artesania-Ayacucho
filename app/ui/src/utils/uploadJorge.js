export class FileUploader {
    constructor(uploadUrl, progressBar, statusElement, callback, inputName, folder){
        this.uploadUrl = uploadUrl;
        this.progressBar = progressBar;
        this.statusElement = statusElement;
        this.callback = callback;
        this.inputName = inputName;
        this.folder = folder; //guarda valor de folder
    }

    attachToFileInput (fileInput) {
        fileInput.addEventListener('change', (event) => this.handleFileSelection(event));
    }

    handleFileSelection (event) {
        const file = event.target.files[0];
        if (!file) return;

        this.resetProgressBar();
        this.uploadFile(file)
            .then(response => this.handleResponse(response))
            .catch(error => this.handleError(error));
    }

    resetProgressBar () {
        this.progressBar.value = 0;
        this.statusElement.innerText = 'Starting upload...';
    }

    async uploadFile (file) {
        const formData = new FormData();

        let sinputName = this.inputName
        formData.append(sinputName, file);
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (event) => this.updateProgress(event));
            xhr.addEventListener('load', () => this.handleLoad(xhr, resolve, reject));
            xhr.addEventListener('error', () => reject('Upload failed!'));
            xhr.addEventListener('abort', () => reject('Upload canceled!'));

            const uploadUrlWithParams = `${this.uploadUrl}?inputName=${sinputName}&folder=${this.folder}`; // <-- Incluir folder en la URL
            xhr.open('POST', uploadUrlWithParams, true);
            xhr.send(formData);
        });
    }

    updateProgress (event) {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            this.progressBar.value = percentComplete;
            this.statusElement.innerText = `Upload progress: ${Math.round(percentComplete)}%`;
        }
    }

    handleLoad (xhr, resolve, reject) {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
        } else {
            reject(`Upload failed! Server responded with status: ${xhr.status}`);
        }
    }

    handleResponse (response) {
        this.statusElement.innerText = `Upload complete! Server response: ${response.message}`;
        if (this.callback) {
            this.callback(response);
        }
    }

    handleError (error) {
        this.statusElement.innerText = `Error: ${error}`;
    }
}