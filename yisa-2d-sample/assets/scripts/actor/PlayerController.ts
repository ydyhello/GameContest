/*
 *                        ::
 *                       :;J7, :,                        ::;7:
 *                       ,ivYi, ,                       ;LLLFS:
 *                       :iv7Yi                       :7ri;j5PL
 *                      ,:ivYLvr                    ,ivrrirrY2X,
 *                      :;r@Wwz.7r:                :ivu@kexianli.
 *                     :iL7::,:::iiirii:ii;::::,,irvF7rvvLujL7ur
 *                    ri::,:,::i:iiiiiii:i:irrv177JX7rYXqZEkvv17
 *                 ;i:, , ::::iirrririi:i:::iiir2XXvii;L8OGJr71i
 *               :,, ,,:   ,::ir@mingyi.irii:i:::j1jri7ZBOS7ivv,
 *                  ,::,    ::rv77iiiriii:iii:i::,rvLq@huhao.Li
 *              ,,      ,, ,:ir7ir::,:::i;ir:::i:i::rSGGYri712:
 *            :::  ,v7r:: ::rrv77:, ,, ,:i7rrii:::::, ir7ri7Lri
 *           ,     2OBBOi,iiir;r::        ,irriiii::,, ,iv7Luur:
 *         ,,     i78MBBi,:,:::,:,  :7FSL: ,iriii:::i::,,:rLqXv::
 *         :      iuMMP: :,:::,:ii;2GY7OBB0viiii:i:iii:i:::iJqL;::
 *        ,     ::::i   ,,,,, ::LuBBu BBBBBErii:i:i:i:i:i:i:r77ii
 *       ,       :       , ,,:::rruBZ1MBBqi, :,,,:::,::::::iiriri:
 *      ,               ,,,,::::i:  @arqiao.       ,:,, ,:::ii;i7:
 *     :,       rjujLYLi   ,,:::::,:::::::::,,   ,:i,:,,,,,::i:iii
 *     ::      BBBBBBBBB0,    ,,::: , ,:::::: ,      ,,,, ,,:::::::
 *     i,  ,  ,8BMMBBBBBBi     ,,:,,     ,,, , ,   , , , :,::ii::i::
 *     :      iZMOMOMBBM2::::::::::,,,,     ,,,,,,:,,,::::i:irr:i:::,
 *     i   ,,:;u0MBMOG1L:::i::::::  ,,,::,   ,,, ::::::i:i:iirii:i:i:
 *     :    ,iuUuuXUkFu7i:iii:i:::, :,:,: ::::::::i:i:::::iirr7iiri::
 *     :     :rk@Yizero.i:::::, ,:ii:::::::i:::::i::,::::iirrriiiri::,
 *      :      5BMBBBBBBSr:,::rv2kuii:::iii::,:i:,, , ,,:,:i@petermu.,
 *           , :r50EZ8MBBBBGOBBBZP7::::i::,:::::,: :,:,::i;rrririiii::
 *               :jujYY7LS0ujJL7r::,::i::,::::::::::::::iirirrrrrrr:ii:
 *            ,:  :@kevensun.:,:,,,::::i:i:::::,,::::::iir;ii;7v77;ii;i,
 *            ,,,     ,,:,::::::i:iiiii:i::::,, ::::iiiir@xingjief.r;7:i,
 *         , , ,,,:,,::::::::iiiiiiiiii:,:,:::::::::iiir;ri7vL77rrirri::
 *          :,, , ::::::::i:::i:::i:i::,,,,,:,::i:i:::iir;@Secbone.ii:::
 */

import { _decorator, absMax, color, Component, director, EventKeyboard, Input, input, KeyCode, math, Node, sys, v2, v3, Vec2, Vec3 } from 'cc';
import { Actor } from './Actor';
import { Idle } from './state/Idle';
import { Run } from './state/Run';
import { StateDefine } from './StateDefine';
import { SimpleEmitter } from './projectile/SimpleEmitter';
import { VirtualInput } from '../inputs/VirtualInput';
import { AimDirection } from './AimDirection';
import { GameEvent } from '../event/GameEvent';
import { Die } from './state/Die';

const { ccclass, property, requireComponent } = _decorator;

@ccclass('PlayerController')

@requireComponent(Actor)

export class PlayerController extends Component {
    //checkShootEnble: boolean = false;

    actor: Actor | null = null;//角色

    @property(Node)
    aim: Node;

    @property(Node)
    gun: Node | null = null;

    @property(SimpleEmitter)
    projectileEmitter: SimpleEmitter;

    static instance: PlayerController | null = null;

    target: Actor = null;

    aimAt: Vec3 = v3();


