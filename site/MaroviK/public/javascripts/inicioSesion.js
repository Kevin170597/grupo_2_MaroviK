

window.addEventListener('load',function(){
    let loginForm = document.getElementById('loginForm')
    let inputEmail = document.getElementById('email')
    let inputPass = document.getElementById('password')
    let regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    loginForm.addEventListener("submit", (e) =>{
        let errorEmailMessage = [];
        let errorEmailFormat = [];
        let OkEmailMesagge = [];

        if(inputEmail.value === "" || inputEmail.value == null){
            errorEmailMessage.push("Debe ingresar un email.")
        }else if(inputEmail.value != ""){
            if(regexEmail.test(inputEmail.value)){
                email.style.border = "solid 1px green"
                OkEmailMesagge.push('<i class="far fa-check-circle"></i>')
                
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
            inputEmail.style.border = "solid 1px  rgb(225, 70, 49)"
        }
        if(errorEmailFormat.length > 0){
            e.preventDefault();
            errorEmail.innerText = errorEmailFormat.join();
            inputEmail.style.border = "solid 1px rgb(225, 70, 49)"
        }
      ////////////////////////////////////////////////////////////////////////////

        let errorPasswordMessage = [];
        let OkPasswordMesagge = [];

        if(inputPass.value === "" || inputPass.value == null){
          errorPasswordMessage.push("Debe ingresar una contraseña.")
        }else if(inputPass.value != "" && inputPass.value.length > 0){
          inputPass.style.border = "solid 1px green"
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
    })

})
