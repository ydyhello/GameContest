

cc.Class({
    extends: cc.Component,

    properties: {
        //影响抛物线高度,摆动速度和摆动频率 (Affects the height of the parabola, the swing speed and the swing frequency)
        h:0,
        spd:0,
        swing:0,
    },



    onLoad () {
        
        this.time = 1
    },

    start () {
        //设置cao 的shader 参数 (Set the shader parameters of "cao.effect")
        this.material = this.node.getComponent(cc.Sprite).getMaterial(0);
        this.material.setProperty("h", this.h);
        this.material.setProperty("spd", this.spd);
    },

    update (dt) {

        //让草开始摆动  (Let the grass start to swing)
        this.time += dt * this.swing;
        this.material.setProperty("time", this.time);
    },
});
