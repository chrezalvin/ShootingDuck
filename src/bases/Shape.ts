import Position from "./Position";

export default abstract class Shape{
    public pos: Position;
    public rgb: string;
    public alpha: number;
    public size: number;

    constructor(opt?: {x?: number, y?: number, rgb?: string, size?: number}){
        this.pos = new Position(opt.x ?? 0, opt.y ?? 0);
        this.rgb = opt.rgb ?? "rgb(0, 0, 0)";
        this.size = opt.size ?? 0;
    }

    draw(ctx: CanvasRenderingContext2D){
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(this.pos.x, this.pos.y, 1, 1);

        return this;
    };
}