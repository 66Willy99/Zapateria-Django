let btnEnviar = document.getElementById("enviar");

btnEnviar.addEventListener("click", function(){
    console.log('presionado');
    let contactUser = document.getElementById("contact_name").value;
    let contactEmail = document.getElementById("contact_email").value;
    let contactNumber =  document.getElementById("contact_number").value;
    let contactText =  document.getElementById("contact_text").value;

    if(contactUser===""){
        Swal.fire({
            title: "Falta información!",
            text: "Agrega el nombre",
            icon: "warning"
          });
          return;
    }
    else if(contactEmail===""){
        Swal.fire({
            title: "Falta información!",
            text: "Agrega el correo electronico",
            icon: "warning"
          });
          return;
    }
    else if(contactNumber===""){
        Swal.fire({
            title: "Falta información!",
            text: "Agrega el numero de telefono",
            icon: "warning"
          });
          return;
    }
    else if(contactText===""){
        Swal.fire({
            title: "Falta información!",
            text: "Agrege un mensaje",
            icon: "warning"
          });
          return;
    }
    else{
        Swal.fire({
            title: "¡Envio exitoso!",
            text: "",
            icon: "success",
            showConfirmButton: false
          });
          setTimeout(function() {
            location.href = "./index.html";
          }, 2000);
          return; 
    }
});