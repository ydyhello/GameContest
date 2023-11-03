cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad() {
        //代表攻击招式的变量    (attack moves)
        this.combo = 0

        //以下获取需要用到的其他节点和组件  (get other nodes and components)
        this.player = cc.find("Canvas/player")
        this.playerScript = this.player.getComponent('player')
        this.playerSprite = cc.find("Canvas/player/sprite")
        this.Anim = this.playerSprite.getComponent(cc.Animation)
        this.spriteScript = this.playerSprite.getComponent('playerSprite')

    },

    start() {
        WebviewBridge.openGSensor(1);
        WebviewBridge.setVKeyboardNumCb3(this.onVKeyboardNumCb, this);
        //点击事件  (Click event)
        // this.node.on(cc.Node.EventType.TOUCH_START, function () {
        //     //按钮放大 (Button gets bigger)
        //     this.node.scaleX = 1.5
        //     this.node.scaleY = 1.5

        //     //攻击招式  (Use another animation for the next move)
        //     this.combo += 1

        //     //状态切换  (State changed)
        //     if (this.spriteScript.state == "jump" || this.spriteScript.state == "dashAtk") {
        //         this.spriteScript.state = "jumpAtk"
        //     }
        //     if (this.spriteScript.state != "jump" && this.spriteScript.state != "jumpAtk") {
        //         if (this.player.y > 0) {
        //             this.spriteScript.state = "jumpAtk"
        //         } else {
        //             this.spriteScript.state = "atk"
        //         }
        //     }


        //     //this.combo 变成1了,播放第一招动画     (this.combo becomes 1, play the first move animation)
        //     if (this.combo == 1) {
        //         this.Anim.play("atk_a")

        //         //角色攻击向前小突进    (Move forward slightly)
        //         this.playerScript.hitforce = 2

        //         //this.combo 变成2了,播放第二招动画      (this.combo has become 2, play the second move animation)
        //     } else if (this.combo == 2) {
        //         this.Anim.play("atk_b")

        //         //第二招出完,this.combo清零,需要下次点击按钮的时候才会再变成1,如此循环交替播放攻击动作  (After the second move is completed, this.combo is cleared, and it will become 1 again when the button is clicked next time, so the attack action is played alternately in a loop)
        //         this.combo = 0

        //         this.playerScript.hitforce = 2

        //     }

        // }, this)


        // //点击事件结束,按钮大小还原 (Click event end, the button size is restored)
        // this.node.on(cc.Node.EventType.TOUCH_END, function () {
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
        if (num == 3 && this._lastKeyboardNum == 0) {
            //攻击招式  (Use another animation for the next move)
            this.combo += 1

            //状态切换  (State changed)
            if (this.spriteScript.state == "jump" || this.spriteScript.state == "dashAtk") {
                this.spriteScript.state = "jumpAtk"
            }
            if (this.spriteScript.state != "jump" && this.spriteScript.state != "jumpAtk") {
                if (this.player.y > 0) {
                    this.spriteScript.state = "jumpAtk"
                } else {
                    this.spriteScript.state = "atk"
                }
            }


            //this.combo 变成1了,播放第一招动画     (this.combo becomes 1, play the first move animation)
            if (this.combo == 1) {
                this.Anim.play("atk_a")

                //角色攻击向前小突进    (Move forward slightly)
                this.playerScript.hitforce = 2

                //this.combo 变成2了,播放第二招动画      (this.combo has become 2, play the second move animation)
            } else if (this.combo == 2) {
                this.Anim.play("atk_b")

                //第二招出完,this.combo清零,需要下次点击按钮的时候才会再变成1,如此循环交替播放攻击动作  (After the second move is completed, this.combo is cleared, and it will become 1 again when the button is clicked next time, so the attack action is played alternately in a loop)
                this.combo = 0

                this.playerScript.hitforce = 2

            }

        }

        this._lastKeyboardNum = num;
    },

    // update (dt) {},
});
