

window.addEventListener("load", function(){
    const form = document.querySelector("form.formulario_register");

    const name = document.getElementById("name");
    const lastName = document.getElementById("lastName");
    const password = document.getElementById("password");
    const email = document.getElementById("email");

    const errorName = document.getElementById("errorName");
    const errorLastName = document.getElementById("errorLastName");
    const errorPassword = document.getElementById("errorPassword");
    const errorEmail = document.getElementById("errorEmail");

    let formatoValido = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    form.addEventListener("submit", (e)=>{
        /*Validar que el input nombre no esté vacío y contenga al menos 2 caracteres*/
        let errorNameMessage = [];
        let errorNameCharacter = [];

        if(name.value === "" || name.value == null){
            errorNameMessage.push("Debe ingresar un nombre.")
        }else if(name.value != "" && name.value.length < 2){
            errorNameCharacter.push("Debe contener al menos 2 caracteres.")
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

        if(lastName.value === "" || lastName.value == null){
            errorLastNameMessage.push("Debe ingresar un apellido.")
        }else if(lastName.value != "" && lastName.value.length < 2){
            errorLastNameCharacter.push("Debe contener al menos 2 caracteres.")
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

        if(password.value === "" || password.value == null){
            errorPasswordMessage.push("Debe ingresar una contraseña.")
        }else if(password.value != "" && password.value.length < 8){
            errorPasswordCharacter.push("Debe contener al menos 8 caracteres.")
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

        if(email.value === "" || email.value == null){
            errorEmailMessage.push("Debe ingresar un email.")
        }else if(email.value != ""){
            if(formatoValido.test(email.value)){
                return true
            } else{
                errorEmailFormat.push("El email no es válido.");
            }
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
    })
})