// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    //请参照 monhurtBox.js 脚本的注释  (Please refer to the comments of the monhurtBox.js script)

            flash: {
                default: null,     
                type: cc.Material,  
            },
            flashEnd: {
                default: null,     
                type: cc.Material,  
            },
            HitEff: {
                default: null,     
                type: cc.Prefab,  
            },
            sprite: {
                default: null,     
                type: cc.Node,  
            },
            player: {
                default: null,     
                type: cc.Node,  
            },
            HPnST: {
                default: null,     
                type: cc.Node,  
            },
    },

    onLoad () {
        this.Cam = cc.find("Canvas/playerFollower/Main Camera")

        //player节点有控制角色半透明变化的动画  (The player node has an animation that controls the opacity change of the character)
        this.anim = this.player.getComponent(cc.Animation)
        
        },

    
    onCollisionEnter(other,self){
        if(other.node.name == 'door'){
            cc.log('yes')
            return
        }
        if(this.player.getComponent('player').hp > 0 ){
        //角色开始半透明闪烁 (The character starts to flash)
        this.anim.play("playerhurt")
        this.node.getComponent(cc.AudioSource).play()
        //请参照 monhurtBox.js 脚本的注释  (Please refer to the comments of the monhurtBox.js script)
        var HITEFF = cc.instantiate(this.HitEff)
        HITEFF.parent = this.player.parent
        HITEFF.setPosition(this.player.x,this.player.y+50)

        
        this.sprite.getComponent(cc.Sprite).setMaterial(0,this.flash)
        this.Cam.getComponent("Camera").getShake(3)
            //角色扣血
            this.player.getComponent('player').hp -= 1
            //刷新小心心图标
            this.HPnST.getComponent('HPnST').HPchange()
        
        setTimeout(() => {
            this.sprite.getComponent(cc.Sprite).setMaterial(0,this.flashEnd)
        }, 50);

        //没血了
        if(this.player.getComponent('player').hp <=0 ){
            this.playerspriteAnim = this.sprite.getComponent(cc.Animation).play('die')
            cc.find("Canvas/uiCamera/ui").destroy()
            //死亡黑幕
            this.blackmask = cc.find("Canvas/blackmask")
            this.blackmask.active = true
            this.blackmask.zIndex = 999
            this.blackmask.setPosition(this.player.x,this.player.y)
            this.blackmask.getComponent(cc.Animation).play('blackmask')
            setTimeout(() => {
                cc.director.loadScene('test2')
                WebviewBridge.setVKeyboardNumCb(null, null);
                WebviewBridge.setP1MoveCallback(null, null);
            }, 4500);

        }
    }
    }
    // update (dt) {},
});
