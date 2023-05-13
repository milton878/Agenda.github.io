//Variable:
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
//variable que almacena los tweets
let tweets =[];

//Eventos:
formulario.addEventListener('submit', agregarTweet);

document.addEventListener('DOMContentLoaded', ()=>{
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    console.log(tweets);
    crearHTML();
});

//Funciones:
function agregarTweet(e){
    e.preventDefault();
    //console.log('agregando tweet');

    const tweet = document.querySelector('#tweet').value;
    //console.log(tweet);

    //--Validacion de formulario:
    if(tweet === ''){
        //console.log('Un mensaje no puede ir vacio')
       mostrarError('Un mensaje no puede ir vacio');
        return;
    }
    //console.log('Agregando Tweet')
    const tweetObj ={
        id:Date.now(),
        tweet
    }
    //---Añadir al arreglo de tweets.
    tweets = [...tweets, tweetObj];
    //console.log(tweets);

    //luego de agregar insertar en el html
    crearHTML();

    //reiniciar el formulario
    formulario.reset();

}
//funcion validacion de formulario:
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertalo en el contenido
    const container = document.querySelector('.container');
    container.appendChild(mensajeError);

    //elimina la alerta desp de 3seg
    setTimeout(()=>{
        mensajeError.remove();
    }, 3000)

}

function crearHTML(){
    limpiarHTML();
     if( tweets.length > 0){
        tweets.forEach(tweet =>{
            //Crear button de eliminar:
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';
            //Crear HTML:
            const li = document.createElement('li');
            
            //funcion Eliminar:
            btnEliminar.onclick=()=>{
                borrarTweet(tweet.id);
            }
           
            //Añadir texto:
            li.innerText = tweet.tweet;

             //Asignar el button:
            li.appendChild(btnEliminar);
            //insertar en el html: 
            listaTweets.appendChild(li);
        });
     }
     //localStorage
     sincronizarStorage();
}
// Agrega los tweets actuales a localStorage:
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
//Eliminar un tweet
function borrarTweet(id){
   // console.log('Eliminando..', id)
   tweets = tweets.filter( tweet => tweet.id !== id);
   // console.log(tweets)
   crearHTML();
}

// limpiar HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}