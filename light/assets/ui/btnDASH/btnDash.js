

cc.Class({
    extends: cc.Component,

    properties: {
        //Get the effect
        dasheff: {
            default: null,
            type: cc.Prefab,
        },
        //Get the Jump button
        jumpBtn: {
            default: null,
            type: cc.Node,
        },
        //Get the dust of dash
        dashDust: {
            default: null,
            type: cc.Prefab,

        },
        dashDust: {
            default: null,
            type: cc.Prefab,

        },
        HPnST: {
            default: null,
            type: cc.Node,
        },

    },

    onLoad() {
        //可否旋转 (Ready to dashAtk)
        this.ready = 0
        //是否在平台上 (on the platform or not)
        this.OnPlatform = false
        //是否冲刺中 (Already doing dash or not)
        this.IsDash = false
        //冲刺移动幅度 (Dash speed)
        this.dashSPD = 0
        //获取主角节点  (Get player node)
        this.player = cc.find("Canvas/player")
        //获取主角脚本  (Get player script)
        this.playerScript = this.player.getComponent('player')
        //获取主角sprite节点    (Get player sprite)
        this.playerSprite = cc.find("Canvas/player/sprite")
        //获取sprite节点动画组件    (Get sprite animation component)
        this.Anim = this.playerSprite.getComponent(cc.Animation)
        //获取sprite脚本    (Get player sprite's script)
        this.spriteScript = this.playerSprite.getComponent('playerSprite')
        //获取跳跃脚本  (Get jump button script)
        this.jbS = this.jumpBtn.getComponent('btnJump')

    },


    start() {
        WebviewBridge.openGSensor(1);
        WebviewBridge.setVKeyboardNumCb4(this.onVKeyboardNumCb, this);
        //点击事件  (Touch event start)
        // this.node.on(cc.Node.EventType.TOUCH_START, function () {

        //     //放大按钮  (Button get bigger)
        //     this.node.scaleX = 1.5
        //     this.node.scaleY = 1.5

        //     if (this.IsDash == false) {

        //         //扣除耐力
        //         // this.playerScript.st -= 2
        //         // this.HPnST.getComponent('HPnST').HPchange()

        //         //开始移动 (Start to dash)
        //         this.dashSPD = 800

        //         //转到冲刺状态  (State to "dash")
        //         this.spriteScript.state = "dash"
        //         this.jbS.jumpSpd = 0

        //         //冲刺特效  (Instantiate dash effect)
        //         this.DashEFF()

        //         //播放冲刺动画  (Play dash animation)
        //         this.Anim.play("dash")

        //         //冲刺状态结束  (Set a timer to end the dash)
        //         setTimeout(() => {
        //             if (this.ready == 1) {
        //                 this.spriteScript.state = "stand"
        //                 this.IsDash = false
        //                 if (this.playerScript.dir == 0) {
        //                     this.Anim.play("stand")
        //                 } else {
        //                     if (this.jbS.jumpCount == 0) {
        //                         this.Anim.play("run")
        //                     }

        //                 }
        //             }
        //             if (this.ready == 0) {
        //                 if (this.spriteScript.state != "dashAtk") {
        //                     if (this.spriteScript.state != "atk") {
        //                         this.spriteScript.state = "stand"

        //                         if (this.playerScript.dir == 0) {
        //                             this.Anim.play("stand")
        //                         } else {
        //                             if (this.jbS.jumpCount == 0) {
        //                                 this.Anim.play("run")
        //                             }

        //                         }
        //                     }
        //                     if (this.player.y > 0) {
        //                         this.jbS.fall = false
        //                         if (this.spriteScript.state != "atk") {
        //                             this.spriteScript.state = "jump"
        //                         }
        //                     }

        //                     this.dashSPD = 0

        //                     //跳跃不能连续冲刺,落地或接触平台时重置 (Jumping can't dash continuously,Reset by landing and contact platform)
        //                     if (this.spriteScript.state != "jump") {

        //                         this.IsDash = false
        //                     }
        //                 }
        //             }
        //         }, 600);
        //     }
        //     this.IsDash = true


        // }, this)

        // //点击事件结束  (Touch event end)
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
        if (num == 4 && this._lastKeyboardNum == 0) {
            if (this.IsDash == false) {

                //开始移动 (Start to dash)
                this.dashSPD = 800

                //转到冲刺状态  (State to "dash")
                this.spriteScript.state = "dash"
                this.jbS.jumpSpd = 0

                //冲刺特效  (Instantiate dash effect)
                this.DashEFF()

                //播放冲刺动画  (Play dash animation)
                this.Anim.play("dash")

                //冲刺状态结束  (Set a timer to end the dash)
                setTimeout(() => {
                    if (this.ready == 1) {
                        this.spriteScript.state = "stand"
                        this.IsDash = false
                        if (this.playerScript.dir == 0) {
                            this.Anim.play("stand")
                        } else {
                            if (this.jbS.jumpCount == 0) {
                                this.Anim.play("run")
                            }

                        }
                    }
                    if (this.ready == 0) {
                        if (this.spriteScript.state != "dashAtk") {
                            if (this.spriteScript.state != "atk") {
                                this.spriteScript.state = "stand"

                                if (this.playerScript.dir == 0) {
                                    this.Anim.play("stand")
                                } else {
                                    if (this.jbS.jumpCount == 0) {
                                        this.Anim.play("run")
                                    }

                                }
                            }
                            if (this.player.y > 0) {
                                this.jbS.fall = false
                                if (this.spriteScript.state != "atk") {
                                    this.spriteScript.state = "jump"
                                }
                            }

                            this.dashSPD = 0

                            //跳跃不能连续冲刺,落地或接触平台时重置 (Jumping can't dash continuously,Reset by landing and contact platform)
                            if (this.spriteScript.state != "jump") {

                                this.IsDash = false
                            }
                        }
                    }
                }, 600);
            }
            this.IsDash = true
        }
        this._lastKeyboardNum = num;
    },
    //尘土 (show the dust of dash)
    dust() {
        if (this.jbS.jumpCount == 0) {
            var dashDust = cc.instantiate(this.dashDust)
            dashDust.parent = this.player.parent
            dashDust.scaleX = this.playerSprite.scaleX

            dashDust.scaleY = this.playerSprite.scaleY
            dashDust.x = this.player.x
            dashDust.y = this.player.y
        }
    },
    //冲刺残影加载  (To instantiate dash effects)
    DashEFF() {
        //音效  (sound)
        this.node.getComponent(cc.AudioSource).play()

        setTimeout(() => {
            this.dust()
            var dash = cc.instantiate(this.dasheff)
            dash.parent = this.player.parent
            dash.x = this.player.x
            dash.y = this.player.y
        }, 100);

        setTimeout(() => {

            var dash = cc.instantiate(this.dasheff)
            dash.parent = this.player.parent
            dash.x = this.player.x
            dash.y = this.player.y
        }, 150);

        setTimeout(() => {
            this.dust()
            var dash = cc.instantiate(this.dasheff)
            dash.parent = this.player.parent
            dash.x = this.player.x
            dash.y = this.player.y

        }, 200);

        setTimeout(() => {

            var dash = cc.instantiate(this.dasheff)
            dash.parent = this.player.parent
            dash.x = this.player.x
            dash.y = this.player.y
        }, 250);

        setTimeout(() => {
            this.dust()
            var dash = cc.instantiate(this.dasheff)
            dash.parent = this.player.parent
            dash.x = this.player.x
            dash.y = this.player.y
        }, 300);

        setTimeout(() => {
            var dash = cc.instantiate(this.dasheff)
            dash.parent = this.player.parent
            dash.x = this.player.x
            dash.y = this.player.y
        }, 350);

        setTimeout(() => {
            this.dust()
            var dash = cc.instantiate(this.dasheff)
            dash.parent = this.player.parent
            dash.x = this.player.x
            dash.y = this.player.y
        }, 400);

        setTimeout(() => {
            var dash = cc.instantiate(this.dasheff)
            dash.parent = this.player.parent
            dash.x = this.player.x
            dash.y = this.player.y
        }, 450);

        setTimeout(() => {
            if (this.spriteScript.state == "dashAtk") {
                var dash = cc.instantiate(this.dasheff)
                dash.parent = this.player.parent
                dash.x = this.player.x
                dash.y = this.player.y
            }
        }, 500);

        setTimeout(() => {
            if (this.spriteScript.state == "dashAtk") {
                var dash = cc.instantiate(this.dasheff)
                dash.parent = this.player.parent
                dash.x = this.player.x
                dash.y = this.player.y
            }
        }, 550);

        setTimeout(() => {
            if (this.spriteScript.state == "dashAtk") {
                var dash = cc.instantiate(this.dasheff)
                dash.parent = this.player.parent
                dash.x = this.player.x
                dash.y = this.player.y
            }
        }, 600);

        setTimeout(() => {
            if (this.spriteScript.state == "dashAtk") {
                var dash = cc.instantiate(this.dasheff)
                dash.parent = this.player.parent
                dash.x = this.player.x
                dash.y = this.player.y
            }
        }, 650);

        setTimeout(() => {
            if (this.spriteScript.state == "dashAtk") {
                var dash = cc.instantiate(this.dasheff)
                dash.parent = this.player.parent
                dash.x = this.player.x
                dash.y = this.player.y
            }
        }, 700);

        setTimeout(() => {
            if (this.spriteScript.state == "dashAtk") {
                var dash = cc.instantiate(this.dasheff)
                dash.parent = this.player.parent
                dash.x = this.player.x
                dash.y = this.player.y
            }
        }, 750);

        setTimeout(() => {
            if (this.spriteScript.state == "dashAtk") {
                var dash = cc.instantiate(this.dasheff)
                dash.parent = this.player.parent
                dash.x = this.player.x
                dash.y = this.player.y
            }
        }, 800);

        setTimeout(() => {
            if (this.spriteScript.state == "dashAtk") {
                var dash = cc.instantiate(this.dasheff)
                dash.parent = this.player.parent
                dash.x = this.player.x
                dash.y = this.player.y
            }
        }, 850);

        setTimeout(() => {
            if (this.spriteScript.state == "dashAtk") {
                var dash = cc.instantiate(this.dasheff)
                dash.parent = this.player.parent
                dash.x = this.player.x
                dash.y = this.player.y
            }
        }, 900);

        setTimeout(() => {
            if (this.spriteScript.state == "dashAtk") {
                var dash = cc.instantiate(this.dasheff)
                dash.parent = this.player.parent
                dash.x = this.player.x
                dash.y = this.player.y
            }
        }, 950);

        setTimeout(() => {
            if (this.spriteScript.state == "dashAtk") {
                var dash = cc.instantiate(this.dasheff)
                dash.parent = this.player.parent
                dash.x = this.player.x
                dash.y = this.player.y
            }
        }, 1000);

        setTimeout(() => {
            if (this.spriteScript.state == "dashAtk") {
                var dash = cc.instantiate(this.dasheff)
                dash.parent = this.player.parent
                dash.x = this.player.x
                dash.y = this.player.y
            }
        }, 1050);

        setTimeout(() => {
            if (this.spriteScript.state == "dashAtk") {
                var dash = cc.instantiate(this.dasheff)
                dash.parent = this.player.parent
                dash.x = this.player.x
                dash.y = this.player.y
            }
        }, 1100);

        setTimeout(() => {
            if (this.spriteScript.state == "dashAtk") {
                var dash = cc.instantiate(this.dasheff)
                dash.parent = this.player.parent
                dash.x = this.player.x
                dash.y = this.player.y
            }
        }, 1150);

        setTimeout(() => {
            if (this.spriteScript.state == "dashAtk") {
                var dash = cc.instantiate(this.dasheff)
                dash.parent = this.player.parent
                dash.x = this.player.x
                dash.y = this.player.y
            }
        }, 1200);

        setTimeout(() => {
            if (this.spriteScript.state == "dashAtk") {
                var dash = cc.instantiate(this.dasheff)
                dash.parent = this.player.parent
                dash.x = this.player.x
                dash.y = this.player.y
            }
        }, 1250);

        setTimeout(() => {
            if (this.spriteScript.state == "dashAtk") {
                var dash = cc.instantiate(this.dasheff)
                dash.parent = this.player.parent
                dash.x = this.player.x
                dash.y = this.player.y
            }
        }, 1300);
    },


    update(dt) {


        //减速至停止    (Decelerate to stop)
        if (this.spriteScript.state == "dash") {
            //冲刺  (Doing dash)
            this.player.x += this.dashSPD * dt * this.playerSprite.scaleX
            if (this.dashSPD >= 25) {
                this.dashSPD -= 25
            }
            if (this.dashSPD < 0) {
                this.dashSPD = 0
            }
        }

        if (this.spriteScript.state == "dashAtk") {
            //旋转冲刺  (Doing dash and leave platform)
            this.player.x += this.dashSPD * dt * this.playerSprite.scaleX
            if (this.dashSPD >= 20) {
                this.dashSPD -= 20
            }
            if (this.dashSPD < 0) {
                this.dashSPD = 0
            }
        }

    },
});
