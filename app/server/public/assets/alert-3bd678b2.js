class x{constructor(){this.injectCSS()}injectCSS(){const t=document.createElement("style");t.innerHTML=`
         
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
        `,document.head.appendChild(t)}createAlertDialog(t,p,u,c="Aceptar",f,s,m=!1){const d=document.createElement("div");d.className="ideas_modal ideas_alert-"+t,d.style.display="flex";const a=document.createElement("div");a.className="ideas_modal-content";const r=document.createElement("div");r.className="ideas_modal-header",r.innerText=p;const i=document.createElement("div");i.className="ideas_modal-body",i.innerText=u;let e;t==="prompt"&&(e=document.createElement("input"),e.type="text",e.style.width="100%",e.style.marginTop="10px",m&&(e.required=!0),i.appendChild(e));const n=document.createElement("div");if(n.className="ideas_modal-footer",t==="confirm"||t==="prompt"){const o=document.createElement("button");o.className="ideas_cancel-btn",o.innerText=c,o.onclick=()=>{document.body.removeChild(d)},n.appendChild(o);const l=document.createElement("button");l.className="ideas_continue-btn",l.innerText=f,l.onclick=()=>{if(t==="prompt"){if(m&&!e.value.trim()){e.style.border="1px solid red";return}s(e.value)}else s();document.body.removeChild(d)},n.appendChild(l)}else{const o=document.createElement("button");o.className="ideas_cancel",o.innerText=c,o.onclick=()=>{document.body.removeChild(d)},n.appendChild(o)}a.appendChild(r),a.appendChild(i),a.appendChild(n),d.appendChild(a),document.body.appendChild(d)}}export{x as A};
