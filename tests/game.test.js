const {Game} = require("../server/models/game.js");

test('testJoinGame', () => {
    var game = new Game('gameid', 'creatorPlayer');
    var result = game.joinGame('slavePlayer');

    //check that there are two players now
    expect(Object.keys(game.players).length).toBe(2);
    expect(result).toBeTruthy();
    expect(game.players['slavePlayer']).toBeDefined();

    //can't add player with non-unique userID
    var result = game.joinGame('slavePlayer');
    expect(Object.keys(game.players).length).toBe(2);
    expect(result).toBeFalsy();
});

test('testLeaveGame', () => {
    var game = new Game('gameid', 'creatorPlayer');
    game.joinGame('slavePlayer');
    game.leaveGame('slavePlayer');

    //check that this player has left
    expect(Object.keys(game.players).length).toBe(1);
    expect(game.players['slavePlayer']).toBeUndefined();

    //check that non-existent players can't be deleted
    game.leaveGame('nonexistent');
    expect(Object.keys(game.players).length).toBe(1);
});