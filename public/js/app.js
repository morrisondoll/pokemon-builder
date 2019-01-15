//Obtener Todos los Registros
const getAll = (list) => new Promise((resolve, reject) => {
    const api = `https://pokeapi.co/api/v2/${list}/`;

    //Llamado AJAX
    const xhr = new XMLHttpRequest();

    xhr.open('GET', api, true);

    xhr.onload = () => {
        if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
        } else {
            reject(Error(xhr.statusText));
        }
    }

    xhr.onerror = (error) => reject(error);

    xhr.send();
});

//Obtener un sólo registro
const getOne = (list, element) => new Promise((resolve, reject) => {
    const api = `https://pokeapi.co/api/v2/${list}/${element}/`;

    //Llamado AJAX
    const xhr = new XMLHttpRequest();

    xhr.open('GET', api, true);

    xhr.onload = () => {
        if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
        } else {
            reject(Error(xhr.statusText));
        }
    }

    xhr.onerror = (error) => reject(error);

    xhr.send();
});

//Crear HTML para los elementos
const loadElement = (element, data) => {
    var template = `<tr>`;

    for (let x = 0; x < data.length; x++) {
        var dato = data[x];
        if (typeof element[dato] === "string") {
            element[dato] = element[dato].charAt(0).toUpperCase() + element[dato].slice(1);
        }

        if (dato.includes("sprites")) {
            template += `<th><img src="{{ ` + dato + ` }}"></th>`
        } else {
            template += `<th>{{ ` + dato + ` }}</th>`
        }
    }

    template += `</tr>`

    var html = Mustache.render(template, element);
    // console.log(html);
    var doc = document.getElementById("table-principal");
    doc.innerHTML = doc.innerHTML + html;
};

//Cargar todas las posibles referencias de requests
var requests = document.querySelectorAll("*[data-request]");

//Iterar todos los requests
for (let x = 0; x < requests.length; x++) {
    let e = requests[x];
    e.addEventListener("click", () => {
        let request = e.dataset.request;
        getAll(request).then(
            elements => {
                var titulos = getTitles(request);

                var template = `
                    <h2 class="text-center" style="padding: 1em">{{ titulo-principal }}</h2>
                    <table class="table header red">
                        <thead>
                            <tr>
                                {{ #titulos }}
                                    <th>{{ nombre }}</th>
                                {{ /titulos }}
                            </tr>
                        </thead>
                        <tbody id="table-principal">

                        </tbody>
                    </table>
                `
                var html = Mustache.render(template, titulos);
                var doc = document.getElementById("principal");
                doc.innerHTML = html;
                for (let x = 0; x < 50; x++) {
                    element = elements.results[x];
                    console.log(element);
                    getOne(request, element.name).then(
                        element => {
                            loadRow(request, element);
                        },
                        error => console.error(
                            new Error('Hubo un error ' + error)
                        )
                    );
                };
            },
            error => console.error(
                new Error('Hubo un error ' + error)
            )
        );
    }, false);
}


//Obtener titulos en base al request
const getTitles = request => {
    var titulos;
    switch (request) {
        case "type":
            titulos = {
                "titulos": [
                    { "nombre": "Nombre del tipo" }
                ],
                "titulo-principal": "Tipos Disponibles de Pokémon"
            }
            break;

        case "pokemon-color":
            titulos = {
                "titulos": [
                    { "nombre": "Nombre del color" }
                ],
                "titulo-principal": "Colores Disponibles de Pokémon"
            }
            break;

        case "stat":
            titulos = {
                "titulos": [
                    { "nombre": "Nombre de la estadística" }
                ],
                "titulo-principal": "Estadísticas Disponibles de Pokémon"
            }
            break;

        case "move-damage-class":
            titulos = {
                "titulos": [
                    { "nombre": "Nombre de la categoría" }
                ],
                "titulo-principal": "Categorías de movimientos"
            }

        case "pokemon":
            titulos = {
                "titulos": [
                    { "nombre": "Nombre de la categoría" }
                ],
                "titulo-principal": "Categorías de movimientos"
            }
            break;
    }

    return titulos;
}

//Crear rows en base al request
const loadRow = (request, element) => {
    var data;
    switch (request) {
        case "type":
            data = [
                "name"
            ]
            break;

        case "pokemon-color":
            data = [
                "name"
            ]
            break;

        case "stat":
            data = [
                "name"
            ]
            break;

        case "move-damage-class":
            data = [
                "name"
            ]
            break;

        case "pokemon":
            data = [
                "name",
                "id",
                "weight",
                "sprites.front_default",
                "sprites.front_default",
                "stats.0.base_stat",
                "stats.1.base_stat",
                "stats.2.base_stat",
                "stats.3.base_stat",
                "stats.4.base_stat",
                "stats.5.base_stat",
                "height",
                "base_experience"
            ]
            break;
    }
    loadElement(element, data);
}