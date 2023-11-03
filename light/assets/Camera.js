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

    

    onLoad () {
        //抖动幅度  (Shake amplitude)
        this.a = 0
    },

    getShake (get) {
        //外部调用这个函数时,同时通过 get 把数值赋予 this.a ,只要 get 大于 0 屏幕就开始抖动     (When this function is called externally, the value is assigned to this.a through "get" at the same time, as "get" is greater than 0, the screen will start to shake)
        this.a = get
    },

    update (dt) {

        //每一帧刷新一个随机方向,用在 x 和 y 坐标的偏移上   (Refresh a random direction every frame, which is used for the offset of x and y)
        this.shakex = Math.random() < 0.5 ? -1 : 1
        this.shakey = Math.random() < 0.5 ? -1 : 1

        //this a 大于 0 的时候开始向随机方向抖动    (When this.a is greater than 0, it starts to shake in a random direction)
        this.node.x = this.shakex * this.a
        this.node.y = this.shakey * this.a

        //逐渐减小抖动幅度  (Gradually reduce the shake amplitude)
        if(this.a > 0){
            this.a -= 0.3
        } else if (this.a < 0){
            this.a = 0
        }


    },
});
