
class Events {
    constructor(){
        document.addEventListener('mousemove', handleMouseMove, false);
        document.addEventListener('touchmove', handleTouchMove, false);
        document.addEventListener('mouseup', handleMouseUp, false);
        document.addEventListener('touchend', handleTouchEnd, false);
    }
    
}