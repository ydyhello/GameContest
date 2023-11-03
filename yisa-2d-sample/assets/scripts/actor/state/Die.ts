import { Animation, AnimationState, Vec2, director } from "cc";
import { StateDefine } from "../StateDefine";
import { ActorState } from "./ActorState";
import { GameEvent } from "../../event/GameEvent";

export class Die extends ActorState {

    onEnter(): void {
        this.actor.rigidbody.linearVelocity = Vec2.ZERO;//速度归零
        this.animation.play(StateDefine.Die);//播放死亡动画           

        this.animation.once(Animation.EventType.FINISHED, this.onDieEnd, this)//监听死亡动画播放完毕事件

        this.actor.dead = true;//标记死亡        
    }

    onDieEnd(type: Animation.EventType, state: AnimationState) {
        if (type == Animation.EventType.FINISHED) {//死亡动画播放完毕
            if (state.name == StateDefine.Die) {//播放的是死亡动画
                //TODO: remove from parent  
                this.actor.scheduleOnce(() => {//延迟0.1秒后销毁                    
                    this.actor.node.destroy();
                    director.emit(GameEvent.OnDie, this.actor.node);
                }, 0.1);                    
            }
        }
    }

    canTransit(to: StateDefine): boolean {//死亡状态不能切换到其他状态
        return false;
    }
} 