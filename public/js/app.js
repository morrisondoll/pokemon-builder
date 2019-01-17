//Animaciones de componentes
var btn_menu = document.getElementsByClassName('btn-menu');
var menu = document.getElementById('principal-menu');

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        for (let x = 0; x < btn_menu.length; x++) {
            btn_menu[x].addEventListener('click', () => {
                if (parseInt(menu.style.marginLeft) < 0) {
                    menu.style.marginLeft = "0%";
                } else {
                    menu.style.marginLeft = "-30%";
                }
            }, false);
        }

        document.addEventListener("scroll", () => {
            menu.style.top = scrollY + "px";
        }, false);
    }
}

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

        template += `<th class="menu-sprite art ${element[dato]}">{{ ` + dato + ` }}</th>`

        if (typeof element[dato] === "string") {
            element[dato] = element[dato].charAt(0).toUpperCase() + element[dato].slice(1);
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
        menu.style.marginLeft = "-30%";
        let request = e.dataset.request;
        let title = e.dataset.title;
        getAll(request).then(
            elements => {
                var titulos = {
                    'titulo-principal': title,
                    'titulos': {
                        'nombre': 'Pokémon',
                        'nombre': 'Nombre'
                    }
                };

                var template = `
                    <h2 class="text-center">{{ titulo-principal }}</h2>
                    <table class="table">
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
                for (let x = 0; x < elements.count; x++) {
                    element = elements.results[x];
                    // getOne(request, element.name).then(
                    //     element => {
                    //         loadRow(request, element);
                    //     },
                    //     error => console.error(
                    //         new Error('Hubo un error ' + error)
                    //     )
                    // );
                    loadRow(element);
                };
            },
            error => console.error(
                new Error('Hubo un error ' + error)
            )
        );
    }, false);
}

//Crear rows en base al request
const loadRow = (element) => {
    var data = ['name'];
    loadElement(element, data);
}