interface Drawable{
    draw: (ctx: CanvasRenderingContext2D) => this;
}

export default class Projectile<_T extends Drawable>{
    public projectileShape: _T;
    private hasGone: boolean = false;

    constructor(shape: _T, timeoutms: number){
        this.projectileShape = shape;

        setTimeout(() => {
            this.hasGone = true;
        }, timeoutms);
    }

    get isDone(){ return this.hasGone; }

    draw(ctx: CanvasRenderingContext2D){
        if(!this.isDone)
            this.projectileShape.draw(ctx);
    }
}