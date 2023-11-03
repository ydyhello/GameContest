cc.Class({
    extends: cc.Component,

    properties: {
       
        //巡逻范围  (Patrol radius centered on the origin position)
        range:0,
        //hp上限    (monster's Max HP)
        maxHP:10
    },

    

    onLoad () {
        //初始血量  (Origin HP)
        this.hp = this.maxHP
        //出生时的坐标  (Origin position)
        this.startPos = this.node.x
        //左折返点  (When monster move to this position,turn left)
        this.l = this.startPos - this.range
        //右折返点  (When monster move to this position,turn right)
        this.r = this.startPos + this.range
        //当前状态  (Current state)
        this.state = "L"
    },

    //重新开始追踪主角  (Restart tracking player)
    ReChase(){
        if(this.state != "die"){
            this.Anim.play("mon01_move")
            this.state = "chase"}
    },
    update (dt) {
        //获取距离  (Get the distance to the player)
        let monPos = this.node.position
        let playerPos = cc.find("Canvas/player")
        let dist = monPos.sub(playerPos).mag()

        this.sprite = this.node.getChildByName("sprite")
        this.Anim = this.sprite.getComponent(cc.Animation)

        //处于追踪状态  (Walk towards the player)
        if(this.state == "chase"){
            if(this.node.x > playerPos.x+1){
                this.node.x -= 1
                this.node.scaleX = 1
            }else if(this.node.x < playerPos.x-1){
                this.node.x += 1
                this.node.scaleX = -1
            }
            //进入可攻击范围    (Player enter the attackable range)
            if(dist < 80){
                this.state = "atk"
                this.Anim.play("mon01_atk")                
                setTimeout(() => {
                this.ReChase()                    
                }, 2000+Math.random()*500);
            }
        }
        //向左走    (Move to the left)
        if(this.state == "L"){
            this.node.x += -1
            if(this.node.x <= this.l){
                this.state = "R"
                this.node.scaleX = -1
            }
             //切换到追踪   (Enter the tracking range)
             if(dist < 120){
                this.state = "chase"
            }
        }
        //向右走    (Move to the right)
        if(this.state == "R"){
            this.node.x += 1
            if(this.node.x >= this.r){
                this.state = "L"
                this.node.scaleX = 1
            }
             //切换到追踪   (Enter the tracking range)
             if(dist < 120){
                this.state = "chase"
            }
        }
    },
});
