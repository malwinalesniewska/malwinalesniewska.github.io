import { Game } from './game';


let game = new Game();
game.showFurry();
game.showCoin();
game.startGame();
$(document).on("keydown", () => {
    game.turnFurry(event);
});