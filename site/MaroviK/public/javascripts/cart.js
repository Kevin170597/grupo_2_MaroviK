window.addEventListener("load", function(){
    
    const goBackButton = document.getElementById("goBackButton");
    
    goBackButton.addEventListener("click", function(){
        window.history.back()
    })
})