

cc.Class({
    extends: cc.Component,

    properties: {
        //(get node of jump button)
        btnJump: {
           
            default: null,        
                      
            type: cc.Node, 
            
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        //获取主角节点  (Get player node)
        this.player = cc.find("Canvas/player")
        //获取主角脚本  (Get player script)
        this.playerScript = this.player.getComponent('player')
        //获取主角sprite节点    (Get player sprite)
        this.playerSprite = cc.find("Canvas/player/sprite")
        //获取sprite节点动画组件    (Get animation component of the sprite)
        this.Anim = this.playerSprite.getComponent(cc.Animation)
        //获取sprite脚本    (Get script of sprite)
        this.spriteScript= this.playerSprite.getComponent('playerSprite')
        //跳跃按钮脚本  (Get script of jump button)
        this.jumpScript= this.btnJump.getComponent('btnJump')
        //获取btnDash脚本    (Get script of btnDash)
        this.btnDash = cc.find("Canvas/uiCamera/ui/btnDASH").getComponent('btnDash')

        this.HPnST = cc.find("Canvas/uiCamera/ui/HPnST")

        
    },
    //接触  (touch the collider box)
    onBeginContact() {
        
        if(this.player.y > 0){
        //停止下落 (stop falling)
        if(this.spriteScript.state == "jump" ||this.spriteScript.state == "jumpAtk" ||this.spriteScript.state == "dashAtk" || this.spriteScript.state == "dash" ){
        this.btnDash.OnPlatform = true
        this.btnDash.ready = 1

        this.jumpScript.jumpSpd = 0
        this.jumpScript.jumpCount = 0
        this.jumpScript.fall = false

        //动画切换 (change animation)
        if(this.playerScript.dir == 0 ){
            this.Anim.play("landing")
            this.spriteScript.state = "stand"
        }else{
            this.Anim.play("run")
            this.spriteScript.state = "stand"
        }
        
        
        this.btnDash.IsDash = false
        
    }}

    },
    //分离  (out of the collider box)
    onEndContact() {
        //在平台上  (on the platform)
       if(this.btnDash.ready ==1){
           //如果不是冲刺状态,就普通的下落到地面 (turn to normal falling)
           if(this.spriteScript.state != "dash"  ){
                this.spriteScript.state = "jump"
                this.btnDash.ready =0
            //如果是从此状态,就变成旋转飞出平台  (turn to rotating)
            }else if(this.spriteScript.state == "dash"){

                if(this.playerScript.st >= 3){
                //扣除耐力
                this.playerScript.st -= 3
                this.HPnST.getComponent('HPnST').HPchange()

                this.spriteScript.state = "dashAtk"
                this.Anim.play("rotating")
                }
                
                this.btnDash.ready =0
                
                //0.8秒后结束旋转状态   (end the rotating)
                setTimeout(() => {
                    if(this.spriteScript.state =="dashAtk"){
                    this.btnDash.dashSPD = 0
                    this.btnDash.IsDash = false
                    this.spriteScript.state = "jumpAtk"
                    this.Anim.play("atk_b")}
                    }, 800);
                
               }
               
       }
       
      

    },
    update(){
        
        if(this.spriteScript.state == "dashAtk"){
            this.player.x += this.playerSprite.scaleX*1.5
            if(this.player.y > 0.6){
            this.player.y -= 0.6    }
        } 
        
    }
});
