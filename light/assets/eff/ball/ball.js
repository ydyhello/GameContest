

cc.Class({
    extends: cc.Component,

    properties: {
        //尘土特效  (Dust effect)
        dust: {
            default: null,       
            type: cc.Prefab, 

        },
    },
    onLoad () {
        //特效初始音量  (Effect initial volume)
        this.volume = 1
        //此特效可碰撞的次数    (The number of times this effect can collide)
        this.hp = 3 
    },
    start () {
        //此特效最大存活时间 (lifetime of the effect, 3 seconds)
        setTimeout(() => {
            if(this.node != null){
            this.node.destroy()}
        }, 3000);
    },
    //可产生伤害碰撞    (Animation event ---- Can make damage and load dust effects)
    group1(){
        
        this.node.group = "playerHitBox"
        if(this.node.y < 50){
        var eff = cc.instantiate(this.dust)
        eff.parent= this.node.parent
        eff.scaleX = this.node.scaleX
        eff.x = this.node.x
        eff.y = 0}
        
        //特效音量递减 (Decrease in Effect volume)
        this.volume -= 0.07
        this.node.getComponent(cc.AudioSource).volume = this.volume
        this.node.getComponent(cc.AudioSource).play()
    },
    //不产生伤害碰撞    (Animation event ---- Can't make damage)
    group2(){
        this.node.group = "default"
    },
    update (dt) {
        //向玩家前方飞行    (Flying forward of the player)
        this.node.x += this.node.scaleX * 400 * dt
        
        if(this.hp <= 0){
            this.node.destroy()
        }
    },
    
    onCollisionEnter(other,self){
        this.hp -= 1
    }
});
