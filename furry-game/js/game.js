import {Furry} from "./furry";
import {Coin} from "./coin";

export class Game {
    constructor() {
        this.furry = new Furry();
        this.coin = new Coin();
        this.board = $('#board>div');
        this.score = 0;
    }

    index(x,y) {
        return x + (y * 10);
    }

    showFurry() {
        this.board[ this.index(this.furry.x, this.furry.y) ].classList.add('furry');
    }

    hideVisibleFurry() {
        $('.furry').removeClass('furry');
    }

    showCoin() {
        this.board[ this.index(this.coin.x, this.coin.y) ].classList.add('coin')
    }

    moveFurry() {
        const self = this;
        this.hideVisibleFurry();
        let direction = this.furry.direction;
        switch (direction) {
            case 'right':
                this.furry.x += 1;
                break;
            case 'left':
                this.furry.x -= 1;
                break;
            case 'up':
                this.furry.y -= 1;
                break;
            case 'down':
                this.furry.y += 1;
        }
        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();
    }

    turnFurry (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    }

    checkCoinCollision() {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            $('.coin').removeClass('coin');
            this.score += 1;
            $('#score strong').text(this.score);
            this.coin = new Coin();
            this.showCoin();
        }
    }

    gameOver() {
        let score = $('#score');
        let over = $('#over');
        let finalScore = $('#final-score');
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.isSetIntervalId);
            this.hideVisibleFurry();
            this.board.hide();
            score.hide();
            over.show();
            finalScore.text(`Final score: ${this.score}`);
            $('#try-again').on("click", ()=> {
                location.reload();
            })
        }
    }

    startGame() {
        let self = this;
        let intervalId = setInterval(function () {
            self.moveFurry();
        }, 250);
        this.isSetIntervalId = intervalId;
    }
}
