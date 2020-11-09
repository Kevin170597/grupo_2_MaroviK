window.addEventListener("load", function(){
    const search = document.getElementById("search");
    const searchbutton = document.getElementById("searchbutton");
    const listado = document.getElementById("listado");
    const body = document.querySelector("body");

    fetch("http://localhost:3031/api/products/listar")
    .then(response => response.json())
    .then(result => {
        
        const filtrar = () => {
            console.log(search.value);
            listado.innerHTML = " ";
            const texto = search.value.toLowerCase()
            result.data.forEach(producto => {
                let productName = producto.name.toLowerCase();
                if(productName.indexOf(texto) !== -1) {
                    listado.innerHTML += "<a href='/products/detail/" + producto.id + "'><p>" + producto.name.toLowerCase() + "</p></a>"
                }
            })

            body.addEventListener("click", function() {
                //search.value = ""
                listado.innerHTML = ""
            })
            
            if(listado.innerHTML === " "){
                listado.innerHTML = "<p>Producto no encontrado...</p>" 
            }
            if(search.value === ""){
                listado.innerHTML = ""
            }
        }
        search.addEventListener("keyup", filtrar)
        
    })
    
    
})