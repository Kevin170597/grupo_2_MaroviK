window.addEventListener("load", function(){

    let checkboxes =  document.querySelectorAll('.check-mark');
    let divs = document.querySelectorAll('.contenidos')
    //let checkboxesSelect = [];

    checkboxes.forEach(checkbox => {

        checkbox.addEventListener("change", (e) => {

            checkboxes.forEach(item => {
                if(item.name != checkbox.name){
                    item.checked = false;
                }
            })

            if(checkbox.checked == true){

                divs.forEach(div => {
                    if(checkbox.name != div.title){
                        div.style.display = "none";
                    }else {
                        div.style.display = "block"
                    }
                })

            }else {
                
                divs.forEach(div => {

                    div.style.display = "block";
                    
                })
            }

        })
    })

})