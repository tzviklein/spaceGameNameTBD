const gameCanvas = document.getElementById('gameCanvas');
const gcContext = gameCanvas.getContext('2d');
const backgrounds = Array.from(document.getElementsByClassName('background'));
const bgOneContext = backgrounds[0].getContext('2d');
const bgTwoContext = backgrounds[1].getContext('2d');
const bgContexts = [bgOneContext, bgTwoContext];//what is this for? why am i an idiot?
//what is the meaning of life the universe and everything?
//is there a rewason i'm typing all of this or am i just procrastinating?
// const backgroundCanvasOne = document.getElementById('firstCanvas');
// const backgroundCanvasTwo = document.getElementById('secondCanvas');
// const background = [backgroundCanvasOne, backgroundCanvasTwo];
const gameWidth = gameCanvas.offsetWidth;
const gameHeight = gameCanvas.offsetHeight;
const stars = gameWidth;
// console.log(gameWidth)

for (let b = 0; b < backgrounds.length; b++) {
    for (let i = 0; i < stars; i++) {
        let x = Math.random() * gameWidth;
        let y = Math.random() * gameHeight;
        
        if (i % 10 === 0) bgContexts[b].fillStyle = 'blue';
        else if (i % 5 === 0) bgContexts[b].fillStyle = 'orange';
        else if (i % 4 === 0) bgContexts[b].fillStyle = 'yellow';
        else bgContexts[b].fillStyle = 'white';
        if (i % 30 === 0 || i % 15 === 0 || i % 16 === 0) {
            bgContexts[b].beginPath();
            bgContexts[b].arc(x, y, Math.random() * 2.2, 0, 360);
            // context.fillStyle = 'blue';
            bgContexts[b].fill();
        }
        bgContexts[b].fillRect(x, y, 1, 1);
    }
}

backgrounds[0].style.top = '-' + gameHeight + 'px';
backgrounds[1].style.top = '0px';

class Background {
    constructor() {
        this.currentStepFirstBg = parseInt(window.getComputedStyle(backgrounds[0]).top);
        this.currentStepSecondBg = parseInt(window.getComputedStyle(backgrounds[1]).top);
    }
    scroll() {
        this.currentStepFirstBg = parseInt(window.getComputedStyle(backgrounds[0]).top);
        this.currentStepSecondBg = parseInt(window.getComputedStyle(backgrounds[1]).top);

        if (this.currentStepFirstBg >= gameHeight) this.currentStepFirstBg = gameHeight * -1;
        if (this.currentStepSecondBg >= gameHeight) this.currentStepSecondBg = gameHeight * -1;
        
        backgrounds[0].style.top = this.currentStepFirstBg + 3 + 'px';
        backgrounds[1].style.top = this.currentStepSecondBg + 3 + 'px';
    }
}
const animateBackground = new Background();

class InputHandler {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight')
                && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                }
        });
        window.addEventListener('keyup',e => {
            if (e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight') {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
        });
    }
}
const inputs = new InputHandler();

class PlayerShip {
    constructor() {
        this.gameWidth = 542;
        this.gameHeight = 550;
        this.shipPosX = 250;
        this.shipPosY = 430;
        this.image = new Image();
        this.image.src = 'Player_Ship2c.png';
        this.step = 0;
        this.framewidth = 72;
        this.slowFrame = 0
    }
    draw(ctx) {
        this.framePosition = this.step * this.framewidth;
        ctx.clearRect(this.shipPosX - 5, this.shipPosY - 5, 80, 110);
        ctx.drawImage(this.image, this.framePosition, 0, 72, 100, this.shipPosX, this.shipPosY, 30, 75);
        
        this.slowFrame ++;
        if (this.slowFrame % 6 === 0) this.step ++;
        if (this.step === 3) this.step = 0;
    }
    movement(keypress) {
        if (keypress.indexOf('ArrowRight') > -1 && (this.shipPosX + 72) < this.gameWidth) {
            this.shipPosX += 3;
        }
        if (keypress.indexOf('ArrowLeft') > -1 && this.shipPosX > 0) this.shipPosX -= 3;
        if (keypress.indexOf('ArrowUp') > -1 && this.shipPosY > 0) this.shipPosY -= 3;
        if (keypress.indexOf('ArrowDown') > -1 && (this.shipPosY + 100) < this.gameHeight) {
            this.shipPosY += 3;
        }
    }
}
const animatePlayerShip = new PlayerShip();

class Mi


function animateStuff() {
    animateBackground.scroll();
    animatePlayerShip.draw(gcContext);
    animatePlayerShip.movement(inputs.keys)
    
    window.requestAnimationFrame(animateStuff);
}
animateStuff();