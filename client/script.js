var creator = false;

function showjoinform(){
    var container = document.getElementById('container');
    container.classList.remove('right-active');
}

function shownewgame(){
    var container = document.getElementById('container');
    container.classList.add('right-active');
}

function validateJoin(){
    var valid = true
    var lobby = document.getElementById('lobby');
    var form_user = document.forms["join-game"]["user"].value 
    var form_game = document.forms["join-game"]["game name"].value
    var form_pass = document.forms["join-game"]["pass"].value 

    if(form_user == "" || form_game == "" || form_pass == ""){
        alert("One or more of the fields are blank...idiot")
        valid = false
    }
    else{
        joinGame(form_game, form_user, form_pass);
        // if this passes, add the class 
        if(valid){
            lobby.classList.add('accepted');
            container.classList.add('accepted');
        }   
    }
}

function validateForm(){
    var lobby = document.getElementById('lobby');
    var container = document.getElementById('container');
    var valid = false;
    var form_user = document.forms["new-game"]["user"].value;
    var form_game = document.forms["new-game"]["game name"].value;
    var form_pass = document.forms["new-game"]["pass"].value;
    var p1 = document.getElementById('first-player');


    if(!(form_user == "" || form_game == "" || form_pass == "")){
        valid = true;
    }
    else{
        alert("One or more of the fields are blank...idiot");
    }
    if(valid){
        lobby.classList.add('accepted');
        container.classList.add('accepted');
        creator = true;
        // displayButton();
        // p1.innerHTML = 'You';
    }

}   

function displayButton(){ 
    var button = document.getElementById('start-button')
    if(creator){ 
        button.classList.add('display')
    }
}
