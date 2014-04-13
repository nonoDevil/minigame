//
// CleanerScoreScene class
//
var MainLayer = function () {
    cc.log("MainLayer")
    this.isTouched = false;
    this.sprite_list = null;
    this.touch_loc = null;
    this.character = 0;
    this.size = null;
    this.ironman   = null;
    this.batman    = null;
    this.captain   = null;
    this.gaint     = null;
    this.wolverine = null;
};

MainLayer.prototype.onDidLoadFromCCB = function () {
    if (sys.platform == 'browser') {
        this.onEnter();
    }
    else {
        this.rootNode.onEnter = function () {
            this.controller.onEnter();
        };
    }


    this.rootNode.onExit = function () {
        this.controller.onExit();
    };

    this.rootNode.onTouchesBegan = function (touches, event) {
        this.controller.onTouchesBegan(touches, event);
        return true;
    };
    this.rootNode.onTouchesMoved = function (touches, event) {
        this.controller.onTouchesMoved(touches, event);
        return true;
    };
    this.rootNode.onTouchesEnded = function (touches, event) {
        this.controller.onTouchesEnded(touches, event);
        return true;
    };
    //注册触摸事件
    this.rootNode.setTouchEnabled(true);
};


MainLayer.prototype.onEnter = function () {
    var animation = cc.Animation.create();
    for (var i = 1;i <= 9; i++) {
        var frameName = "Images/ironman/" + i + ".png";
        animation.addSpriteFrameWithFile(frameName);
    }

    animation.setDelayPerUnit(1.8/9);
    animation.setRestoreOriginalFrame(true);

    var action = cc.Animate.create(animation);
//    var action2 = cc.Repeat.create(action, 900);
//    var action3 = cc.RepeatForever.create(action);

    this.size = cc.Director.getInstance().getWinSize();
    this.character = 5;
    this.sprite_list = new Array(this.character);

    this.sprite_list[0] = this.batman = cc.Sprite.create("Images/ironman/1.png");
    this.sprite_list[1] = this.captain = cc.Sprite.create("Images/ironman/2.png");
    this.sprite_list[2] = this.gaint = cc.Sprite.create("Images/ironman/3.png");
    this.sprite_list[3] = this.ironman = cc.Sprite.create("Images/ironman/4.png");
    this.sprite_list[4] = this.wolverine = cc.Sprite.create("Images/ironman/5.png");
    for (var i = 0; i < this.character; i++) {
        this.rootNode.addChild(this.sprite_list[i], i);
        this.sprite_list[i].setVisible(true);
        this.sprite_list[i].setPosition(this.size.width*(i+1)/(this.character)-100, this.size.height/2);
    }


    //创建新的sprite
//    this.sprite1 = cc.Sprite.create("Images/ironman/1.png");
//    this.rootNode.addChild(this.sprite1, 10);
//    this.sprite1.setVisible(true);
//    this.sprite1.setPosition(size.width/2, size.height/2);
//    cc.log(this.sprite1);
}

MainLayer.prototype.onExitClicked = function () {
    cc.log("onExitClicked");
}


MainLayer.prototype.onExit = function () {
    cc.log("onExit");
}

cc.Animate.createWithName = function (name) {
    return cc.Animate.create(cc.AnimationCache.getInstance().getAnimation(name));
}

MainLayer.prototype.onTouchesBegan = function(touches, event) {
    //var loc = touches[0].getLocation;
    //cc.log(this.isTouched);
   //this.isTouched = (this.isTouched?false:true);
    return true;
}

MainLayer.prototype.onTouchesMoved = function (touches, event) {
    cc.log("onTouchesMoved");
}

MainLayer.prototype.onTouchesEnded = function (touches, event) {
    cc.log("onTouchesEnded");
    //渲染动作
    var animation = cc.Animation.create();
    for (var i = 1;i <= 9; i++) {
        var frameName = "Images/ironman/" + i + ".png";
        animation.addSpriteFrameWithFile(frameName);
    }
    animation.setDelayPerUnit(1.8/9);
    animation.setRestoreOriginalFrame(true);
    var action = cc.Animate.create(animation);
    var action2 = cc.Repeat.create(action, 900);
    var action3 = cc.RepeatForever.create(action);
    //渲染动作end

    //获得当前触碰的坐标
    this.touch_loc = touches[0].getLocation();
    cc.log(this.touch_loc.x);
    cc.log(this.touch_loc.y);
    //判断触摸范围，相应相应的sprite
    for (var i = 0; i < this.character; i++) {
        cc.log(i);
        var sprite_loc = this.sprite_list[i].getBoundingBox();
        cc.log(sprite_loc.x);
        cc.log(sprite_loc.y);

        if (cc.rectContainsPoint(sprite_loc, this.touch_loc)) {
            cc.log("hahahah");
            this.sprite_list[i].runAction(action);
            break;
        }
    }
//    this.sprite_list[0].runAction(action);
//    var ironman_sprite = this.sprite1.getBoundingBox();
//    var touch_spirte = touches[0].getLocation();
//
//
//    if (cc.rectContainsPoint(ironman_sprite, touch_spirte)) {
//        this.sprite1.runAction(action);
//    }
}


