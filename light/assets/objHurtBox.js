// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //高光材质 (Specular material)
        flash: {
            default: null,     
            type: cc.Material,  
        },
        //默认材质 (Default material)
        flashEnd: {
            default: null,     
            type: cc.Material,  
        },
        //击中特效 (Hit effect)
        HitEff: {
            default: null,     
            type: cc.Prefab,  
        },
        test:0

    },
        onLoad () {
        //获得摄像机节点    (Get the camera node)
        this.Cam = cc.find("Canvas/playerFollower/Main Camera")
        this.player = cc.find("Canvas/player")
        this.blackmask = cc.find("Canvas/blackmask")
        this.ui = cc.find("Canvas/uiCamera/ui")
        //是否切换场景
        this.gotoNext = false
        },

        //回血并保存
        start(){
            if(this.test == 2){
                this.player.getComponent('player').hp = this.player.getComponent('player').maxhp
                this.player.getComponent('player').st = this.player.getComponent('player').maxst
                this.player.getComponent('player').save()
                
                }
        },

        //碰撞触发函数  (Collision trigger function)
        onCollisionEnter(other,self){

        //请参照 monhurtBox.js 脚本的注释   (Instantiate the Hit effect)
        var HITEFF = cc.instantiate(this.HitEff)
        HITEFF.parent = this.node.parent
        HITEFF.setPosition(this.node.x,this.node.y)
        
        //play sound
        this.node.getComponent(cc.AudioSource).play()

        //换上高光材质  (Set highlight material )
        this.node.getComponent(cc.Sprite).setMaterial(0,this.flash)

        //Let the camera start shaking
        this.Cam.getComponent("Camera").getShake(3)
        
        //50毫秒后恢复怪物默认材质  (Set default material to the monster after 50 milliseconds)
        setTimeout(() => {
            this.node.getComponent(cc.Sprite).setMaterial(0,this.flashEnd)
        }, 50);
        
    },

    update (dt) {
        
        if(this.test == 2){
            //开始切换场景
            if(this.player.x >= 300){
                this.blackmask.opacity += 5
                this.ui.opacity -= 10
                if(this.blackmask.opacity >= 255 && this.gotoNext == false){
                    // WebviewBridge.closeGSensor(1);
                    // WebviewBridge.setVKeyboardNumCb(null, null);
                    // WebviewBridge.setP1MoveCallback(null, null);
                    cc.director.loadScene('test')
                    this.gotoNext = true
                }}
               
            }
            
            
    },
});
