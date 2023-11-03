// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        HP1: {
            default: null,     
            type: cc.Node,  
        },
        HP2: {
            default: null,     
            type: cc.Node,  
        },
        HP3: {
            default: null,     
            type: cc.Node,  
        },
        HP4: {
            default: null,     
            type: cc.Node,  
        },
        HP5: {
            default: null,     
            type: cc.Node,  
        },
        STbar: {
            default: null,     
            type: cc.Node,  
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.player = cc.find("Canvas/player")
        this.LabelST = this.node.getChildByName('LabelST').getComponent(cc.Label)
    },

    start () {

        //开始或切换场景时刷新心心数和耐力条
        this.HPchange()
        
    },

    //刷新心心数和耐力条
    HPchange(){

        //获取角色当前的血和耐力
        this.hp = this.player.getComponent('player').hp
        this.st = this.player.getComponent('player').st
        this.maxst = this.player.getComponent('player').maxst

        //刷新耐力条长度
        this.STbar.getComponent(cc.ProgressBar).progress = this.st/this.maxst
        this.LabelST.string = this.st+"/"+this.maxst

        //刷新心心显示数量
        if(this.hp < 5){
            this.HP5.opacity = 0
        }else if(this.hp == 5){
            this.HP5.opacity = 255
        }
        if(this.hp < 4){
            this.HP4.opacity = 0
        }else if(this.hp == 4){
            this.HP4.opacity = 255
        }
        if(this.hp < 3){
            this.HP3.opacity = 0
        }else if(this.hp == 3){
            this.HP3.opacity = 255
        }
        if(this.hp < 2){
            this.HP2.opacity = 0
        }else if(this.hp == 2){
            this.HP2.opacity = 255
        }
        if(this.hp < 1){
            this.HP1.opacity = 0
        }else if(this.hp == 1){
            this.HP1.opacity = 255
        }
    },
    // update (dt) {},
});
