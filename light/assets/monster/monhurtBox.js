cc.Class({
    extends: cc.Component,

    properties: {
            //高光材质 (Specular material)
            flash: {
                default: null,     
                type: cc.Material,  
            },
            //默认材质  (Default material)
            flashEnd: {
                default: null,     
                type: cc.Material,  
            },
            //击中特效预制体    (Prefab of Hit effect)
            HitEff: {
                default: null,     
                type: cc.Prefab,  
            },
            //怪物的子节点sprite (Monster sprite node)
            sprite: {
                default: null,     
                type: cc.Node,  
            },
            //怪物节点  (Monster node)
            monster: {
                default: null,     
                type: cc.Node,  
            },
            //血条节点 (Health bar node)
            hpbar: {
                default: null,     
                type: cc.Node,  
            },
            //主角节点 (Player node)
            player: {
                default: null,     
                type: cc.Node,  
            },
    },

    onLoad () {
        //获取摄像机节点 (Get camera node)
        this.Cam = cc.find("Canvas/playerFollower/Main Camera")
        //获取怪物血量  (Get monster HP)
        this.hp = this.monster.getComponent('mon01').hp
        //怪物血量上限  (Get monster MaxHP)
        this.maxhp = this.monster.getComponent('mon01').maxHP
        //血条组件 (Get Health bar component)
        this.Bar = this.hpbar.getComponent(cc.ProgressBar)
        //受伤特效Y修正 (Injury effect Y position correction)
        this.y = 50
        //击退幅度  (Knockback power)
        this.hitback = 0
        },
        
    //碰撞触发函数  (Collision trigger function)
    onCollisionEnter(other,self){
        //受伤扣血  (Get hurt and reduce Hp)
        if(this.hp >= 1){
            this.hp -= 1

            //刷新血条  (Refresh health bar)
            this.hpbar.opacity = 255
            this.Bar.progress = this.hp/this.maxhp
        }
        //当血量为零    (When health is zero)
        if(this.hp == 0 && this.monster.getComponent('mon01').state != "die"){
            this.sprite.getComponent(cc.Animation).play('mon01_die')
            this.hitback = 500
            this.hpbar.opacity = 0
            this.y = 0
            this.monster.getComponent('mon01').state = "die"
        }
        // console.log(this.hp)

        //实例化特效预制    (Instance effects prefab)
        var HITEFF = cc.instantiate(this.HitEff)

        //给特效一个父节点,让其在此节点下生成   (The effect need a parent node )
        HITEFF.parent = this.monster.parent

        //设置特效生成坐标  (Set effect position)
        HITEFF.setPosition(this.monster.x,this.monster.y+this.y)

        //播放当前节点的音频组件    (Play the audio component of the current node)
        this.node.getComponent(cc.AudioSource).play()

        //把怪物sprite换上高光材质  (Set highlight material to the monster)
        this.sprite.getComponent(cc.Sprite).setMaterial(0,this.flash)

        //调用事项及脚本的 getShake 函数,同时给它的变量赋值 (Let the camera start shaking)
        this.Cam.getComponent("Camera").getShake(3)

        //50毫秒后恢复怪物默认材质  (Set default material to the monster after 50 milliseconds)
        setTimeout(() => {
            this.sprite.getComponent(cc.Sprite).setMaterial(0,this.flashEnd)
        }, 50);

        //500毫秒后清除掉播放完毕的击中特效 (Destroy the effect after 500 milliseconds)
        setTimeout(() => {
            HITEFF.destroy()
        }, 500);
        
    },
    update (dt) {
        //死亡击飞  (When the monster dies, it flies back)
        if(this.monster.getComponent('mon01').state == "die"){
            if(this.player.x < this.monster.x){this.monster.x += this.hitback*dt}else{this.monster.x -= this.hitback*dt}
            
            }
        //击飞幅度递减  (Knockback power decrease)
        if(this.hitback >= 10){
                this.hitback -= 10
            }
        //完全停止防止溢出 (Stop flying back)
        if(this.hitback < 0){
            this.hitback = 0
        }
    },
});
