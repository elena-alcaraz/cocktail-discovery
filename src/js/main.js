'use strict';


//variables globales
const ulList = document.querySelector('.js_coctails');
const inputSearch = document.querySelector('.js_search');
const buttonSearch = document.querySelector('.js-btn-search');
const SERVER_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;
const buttonReset = document.querySelector('.js_reset');
const favList = document.querySelector('.js_coctails_favorite');
const resetFav = document.querySelector('.js_reset_favorites');
const logBtn = document.querySelector('.js_log');

let coctailsData = []
let coctailsFavorite = [];

//Función para buscar
function search () {
    ulList.innerHTML = '';
    if (inputSearch.value === '') {
        alert('Introduce un coctail para empezar a buscar :)')
        getData("margarita");
    } else {
        getData(inputSearch.value);
    }
};
buttonSearch.addEventListener('click', search);

//Función para resetear la lista genérica
function reset () {
    inputSearch.value = '';
    ulList.innerHTML = '';
};
buttonReset.addEventListener('click', reset);


//Función para resetear la lista de favs
function resetFavorites () {
    favList.innerHTML = '';
    coctailsFavorite = [];
    localStorage.removeItem('coctailsFavorite');
    resetFav.classList.add('hidden');
    //eliminamos la clase blue cuando reseteamos favoritos
    const blueElements = document.querySelectorAll('.blue');
    // Iterar sobre los elementos y eliminar la clase "blue"
    blueElements.forEach(element => {
        element.classList.remove('blue');
    });
};
resetFav.addEventListener('click', resetFavorites);

// FETCH A LA API
const getData = (value) => {
    fetch(SERVER_URL + value)
        .then(response => response.json())
        .then(dataApi => {
            coctailsData = dataApi.drinks;
            if (coctailsData === null) {
                alert('No se han encontrado resultados ):')
            } else {
                renderAllCoctails();
            }
            console.log(dataApi)
        })
};

//RENDERIZAR UNA BEBIDA
const renderOneCoctail = (eachCoctail, isFavorite, arrayFavorites) => {
    let imgCoctail = eachCoctail.strDrinkThumb;
    if (imgCoctail === null) {
        imgCoctail = 'https://media.glamour.mx/photos/632371dd8645b8d42bd2a706/master/pass/cocteles-para-el-15-de-septiembre.jpg';
    }

    var card = '';
    if(arrayFavorites)
    {
        card += `<li class="card blue"><button class="js_remove_fav" id="${eachCoctail.idDrink}">❌</button>`;
    }
    else if(isFavorite){
        card += `<li class="card js_coctails_li blue" id="${eachCoctail.idDrink}">`;
    }
    else{
        card += `<li class="card js_coctails_li" id="${eachCoctail.idDrink}">`;
    }

    card += `<h6>${eachCoctail.strDrink}</h6>
    <p class="card_ingredients">${eachCoctail.strIngredient1}, ${eachCoctail.strIngredient2}, ${eachCoctail.strIngredient3}</p>
    <img src="${imgCoctail}"/>
    </li>`;

    return card;
};



//RENDERIZAR TODAS LAS BEBIDAS
const renderAllCoctails = () => {
    //pintamos los cócteles
    ulList.innerHTML = '';
    for(var item of coctailsData)
    {
        //mojito extra
        const isFavorite = coctailsFavorite.some(coctailFavorite => coctailFavorite.idDrink == item.idDrink);
        console.log(isFavorite);
        ulList.innerHTML += renderOneCoctail(item, isFavorite, false);    
    }

    //asignamos el evento click a cada uno de los cócteles
    const allCoctailsLi = document.querySelectorAll('.js_coctails_li');
    for (let i = 0; i < allCoctailsLi.length; i++) {
        allCoctailsLi[i].addEventListener('click', addorRemoveFavorite);
    }
};


//Función añadir favoritos
const addorRemoveFavorite = (ev) => {
    const idCoctail = ev.currentTarget.id;
    console.log(`El Id a tratar es: ${idCoctail}`);
    //obtenemos todos los datos del coctail clicado. 
    const clickedCoctail = coctailsData.find(item => item.idDrink === idCoctail);

    //verificar si la paleta cliada ya es un fav
    const isFavoriteCoctailIndex = coctailsFavorite.findIndex(item => item.idDrink === idCoctail);
    //condicional para añadir al array si no está, y quitarla si clicamos de nuevo
    if (isFavoriteCoctailIndex === -1) {
        //añadimos el coctail si no está
        coctailsFavorite.push(clickedCoctail);
    } else {
        //si está, lo quitamos de favoritos
        coctailsFavorite.splice(isFavoriteCoctailIndex, 1);
    };

    console.log(coctailsFavorite)
       
    renderFavorites();
    renderAllCoctails();
    btnResetFavorites();
    localStorage.setItem('coctailsFavorite', JSON.stringify(coctailsFavorite)); 
};

//Renderizar un favorito
const renderOneFavoriteCoctail = (eachCoctail) => {
    return `<li class="card fav_coctail">
        <button class="btn_remove js_remove_fav" id="${eachCoctail.idDrink}">❌</button>
        <h6>${eachCoctail.strDrink}</h6>
        <p class="card_ingredients">${eachCoctail.strIngredient1}, ${eachCoctail.strIngredient2}, ${eachCoctail.strIngredient3}</p>
        <img src="${eachCoctail.strDrinkThumb}"/>
    </li>`
};

//Renderizar todos los favoritos + evento sobre el botón eliminar
function renderFavorites () {
    favList.innerHTML = '';
    for (const fav of coctailsFavorite) {
        favList.innerHTML += renderOneFavoriteCoctail (fav)
    }
    //asignamos el evento click a cada uno de los botones
    const allBtnFav = document.querySelectorAll('.js_remove_fav');
    for (let i = 0; i < allBtnFav.length; i++) {
        allBtnFav[i].addEventListener('click', removeFavorite);
    }
};

const removeFavorite = (ev) => {
    const idCoctail = ev.currentTarget.id;
    //obtenemos todos los datos del botón de eliminar clicado. 
    const clickedCoctail = coctailsData.find(item => item.idDrink === idCoctail);

    //verificar si el coctail cliado ya es un fav
    const isFavoriteCoctailIndex = coctailsFavorite.findIndex(item => item.idDrink === idCoctail);
    //condicional para añadir al array si no está, y quitarla si clicamos de nuevo
    if (isFavoriteCoctailIndex === -1) {
        //añadimos el coctail si no está
        coctailsFavorite.push(clickedCoctail);
    } else {
        //si está, lo quitamos de favoritos
        coctailsFavorite.splice(isFavoriteCoctailIndex, 1);
    };


    renderFavorites();
    
    //llamamos de nuevo a la función renderAllCoctails para que pase por los favoritos
    renderAllCoctails();

    if (coctailsFavorite.length === 0) {
        resetFav.classList.add('hidden');
    }

    //sobreescribimos el local storage 
    localStorage.setItem('coctailsFavorite', JSON.stringify(coctailsFavorite)); 
};


//renderizamos lo que tenemos en el localStorage
function renderLocalStorage () {
    const localStorageData = localStorage.getItem('coctailsFavorite');
    if (localStorageData !== null) {
        coctailsFavorite = JSON.parse(localStorageData);
        renderFavorites();
    }
};


function btnResetFavorites () {
    if (coctailsFavorite.length === 0) {
        resetFav.classList.add('hidden');
    } else {
        resetFav.classList.remove('hidden');
    }
}; 

//Al cargar la página
renderLocalStorage();
btnResetFavorites();
getData("margarita");