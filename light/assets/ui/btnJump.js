

cc.Class({
    extends: cc.Component,

    properties: {
        //跳跃相关特效 (Effects use to jumping state)
       jumpDust:{
           default:null,
           type:cc.Prefab,
        },
       jumpDustLR:{
            default:null,
            type:cc.Prefab,
        },
       landingDust:{
            default:null,
            type:cc.Prefab,
        },
    },

    onLoad () {
        //是否开始降落  (player falling or not)
        this.fall = false
        //跳跃力度  (jump force)
        this.jumpSpd = 0
        //跳跃次数限制  (How many times can jump up)
        this.jumpCount = 0
        //获取主角节点  (Get player node)
        this.player = cc.find("Canvas/player")
        //获取主角脚本  (Get player script)
        this.playerScript = this.player.getComponent('player')
        //获取主角sprite节点    (Get player sprite node)
        this.playerSprite = cc.find("Canvas/player/sprite")
        //获取sprite节点动画组件    (Get animation component)
        this.Anim = this.playerSprite.getComponent(cc.Animation)
        //获取sprite脚本    (Get script of sprite)
        this.spriteScript= this.playerSprite.getComponent('playerSprite')
        //获取btnDash脚本    (Get script of btnDash)
        this.btnDash = cc.find("Canvas/uiCamera/ui/btnDASH").getComponent('btnDash')


    },
    // 跳起的扬尘 (Show the dust)
    dust(){
        if(this.playerScript.dir == 0){
            if(this.jumpCount == 0){
                var jumpDust = cc.instantiate(this.jumpDust)
            }else{
                var jumpDust = cc.instantiate(this.landingDust)
            }
            jumpDust.parent = this.player.parent
            jumpDust.setPosition(this.player.getPosition())
        }else{
            if(this.jumpCount == 0){
                    var jumpDustLR = cc.instantiate(this.jumpDustLR)
                }else{
                    var jumpDustLR = cc.instantiate(this.landingDust)
                }
            jumpDustLR.parent = this.player.parent
            jumpDustLR.scaleX = this.playerScript.dir
            jumpDustLR.setPosition(this.player.getPosition())
        }
    },

    start () {
        WebviewBridge.openGSensor(1);
        // 点击事件  (Click or Touch event start)
        // this.node.on(cc.Node.EventType.TOUCH_START,function(){
            
        //     //放大按钮  (button get bigger)
        //     this.node.scaleX = 1.5 
        //     this.node.scaleY = 1.5 

        //     if(this.jumpCount < 2){
        //         this.node.getComponent(cc.AudioSource).play()
        //         this.dust()
        //         this.fall = false
        //         this.Anim.play("jump")
        //         this.jumpSpd = 500
        //         this.jumpCount += 1
        //         this.spriteScript.state = "jump"
        //     }
            

        // },this)

        // //点击事件结束  (Click or Touch event ends)
        // this.node.on(cc.Node.EventType.TOUCH_END,function(){
        //     //按钮缩小  (Button restore)
        //     this.node.scaleX = 1.3 
        //     this.node.scaleY = 1.3 
            
        // },this)

        // this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(){
        //     this.node.scaleX = 1.3 
        //     this.node.scaleY = 1.3 

        // },this)
        WebviewBridge.setVKeyboardNumCb(this.onVKeyboardNumCb, this);
    },

	_lastKeyboardNum: 0,
    onVKeyboardNumCb(num){
        if(num==1 && this._lastKeyboardNum==0){
        // if(num==6 && this._lastKeyboardNum==0){
            if(this.jumpCount < 2){
                this.node.getComponent(cc.AudioSource).play()
                this.dust()
                this.fall = false
                this.Anim.play("jump")
                this.jumpSpd = 500
                this.jumpCount += 1
                this.spriteScript.state = "jump"
            }
        }

        this._lastKeyboardNum=num;
    },
    update (dt) {
        
        //播放降落动画  (Play the falling animation)
        if(this.jumpSpd < 0){
            if(this.spriteScript.state != "jumpAtk"){
            if(this.fall == false ){
                this.Anim.play("fall")
                this.fall = true
            }
            }
        }
        //模拟重力  (The gravity)
        if(this.spriteScript.state == "jump" || this.spriteScript.state == "jumpAtk"){
            
            this.jumpSpd -= 25
    }
        
        //角色跳起与下落物理变化    (character jumping and falling)
        this.player.y += this.jumpSpd * dt
        
        //角色落地判断  (Landing)
        if (this.player.y < 0) {
            if (this.spriteScript.state == "jump") {
                this.spriteScript.state = "stand"

                if (this.playerScript.dir != 0) {
                    this.Anim.play("run")
                } else {
                    this.Anim.play("landing")
                }
            }
            if (this.spriteScript.state == "jumpAtk") {
                this.spriteScript.state = "atk"
            }

            this.btnDash.IsDash = false
            this.OnPlatform = false
            this.jumpSpd = 0
            this.player.y = 0
            this.jumpCount = 0
            var landingDust = cc.instantiate(this.landingDust)
            landingDust.parent = this.player.parent
            landingDust.setPosition(this.player.getPosition())

        }
        
    },
});
