

cc.Class({
    extends: cc.Component,

    properties: {
        //移动速度变量  (Movement speed variable)
        speed:200,
        
        },

    save(){
        //保存
        cc.sys.localStorage.setItem('hp',this.hp)
        cc.sys.localStorage.setItem('st',this.st)

    },

    onLoad () {
        //设置游戏运行的帧数上限    (Set the upper limit of frames number the game runs)
        cc.game.setFrameRate(59)
        //读取角色属性
        var hp = cc.sys.localStorage.getItem('hp')
        var st = cc.sys.localStorage.getItem('st')
        
        
        //角色Hp 
        this.hp
        this.maxhp = 5
        if(hp != null){
            this.hp = hp
        }else{
            this.hp = this.maxhp
        }
        
        //角色耐力
        this.st
        this.maxst = 10
        
        if(st != null){
            this.st = st
        }else{
            this.st = this.maxst
        }

        //获取子节点 (Get the node that plays the animation)
        this.sprite = this.node.getChildByName("sprite")

        //获取子节点的脚本  (Get the script of the animation node)
        this.spriteScript= this.sprite.getComponent('playerSprite')

        //攻击前移  (Used to move forward weakly when attacking)
        this.hitforce = 0

        //我们就用按钮改变这个方向  (Change this value when the arrow key is pressed,used to the direction of movement)
                this.dir = 0
    },

    

    update (dt) {
        // cc.log(this.spriteScript.state)
        //非攻击状态下  (When not attacking)
        if(this.spriteScript.state != "atk" && this.spriteScript.state != "atks"&& this.spriteScript.state !="dash"&& this.spriteScript.state !="dashAtk"){

            //方向键按下时 this.dir 不为 0,所以角色移动,方向键松开时 this.dir 为 0 ,所以角色静止    (When the arrow key is pressed, this.dir is not 0, so the character moves. When the arrow key is released, this.dir is 0, so the character is stop)
            this.node.x += this.speed * (1/60) * this.dir

        }
        //按攻击键 this.hitforce 大于 0 ,所以角色根据当前朝向前移 (Press the attack key this.hitforce is greater than 0, so the character moves forward according to the current direction)
        this.node.x += this.hitforce * this.sprite.scaleX

        //this.hitforce 大于 0 时,将逐渐减少,再次变成 0,角色结束攻击的前移 (When this.hitforce is greater than 0, it will gradually decrease and become 0 again, and the character will end the attack and  stop move forward)
        if(this.hitforce > 0 ){
            this.hitforce -= 0.2
        }else if(this.hitforce < 0){
            this.hitforce = 0
        }
    },
});
