function n(){console.log("modificarNavbarSegunRol function called");try{const o=localStorage.getItem("rol");if(!o)throw new Error("User role not found in localStorage user");if(o==="3"){const e=document.getElementById("user-icon");e&&(e.style.display="block");const r=document.querySelector('li:has(a[href="login-cliente.html"])');r&&(r.style.display="none")}}catch(o){console.error("Error in modificarNavbarSegunRol:",o)}}function t(){localStorage.removeItem("rol"),window.location.href="/login-cliente.html"}document.addEventListener("DOMContentLoaded",()=>{n()});export{t as c,n as m};