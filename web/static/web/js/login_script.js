import {obtenerUser, Registro} from "./consulta-api-usuarios.js";

let btnSignUp = document.getElementById("signup");
let btnLogin = document.getElementById("login");

let LoginHTML = document.getElementById("BtnLogin");

btnSignUp.addEventListener("click", function () {
    let signupUser = document.getElementById("signup_user").value;
    let signupEmail = document.getElementById("signup_email").value;
    let signupPass = document.getElementById("signup_password").value;

    if (signupUser === "") {
        Swal.fire({
            title: "Falta información!",
            text: "Agrega el nombre usuario",
            icon: "warning",
        });
        return;
    } else if (signupEmail === "") {
        Swal.fire({
            title: "Falta información!",
            text: "Agrega el correo electronico",
            icon: "warning",
        });
        return;
    } else if (signupPass === "") {
        Swal.fire({
            title: "Falta información!",
            text: "Digite la clave",
            icon: "warning",
        });
        return;
    } else if(signupEmail != "" && signupPass != "" && signupUser != ""){
        console.log("va");

            let datos = {
                usuario: signupUser,
                clave: signupPass,
                correo: signupEmail
            } 
            console.log(datos);

            let newUser = JSON.stringify(datos);
            console.log(newUser.nombre);

            Registro(newUser)
            .then(newUser => {
                location.href = "./index.html";
            })
      }
});

btnLogin.addEventListener("click", function () {
  console.log("pushado");
    let logEmail = document.getElementById("login_email").value;
    let logPass = document.getElementById("login_password").value;
    console.log("comeinza validacon");
    if (logEmail === "") {
        Swal.fire({
            title: "Falta información!",
            text: "Agrega el correo electronico",
            icon: "warning",
        });
        return;
    } else if (logPass === "") {
        Swal.fire({
            title: "Falta información!",
            text: "Digite la clave",
            icon: "warning",
        });
        return;
     }
    else if(logPass != "" && logEmail != "" ){
      console.log("va");
      obtenerUser()
          .then(users=>{
            const foundUser = users.find(user => user.correo === logEmail && user.clave === logPass);
            if (typeof(foundUser) === 'undefined') {
                Swal.fire({
                    title: "¡Clave o Correo incorrecto!",
                    text: "",
                    icon: "error"
                  });
            }else{
                Swal.fire({
                    title: "¡Inicio de Sesión exitoso!",
                    text: "",
                    icon: "success",
                    showConfirmButton: false,
                  });
                    setTimeout(function () {
                        location.href = "./index.html";
                    }, 1000);
                    return;
            }
          })
          .catch((error) => console.log(`${typeof(error)}`));
    }
});
