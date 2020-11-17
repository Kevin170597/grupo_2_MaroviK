

window.addEventListener('load',function(){
    let loginForm = document.getElementById('loginForm')
    let inputEmail = document.getElementById('email')
    let inputPass = document.getElementById('password')
    let regexEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    let errorEmail = document.getElementById("errorEmail");
    let errorPassword = document.getElementById("errorPassword");
    

    /*loginForm.addEventListener("keyup", function(){
      fetch("http://localhost:3031/api/users/email/" + inputEmail.value )
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if(result.data != null){
            errorEmail.innerHTML = "Ok"
          }
        })
    })*/

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
            errorEmail.innerHTML = OkEmailMesagge;
        }

        if(errorEmailMessage.length > 0){
            e.preventDefault();
            errorEmail.innerText = errorEmailMessage;
            inputEmail.style.border = "solid 1px  rgb(225, 70, 49)"
        }
        if(errorEmailFormat.length > 0){
            e.preventDefault();
            errorEmail.innerText = errorEmailFormat;
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
          errorPassword.innerHTML = OkPasswordMesagge;
        }

        if(errorPasswordMessage.length > 0){
          e.preventDefault();
          errorPassword.innerText = errorPasswordMessage;
          password.style.border = "solid 1px  rgb(225, 70, 49)"
        }
        /*if(errorPasswordCharacter.length > 0){
          e.preventDefault();
          errorPassword.innerText = errorPasswordCharacter;
          password.style.border = "solid 1px rgb(225, 70, 49)"
        }*/


    })

})
