import { _decorator, Component, RigidBody2D, CircleCollider2D, Animation, Collider2D, Sprite, Vec2, v2, math, Color, Quat, CCFloat, Contact2DType, IPhysics2DContact, v3 } from 'cc';
import { StateMachine } from '../fsm/StateMachine';
import { StateDefine } from './StateDefine';
import { mathutil } from '../util/MathUtil';
import { colliderTag } from './ColliderTags';
import { Projectile } from './projectile/Projectile';
const { ccclass, property, requireComponent, disallowMultiple } = _decorator;

@ccclass('Actor')
@requireComponent(RigidBody2D)
@requireComponent(CircleCollider2D)
@disallowMultiple(true)
export class Actor extends Component {

    rigidbody: RigidBody2D | null = null;//刚体

    collider: Collider2D | null = null;//碰撞体

    stateMgr: StateMachine<StateDefine> = new StateMachine();//状态机

    @property(Animation)
    animation: Animation = null;//动画

    hp: number = 100;//生命值
    maxHp: number = 100;//最大生命值
    attack: number = 10;//攻击力
    linearSpeed: number = 3;//角色移动速度

    @property(Sprite)
    mainRenderer: Sprite//主渲染器

    _input: Vec2 = v2();//输入,控制角色的移动
    set input(v: Vec2) { this._input.set(v.x, v.y); }
    get input(): Vec2 { return this._input; }

    dead: boolean = false;

    @property(CCFloat)
    linsearSpeed: number = 1;

    //在游戏开始时被调用。在这个方法中，获取了角色的刚体和碰撞器组件，并添加了一个碰撞开始的事件监听器
    start() {

        console.log('actor start');
        this.rigidbody = this.node.getComponent(RigidBody2D);
        this.collider = this.node.getComponent(Collider2D);

        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onProjectileTriggerEnter, this);
    }

    
    onDestroy() {
    }

    //在每一帧被调用。在这个方法中，更新了角色的状态机，并根据输入向量设置了角色的旋转
    update(deltaTime: number) {
        this.stateMgr.update(deltaTime);

        if (this.input.x < 0) {
            this.mainRenderer.node.rotation = mathutil.ROT_Y_180;
        } else if (this.input.x > 0) {
            this.mainRenderer.node.rotation = Quat.IDENTITY;
        }
    }

    //在角色与投射物碰撞开始时被调用。在这个方法中，检测了碰撞的投射物是否可以造成伤害
    onProjectileTriggerEnter(ca: Collider2D, cb: Collider2D, contact: IPhysics2DContact) {
        if (colliderTag.isProjectileHitable(cb.tag, ca.tag)) {
            // console.log('project tigger enter', contact);
            let hurtSrc = cb.node.getComponent(Projectile).host;
            let hitNormal = v3();
            Vec2.subtract(hitNormal, ca.node.worldPosition, cb.node.worldPosition);//计算碰撞法线
            hitNormal.normalize();
            const v2Normal = v2(hitNormal.x, hitNormal.y);
            this.onHurt(this.attack, hurtSrc, v2Normal);
        }
    }

    //在角色受到伤害时被调用。在这个方法中，减少了角色的生命值，如果生命值降到 0 或以下，则将角色的状态转换为死亡状态
    onHurt(damage: number, from: Actor, hurtDirection?: Vec2) {
        this.hp = Math.floor(math.clamp(this.hp - damage, 0, this.maxHp));
        //受力
        this.rigidbody.applyLinearImpulseToCenter(hurtDirection,true);
        //受伤闪硕
        this.mainRenderer.color = Color.RED;
        this.scheduleOnce(() => {
            this.mainRenderer.color = Color.WHITE;
        }, 0.2);

        if (this.hp <= 0) {
            this.stateMgr.transit(StateDefine.Die);
        }
    }
}

