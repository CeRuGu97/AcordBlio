const acordes = [];
const chord = document.querySelector('#chord');
const paintWriting = document.querySelector('#paint');
const resultadoBuscado = document.querySelector('#resultadoBuscado');
const resultado = document.querySelector('#resultado');

resultado.innerHTML += '<h1>Cargando...</h1>';
const traerdatos = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', './src/js/acordes.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let acordesr = JSON.parse(this.responseText);
            acordes.push(...acordesr);
            mostrarTodoELArrary();
            filtrar();
        };
    };
};
traerdatos();
const mostrarTodoELArrary = () => {
    resultado.innerHTML = '';
    acordes.map((acorde) => {
        resultado.innerHTML += `
                    <li>
                        <div class="card-cont">
                            <div>
                                <h2>${acorde.nombre}</h2>
                            </div>
                            <div class="card-cont-img">
                                <img src="${acorde.img}" alt="Acorde de ${acorde.nombre}">
                            </div>
                        </div>
                    </li>
                `
    });
};

const filtrar = () => {
    const texto = chord.value.toLowerCase();
    //} else 
    if (texto.length > 0) {
        resultadoBuscado.innerHTML = '';
        const filtroAcordes = acordes.filter((item) => {
            if (item.nombre.toLowerCase() == texto.toLowerCase()) {
                return item.nombre;
            };
        });
        filtroAcordes.map((acorde) => {
            resultadoBuscado.innerHTML += `
                    <li>
                        <div class="card-cont">
                            <div>
                                <h2>${acorde.nombre}</h2>
                            </div>
                            <div class="card-cont-img">
                                <img src="${acorde.img}" alt="Acorde de ${acorde.nombre}">
                            </div>
                        </div>
                    </li>
                `
        });
    };
};

const paint = () => {
    //texto del imput
    const texto = chord.value.toLowerCase();
    if (texto.length == 0) {//solo muestra el h1 si no busca nada
        paintWriting.innerHTML = `<h1>Busque el acorde</h1>`;
    } else {
        paintWriting.innerHTML = '';//ponen en blanco donde se tiene que pintar lo que busca
        acordes.find((item) => {
            if (item.nombre.toLowerCase() == texto.toLowerCase()) {
                paintWriting.innerHTML = '';
                paintWriting.innerHTML += `
                         <h1>${item.nombre}</h1>
                     `
            };
        });
        if (paintWriting.innerHTML === '') {
            paintWriting.innerHTML += `
                <h1>Acorde no encontrado...</h1>
            `
        };
    };
    filtrar();
};
chord.addEventListener('keyup', paint);
paint();