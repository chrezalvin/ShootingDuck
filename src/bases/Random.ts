
export default function rng(start: number = 0, end: number){
    return Math.floor(start + Math.random() * (end - start));
}

export function getRandomRGB(){
    return `rgb(${rng(0, 255)}, ${rng(0, 255)}, ${rng(0, 255)})`;
}