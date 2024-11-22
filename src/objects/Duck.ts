import rng from "../bases/Random";
import ImageCanvas from "./ImageCanvas";

import configs from "../configs";

export default class Duck extends ImageCanvas{
    private _lift: number;
    private _speed: number;
    private _isDead: boolean = false;

    constructor(
        imgUrl: string,
        lift: number = 0,
        speed: number = 0,
        options?: {
            width?: number,
            height?: number,
            x?: number,
            y?: number,
            centered?: boolean,
        },
    ){
        super(imgUrl, options);

        this._lift = lift;
        this._speed = speed;
        // this._width = 20;
        // this._height = 20;
    }

    update(){
        if(this._isDead)
            this.y += 5;
        else{
            this.x += this._speed;
            this.y += this._lift;
        }
    }

    get isDead(){ return this._isDead; }

    tryShoot(coord: {x: number, y: number}){
        if(this._isDead) return false;
        if((this.x - this._width < coord.x && this.x + this._width > coord.x) && (this.y - this._height < coord.y && this.y + this._height > coord.y)){
            this._isDead = true;
            return true;
        }
        return false;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
        // ctx.fill();
        // ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, this._width, this._height);
    }

    static generateRandomDuck(ctx: CanvasRenderingContext2D, imgUrl?: string){
        const left = 0;
        const right = ctx.canvas.width;
        const bottom = 0;
        const top = ctx.canvas.height;

        const startingX = rng(0, 10) % 2 == 0 ? left : right;
        const startingY = rng(0, 10) % 2 == 0 ? top : bottom;
        let movex = rng(1, 5) * ((startingX === left) ? 1 : -1);
        let movey = rng(1, 5) * ((startingY === top) ? -1: 1);

        return new Duck(imgUrl ?? configs.yayMe, movey, movex, {
            height: rng(5, 10) * 5,
            width: rng(10, 20) * 5,
            x: startingX,
            y: startingY
        })
    }
}