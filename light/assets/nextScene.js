// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        next:""
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.ui = cc.find("Canvas/uiCamera/ui")
        this.playerFollower = cc.find("Canvas/playerFollower")
        this.goNext = false
        this.blackmask = cc.find("Canvas/blackmask")
    },

    
    onCollisionEnter(other,self){
        console.log("碰撞到了")
        // WebviewBridge.closeGSensor(1);
        // WebviewBridge.setVKeyboardNumCb(null, null);
        // WebviewBridge.setP1MoveCallback(null, null);
        if(this.goNext == false){

        //确保只触发一次
        this.goNext = true

        //屏幕渐暗动画
        this.blackmask.getComponent(cc.Animation).play("blackmask")
                let state = this.blackmask.getComponent(cc.Animation).getAnimationState("blackmask")
        state.speed = 2;
        //保存player当前属性
        cc.find("Canvas/player").getComponent('player').save()
        //3.5秒后切换场景
        setTimeout(() => {
            cc.director.loadScene(this.next)
        }, 3500);
        console.log('碰撞到了111')
    }
    },
    update (dt) {
        if(this.goNext == true){
            this.ui.opacity -= 5
            this.blackmask.x = this.playerFollower.x
        }
    },
});
