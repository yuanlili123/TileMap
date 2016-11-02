var Big1 = 1;
var Big2 = 30;
var Big3 = 50;
var complexor = (function () {
    function complexor(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._x = 0;
        this._y = 0;
        this._x = x;
        this._y = y;
    }
    var d = __define,c=complexor,p=c.prototype;
    d(p, "x"
        ,function () {
            return this._x;
        }
        ,function (x) {
            this._x = x;
        }
    );
    d(p, "y"
        ,function () {
            return this._y;
        }
        ,function (y) {
            this._y = y;
        }
    );
    return complexor;
}());
egret.registerClass(complexor,'complexor');
var complexor_pixel = (function (_super) {
    __extends(complexor_pixel, _super);
    function complexor_pixel(x, y, size) {
        _super.call(this, x, y);
        this.size = 1;
        this.size = size;
        this.x = x * this.size;
        this.y = y * this.size;
    }
    var d = __define,c=complexor_pixel,p=c.prototype;
    d(p, "ix"
        ,function () {
            return this.x / this.size;
        }
        ,function (sax) {
            this.x = sax * this.size;
        }
    );
    d(p, "iy"
        ,function () {
            return this.y / this.size;
        }
        ,function (sax) {
            this.y = sax * this.size;
        }
    );
    d(p, "iPos"
        ,function () {
            return new complexor(this.ix, this.iy);
        }
    );
    d(p, "Pos"
        ,function () {
            return new complexor(this.x, this.y);
        }
    );
    complexor_pixel.PixelToReal = function (sax) {
        return sax * Big1;
    };
    complexor_pixel.RealToPixel = function (sax) {
        return sax / Big1;
    };
    return complexor_pixel;
}(complexor));
egret.registerClass(complexor_pixel,'complexor_pixel');
var complexor_p2 = (function (_super) {
    __extends(complexor_p2, _super);
    function complexor_p2(x, y) {
        _super.call(this, x, y, Big2);
    }
    var d = __define,c=complexor_p2,p=c.prototype;
    complexor_p2.PixelToReal = function (sax) {
        return sax * Big2;
    };
    complexor_p2.RealToPixel = function (sax) {
        return sax / Big2;
    };
    return complexor_p2;
}(complexor_pixel));
egret.registerClass(complexor_p2,'complexor_p2');
var complexor_p3 = (function (_super) {
    __extends(complexor_p3, _super);
    function complexor_p3(x, y) {
        _super.call(this, x, y, Big3);
    }
    var d = __define,c=complexor_p3,p=c.prototype;
    complexor_p3.PixelToReal = function (sax) {
        return sax * Big3;
    };
    complexor_p3.RealToPixel = function (sax) {
        return sax / Big3;
    };
    return complexor_p3;
}(complexor_pixel));
egret.registerClass(complexor_p3,'complexor_p3');
var Animation = (function () {
    function Animation(anim, self, FPS) {
        if (FPS === void 0) { FPS = 4; }
        this.FPS = 4;
        this.textureList = [];
        this.textureList = anim;
        this.self = self;
        this.FPS = FPS;
        this.timePassed = 0;
        this.curFrame = 0;
    }
    var d = __define,c=Animation,p=c.prototype;
    p.playCurcularly = function (timePassed) {
        this.timePassed += timePassed;
        if (this.timePassed >= 1000 / this.FPS) {
            this.timePassed -= (1000 / this.FPS);
            this.curFrame = (++this.curFrame) % this.textureList.length;
            this.self.texture = RES.getRes(this.textureList[this.curFrame]);
        }
    };
    p.playOnce = function (order, timePassed) {
        this.timePassed += timePassed;
        if (this.timePassed >= 1000 / this.FPS) {
            this.timePassed -= (1000 / this.FPS);
            var list = this.textureList[order];
            if (this.curFrame < list.length) {
                this.self.texture = RES.getRes(list[this.curFrame]);
                this.curFrame++;
            }
        }
    };
    return Animation;
}());
egret.registerClass(Animation,'Animation');
var StateMachine = (function () {
    function StateMachine(firstState) {
        this.time = 0;
        this.curState = firstState;
        this.curState.EnterState();
    }
    var d = __define,c=StateMachine,p=c.prototype;
    p.runMachine = function (timeStamp) {
        var now = timeStamp;
        var time = this.time;
        var pass = now - time;
        this.time = now;
        this.curState.DuringState(pass);
        var newState = this.curState.GetState();
        if (newState != this.curState) {
            console.log("switch to new state");
            this.curState.ExitState();
            this.curState = newState;
            this.curState.EnterState();
        }
        return false;
    };
    p.switchState = function (target) {
        this.curState.ExitState();
        target.EnterState();
        this.curState = target;
    };
    return StateMachine;
}());
egret.registerClass(StateMachine,'StateMachine');
//# sourceMappingURL=Move.js.map