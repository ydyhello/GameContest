

cc.Class({
    extends: cc.Component,

    properties: {
        //放挥剑音效的节点 (The node where the sword sound is )
        soundSword: {
            default: null,    
            type: cc.Node, 
            
        },
        //特殊攻击特效 (Special attack effect)
        Ball: {
            default: null,    
            type: cc.Prefab, 
            
        },
        //扬尘预制体 (Walking dust) 
        dust: {
            default: null,    
            type: cc.Prefab, 
            
        },

    },

    

    onLoad () {
        //获取要用的节点和组件  (Get the nodes and components)
        this.Anim = this.node.getComponent(cc.Animation)
        this.sound = this.soundSword.getComponent(cc.AudioSource)
        this.player = cc.find("Canvas/player")
        this.playerScript = this.player.getComponent('player')

        //默认状态为 "stand"    (The default state is "stand")
        this.state = "stand"
        
        this.node.getComponent(cc.AudioSource).volume = 0.1

        //获取跳跃脚本  (Get jump button script)
        this.jbS = cc.find("Canvas/uiCamera/ui/btnJump").getComponent('btnJump')

        //是否需要播放复活动画
        this.frame = this.node.getComponent(cc.Sprite).spriteFrame.name

        if(this.frame == "die_10"){
        setTimeout(() => {
            this.node.getChildByName("soundHeal").getComponent(cc.AudioSource).volume = 0.3
            this.node.getChildByName("soundHeal").getComponent(cc.AudioSource).play()
            this.Anim.play()
        }, 4500);}

        
    },
    //动画事件,走路声音
    soundRun(){

        this.node.getComponent(cc.AudioSource).play()
    },
    //动画事件,走路扬尘  (Animation event----Show the dust of walking)
    Dust(){
        var dust = cc.instantiate(this.dust)
        dust.parent = this.player.parent
        dust.setPosition(this.player.getPosition())
    },

    //加载特殊攻击特效  (This is a Animation event ----- Load special attack effect)
    ball(){
        var eff = cc.instantiate(this.Ball)
            eff.parent= this.player.parent
            eff.scaleX = this.node.scaleX
            eff.x = this.player.x + this.node.scaleX * 60
            eff.y = this.player.y + 45
    },

    //动画结束帧事件内触发此函数 (This function is triggered in the animation end frame event)
    finish(){
        //状态恢复到 "stand" (State back to "stand")
        this.state = "stand"

        //移动按钮没按下的情况下播待机动画,有按下则播放跑步动画 (Play the standby animation when the Arrow keys is not pressed, and play the running animation when it is pressed)
        if(this.playerScript.dir == 0){
            this.Anim.play("stand")
        }else{
            if(this.jbS.jumpCount ==0){
            this.Anim.play("run")}
        }
    },

    //攻击动画帧事件内触发此函数    (This function is triggered in the attack animation frame event)
    soundsword(){
        //播放挥剑声音  (Play sword swing sound)
        this.sound.play()
    },
    //复活
    revive(){
        this.finish()
        cc.find("Canvas/uiCamera/ui").active = true
    }
    // update (dt) {},
});
