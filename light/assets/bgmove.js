cc.Class({
    extends: cc.Component,

    properties: {
      
        //不同层的背景不同的移动速度,在属性检查其中设置 (Different moving speeds of the background of different layers, set in the property inspection)
        spd:0
    },


    onLoad () {
        //获取摄像机节点    (Get camera node)
        this.Cam = cc.find("Canvas/playerFollower")
        //获取当前节点初始坐标  (Get the initial position of the current node)
        this.originPos = this.node.x
        //始终显示在最上层  (Always on top of the screen)
        if(this.node.name == "realFront"){
            this.node.zIndex = 998
        }
    },

    update (dt) {
        //随着摄像机改变位置,场景节点跟着改变坐标,方向与摄像机相反.幅度由spd的值决定    (As the camera changes position, the background node changes its too, the direction is opposite to the camera. The amplitude is determined by the value of this.spd)
        this.move = this.Cam.x * this.spd
        this.node.x = this.originPos - this.move
    },
});
