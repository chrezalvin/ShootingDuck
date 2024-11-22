export interface Drawable{
    draw: (ctx: CanvasRenderingContext2D, width: number, height: number, x: number, y: number, rgb: string) => any;
}

export default class CanvasEntity<_T extends Drawable>{
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public rgb: string;

    public _shape: _T;

    constructor(shape: _T, options?: {
        x?: number,
        y?: number,
        rgb?: string,
        width?: number,
        height?: number,
    }){
        this._shape = shape;
        this.x = options.x ?? 0;
        this.y = options.y ?? 0;
        this.width = options.width ?? 0;
        this.height =  options.height ?? 0;
        this.rgb = options.rgb ?? "";
    }

    move(opt: {x?: number, y?: number}){
        this.x += opt.x ?? 0;
        this.y += opt.y ?? 0;

        return this;
    }

    draw(ctx: CanvasRenderingContext2D){
        this._shape.draw(ctx, this.width, this.height, this.x, this.y, this.rgb);
    }
}