// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.player = cc.find("Canvas/player")
        this.sprite = this.player.getChildByName('sprite')
        this.anim = this.sprite.getComponent(cc.Animation)
        this.run = true
        // this.bnt = cc.find("Canvas/player/btnb")
    },

    start () {
        //场景出现时,角色播放走路动画
        this.anim.play('run')

        setTimeout(() => {
            this.run = false
        this.anim.play('stand')
        //ui出现
        cc.find("Canvas/uiCamera/ui").active = true

        }, 1600);
    },

    update (dt) {
        //角色屏幕外走到屏幕内
        if(this.run == true){
            this.player.x += 130 * (1/60)

        }
    },
});
