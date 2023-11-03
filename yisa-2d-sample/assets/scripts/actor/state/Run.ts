import { Vec2, math, v2 } from "cc";
import { StateDefine } from "../StateDefine";
import { ActorState } from "./ActorState";

export class Run extends ActorState {
    //临时速度
    velocity: Vec2 = v2();

    onExit() {

    }

    onDestory() {

    }

    onEnter(): void {
        this.animation.crossFade(StateDefine.Run);//播放跑步动画
    }

    update(deltaTime: number): void {
        this.velocity.set(this.actor.input.x, this.actor.input.y);//设置速度
        this.velocity.multiplyScalar(this.actor.linearSpeed);//乘以速度系数
        this.actor.rigidbody.linearVelocity = this.velocity;//设置刚体速度

        if (this.actor.input.length() <= math.EPSILON) {//如果输入向量的长度小于等于0
            this.actor.stateMgr.transit(StateDefine.Idle);//切换到Idle状态
        }
    }

    canTransit(to: StateDefine): boolean {//跑步状态不能切换到跑步状态
        if (to == this.id) {
            return false;
        }
        return true;
    }
}