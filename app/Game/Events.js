
class Events {
    constructor(game){
        this.game = game;
        document.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
        document.addEventListener('mouseup', this.handleMouseUp.bind(this), false);
        document.addEventListener('touchend', this.handleTouchEnd.bind(this), false);
    }
    handleMouseMove(event) {
        var tx = -1 + (event.clientX / this.game.sceneObj.WIDTH)*2;
        var ty = 1 - (event.clientY / this.game.sceneObj.HEIGHT)*2;
        this.game.sceneObj.mousePos = {x:tx, y:ty};
    }

    handleTouchMove(event) {
        event.preventDefault();
        var tx = -1 + (event.touches[0].pageX / this.game.sceneObj.WIDTH)*2;
        var ty = 1 - (event.touches[0].pageY / this.game.sceneObj.HEIGHT)*2;
        this.game.sceneObj.mousePos = {x:tx, y:ty};
    }
    handleMouseUp(event){
        if (this.game.status == "waitingReplay"){
            this.game.reset();
            this.game.hideReplay();
        }
    }
    handleTouchEnd(event){
        if (this.game.status == "waitingReplay"){
            this.game.reset();
            this.game.hideReplay();
        }
    }
}

export default Events