import Shape from "../bases/Shape";

export class Circle extends Shape{
    constructor(opt?: {x?: number, y?: number, rgb?: string, size?: number}){
        super(opt);
    }

    draw(ctx: CanvasRenderingContext2D): this {
        ctx.fillStyle = this.rgb ?? "rgb(0, 0, 0)";
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();

        return this;
    }
}