    onLoad() {
        WebviewBridge.openGSensor(1);
        //TODO: 开启虚拟按键

        PlayerController.instance = this;
        // WebviewBridge.setP1MoveCallback(this.onGsencor, this);
        WebviewBridge.setVKeyboardNumCb(this.onVKeyboardNumCb, this);
    }
    /**-------------------游戏操作 相关控制---------------------- */
    _lastKeyboardNum: number = 0;
    onVKeyboardNumCb(num:number) {
        //上
        if(num==1 && this._lastKeyboardNum==0){
            this.fire(90);
        }
        //下
        if(num==2 && this._lastKeyboardNum==0){
            this.fire(-90);
        }
        //左
        if(num==3 && this._lastKeyboardNum==0){
            this.fire(180);
        }
        //右
        if(num==4 && this._lastKeyboardNum==0){
            this.fire(0);
        }
        if(num==0 && this._lastKeyboardNum!=0){

        }
        this._lastKeyboardNum=num;
    }
    _isPrinting: boolean = false;
    onPrintStart(){
        this._isPrinting=true;

    }
    onPrintEnd(){
        this._isPrinting=false;
    }
    onPrinting(X: number, Y: number)
    {
        if (!this._isPrinting) {
            return;
        }
    }


    dataPointLimit: number = 35;
    dataPoints: any[] = [];
    circleThreshold: number = 10000;
    total: number = 0;
    canFireRound=true;
    protected _oldPos1: Vec2;
    onGsencor(X, Y, Speed, X_Throw, Y_Throw, Z_Gravity, Count_Throw, X_Gravity, Y_Gravity) {
        //console.log('x:',X,'y:',Y,'speed:',Speed,'xThrow:',X_Throw,'yThrow:',Y_Throw,'Z_Gravity:',Z_Gravity,'Count_Throw',Count_Throw,'X_Gravity:',X_Gravity,'Y_Gravity:',Y_Gravity);
        let delta;
        if (this._oldPos1) {
            delta = v2(this._oldPos1.x - X, this._oldPos1.y - Y);
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
            if(delta.x>0){
                VirtualInput.horizontal = 1;
            }

        }
        this._oldPos1 = v2(X, Y);


        this.dataPoints.push({ X, Y, Speed, X_Throw, Y_Throw, Z_Gravity, Count_Throw, X_Gravity, Y_Gravity, delta });
        
        // 如果存储的数据点超过了限制，移除
        if (this.dataPoints.length == this.dataPointLimit) {
            // console.log('this.total:', this.total);
            if (150000 < this.total && this.total < 400000) {
                if (this.canFireRound) {
                    this.round_fire1();
                    this.canFireRound = false;
                    setTimeout(() => {
                        this.canFireRound = true; 
                    }, 2000);
                }
            } else if (400000 <= this.total && this.total< 800000) {
                if (this.canFireRound) {
                    this.round_fire2();
                    this.canFireRound = false;
                    setTimeout(() => {
                        this.canFireRound = true; 
                    }, 2000);
                }
            } else if(this.total>= 800000)  {
                if (this.canFireRound) {
                    this.round_fire3();
                    this.canFireRound = false;
                    setTimeout(() => {
                        this.canFireRound = true; 
                    }, 2000);
                }
            }
            this.dataPoints = [];
            this.total = 0;
        } else {
            this.total += Math.abs(delta.x) * Math.abs(delta.x) + Math.abs(delta.y) * Math.abs(delta.y);
        }


        //上下左右
        //this.detectline();
    }


    detectline() {
        let totolleft = 0;
        let totolright = 0;
        let totolup = 0;
        let totoldown = 0;

        for (let dataPoint of this.dataPoints) {
            if (dataPoint.delta.x > 0) {
                totolright += dataPoint.delta.x;
            } else {
                totolleft += dataPoint.delta.x;
            }
            if (dataPoint.delta.y > 0) {
                totolup += dataPoint.delta.y;
            } else {
                totoldown += dataPoint.delta.y;
            }

        }
        //console.log('totolleft:',totolleft,'totolright:',totolright,'totolup:',totolup,'totoldown:',totoldown);
        if (totolleft < -900) {
            console.log('totolleft:', totolleft);
            this.fire_copy(180);
        } else if (totolright > 900) {
            console.log('totolright:', totolright);
            this.fire_copy(0);
        } else if (totolup > 500) {
            console.log('totolup:', totolup);
            this.fire_copy(90);
        } else if (totoldown < -500) {
            console.log('totoldown:', totoldown);
            this.fire_copy(-90);
        }


    }


