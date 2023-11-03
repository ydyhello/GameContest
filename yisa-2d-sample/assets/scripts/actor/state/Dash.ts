import { Vec2, v2 } from "cc";
import { ActorState } from "./ActorState";
import { StateDefine } from "../StateDefine";

export class Dash extends ActorState {
    time: number = 0;//计时器
    duration: number = 0.8;//持续时间
    dashFactor: number = 2.0;//冲刺系数
    dashVelocity: Vec2 = v2();//冲刺速度

    onEnter() {
        const speed = this.actor.linearSpeed * this.dashFactor;//速度
        this.dashVelocity.x = this.actor.input.x//方向
        this.dashVelocity.y = this.actor.input.y//方向
        this.dashVelocity.normalize();//单位化
        this.dashVelocity.multiplyScalar(this.dashFactor * speed);//乘以速度系数
        this.time = 0;
    }

    onExit() {
        this.dashVelocity.set(0, 0);//速度归零
        this.actor.rigidbody.linearVelocity = this.dashVelocity;//设置速度
    }

    update(deltaTime: number) {
        this.time += deltaTime;//计时

        if (this.time >= this.duration) {
            this.actor.stateMgr.transit(StateDefine.Idle);//切换到Idle状态
        }
        this.actor.rigidbody.linearVelocity = this.dashVelocity;//设置速度
    }

    onDestory() {

    }

    canTransit(to: StateDefine): boolean {
        if (this.time < this.duration) {
            return false;
        }
        return true;
    }
}