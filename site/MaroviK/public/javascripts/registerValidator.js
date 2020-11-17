

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
            console.log(reader)

            reader.onload = function(e) {
            avatarPreview.innerHTML = "<img src='" + e.target.result + "'>"
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

    const provincias = document.getElementById("provincias");
    const municipios = document.getElementById("municipios");

    fetch("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre")
    .then(response => response.json())
    .then(result => {
        //console.log(result.provincias)
        result.provincias.forEach(provincia => {
            provincias.innerHTML += "<option id='" + provincia.nombre + "' value='" + provincia.nombre + "'>" + provincia.nombre + "</option>"
        })
    })

    provincias.addEventListener("change", function(e){
        municipios.innerHTML = " "
        //console.log(e.target.value)
        fetch("https://apis.datos.gob.ar/georef/api/municipios?provincia="+ e.target.value +"&campos=id,nombre&max=200")
        .then(response => response.json())
        .then(result => {
        //console.log(result.municipios)
        result.municipios.sort((a, b) => {
            if(a.nombre < b.nombre) {
                return -1;
            }
            if(a.nombre > b.nombre){
                return 1;
            }
            return 0;
        })
        result.municipios.forEach(municipio => {
            municipios.innerHTML += "<option value='" + municipio.nombre + "'>" + municipio.nombre + "</option>"
        })
    })
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
                }
                if(errorValidator.length > 0){
                    e.preventDefault();
                    errorEmail.innerText = errorValidator.join();
                    email.style.border = "solid 1px  rgb(225, 70, 49)"
                }
        })
        

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
        let OkFileMessage = [];

        if(file.value != "" && !(/\.(jpg|jpeg|png|gif)$/i).test(file.value)){
            errorFileMessage.push("Formato incorrecto.")
        }else{
            OkFileMessage.push('<i class="far fa-check-circle"></i>')
        }

        if(errorFileMessage.length > 0){
            e.preventDefault();
            errorFile.innerHTML = errorFileMessage.join();
        }

        if(OkFileMessage.length > 0){
            errorFile.innerHTML = OkFileMessage.join();
        }
    })
})