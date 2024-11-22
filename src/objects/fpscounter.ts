export default class FPSCounter{
    private _frameCount = 0;
    private _lastFPS = this._frameCount;

    constructor(){
        setInterval(() => {
            this._lastFPS = this._frameCount;
            this._frameCount = 0;
        }, 1000);
    }

    get fps(){ return this._lastFPS; }
    count(){ ++this._frameCount; return this; }

    draw(ctx: CanvasRenderingContext2D, x: number, y: number, size: number){
        if(this._lastFPS > 30)
            ctx.fillStyle = "green";
        else if(this._lastFPS > 10)
            ctx.fillStyle = "yellow";
        else 
            ctx.fillStyle = "red";

        ctx.font = `bold ${size}px serif`;
        ctx.fillText(`${this._lastFPS}`, x, y);
    }
}