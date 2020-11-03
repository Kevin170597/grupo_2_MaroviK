window.addEventListener("load", function(){

    const formAddProduct = document.getElementById('formAddProduct');
    //const inputs = document.querySelectorAll('#formAddProduct .form-control')
    const name = document.getElementById('nameProduct');
    const description = document.getElementById('description');
    const image = document.getElementById("image");

    const errorNameProduct = document.getElementById("errorNameProduct");
    const errorDescription = document.getElementById("errorDescription");

    const expresiones = {
        name: /^[a-zA-Z0-9À-ÿ._-\s]{5,100}$/, // Letras y espacios, pueden llevar acentos.Mínimo de 5 caracteres y máximo de 100
        description: /^[a-zA-Z0-9À-ÿ.*?¡!¿$%&#"',:@;_-\s]{20,2500}$/, // Letras y espacios, pueden llevar acentos.Mínimo de 20 caracteres y máximo de 100
    }

    formAddProduct.addEventListener("submit", (e)=>{


        // -- Validación del título del producto a pulbicar ---
        let errorNameMessage = [];
        let errorNameCharacter = [];
        let OkNameMesagge = [];

        if(name.value === "" || name.value == null){
            errorNameMessage.push("Campo obligatorio!. Debes ingresar el título del producto.")
        }else if(name.value != "" && name.value.length < 5){
            errorNameCharacter.push("El título debe contener al menos 5 caracteres.")
        }else if(name.value != "" && name.value.length >= 5){
            name.style.border = "2px solid #28df99"
            OkNameMesagge.push('<i class="far fa-check-circle"></i>')
        }

        if(OkNameMesagge.length > 0){
            errorNameProduct.innerHTML = OkNameMesagge.join();
        }

        if(errorNameMessage.length > 0){
            e.preventDefault();
            errorNameProduct.innerText = errorNameMessage.join();
            name.style.border = "2px solid #ec0101"
        }
        if(errorNameCharacter.length > 0){
            e.preventDefault();
            errorNameProduct.innerText = errorNameCharacter.join();
            name.style.border = "2px solid #ec0101"
        }

        // -- Validación de la descripción del producto a publicar --


        let errorDescriptionMessage = [];
        let errorDescriptionCharacter = [];
        let OkDescriptionMesagge = [];

        if(description.value === "" || description.value == null){
            errorDescriptionMessage.push("Campo obligatorio!. Debes ingresar una descripción.")
        }else if(description.value != "" && description.value.length < 20){
            errorDescriptionCharacter.push("La descripción debe contener al menos 20 caracteres.")
        }else if(description.value != "" && description.value.length >= 20){
            description.style.border = "2px solid #28df99"
            OkDescriptionMesagge.push('<i class="far fa-check-circle"></i>')
        }

        if(OkDescriptionMesagge.length > 0){
            errorDescription.innerHTML = OkDescriptionMesagge.join();
        }

        if(errorDescriptionMessage.length > 0){
            e.preventDefault();
            errorDescription.innerText = errorDescriptionMessage.join();
            description.style.border = "2px solid #ec0101"
        }
        if(errorDescriptionCharacter.length > 0){
            e.preventDefault();
            errorDescription.innerText = errorDescriptionCharacter.join();
            description.style.border = "2px solid #ec0101"
        }

        /*validar imagen*/
        let errorFileMessage = [];
        let OkFileMessage = [];

        if(image.value != "" && !(/\.(jpg|jpeg|png|gif)$/i).test(image.value)){
            errorFileMessage.push("Extensión de archivo no permitido!")
        }else{
            OkFileMessage.push('<i class="far fa-check-circle"></i>')
        }

        if(errorFileMessage.length > 0){
            e.preventDefault();
            errorImage.innerHTML = errorFileMessage.join();
        }

        if(OkFileMessage.length > 0){
            errorImage.innerHTML = OkFileMessage.join();
        }

    })

})