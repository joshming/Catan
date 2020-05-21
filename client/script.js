function showjoinform(){
    var container = document.getElementById('container');
    container.classList.remove('right-active');
}

function shownewgame(){
    var container = document.getElementById('container');
    container.classList.add('right-active');
}

function validateJoin(){
    var form_user = document.forms["join-game"]["user"].value;
    var form_game = document.forms["join-game"]["game name"].value;
    var form_pass = document.forms["join-game"]["pass"].value;

    if(form_user == "" || form_game == "" || form_pass == ""){
        alert("Field(s) cannot be blank.");
    }
    else{
        joinGame(form_game, form_user, form_pass); 
    }
}

function joinGameResult(response){
    if(response.accepted){
        var lobby = document.getElementById('lobby');
        lobby.classList.add('accepted');
        container.classList.add('accepted');
    }  
    else{
        alert("Acess to the game was denied")
        if(!response.validUserID){
            alert('Username is not available, please try again.')
        }
        else{
            alert('Password and/or game name are incorrect, please try again')
        }
    }
}

function validateForm(){

    var form_user = document.forms["new-game"]["user"].value;
    var form_game = document.forms["new-game"]["game name"].value;
    var form_pass = document.forms["new-game"]["pass"].value;

    if(!(form_user == "" || form_game == "" || form_pass == "")){
        createGame(form_game, form_user, form_pass);
    }
    else{
        alert("Field(s) cannot be blank.");
    }

} 

function createGameResult(response){
    if(response.accepted){
        var lobby = document.getElementById('lobby');
        var container = document.getElementById('container');
        lobby.classList.add('accepted');
        container.classList.add('accepted');
    }
    else{
        alert('Failed to create game. Try a different Game Name')
    }
}

function displayButton(){ 
    var button = document.getElementById('start-button')
    if(creator){ 
        button.classList.add('display');
    }
}
