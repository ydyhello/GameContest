

cc.Class({
    extends: cc.Component,

    properties: {

    },

 

    onLoad () {
        //主角动画节点 (Get the player node)
        this.playerSprite = cc.find("Canvas/player/sprite")
        //主角动画当前帧    (Get Current frame of the player sprite)
        this.sprite = this.playerSprite.getComponent(cc.Sprite).spriteFrame
    },

    start () {
        //特效生成时,帧对应主角当前帧   (When the effect is generated, the frame corresponds to the current frame of the player sprite)
        this.node.getComponent(cc.Sprite).spriteFrame = this.sprite
        //生成时朝向    (Initial direction)
        this.node.scaleX = this.playerSprite.scaleX
    },

    update (dt) {
        //特效渐隐  (This effect gose to disappear slowly)
        this.node.opacity -= 5

        //特效销毁 (Delete when completely disappeared)
        if(this.node.opacity <= 0){
            this.node.destroy()
        }
    },
});
