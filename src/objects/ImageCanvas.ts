export default class ImageCanvas{
    protected img: HTMLImageElement;
    protected _width: number;
    protected _height: number;
    
    public x: number = 0;
    public y: number = 0;
    public isCentered: boolean = false;

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
        this.img = new Image();
        this.img.src =  imgUrl;

        this.x = options.x ?? 0;
        this.y = options.y ?? 0;
        this._width = options.width ?? 0;
        this._height = options.height ?? 0;
        this.isCentered = options.centered ?? false;
    }

    get width(){ return this._width;}
    get height(){ return this._height;}

    async loadImage(url: string){
        this.img = new Image();
        this.img.src = url;

        return new Promise<this>((res, rej) => {
            this.img.onload = () => {
                res(this);
            }
        })
    }

    draw(ctx:CanvasRenderingContext2D){
        if(this.isCentered)
            ctx.drawImage(this.img, this.x - this._height / 2, this.y - this._width / 2, this._width, this._height);
        else
            ctx.drawImage(this.img, this.x, this.y, this._width, this._height);
    }
}