    round_fire1() {
        const angles = [0, 45, 90, 135, 180, -135, -90, -45]; // 发射的角度

        let i = 0;
        let bulletsFired = 0; // 已发射的子弹数量
        const interval = setInterval(() => {
            if (bulletsFired >= 8) {
                clearInterval(interval); // 发射完8个子弹后停止继续发射
                return;
            }

            this.fire(angles[i]);
            i++;
            bulletsFired++;
        }, 70);
    }
    round_fire2() {
        const angles = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, -157.5, -135, -112.5, -90, -67.5 ,-45, -22.5]; // 发射的角度

        let i = 0;
        let bulletsFired = 0; // 已发射的子弹数量
        const interval = setInterval(() => {
            if (bulletsFired >= 16) {
                clearInterval(interval); 
                return;
            }

            this.fire(angles[i]);
            i++;
            bulletsFired++;
        }, 60);
    }

    round_fire3() {
        const angles = [0, 15,30, 45, 60,75, 90, 105,120, 135, 150,165, 180, -165,-150, -135, -120,-105, -90, -75,-60 ,-45, -30,-15]; // 发射的角度

        let i = 0;
        let bulletsFired = 0; // 已发射的子弹数量
        const interval = setInterval(() => {
            if (bulletsFired >= 24) {
                clearInterval(interval); 
                return;
            }

            this.fire(angles[i]);
            i++;
            bulletsFired++;
        }, 50);
    }


    start() {
        console.log('player controller start');
        this.actor = this.node.getComponent(Actor);//获取角色组件
        this.actor.stateMgr.registState(new Idle(StateDefine.Idle, this.actor));//注册Idle状态
        this.actor.stateMgr.registState(new Run(StateDefine.Run, this.actor));//注册Run状态        
        this.actor.stateMgr.registState(new Die(StateDefine.Die, this.actor));//注册Die状态
        this.actor.stateMgr.startWith(StateDefine.Idle);//初始状态为Idle
        //PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.All;
        this.projectileEmitter.actor = this.actor;//设置发射器的角色

        director.on(GameEvent.OnFireButtonClicked, this.fire, this);//监听开火按钮点击事件

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);//监听按键按下事件
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);//监听按键抬起事件
    }

    onDestory() {
        PlayerController.instance = null;//销毁时将静态变量置空
        director.off(GameEvent.OnFireButtonClicked, this.fire, this);//取消监听开火按钮点击事件

        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);//取消监听按键按下事件
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);//取消监听按键抬起事件
    }

    update(deltaTime: number) {
        if (this.actor.dead) {
            return;
        }

        let h = VirtualInput.horizontal;//获取水平输入
        let v = VirtualInput.vertical;//获取垂直输入        
        this.actor.input.set(h, v);//设置角色的输入向量
        if (this.actor.input.length() > math.EPSILON) {//如果输入向量的长度大于0
            this.actor.stateMgr.transit(StateDefine.Run);//切换到Run状态
        } else {
            this.actor.stateMgr.transit(StateDefine.Idle);//切换到Idle状态
        }
    }

    fire(direction: AimDirection) {//开火
        this.gun.setWorldRotationFromEuler(0, 0, direction as number);//设置枪的旋转
        this.projectileEmitter.emit();//发射子弹
    }


    // TODO:修改fire_copy函数，使得每次改变方向销毁上一个方向发射的子弹 
    previousDirection: AimDirection | null = null;
    // previousProjectile: Projectile | null = null; // 保存上一次发射的子弹实例
    fire_copy(direction: AimDirection) {//开火
        if (direction == this.previousDirection) { // 如果下次调用还是同一方向，则不开火
            return;
        }
        this.gun.setWorldRotationFromEuler(0, 0, direction as number);//设置枪的旋转
        let bulletCount = 0;
        const fireInterval = 300; // 子弹发射间为0.5秒

        const fireBullet = () => {
            this.projectileEmitter.emit();//发射子弹
            bulletCount++;

            if (bulletCount < 5) {
                setTimeout(fireBullet, fireInterval);
            }
        };

        fireBullet();
        this.previousDirection = direction; // 更新上一次的方向

    }

    onKeyDown(event: EventKeyboard) {//按键按下
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                VirtualInput.vertical = 1;
                break;
            case KeyCode.KEY_S:
                VirtualInput.vertical = -1;
                break;
            case KeyCode.KEY_A:
                VirtualInput.horizontal = -1;
                break;
            case KeyCode.KEY_D:
                VirtualInput.horizontal = 1;
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {//按键抬起
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                VirtualInput.vertical = 0;
                break;
            case KeyCode.KEY_S:
                VirtualInput.vertical = 0;
                break;
            case KeyCode.KEY_A:
                VirtualInput.horizontal = 0;
                break;
            case KeyCode.KEY_D:
                VirtualInput.horizontal = 0;
                break;
        }
    }

}


