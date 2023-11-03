

cc.Class({
    extends: cc.Component,

    properties: {
        
        HPnST:{
            default:null,
            type:cc.Node,
        },
    },


    onLoad () {
        //打开碰撞检测开关  (Turn on the collision detection system)
        cc.director.getCollisionManager().enabled = true;
        //物理碰撞开启
        cc.director.getPhysicsManager().enabled = true;
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
    },

    // start () {},

onCollisionEnter(other,self){
    //刷新耐力
    if(this.playerScript.st < this.playerScript.maxst && this.spriteScript.state == "atk"){
    this.playerScript.st += 1
    this.HPnST.getComponent('HPnST').HPchange()
}
    //打击停顿 hit pause
    cc.game.pause()
    cc.log("pause")
        setTimeout(() => {
            cc.game.resume()
            cc.log("resume")
        }, 10);

    //击退怪物 knockback the monster
    if(this.spriteScript.state == "dashAtkthis"){
        other.getComponent('monhurtBox').monster.x += this.playerSprite.scaleX + 30
    }
    
}

    // update (dt) {},
});
