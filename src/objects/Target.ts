import ImageCanvas from "./ImageCanvas";

export class Target extends ImageCanvas{

    constructor(
        imgUrl: string, 
        options?: {
            width?: number, 
            height?: number,
            x?: number,
            y?: number,
            centered?: boolean,
        },
    ){
        super(imgUrl, options);
    }

    draw(ctx: CanvasRenderingContext2D, timer?: {reloadTimer: number, maxTime: number}){
        if(timer){
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.lineWidth = 5;
            ctx.arc(this.x, this.y, this.width/2 + 5, 0, timer.reloadTimer / timer.maxTime * Math.PI * 2 );
            ctx.stroke();
            ctx.beginPath();
        }
        super.draw(ctx);
    }
}