/*
 * @Author: YaoDY
 * @Date: 2023-07-18 11:17:47
 * @LastEditors: YaoDY
 * @LastEditTime: 2023-10-22 22:35:08
 * @Description: Read this code carefully
 * @FilePath: \yisa-2d-sample\assets\scripts\actor\projectile\SimpleEmitter.ts
 */
import { CCFloat, Component, Node, Pool, Prefab, RigidBody2D, Vec2, Vec3, _decorator, find, game, instantiate, v2, v3 } from "cc";
import { Projectile } from "./Projectile";
import { Actor } from "../Actor";
const { ccclass, property } = _decorator;

@ccclass('SimpleEmitter')
export class SimpleEmitter extends Component {

    @property(Node)
    emitterRoot: Node | null = null;

    @property(Prefab)
    projectilePrefab: Prefab | null = null;

    @property(CCFloat)
    startLinearSpeed: number = 0;

    @property(CCFloat)
    startAngularSpeed: number = 20;

    actor: Actor = null;    

    cooldown: number = 5;

    castTime: number = 0;

    canvasNode: Node = null;


    start() {        
        this.canvasNode = find('LevelCanvas');
    }

    onDestroy() {
        this.canvasNode = null; 
    }

    get isCoolingdown(): boolean {
        return game.totalTime - this.castTime > this.cooldown * 1000;
    }

    //lastProjectile = null;
    emit() {
        // 销毁上一次发射的子弹
        // if (this.lastProjectile) {
        //     this.destroyProjectile(this.lastProjectile);
        // }
        this.castTime = game.totalTime;//记录发射时间
        for (let i = 0; i < this.emitterRoot.children.length; i++) {
            let emitNode = this.emitterRoot.children[i];
            if (!emitNode.active) {
                continue;
            }
            let wr = emitNode.worldRotation;
            //可以使用内存池获得更好的性能
            let node = instantiate(this.projectilePrefab);
            node.active = true;

            this.canvasNode.addChild(node);

            let left = Vec3.UNIT_X;
            let velocityV3 = v3();
            Vec3.transformQuat(velocityV3, left, wr);

            let rigid = node.getComponent(RigidBody2D);
            let velocity: Vec2 = v2();
            velocity.x = velocityV3.x;
            velocity.y = velocityV3.y;
            velocity.multiplyScalar(this.startLinearSpeed);

            rigid.linearVelocity = velocity;
            rigid.angularVelocity = this.startAngularSpeed;

            node.worldPosition = emitNode.worldPosition;

            let projectile = node.getComponent(Projectile);
            projectile.host = this.actor; 
            //this.lastProjectile = node;           
        }
    }
    // destroyProjectile() {
    //     // 销毁上一次发射的子弹
    //     if (this.lastProjectile) {
    //         this.lastProjectile.destroy();
    //         this.lastProjectile = null;
    //     }
    // }
    // destroyLastProjectile() {
    //     // 如果之前已经发射过子弹，销毁最后一个发射的子弹
    //     if (this.lastProjectile) {
    //         this.lastProjectile.destroy();
    //         this.lastProjectile = null;
    //     }
    // }
    
    

    
    
}