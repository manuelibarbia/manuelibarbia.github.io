const div_messages = document.getElementById("messages_add_city")

function addNewCityToLocalStorage() {
    let newCity = document.getElementById("city-to-add");
    if (validateCity(newCity.value) === true && newCity.value !== "") { // valido que la ciudad no esté almacenada previamente ni sea un campo vacío
        cities.push(newCity.value);  //cities está definida en common.js
        localStorage.setItem("CITIES", JSON.stringify(cities));
        showMessageSuccess();
    } else if (validateCity(newCity.value) === false && newCity.value !== "") { // si el campo no está vacío, pero la ciudad ya está almacenada
            showMessageNotice();
    } else {
        showMessageError();                                              // si el campo está vacío
    }
    newCity.value = ""                                                   // limpio el input de ciudad
}

function validateCity(newCity) {
    let list_validate = localStorage.getItem("CITIES");
    if (list_validate != null) {
        list_validate = list_validate.toLowerCase()      // Paso las ciudades a minúsculas para comparar luego
    }
    list_validate = JSON.parse(list_validate);
    newCity = newCity.toLowerCase();                     // Paso la ciudad ingresada a minúsculas
    if (list_validate != null) {                         // Si la lista no está vacía, significa que ya tiene ciudades, por lo que entro a otro if:
        if (list_validate.includes(newCity)) {           // si la ciudad ingresada ya estaba dentro de la lista, devuelvo false (no se puede almacenar la ciudad).
            return false;                                // Caso contrario, devuelvo true.
        } else {
            return true;
        }
    } else {
        return true;                                     // Si la lista está vacía, devuelvo true, ya que se puede ingresar una nueva ciudad sin problema.
    }
}

function showMessageSuccess() {
    div_messages.innerHTML = `<p class="message success">Ciudad agregada con éxito</p>`
}

function showMessageNotice() {
    div_messages.innerHTML = `<p class="message notice">La ciudad ingresada ya se encuentra almacenada</p>`
}

function showMessageError() {
    div_messages.innerHTML = `<p class="message error">Error: La ciudad ingresada no se encuentra en la API o se produjo un error al consultar</p>`
}