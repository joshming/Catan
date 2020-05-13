const socket = io();

function showjoinform(){
    var container = document.getElementById('container')
    container.classList.remove('right-active');
}

function shownewgame(){
    var container = document.getElementById('container')
    container.classList.add('right-active');
}

function completeAndRedirect(){

}

