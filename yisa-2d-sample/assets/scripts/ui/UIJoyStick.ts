/*
 * 
 *    ┏┓　　　┏┓
 *  ┏┛┻━━━┛┻┓
 *  ┃　　　　　　　┃
 *  ┃　　　━　　　┃
 *  ┃　＞　　　＜　┃
 *  ┃　　　　　　　┃
 *  ┃...　⌒　...　┃
 *  ┃　　　　　　　┃
 *  ┗━┓　　　┏━┛
 *      ┃　　　┃　
 *      ┃　　　┃
 *      ┃　　　┃
 *      ┃　　　┃  神兽保佑
 *      ┃　　　┃  代码无bug　　
 *      ┃　　　┃
 *      ┃　　　┗━━━┓
 *      ┃　　　　　　　┣┓
 *      ┃　　　　　　　┏┛
 *      ┗┓┓┏━┳┓┏┛
 *        ┃┫┫　┃┫┫
 *        ┗┻┛　┗┻┛
 */

import { _decorator, Component, CCFloat, EventTouch, Input, math, Sprite, v3, Vec3, Vec2, v2 } from 'cc';
import { VirtualInput } from '../inputs/VirtualInput';
const { ccclass, property } = _decorator;

/**
 * 摇杆控制器
 */
@ccclass('UIJoyStick')
export class UIJoyStick extends Component {

    /**
     * 手指部分
     */
    @property(Sprite)
    thumbnail: Sprite | null = null;

    /**
     * 摇杆的背景
     */
    @property(Sprite)
    joyStickBg: Sprite | null = null;

    /**
     * 摇杆的半径
     */
    @property(CCFloat)
    radius: number = 145;

    /**
     * 摇杆初始化的位置
     */
    initJoyStickBgPosition: Vec3 = v3()

    start() {//初始化
        WebviewBridge.openGSensor(1);
        // this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);//触摸移动
        // this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);//触摸结束
        // this.node.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);//触摸取消
        // this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);//触摸开始
        this.initJoyStickBgPosition = this.joyStickBg.node.worldPosition.clone();//记录摇杆的初始位置（记得clone）
        console.log('this.initJoyStickBgPosition', this.initJoyStickBgPosition)
        WebviewBridge.setP1MoveCallback(this.onGsencor, this);
    }

    onDestroy() {
        // this.node.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        // this.node.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        // this.node.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        // this.node.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart(eventTouch: EventTouch) {
        let x = eventTouch.touch.getUILocationX();//获取摇杆在 UI 的位置
        let y = eventTouch.touch.getUILocationY();//获取摇杆在 UI 的位置
        this.joyStickBg.node.setWorldPosition(x, y, 0);//设置摇杆的位置
    }
    protected _oldPos1: Vec2;
    protected thumbnailPosition=v3(0,0,0);
    onGsencor(X, Y, Speed, X_Throw, Y_Throw, Z_Gravity, Count_Throw, X_Gravity, Y_Gravity) {
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
            
            this.thumbnailPosition.x+=delta.x*0.25;
            this.thumbnailPosition.y+=delta.y*0.35;

            let distanceToCenter = Math.sqrt(Math.pow(this.thumbnailPosition.x, 2) + Math.pow(this.thumbnailPosition.y, 2));
            // 如果 thumbnailPosition 超出了圆的范围
            if (distanceToCenter > this.radius) {
                // 将 thumbnailPosition 重新定位到圆上
                let angle = Math.atan2(this.thumbnailPosition.y, this.thumbnailPosition.x); // 计算角度
                this.thumbnailPosition.x = this.radius * Math.cos(angle);
                this.thumbnailPosition.y = this.radius * Math.sin(angle);
            }
            
            this.thumbnail.node.setPosition(this.thumbnailPosition);
            VirtualInput.horizontal = this.thumbnail.node.position.x / this.radius;
            VirtualInput.vertical = this.thumbnail.node.position.y / this.radius;

        }
        this._oldPos1 = v2(X, Y);
    }

    /**
     * 触摸移动
     * @param touchEvent 
     */
    onTouchMove(touchEvent: EventTouch) {
        // 获取摇杆在 UI 的位置
        let x = touchEvent.touch.getUILocationX();
        let y = touchEvent.touch.getUILocationY();
        // 获取摇杆的世界坐标

        // 2.世界坐标转化为本地坐标
        let worldPosition = new Vec3(x, y, 0);
        // console.log('worldPosition', worldPosition)
        let localPosition = v3();

        // 转化摇杆的位置到背景图的本地坐标
        this.joyStickBg.node.inverseTransformPoint(localPosition, worldPosition);
        // console.log('worldPosition', worldPosition)
        let thumbnailPosition = v3();//存放thumbnail精灵的位置
        let len = localPosition.length();
        localPosition.normalize();

        // 2.设置thumbanil精灵的位置
        Vec3.scaleAndAdd(thumbnailPosition, v3(), localPosition, math.clamp(len, 0, this.radius));

        this.thumbnail.node.setPosition(thumbnailPosition);
        // console.log('this.thumbnail.node.position',this.thumbnail.node.position)
        // console.log('thumbnailPosition',thumbnailPosition)
        // 3.将计算的结果赋予给 Input
        VirtualInput.horizontal = this.thumbnail.node.position.x / this.radius;
        VirtualInput.vertical = this.thumbnail.node.position.y / this.radius;
        //console.log(VirtualInput.horizontal, VirtualInput.vertical);
    }

    /**
     * 触摸结束
     * @param touchEvent 
     */
    onTouchEnd(touchEvent: EventTouch) {
        this.thumbnail.node.setPosition(v3());
        VirtualInput.horizontal = 0;//清零
        VirtualInput.vertical = 0;

        // 摇杆的位置回归到初始化位置
        this.joyStickBg.node.worldPosition = this.initJoyStickBgPosition;
    }
}

