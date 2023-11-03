/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑     永不宕机     永无BUG
 * 
 *        佛曰:  
 *                写字楼里写字间，写字间里程序员；  
 *                程序人员写程序，又拿程序换酒钱。  
 *                酒醒只在网上坐，酒醉还来网下眠；  
 *                酒醉酒醒日复日，网上网下年复年。  
 *                但愿老死电脑间，不愿鞠躬老板前；  
 *                奔驰宝马贵者趣，公交自行程序员。  
 *                别人笑我忒疯癫，我笑自己命太贱；  
 *                不见满街漂亮妹，哪个归得程序员？
 */



cc.Class({
    extends: cc.Component,

    properties: {
        //判断箭头指向用的变量  (Use to confirm the direction of the arrow)
        LR:0,
        thumbnailPosition:cc.v2(0,0),

        
    },


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
        //获取跳跃脚本  (Get jump button script)
        // this.jbS = this.node.parent.getChildByName("btnJump").getComponent('btnJump')
        this.jbS = cc.find("Canvas/uiCamera/ui/btnJump").getComponent('btnJump')

        this.bnt = cc.find("Canvas/player/btnb")

        // console.log(this.bnt)
        
        

        //添加键盘输入监听 (Add keyboard input monitoring)
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);


    },

    //这个键盘输入事件需要的,请看官方文档"玩家输入事件"的示例   (This keyboard input event needs, please see the official document "Input event" example)
    onDestroy () {
        // cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    //键盘按下  (Keys press event)
    onKeyDown(event) {
        switch(event.keyCode) {
            //按下A键时  (when "A" pressed)
            case cc.macro.KEY.a:
                if(this.LR == -1) {
                    if(this.playerScript.dir == 0 && this.spriteScript.state  == "stand"){
                        if(this.jbS.jumpCount ==0){
                        this.Anim.play("run")}
                    }
                    this.playerScript.dir = -1
                    this.node.scaleX = 1.5 * this.LR
                    this.node.scaleY = 1.5 
                }              
                    this.playerSprite.scaleX = -1
                break;
            //按下D键时  (when "D" pressed)
            case cc.macro.KEY.d:
                if(this.LR == 1) {
                    if(this.playerScript.dir == 0 && this.spriteScript.state  == "stand"){
                        if(this.jbS.jumpCount ==0){
                            this.Anim.play("run")}
                    }
                    this.playerScript.dir = 1
                    this.node.scaleX = 1.5 * this.LR
                    this.node.scaleY = 1.5 
                }           
                    this.playerSprite.scaleX = 1
                break;
        }
    },
    //键盘释放  (Key release)
    onKeyUp(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
            //按钮缩小
            this.node.scaleX = 1.3 * this.LR
            this.node.scaleY = 1.3 

            //角色移动方向 0 ,角色不移动    (The direction of the character movement is 0, the character does not move)
            this.playerScript.dir = 0
            //此时非攻击状态即播放待机动画  (At this time, the standby animation is played in the non-attack state)
            if(this.spriteScript.state  == "stand"){
                
                this.Anim.play("stand")
            }
                break;
            case cc.macro.KEY.d:
            //按钮缩小
            this.node.scaleX = 1.3 * this.LR
            this.node.scaleY = 1.3 

            //角色移动方向 0 ,角色不移动    (The direction of the character movement is 0, the character does not move)
            this.playerScript.dir = 0
            //此时非攻击状态即播放待机动画  (At this time, the standby animation is played in the non-attack state)
            if(this.spriteScript.state  == "stand"){
                
                this.Anim.play("stand")
            }
                break;
        }
    },

    start () {
        WebviewBridge.openGSensor(1);
        // 点击事件  (Click event)
        // this.node.on(cc.Node.EventType.TOUCH_START,function(){
        //     //放大按钮  (Button gets bigger)

        //     this.node.scaleX = 1.5 * this.LR
        //     this.node.scaleY = 1.5 

        //     //给主角传入移动方向    (movement direction)
        //     if(this.LR == 1) {
        //         this.playerScript.dir = 1
                
        //     }else if(this.LR == -1){
        //         this.playerScript.dir = -1
        //     }

        //     //非攻击状态下播放跑步动画  (Play running animation in non-attack state)
        //     if(this.spriteScript.state == "stand"){
        //         if(this.jbS.jumpCount ==0){
        //             this.Anim.play("run")
        //             // console.log('this.spriteScript.state',this.spriteScript.state)
        //         }
        //     }
        //     //顺便改下角色动画的朝向    (Change the direction of the character animation)
        //     this.playerSprite.scaleX = this.LR
        // },this)

        // //点击事件结束  (End of Click event)
        // this.node.on(cc.Node.EventType.TOUCH_END,function(){
        //     //按钮缩小
        //     this.node.scaleX = 1.3 * this.LR
        //     this.node.scaleY = 1.3 

        //     //角色移动方向 0 ,角色不移动    (The direction of the character movement is 0, the character does not move)
        //     this.playerScript.dir = 0
        //     //此时非攻击状态即播放待机动画  (At this time, the standby animation is played in the non-attack state)
        //     if(this.spriteScript.state == "stand"){
                
        //         this.Anim.play("stand")
        //     }
            
        // },this)

        // //Touch event end
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(){
        //     this.node.scaleX = 1.3 * this.LR
        //     this.node.scaleY = 1.3 

        //     this.playerScript.dir = 0
        //     if(this.spriteScript.state  == "stand"){
        //         this.Anim.play("stand")
        //     }

        // },this)
        WebviewBridge.setP1MoveCallback(this.MoveGsensor, this);
    },

    _oldPos1: cc.v2,
    MoveGsensor(x, y, speed, xThrow, yThrow, zG, countThrow, xG, yG){
        // console.log('1111')
        if (this._oldPos1) {
            let delta = cc.v2(this._oldPos1.x - x, this._oldPos1.y - y);
            //解决移动超出陀螺仪边界问题
            if (delta.x > 1000) {
                delta.x = delta.x - 3600;
            } else if (delta.x < -1000) {
                delta.x = delta.x + 3600;
            }
            if (delta.y > 900) {
                delta.y = delta.y - 1800;
            } else if (delta.y < -900) {
                delta.y = delta.y + 1800;
            }
            this.thumbnailPosition.x+=delta.x*0.2;
            if (this.thumbnailPosition.x < -70) {
                this.thumbnailPosition.x = -70
            }
            if (this.thumbnailPosition.x > 70) {
                this.thumbnailPosition.x = 70
            }
            this.bnt.x=this.thumbnailPosition.x;
            this.playerScript.dir=this.bnt.x/70;
            if(this.spriteScript.state == "stand" && Math.abs(this.playerScript.dir) >= 0.4){
                
                if(this.jbS.jumpCount ==0){
                    this.Anim.play("run");
                    this.spriteScript.state = "run"
                }
            }
            else if(this.spriteScript.state == "run" && Math.abs(this.playerScript.dir) < 0.4){
                this.Anim.play("stand")
                this.spriteScript.state = "stand"
            }
            if (this.playerScript.dir >= 0) {
                this.playerSprite.scaleX = 1;
            }
            else {
                this.playerSprite.scaleX = -1;
            }

        }
        this._oldPos1 = cc.v2(x, y);
    },

    // update (dt) {},

});
