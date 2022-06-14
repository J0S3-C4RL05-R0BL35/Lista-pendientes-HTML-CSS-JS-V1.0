//VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
const tweet = document.querySelector('#tweet');
const contenido = document.querySelector('#contenido');
let tweets = [];

//Formato de fecha
moment.locale();

//EVENTOS
addEventListeners();
function addEventListeners() {
    formulario.addEventListener('submit', agregarTweets);
    document.addEventListener('DOMContentLoaded',()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    });
};
//FUNCIONES

function agregarTweets(e) {
    e.preventDefault();
    if (tweet.value === '') {
        error('El mensaje no puede ir vacio');
        return;
    }
    //Creando el objeto
    const tweetObj = {
        id: Date.now(),
        tweet: tweet.value,
        hour:moment().format('LTS'),
       dayTweet:moment().format('L')
    }

    //el array a modifitar
    tweets = [...tweets, tweetObj]; //Le agregamos el nuevo dato.
    //Sacamos copia del array

    console.log(tweets)
    crearHTML();
    //Reinicia el formulario
    formulario.reset();
}

//Muestra el error al intentar ingresar texto vacio
function error(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    //Incertamos el elemento
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//MUestra la lista de los tweets del array en el HTML
function crearHTML() {
    //Limpiar HTML
    limpiarHTML();
    //Crea el HTML
    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'x';

            //Añadir la función de eliminar
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.innerText = `${tweet.tweet} - ${tweet.hour} - ${tweet.dayTweet}`;
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
    console.log(typeof(tweet.day));
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//LImpia el HTML previo
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

//Elimina los tweets
function borrarTweet(id){
   tweets = tweets.filter(tweet => tweet.id !== id);
   crearHTML();
}