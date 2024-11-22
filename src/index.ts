import configs from "./configs";

import "./style.css";
import ImageCanvas from "./objects/ImageCanvas";
import Shape from "./bases/Shape";
import { Circle } from "./objects/Circle";
import Projectile from "./objects/Projectile";
import FPSCounter from "./objects/fpscounter";
import { Target } from "./objects/Target";
import rng from "./bases/Random";
import Duck from "./objects/Duck";

const canvas = document.querySelector("canvas");
const body = document.querySelector("body");

canvas.height = window.innerHeight - 5;
canvas.width = window.innerWidth - 5;

const fps = new FPSCounter();

//  context2d for canvas
const ctx = canvas.getContext("2d");

let bullets = configs.max_bullets;
let reloadTimer = 0;
let ducksShooted = 0;

const targ = new Target(configs.targetImg, {
    height: configs.cursor_size, width: configs.cursor_size, centered: true
})
let ducks: Duck[] = [];
let projectiles: Projectile<Shape>[] = [];

let targetPos: {x: number, y: number} = {
    x: 0,
    y: 0
};

function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function reload(){
    reloadTimer = 0;
    const timeMultiplier = 100;

    const num = setInterval(() => {
        reloadTimer += timeMultiplier;
        if(reloadTimer === configs.bullet_reload_time){
            reloadTimer = 0;
            ++bullets;
            if(bullets === configs.max_bullets)
                clearInterval(num);
        }
    }, timeMultiplier);
}

function repeatString(str: string, repeat: number){
    let r_str = "";
    for(let iii = 0; iii < repeat; ++iii)
        r_str += str;

    return r_str;
}

function bulletCounter(ctx: CanvasRenderingContext2D, amount: number){
    ctx.fillStyle = "red";
    ctx.font = "40px bold";

    const bulletHeight = 10;
    const bulletWidth = 6;
    const padding = 1;
    const bulletColor = "green";

    ctx.fillStyle = bulletColor;
    for(let iii = 0; iii < amount; ++iii)
        ctx.fillRect(20 + (bulletWidth + padding) * iii, ctx.canvas.height - 20 - bulletHeight, bulletWidth, bulletHeight);
}

function duckShotCounter(ctx: CanvasRenderingContext2D, amount: number){
    const height = 20;
    const bottom = ctx.canvas.height - 20;
    const center = ctx.canvas.width / 2;

    ctx.fillStyle = "black";
    ctx.arc(center - height / 2, bottom - height/4, height / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();

    ctx.font = `bold ${height}px arial`;
    ctx.fillText(` x ${amount}`, center, bottom);
}

function loop(){
    if(ducks.length === 0)
        for(let iii = 0; iii < rng(0, 5); ++iii)
            ducks.push(Duck.generateRandomDuck(ctx));

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fps.count();
    bulletCounter(ctx, bullets);
    duckShotCounter(ctx, ducksShooted);
    
    projectiles = projectiles.filter(projectile => !projectile.isDone)

    targ.draw(ctx, {reloadTimer: reloadTimer, maxTime: configs.bullet_reload_time});

    for(const projectile of projectiles){
        projectile.draw(ctx);
    }

    ducks = ducks.filter(duck => ((duck.x <= canvas.width && duck.x >= 0) && (duck.y <= canvas.height &&  duck.y >= 0)));

    for(const duck of ducks){
        duck.draw(ctx);
    }

    for(const duck of ducks)
        duck.update();

    fps.draw(ctx, ctx.canvas.width - 25, ctx.canvas.height - 25, 20);
    requestAnimationFrame(loop);
}

function getRandomElement<_T>(arr: _T[]): _T{
    return arr[rng(0, arr.length)];
}

function init(canvas: HTMLCanvasElement){
    canvas.addEventListener("click", (_) => {
        if(bullets > 0){
            projectiles.push(new Projectile(new Circle({...targ, size: 5}), 3000));
            for(const duck of ducks)
                if(duck.tryShoot(targ)){
                    getRandomElement(configs.duckSounds).play();
                    ++ducksShooted;
                }
            if(bullets === configs.max_bullets)
                reload();
            (configs.gunSound.cloneNode(true) as HTMLAudioElement).play();
            --bullets;
        }
        else (configs.emptyGunSound.cloneNode(true) as HTMLAudioElement).play();
    })

    canvas.addEventListener('mousemove', (evt) => {
        targetPos = getMousePos(canvas, evt);
        targ.x = targetPos.x;
        targ.y = targetPos.y;
    })

    loop();
}

init(canvas);