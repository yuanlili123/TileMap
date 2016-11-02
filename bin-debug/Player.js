var PLAYER_SPEED = 0.5;
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this);
        this.isLeftFacing = false;
        this.speed = PLAYER_SPEED;
        this.appearance = new egret.Bitmap();
        this.appearance.height = 90;
        this.appearance.width = 60;
        this.appearance.scaleX = 0.50;
        this.appearance.scaleY = 0.50;
        this.appearance.anchorOffsetX = 40;
        this.appearance.anchorOffsetY = 42;
        this.animationList = {
            "idle_left": ["i0L_png", "i1L_png", "i2L_png", "i3L_png", "i4L_png", "i5L_png", "i6L_png", "i7L_png", "i8L_png", "i9L_png", "i10L_png", "i11L_png", "i12L_png", "i13L_png"],
            "idle_right": ["i0R_png", "i1R_png", "i2R_png", "i3R_png", "i4R_png", "i5R_png", "i6R_png", "i7R_png", "i8R_png", "i9R_png", "i10R_png", "i11R_png", "i12R_png", "i13R_png"],
            "walk_left": ["r0L_png", "r1L_png", "r2L_png", "r3L_png", "r4L_png", "r5L_png", "r6L_png", "r7L_png"],
            "walk_right": ["r0R_png", "r1R_png", "r2R_png", "r3R_png", "r4R_png", "r5R_png", "r6R_png", "r7R_png"]
        };
        this.fsm = new StateMachine(new IdleState(this));
        egret.startTick(this.fsm.runMachine, this.fsm);
        this.addChild(this.appearance);
    }
    var d = __define,c=Player,p=c.prototype;
    p.move = function (location) {
        this._moveState = new MoveState(this, location);
        this.fsm.switchState(this._moveState);
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Player;
}(egret.DisplayObjectContainer));
egret.registerClass(Player,'Player');
var IdleState = (function () {
    function IdleState(player) {
        this.Onidel = true;
        this.StateName = "Idle";
        this.player = player;
    }
    var d = __define,c=IdleState,p=c.prototype;
    p.EnterState = function () {
        this.Onidel = true;
        this.player.curAnimation = new Animation(this.player.animationList[this.player.isLeftFacing ? "idle_left" : "idle_right"], this.player.appearance, 8);
    };
    p.DuringState = function (pass) {
        this.player.curAnimation.playCurcularly(pass);
    };
    p.ExitState = function () {
        this.Onidel = false;
    };
    p.GetState = function () {
        return this;
    };
    return IdleState;
}());
egret.registerClass(IdleState,'IdleState',["State"]);
var MoveState = (function () {
    function MoveState(player, location) {
        this.OnMove = false;
        this.StateName = "Move";
        this.isOnposition = false;
        this.player = player;
        this.playerlocation = location;
        this.player.isLeftFacing = ((location.x - this.player.x) > 0 ? false : true);
    }
    var d = __define,c=MoveState,p=c.prototype;
    p.EnterState = function () {
        this.isOnposition = false;
        console.log("walk from:" + this.player.x.toFixed(1) + "  " + this.player.y.toFixed(1)
            + ", to:" + this.playerlocation.x.toFixed(1) + "  " + this.playerlocation.y.toFixed(1));
        this.player.curAnimation = new Animation(this.player
            .animationList[this.player.isLeftFacing ? "walk_left" : "walk_right"], this.player.appearance, 8);
        var funcChange = function () {
        };
        var tween = egret.Tween.get(this.player, { onChange: funcChange, onChangeObj: this.player });
        tween.to({
            x: this.playerlocation.x,
            y: this.playerlocation.y
        }, Math.sqrt(Math.pow((this.playerlocation.x - this.player.x), 2) +
            Math.pow((this.playerlocation.y - this.player.y), 2)) / this.player.speed, egret.Ease.sineInOut);
    };
    p.DuringState = function (pass) {
        this.player.curAnimation.playCurcularly(pass);
    };
    p.ExitState = function () {
        this.OnMove = false;
        this.isOnposition = true;
        console.log("Get Target Location");
    };
    p.GetState = function () {
        if (Math.abs(this.player.x - this.playerlocation.x) < 1) {
            return new IdleState(this.player);
        }
        else {
            return this;
        }
    };
    return MoveState;
}());
egret.registerClass(MoveState,'MoveState',["State"]);
//# sourceMappingURL=Player.js.map