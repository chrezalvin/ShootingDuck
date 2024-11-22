export default class Position{
    public x: number;
    public y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    translateX(dx: number){
        this.x += dx;
        return this;
    }

    translateY(dy: number){
        this.y += dy;
        return this;
    }

    translate(dx: number = 0, dy: number = 0){
        this.x += dx;
        this.y += dy;
        return this;
    }
}