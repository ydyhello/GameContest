import { Vec2 } from "cc";
import { StateDefine } from "../StateDefine";
import { ActorState } from "./ActorState";

export class Idle extends ActorState {    

    onEnter(): void {        
        this.actor.rigidbody.linearVelocity = Vec2.ZERO;//速度归零
        let hasIdle = this.animation.getState(StateDefine.Idle);//是否有Idle动画
        if (hasIdle){
            this.animation.play(StateDefine.Idle);//播放Idle动画
        }            
    }

    update(deltaTime: number) {

    }

    onExit(): void {

    }

    onDestory(): void {

    }

    canTransit(to: StateDefine): boolean {
        if (to == StateDefine.Idle) {//如果要切换的状态是Idle，那么不能切换
            return false;
        }
        return true;
    }
} 