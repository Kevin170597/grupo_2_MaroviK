window.addEventListener("load", function(){

    const file = document.getElementById("avatarImput");
    const imgAvatar = document.getElementById("imgAvatar");
    
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

    function readURL(file){
        if (file.files && file.files[0]) {
            var reader = new FileReader();
    
            reader.onload = function(e) {
                //previewAvatar.innerHTML = ""
                imgAvatar.src = e.target.result
            }
            reader.readAsDataURL(file.files[0]);
        }
    }
    file.addEventListener("change", function(){
        readURL(this);
    })
})