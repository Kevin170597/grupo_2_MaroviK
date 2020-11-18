window.addEventListener("load", function(){

    const file = document.getElementById("avatarImput");
    const imgAvatar = document.getElementById("imgAvatar");
    
    const provincias = document.getElementById("provincias");
    const municipios = document.getElementById("municipios");

    const CABA = ["Agronomía","Almagro","Balvanera","Barracas","Belgrano","Boedo","Caballito","Chacarita","Coghlan","Colegiales","Constitución","Flores","Floresta","La Boca","La Paternal","Liniers","Mataderos","Monte Castro","Monserrat","Nueva Pompeya","Nuñez","Palermo","Parque Avellaneda","Parque Chacabuco","Parque Chas","Parque Patricios","Puerto Madero","Recoleta","Retiro","Saavedra","San Cristóbal","San Nicolás","San Telmo","Vélez Sársfield","Versalles","Villa Crespo","Villa del Parque","Villa Devoto","Villa General Mitre","Villa Lugano","Villa Luro","Villa Ortúzar","Villa Pueyrredón","Villa Real","Villa Riachuelo","Villa Santa Rita","Villa Soldati","Villa Urquiza"];

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
        if(e.target.value == "Ciudad Autónoma de Buenos Aires"){
            CABA.forEach(barrio => {
                municipios.innerHTML += "<option value='" + barrio + "'>" + barrio+ "</option>"
            })
        }else {
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
        }
        
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