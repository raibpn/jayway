export class Robot{

    static _instance: Robot;

    x: number; //x-axis
    y: number; //y-axis
    d: string; //direection
    
    constructor(x: number, y: number, d: string) {
    this.x = x;
    this.y = y;
    this.d = d;
    }
    
    static getInstance(x: number, y: number, d: string) {
        if (!Robot._instance) {
            Robot._instance = new Robot(x, y, d)
        }
        
        return Robot._instance;
    }


}