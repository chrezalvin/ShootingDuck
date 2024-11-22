import Shape from "../bases/Shape";

export class Rectangle extends Shape{
    constructor(){
        super();
    }

    draw(ctx: CanvasRenderingContext2D): this {
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(20, 20, 200, 200);

        return this;
    }
}