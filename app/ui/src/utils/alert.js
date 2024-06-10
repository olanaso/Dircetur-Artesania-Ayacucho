export class AlertDialog {
    constructor() {
        this.injectCSS();
    }

    injectCSS () {
        const style = document.createElement('style');
        style.innerHTML = `
         
          .ideas_modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.4);
            justify-content: center;
            align-items: center;
          }

          .ideas_modal-content {
            background-color: #fff;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 500px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            animation: ideas_fadeIn 0.5s;
          }

          @keyframes ideas_fadeIn {
            from {opacity: 0;}
            to {opacity: 1;}
          }

          .ideas_modal-header {
            font-size: 1.25em;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .ideas_modal-body {
            margin-bottom: 20px;
            font-size: 1em;
            color: #666;
          }

          .ideas_modal-footer {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
          }

          .ideas_modal-footer button {
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          .ideas_cancel-btn {
            background-color: #f0f0f0;
            color: #000;
          }

          .ideas_continue-btn {
            background-color: #000;
            color: #fff;
          }

          .ideas_cancel-btn:hover,
          .ideas_continue-btn:hover {
            opacity: 0.8;
          }

          .ideas_alert-success .ideas_modal-content {
            border-left: 5px solid #4CAF50;
          }

          .ideas_alert-info .ideas_modal-content {
            border-left: 5px solid #2196F3;
          }

          .ideas_alert-warning .ideas_modal-content {
            border-left: 5px solid #ff9800;
          }

          .ideas_alert-error .ideas_modal-content {
            border-left: 5px solid #f44336;
          }
        `;
        document.head.appendChild(style);
    }

    createAlertDialog (type, headerText, bodyText, cancelText = 'Aceptar', continueText, onContinue, isRequired = false) {
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'ideas_modal ideas_alert-' + type;
        modal.style.display = 'flex';

        const modalContent = document.createElement('div');
        modalContent.className = 'ideas_modal-content';

        const modalHeader = document.createElement('div');
        modalHeader.className = 'ideas_modal-header';

        modalHeader.innerText = headerText;

        const modalBody = document.createElement('div');
        modalBody.className = 'ideas_modal-body';
        modalBody.innerText = bodyText;

        let inputField;
        if (type === 'prompt') {
            inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.style.width = '100%';
            inputField.style.marginTop = '10px';
            if (isRequired) {
                inputField.required = true;
            }
            modalBody.appendChild(inputField);
        }

        const modalFooter = document.createElement('div');
        modalFooter.className = 'ideas_modal-footer';

        if (type === 'confirm' || type === 'prompt') {
            const cancelButton = document.createElement('button');
            cancelButton.className = 'ideas_cancel-btn';
            cancelButton.innerText = cancelText;
            cancelButton.onclick = () => {
                document.body.removeChild(modal);
            };
            modalFooter.appendChild(cancelButton);

            const continueButton = document.createElement('button');
            continueButton.className = 'ideas_continue-btn';
            continueButton.innerText = continueText;
            continueButton.onclick = () => {
                if (type === 'prompt') {
                    if (isRequired && !inputField.value.trim()) {
                        inputField.style.border = '1px solid red';
                        return;
                    }
                    onContinue(inputField.value);
                } else {
                    onContinue();
                }
                document.body.removeChild(modal);
            };
            modalFooter.appendChild(continueButton);
        } else {
            const closeButton = document.createElement('button');
            closeButton.className = 'ideas_cancel';
            closeButton.innerText = cancelText;
            closeButton.onclick = () => {
                document.body.removeChild(modal);
            };
            modalFooter.appendChild(closeButton);
        }

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);

        modal.appendChild(modalContent);

        document.body.appendChild(modal);
    }
}