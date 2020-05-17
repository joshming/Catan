//the start of a auto-resume library

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function setCookie(gameID, userID, password){
    document.cookie = "gameID=" + gameID + "; userID=" + userID + "; password=" + password;
}

function checkCookie(){
    var gameID = getCookie('gameID');
    var userID = getCookie('userID');
    var password = getCookie('password');

    socket.emit()
}