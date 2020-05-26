var socket = io();

socket.on('debug', (data) => {
    //a simple debug function
    console.log(data);
});

//LOGIN EVENTS

function isValidGameID(gameID){
    //query the sever on if gameID is available
    socket.emit('isValidGameID', {gameID: gameID});
}

socket.on('isValidGameID', data => {
    //data = {gameID: str, isValid: bool}
    //data.isValid true if data.gameID is a valid and unused
    console.log(data);
});

function createGame(gameID, userID, password){
    //ask to create a game with gameID under userID
    socket.emit('createGame', {gameID: gameID, userID: userID, password: password});
}

socket.on('createGame', data => {
    //data = {accepted: bool, gameID: str}
    console.log(data);
    createGameResult(data);
});

function joinGame(gameID, userID, password){
    //ask to join a game with gameID under userID
    socket.emit('joinGame', {gameID: gameID, userID: userID, password: password});
}

socket.on('joinGame', data => {
    //data = {gameID: str, accepted: bool, validUserID: bool}
    console.log(data);
    joinGameResult(data);
});

//LOBBY EVENTS

function getGameMembers(){
    //get the members of the same game that this player is in
    socket.emit('getGameMembers');
}

socket.on('getGameMembers', data => {
    //data = {members: List[str]}
    //data.members possibly being empty if this call is invalid
    console.log(data);
})

//GAME EVENTS

function leaveGame(){
    //makes a request to leave this player's current game.
    //does not get a response!
    socket.emit('leaveGame');
}

socket.on('getGameState', data => {
    //recieve a game state update from the server
});

function buyRoad(i, j, edge){
    //request to buy a road on the i, j hex
    socket.emit('buyRoad', {i: i, j: j, edge: edge});
}

function buySettlement(i, j, corner){
    //request to buy a settlement on the i, j hex
    socket.emit('buySettlement', {i: i, j: j, corner: corner});
}

function buyCity(i, j, corner){
    //request to upgrade a settlement to a city on the i, j hex
    socket.emit('buyCity', {i: i, j: j, corner: corner});
}

function buyDevelopmentCard(){
    //request to upgrade a settlement to a city on the i, j hex
    socket.emit('buyCity', {});
}

socket.on('buyDevelopmentCard', (data) => {
    //data = {card: DevelopmentCard}
});

function requestTrade(target, offer, recieve){
    //request a trade, offer for recieve
    //offer = recieve = {grain: int, lumber: int, wool: int, ore: int, brick: int}
    //target = playerID, "bank", null
    socket.emit('requestTrade', {target: target, offer: offer, recieve: recieve});
}

socket.on('requestTrade', (data) => {
    // request to trade with bank
    // data = {
    //     target: str
    //     offer: {grain: int, lumber: int, wool: int, ore: int, brick: int}, 
    //     recieve: {grain: int, lumber: int, wool: int, ore: int, brick: int}
    // }
});

function endTurn(){
    //end this player's turn
    socket.emit('endTurn');
}