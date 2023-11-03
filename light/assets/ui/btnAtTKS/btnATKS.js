cc.Class({
    extends: cc.Component,

    properties: {
        HPnST: {
            default: null,
            type: cc.Node,
        },
    },
    onLoad() {
        //获取主角sprite节点    (Get the player character sprite node)
        this.playerSprite = cc.find("Canvas/player/sprite")
        //获取sprite节点动画组件    (Get sprite node animation component)
        this.Anim = this.playerSprite.getComponent(cc.Animation)
        //获取sprite脚本    (Get sprite script)
        this.spriteScript = this.playerSprite.getComponent('playerSprite')
        //
        this.player = cc.find("Canvas/player").getComponent('player')
    },
    start() {
        WebviewBridge.openGSensor(1);
        WebviewBridge.setVKeyboardNumCb2(this.onVKeyboardNumCb, this);
        //点击事件   (Click event)
        // this.node.on(cc.Node.EventType.TOUCH_START, function () {
        //     //放大按钮  (Button gets bigger)
        //     this.node.scaleX = 1.5
        //     this.node.scaleY = 1.5
        //     //播动画 (play the animation)
        //     if (this.spriteScript.state == "stand" && this.player.st >= 2) {

        //         //扣除耐力
        //         this.player.st -= 2
        //         this.HPnST.getComponent('HPnST').HPchange()

        //         this.spriteScript.state = "atks"
        //         this.Anim.play("atks")
        //         //音效  (Sound effect)
        //         this.node.getComponent(cc.AudioSource).play()
        //     }
        // }, this)
        // //点击事件结束  (Click event end, the button size is restored)
        // this.node.on(cc.Node.EventType.TOUCH_END, function () {
        //     //按钮缩小
        //     this.node.scaleX = 1.3
        //     this.node.scaleY = 1.3
        // }, this)
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
        //     this.node.scaleX = 1.3
        //     this.node.scaleY = 1.3

        // }, this)
    },
    _lastKeyboardNum: 0,
    onVKeyboardNumCb(num) {
        if (num == 2 && this._lastKeyboardNum == 0) {
            if (this.spriteScript.state == "stand" && this.player.st >= 2) {

                //扣除耐力
                this.player.st -= 2
                this.HPnST.getComponent('HPnST').HPchange()

                this.spriteScript.state = "atks"
                this.Anim.play("atks")
                //音效  (Sound effect)
                this.node.getComponent(cc.AudioSource).play()
            }
        }

        this._lastKeyboardNum = num;
    },

    // update (dt) {

    // },
});
