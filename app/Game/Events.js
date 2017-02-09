
class Events {
    constructor(game){
        this.game = game;
        document.addEventListener('mousemove', this.handleMouseMove, false);
        document.addEventListener('touchmove', this.handleTouchMove, false);
        document.addEventListener('mouseup', this.handleMouseUp, false);
        document.addEventListener('touchend', this.handleTouchEnd, false);
    }
    handleMouseMove(event) {
        var tx = -1 + (event.clientX / WIDTH)*2;
        var ty = 1 - (event.clientY / HEIGHT)*2;
        mousePos = {x:tx, y:ty};
    }

    handleTouchMove(event) {
        event.preventDefault();
        var tx = -1 + (event.touches[0].pageX / WIDTH)*2;
        var ty = 1 - (event.touches[0].pageY / HEIGHT)*2;
        mousePos = {x:tx, y:ty};
    }
    handleMouseUp(event){
        if (this.game.status == "waitingReplay"){
            resetGame();
            hideReplay();
        }
    }
    handleTouchEnd(event){
        if (this.game.status == "waitingReplay"){
            resetGame();
            hideReplay();
        }
    }
}

export default Events