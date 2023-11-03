// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        //在属性检查器中获取主角节点 (Get the player node in the property inspector)
        player: {
  
            default: null,      
                 
            type: cc.Node,
                    },

        //当前场景的起点,在属性检查其中设置   (Starting point of the current scene,set in the property inspection)
        startpoint:0,

        //当前场景的尽头,在属性检查其中设置 (The end point of the current scene,set in the property inspection)
        len:0
    },


    update (dt) {

        //让follower再一定范围内跟随主角    (Let the follower follow the player within a certain range)
        if(this.node.x >= (this.startpoint/2) && this.node.x <= (this.len-(this.startpoint/2))){
            this.node.x = this.player.x
        }
        //回到左边停止点    (Stop at the left)
        if(this.node.x <(this.startpoint/2)){
            this.node.x = this.startpoint/2
        }
        //回到右边停止点    (Stop at the right)
        if(this.node.x >(this.len-(this.startpoint/2))){
            this.node.x = (this.len-(this.startpoint/2))
        }
    },
});
