function showjoinform(){
    var container = document.getElementById('container');
    container.classList.remove('right-active');
}

function shownewgame(){
    var container = document.getElementById('container');
    container.classList.add('right-active');
}

function completeAndRedirect(){

}

function validateJoin(){
    var valid = true
    var form_user = document.forms["join-game"]["user"].value 
    var form_game = document.forms["join-game"]["game name"].value
    var form_pass = document.forms["join-game"]["pass"].value 

    if(form_user == "" || form_game == "" || form_pass == ""){
        valid = false
    }
 
}

function validateForm(){
    var valid = false 
    var form_user = document.forms["new-game"]["user"].value 
    var form_game = document.forms["new-game"]["game name"].value
    var form_pass = document.forms["new-game"]["pass"].value 

    if(!(form_user == "" || form_game == "" || form_pass == "")){
        
    }

    else{
        alert("One or more of the fields are blank...idiot")
    }
    if(valid){
        lobby.classList.add('accepted')
    }
}   

