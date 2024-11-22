// import Shape from "../bases/Shape";

// export default class Player{
//    name: string;
//    shape: Shape;
//    max_stamina = 100;
//    stamina = 100;
//    score = 0;

//    constructor(name: string, shape: Shape){
//       this.name = name;
//       this.shape = shape;
//    }

//    addScore(score: number){
//       this.score += score;
//       this.max_stamina = 100 + Math.floor(this.score/10000 * 100);
//    }

//    draw(ctx: HTMLCanvasElement){
//       this.shape.draw(ctx);

//       // add name
//       ctx.textAlign = "center";
//       ctx.fillStyle = "rgb(0, 0, 0)";
//       ctx.font = "20px bold";
//       ctx.fillText(this.name, this.shape.x, this.shape.y - this.shape.size / 2 - 3);
//    }

//    enlarge(size: number){
//       this.shape.size += size;
//    }

//    reset(){
//       this.shape.x = 0;
//       this.shape.y = 0;
//       this.shape.size = 10;
//       this.score = 0;
//       this.max_stamina = 100;
//       this.stamina = 0;
//    }
// }