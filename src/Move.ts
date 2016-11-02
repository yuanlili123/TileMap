
const Big1 = 1;

const Big2 = 30;

const Big3 = 50;

class complexor {
    _x: number = 0;
    _y: number = 0;
    public constructor(x: number = 0, y: number = 0) {
        this._x = x;
        this._y = y;
    }
    public get x(): number {
        return this._x;
    }
    public set x(x: number) {
        this._x = x;
    }
    public get y(): number {
        return this._y;
    }
    public set y(y: number) {
        this._y = y;
    }
}
class complexor_pixel extends complexor {
    size: number = 1;
    public constructor(x: number, y: number, size: number) {
        super(x, y);
        this.size = size;
        this.x = x * this.size;
        this.y = y * this.size;
    }
    public get ix(): number {
        return this.x / this.size;
    }
    public set ix(sax: number) {
        this.x = sax * this.size;
    }
    public get iy(): number {
        return this.y / this.size;
    }
    public set iy(sax: number) {
        this.y = sax * this.size;
    }
    public get iPos(): complexor {
        return new complexor(this.ix, this.iy);
    }
    public get Pos(): complexor {
        return new complexor(this.x, this.y);
    }
    public static PixelToReal(sax: number): number {
        return sax * Big1;
    }
    public static RealToPixel(sax: number): number {
        return sax / Big1;
    }
}
class complexor_p2 extends complexor_pixel {
    public constructor(x: number, y: number) {
        super(x, y, Big2);
    }
    public static PixelToReal(sax: number): number {
        return sax * Big2;
    }
    public static RealToPixel(sax: number): number {
        return sax / Big2;
    }

}
class complexor_p3 extends complexor_pixel {
    public constructor(x: number, y: number) {
        super(x, y, Big3);
    }
    public static PixelToReal(sax: number): number {
        return sax * Big3;
    }
    public static RealToPixel(sax: number): number {
        return sax / Big3;
    }

}
class Animation{
    timePassed:number;
    FPS:number=4;
    textureList=[];
    curFrame:number;
    self:egret.Bitmap;
    public constructor(anim:any,self:egret.Bitmap,FPS = 4){
        this.textureList=anim;
        this.self=self;
        this.FPS=FPS;
        this.timePassed=0;
        this.curFrame=0;
    }
    public playCurcularly(timePassed:number){
        this.timePassed+=timePassed;
        if(this.timePassed>= 1000/this.FPS){
            this.timePassed-=(1000/this.FPS);
            this.curFrame=(++this.curFrame) % this.textureList.length;
            this.self.texture=RES.getRes(this.textureList[this.curFrame]);
        }
    }
    public playOnce(order:string,timePassed:number){
        this.timePassed+=timePassed;
        if(this.timePassed>= 1000/this.FPS){
            this.timePassed-=(1000/this.FPS);
            var list=this.textureList[order];
            if(this.curFrame < list.length){
                this.self.texture=RES.getRes(list[this.curFrame]);
                this.curFrame++;
            }
        }
    }
}

interface State {
    player :any;
    EnterState();
    DuringState(enterTimes:number);
    ExitState();
    GetState():State;
    StateName:String;
}

class StateMachine {
    curState: State;
    context: any;
    time = 0;
    constructor(firstState: State) {
        this.curState = firstState;
        this.curState.EnterState();
    }
    public runMachine(timeStamp:number):boolean {
        var now = timeStamp;
        let time = this.time;
        let pass = now-time;
        this.time=now;
        this.curState.DuringState(pass);
        var newState: State = this.curState.GetState();
        if (newState !=this.curState) {
            console.log("switch to new state");
            this.curState.ExitState();
            this.curState = newState;
            this.curState.EnterState();
        }
        return false;
    }
    public switchState(target:State){
        this.curState.ExitState();
        target.EnterState();
        this.curState=target;
    }
}