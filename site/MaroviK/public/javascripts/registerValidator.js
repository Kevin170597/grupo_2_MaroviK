

window.addEventListener("load", function(){
    const form = document.querySelector("form.formulario_register");

    const name = document.getElementById("name");
    const lastName = document.getElementById("lastName");
    const password = document.getElementById("password");
    const email = document.getElementById("email");
    const file = document.getElementById("inputAvatar");
    const avatarPreview = document.getElementById("avatarPreview")

    function readURL(file){
        if (file.files && file.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
            console.log(e.target.result)
            console.log(e.target.result.indexOf("image"))
            if(e.target.result.indexOf("image") == -1){
                avatarPreview.innerHTML = "<img src='/images/imageInvalid.png' alt=''>"
            }else {
                avatarPreview.innerHTML = "<img src='" + e.target.result + "'>"
                errorFile.innerHTML = ""
            }
            
            }
            reader.readAsDataURL(file.files[0]);
        }
    }
    file.addEventListener("change", function(){
        readURL(this);
    })

    const errorName = document.getElementById("errorName");
    const errorLastName = document.getElementById("errorLastName");
    const errorPassword = document.getElementById("errorPassword");
    const errorEmail = document.getElementById("errorEmail");
    const errorFile = document.getElementById("errorFile");

    let formatoValido = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;


    name.addEventListener("keyup", function(){
        if(name.value.length >= 2){
            errorName.innerHTML = '<i class="far fa-check-circle"></i>'
            name.style.border = "solid 1px green"
        }else if(name.value.length == 0){
            errorName.innerHTML = ""
            name.style.border = ""
        }
    })
    lastName.addEventListener("keyup", function(){
        if(lastName.value.length >= 2){
            errorLastName.innerHTML = '<i class="far fa-check-circle"></i>'
            lastName.style.border = "solid 1px green"
        }else if(lastName.value.length == 0){
            errorLastName.innerHTML = ""
            lastName.style.border = ""
        }
    })
    password.addEventListener("keyup", function(){
        if(password.value.length >= 8){
            errorPassword.innerHTML = '<i class="far fa-check-circle"></i>'
            password.style.border = "solid 1px green"
        }else if(password.value.length == 0){
            errorPassword.innerHTML = ""
            password.style.border = ""
        }
    })
    email.addEventListener("keyup", function(){
        if(formatoValido.test(email.value)){
            errorEmail.innerHTML = '<i class="far fa-check-circle"></i>'
            email.style.border = "solid 1px green"
        }else if(email.value.length == 0){
            errorEmail.innerHTML = ""
            email.style.border = ""
        }
    })


    form.addEventListener("submit", (e)=>{
        /*Validar que el input nombre no esté vacío y contenga al menos 2 caracteres*/
        let errorNameMessage = [];
        let errorNameCharacter = [];
        let OkNameMesagge = [];

        if(name.value === "" || name.value == null){
            errorNameMessage.push("Debe ingresar un nombre.")
        }else if(name.value != "" && name.value.length < 2){
            errorNameCharacter.push("Debe contener al menos 2 caracteres.")
        }else if(name.value != "" && name.value.length > 2){
            name.style.border = "solid 1px green"
            OkNameMesagge.push('<i class="far fa-check-circle"></i>')
        }

        if(OkNameMesagge.length > 0){
            errorName.innerHTML = OkNameMesagge.join();
        }

        if(errorNameMessage.length > 0){
            e.preventDefault();
            errorName.innerText = errorNameMessage.join();
            name.style.border = "solid 1px  rgb(225, 70, 49)"
        }
        if(errorNameCharacter.length > 0){
            e.preventDefault();
            errorName.innerText = errorNameCharacter.join();
            name.style.border = "solid 1px rgb(225, 70, 49)"
        }
        /*Validar que el input apellido no esté vacío y contenga al menos 2 caracteres*/
        let errorLastNameMessage = [];
        let errorLastNameCharacter = [];
        let OkLastNameMesagge = [];

        if(lastName.value === "" || lastName.value == null){
            errorLastNameMessage.push("Debe ingresar un apellido.")
        }else if(lastName.value != "" && lastName.value.length < 2){
            errorLastNameCharacter.push("Debe contener al menos 2 caracteres.")
        }else if(lastName.value != "" && lastName.value.length > 2){
            lastName.style.border = "solid 1px green"
            OkLastNameMesagge.push('<i class="far fa-check-circle"></i>')
        }

        if(OkLastNameMesagge.length > 0){
            errorLastName.innerHTML = OkLastNameMesagge.join();
        }

        if(errorLastNameMessage.length > 0){
            e.preventDefault();
            errorLastName.innerText = errorLastNameMessage.join();
            lastName.style.border = "solid 1px  rgb(225, 70, 49)"
        }
        if(errorLastNameCharacter.length > 0){
            e.preventDefault();
            errorLastName.innerText = errorLastNameCharacter.join();
            lastName.style.border = "solid 1px rgb(225, 70, 49)"
        }
        /*Validar que el input contraseña no esté vacío y contenga al menos 8 caracteres*/
        let errorPasswordMessage = [];
        let errorPasswordCharacter = [];
        let OkPasswordMesagge = [];

        if(password.value === "" || password.value == null){
            errorPasswordMessage.push("Debe ingresar una contraseña.")
        }else if(password.value != "" && password.value.length < 8){
            errorPasswordCharacter.push("Debe contener al menos 8 caracteres.")
        }else if(password.value != "" && password.value.length > 2){
            password.style.border = "solid 1px green"
            OkPasswordMesagge.push('<i class="far fa-check-circle"></i>')
        }

        if(OkPasswordMesagge.length > 0){
            errorPassword.innerHTML = OkPasswordMesagge.join();
        }

        if(errorPasswordMessage.length > 0){
            e.preventDefault();
            errorPassword.innerText = errorPasswordMessage.join();
            password.style.border = "solid 1px  rgb(225, 70, 49)"
        }
        if(errorPasswordCharacter.length > 0){
            e.preventDefault();
            errorPassword.innerText = errorPasswordCharacter.join();
            password.style.border = "solid 1px rgb(225, 70, 49)"
        }
        /*Validar que el input email no esté vacío y que sea válido*/
        let errorEmailMessage = [];
        let errorEmailFormat = [];
        let OkEmailMesagge = [];
        
        let errorValidator = [];
        console.log(errorValidator)

        fetch("http://localhost:3031/api/users/email/" + email.value)
        .then(response => response.json())
        .then(usuario => {
        console.log(usuario)
        if(usuario.data != null){
            errorValidator.push("El email ya está registrado.")
            errorEmail.innerText = errorValidator.join();
            email.style.border = "solid 1px  rgb(225, 70, 49)"
        }
        })
        if(errorValidator.length > 0){
            e.preventDefault();
            //errorEmail.innerText = errorValidator.join();
            email.style.border = "solid 1px  rgb(225, 70, 49)"
        }
        

        if(email.value === "" || email.value == null){
            errorEmailMessage.push("Debe ingresar un email.")
        }else if(email.value != ""){
            if(formatoValido.test(email.value)){
                email.style.border = "solid 1px green"
                OkEmailMesagge.push('<i class="far fa-check-circle"></i>')
                //return true
            } else{
                errorEmailFormat.push("El email no es válido.");
            }
        }

        if(OkEmailMesagge.length > 0){
            errorEmail.innerHTML = OkEmailMesagge.join();
        }

        if(errorEmailMessage.length > 0){
            e.preventDefault();
            errorEmail.innerText = errorEmailMessage.join();
            email.style.border = "solid 1px  rgb(225, 70, 49)"
        }
        if(errorEmailFormat.length > 0){
            e.preventDefault();
            errorEmail.innerText = errorEmailFormat.join();
            email.style.border = "solid 1px rgb(225, 70, 49)"
        }

        /*validar imagen*/
        let errorFileMessage = [];

        if(file.value != "" && !(/\.(jpg|jpeg|png|gif)$/i).test(file.value)){
            errorFileMessage.push("Formato incorrecto.")
        }

        if(errorFileMessage.length > 0){
            e.preventDefault();
            errorFile.innerHTML = errorFileMessage.join();
        }
    })
})