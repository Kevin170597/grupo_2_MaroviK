
window.addEventListener("load", function(){
    const form = document.getElementById("passwordForm");

    const passwordActual = document.getElementById("passwordActual");
    const passwordNueva = document.getElementById("passwordNueva");
    const passwordRepetir = document.getElementById("passwordRepetir");

    const errorPasswordActual = document.getElementById("errorPasswordActual");
    const errorPasswordNueva = document.getElementById("errorPasswordNueva");
    const errorPasswordRepetirl = document.getElementById("errorPasswordRepetir");

    form.addEventListener("submit", (e) => {
        let errorsPasswordActual = [];

        if(passwordActual.value === "" || passwordActual.value == null){
            errorsPasswordActual.push("Debe ingresar su contraseña actual.")
        }

        if(errorsPasswordActual.length > 0){
            e.preventDefault();
            errorPasswordActual.innerText = errorsPasswordActual.join();
            passwordActual.style.border = "solid 1px  rgb(225, 70, 49)"
        }


        let errorsPasswordNueva = [];

        if(passwordNueva.value === "" || passwordNueva.value == null){
            errorsPasswordNueva.push("Debe ingresar una contraseña nueva.")
        }

        if(errorsPasswordNueva.length > 0){
            e.preventDefault();
            errorPasswordNueva.innerText = errorsPasswordNueva.join();
            passwordNueva.style.border = "solid 1px  rgb(225, 70, 49)"
        }


        let errorsPasswordRepetir = [];

        if(passwordRepetir.value === "" || passwordRepetir.value == null){
            errorsPasswordRepetir.push("Debe repetir la contraseña nueva.")
        }

        if(errorsPasswordRepetir.length > 0){
            e.preventDefault();
            errorPasswordRepetir.innerText = errorsPasswordRepetir.join();
            passwordRepetir.style.border = "solid 1px  rgb(225, 70, 49)"
        }
    })
})