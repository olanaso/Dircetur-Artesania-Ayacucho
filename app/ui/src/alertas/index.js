import { AlertDialog } from "../utils/alert";
const alertDialog = new AlertDialog();

document.getElementById('showSimpleAlertBtn').addEventListener('click', function () {
    alertDialog.createAlertDialog(
        'simple',
        'Simple Alert',
        'This is a simple alert message.',
        'Aceptar',
        'Cerrar',
        () => { }
    );
});

document.getElementById('showSuccessAlertBtn').addEventListener('click', function () {
    alertDialog.createAlertDialog(
        'success',
        'Success Alert',
        'This is a success alert message.',
        'Aceptar',
        'Cerrar',
        () => { }
    );
});

document.getElementById('showInfoAlertBtn').addEventListener('click', function () {
    alertDialog.createAlertDialog(
        'info',
        'Info Alert',
        'This is an informational alert message.',
        'Aceptar',
        'Cerrar',
        () => { }
    );
});

document.getElementById('showWarningAlertBtn').addEventListener('click', function () {
    alertDialog.createAlertDialog(
        'warning',
        'Warning Alert',
        'This is a warning alert message.',
        'Aceptar',
        'Cerrar',
        () => { }
    );
});

document.getElementById('showErrorAlertBtn').addEventListener('click', function () {
    alertDialog.createAlertDialog(
        'error',
        'Error Alert',
        'This is an error alert message.',
        'Aceptar',
        'Cerrar',
        () => { }
    );
});

document.getElementById('showPromptAlertBtn').addEventListener('click', function () {
    alertDialog.createAlertDialog(
        'prompt',
        'Prompt Alert',
        'Are you sure you want to proceed?',
        'Cancel',
        'Continue',
        (inputValue) => {
            alert('Input Value: ' + inputValue);
        },
        true
    );
});

document.getElementById('confirmAlertBtn').addEventListener('click', function () {
    alertDialog.createAlertDialog(
        'confirm',
        'Confirm Alert',
        'Are you sure you want to proceed?',
        'Cancel',
        'Continue',
        (inputValue) => {
            alert('Continua ');
        }
    );
});