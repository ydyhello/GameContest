declare type Vec2Like = {
    x: number;
    y: number;
};
declare type Vec3Like = {
    x: number;
    y: number;
    z: number;
};
export declare const DEF_DIR: {
    left: number;
    right: number;
    up: number;
    down: number;
};
/** 2维向量 */
export declare class Vec2 {
    _x: number;
    _y: number;
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    constructor(x?: number, y?: number);
    static v2(x: number, y: number): Vec2;
    static add(a: Vec2 | Vec2Like, b: Vec2 | Vec2Like): Vec2Like;
    static sub(a: Vec2 | Vec2Like, b: Vec2 | Vec2Like): Vec2Like;
    static mag(a: Vec2 | Vec2Like): number;
}
export declare class Vec3 {
    static get ZERO(): Vec3;
    private _x;
    private _y;
    private _z;
    set x(value: number);
    get x(): number;
    set y(value: number);
    get y(): number;
    set z(value: number);
    get z(): number;
    constructor(x?: number, y?: number, z?: number);
    len(): number;
    addSelf(v3: Vec3 | Vec3Like): void;
}
/** 跑步控制器 基类
*  x:空间的x坐标
*  y:空间的y坐标
*  speed：瞬时速度
*  count：投掷次数 2.5.6 之后不再灵敏
*/
export declare class BaseCtrl {
    /** 上一次的 xy坐标 */
    _lastPos: Vec2;
    constructor();
    init(): void;
    Reset(): void;
    /** 解析参数 */
    commOptional(optional: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    };
    /** 拿到上一次坐标和当前坐标的偏移值 */
    getDelta(x: number, y: number, speed: number, count: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): Vec2Like;
}
/**左右移动 */
export declare class LRMoveAct extends BaseCtrl {
    constructor();
    /**
     * 移动动作
     * @param x  空间的x坐标
     * @param y  空间的y坐标
     * @param speed 瞬时速度
     * @param optional
     * @param optional.xrate 对于结果的 x 值的缩放比例
     * @param optional.yrate 对于结果的 y值 的缩放比例
     * @param optional.speedDropLimit 丢弃的速度  比如 100 (丢弃100速度以下的数据)
     * @returns delta 返回一个向量
     */
    move(x: number, y: number, speed: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): Vec2Like;
}
/**平面移动 */
export declare class FreeMoveAct extends BaseCtrl {
    constructor();
    /**
     * 移动动作
     * @param x  空间的x坐标
     * @param y  空间的y坐标
     * @param speed 瞬时速度
     * @param optional
     * @param optional.xrate 对于结果的 x 值的缩放比例
     * @param optional.yrate 对于结果的 y值 的缩放比例
     * @param optional.speedDropLimit 丢弃的速度  比如 100 (丢弃100速度以下的数据)
     * @returns delta 返回一个向量
     */
    move(x: number, y: number, speed: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): Vec2Like;
}
/**跳跃 */
export declare class JumpAct extends BaseCtrl {
    yMove: number;
    height: number;
    /**
     *
     * @param height 竖直方向移动多少触发跳跃
     */
    constructor(height?: number);
    /**
     * 跳跃动作
     * @param x  空间的x坐标
     * @param y  空间的y坐标
     * @param speed 瞬时速度
     * @param optional
     * @param optional.xrate 对于结果的 x 值的缩放比例(默认是1，不缩放)
     * @param optional.yrate 对于结果的 y 值的缩放比例(默认是1，不缩放)
     * @param optional.speedDropLimit 丢弃的速度  比如 100 (丢弃100速度以下的数据)
     * @returns 返回一个Boolean类型的值。表示 是否触发跳跃动作
     */
    jump(x: number, y: number, speed: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): boolean;
}
/**跳绳动作 */
export declare class JumpRopeAct extends BaseCtrl {
    accSpeed: number;
    constructor(accSpeed?: number);
    /**
     * 跳绳动作
     * @param x  空间的x坐标
     * @param y  空间的y坐标
     * @param speed 瞬时速度
     * @param optional
     * @param optional.xrate 对于结果的 x 值的缩放比例
     * @param optional.yrate 对于结果的 y值 的缩放比例
     * @param optional.speedDropLimit 丢弃的速度  比如 100 (丢弃100速度以下的数据)
     * @returns 返回一个Boolean类型的值。表示 是否触发跳绳动作
     */
    jumpRope(x: number, y: number, speed: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): boolean;
}
/** 划船动作 */
export declare class BoatingAct extends BaseCtrl {
    constructor();
    /**
     *  划船动作
     * @param x  空间的x坐标
     * @param y  空间的y坐标
     * @param speed 瞬时速度
     * @param optional
     * @param optional.xrate 对于结果的 x 值的缩放比例
     * @param optional.yrate 对于结果的 y值 的缩放比例
     * @param optional.speedDropLimit 丢弃的速度  比如 100 (丢弃100速度以下的数据)
     * @returns 返回一个Boolean类型的值。表示 是否触发划船动作
     */
    boating(x: number, y: number, speed: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): boolean;
}
/** 捶打动作 */
export declare class HammeringAct extends BaseCtrl {
    constructor();
    /**
     * 捶打动作
     * @param x  空间的x坐标
     * @param y  空间的y坐标
     * @param speed 瞬时速度
     * @param optional
     * @param optional.xrate 对于结果的 x 值的缩放比例
     * @param optional.yrate 对于结果的 y值 的缩放比例
     * @param optional.speedDropLimit 丢弃的速度  比如 100 (丢弃100速度以下的数据)
     * @returns 返回一个Boolean类型的值。表示 是否触发捶打动作
     */
    hammering(x: number, y: number, speed: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): boolean;
}
/** 游泳动作 */
export declare class SwimAct extends BaseCtrl {
    constructor();
    /**
     * 游泳动作
     * @param x  空间的x坐标
     * @param y  空间的y坐标
     * @param speed 瞬时速度
     * @param optional
     * @param optional.xrate 对于结果的 x 值的缩放比例
     * @param optional.yrate 对于结果的 y值 的缩放比例
     * @param optional.speedDropLimit 丢弃的速度  比如 100 (丢弃100速度以下的数据)
     * @returns 返回一个游泳的速度。大于0表示触发游泳动作,0 表示没有触发游泳动作
     */
    swim(x: number, y: number, speed: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): number;
}
/** 爬树动作 */
export declare class ClimbAct extends BaseCtrl {
    constructor();
    /**
     * 爬树动作
     * @param x  空间的x坐标
     * @param y  空间的y坐标
     * @param speed 瞬时速度
     * @param optional
     * @param optional.xrate 对于结果的 x 值的缩放比例
     * @param optional.yrate 对于结果的 y值 的缩放比例
     * @param optional.speedDropLimit 丢弃的速度  比如 100 (丢弃100速度以下的数据)
     * @returns 返回一个爬树的速度。大于0表示触发爬树动作,0 表示没有触发爬树动作
     */
    climb(x: number, y: number, speed: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): number;
}
/** 投掷动作 */
export declare class ThrowAct extends BaseCtrl {
    constructor();
    /**
     * 投掷动作
     * @param x  空间的x坐标
     * @param y  空间的y坐标
     * @param speed 瞬时速度
     * @param optional
     * @param optional.xrate 对于结果的 x 值的缩放比例
     * @param optional.yrate 对于结果的 y值 的缩放比例
     * @param optional.speedDropLimit 丢弃的速度  比如 100 (丢弃100速度以下的数据)
     * @returns 返回一个游泳的速度。大于0表示触发游泳动作,0 表示没有触发游泳动作
     */
    throw(x: number, y: number, speed: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): number;
}
/** 挥击动作 */
export declare class WaveAct extends BaseCtrl {
    constructor();
    /**
     * 挥击动作
     * @param x  空间的x坐标
     * @param y  空间的y坐标
     * @param speed 瞬时速度
     * @param optional
     * @param optional.xrate 对于结果的 x 值的缩放比例
     * @param optional.yrate 对于结果的 y值 的缩放比例
     * @param optional.speedDropLimit 丢弃的速度  比如 100 (丢弃100速度以下的数据)
     * @returns 返回一个游泳的速度。大于0表示触发游泳动作,0 表示没有触发游泳动作
     */
    wave(x: number, y: number, speed: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): number;
}
/** 乒乓球动作 */
export declare class PingpongAct extends BaseCtrl {
    constructor();
    /**
     * 正拍动作
     * @param x  空间的x坐标
     * @param y  空间的y坐标
     * @param speed 瞬时速度
     * @param optional
     * @param optional.xrate 对于结果的 x 值的缩放比例
     * @param optional.yrate 对于结果的 y值 的缩放比例
     * @param optional.speedDropLimit 丢弃的速度  比如 100 (丢弃100速度以下的数据)
     * @returns 返回一个游泳的速度。大于0表示触发游泳动作,0 表示没有触发游泳动作
     */
    forehand(x: number, y: number, speed: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): number;
    /**
    * 反拍动作
    * @param x  空间的x坐标
    * @param y  空间的y坐标
    * @param speed 瞬时速度
    * @param optional
    * @param optional.xrate 对于结果的 x 值的缩放比例
    * @param optional.yrate 对于结果的 y值 的缩放比例
    * @param optional.speedDropLimit 丢弃的速度  比如 100 (丢弃100速度以下的数据)
    * @returns 返回一个游泳的速度。大于0表示触发游泳动作,0 表示没有触发游泳动作
    */
    backhand(x: number, y: number, speed: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): number;
}
/** 出拳动作 */
export declare class PunchAct extends BaseCtrl {
    constructor();
    /**
     *  出拳动作
     * @param x  空间的x坐标
     * @param y  空间的y坐标
     * @param speed 瞬时速度
     * @param optional
     * @param optional.xrate 对于结果的 x 值的缩放比例
     * @param optional.yrate 对于结果的 y值 的缩放比例
     * @param optional.speedDropLimit 丢弃的速度  比如 100 (丢弃100速度以下的数据)
     * @returns 返回一个Boolean类型的值。表示 是否触发划船动作
     */
    punch(x: number, y: number, speed: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): boolean;
}
/** 跑步动作 */
export declare class RunningAct extends BaseCtrl {
    constructor();
    /**
     *  跑步动作
     * @param x  空间的x坐标
     * @param y  空间的y坐标
     * @param speed 瞬时速度
     * @param optional
     * @param optional.xrate 对于结果的 x 值的缩放比例
     * @param optional.yrate 对于结果的 y值 的缩放比例
     * @param optional.speedDropLimit 丢弃的速度  比如 100 (丢弃100速度以下的数据)
     * @returns 返回一个Boolean类型的值。表示 是否触发划船动作
     */
    running(x: number, y: number, speed: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): boolean;
}
/** 摇晃动作 */
export declare class ShakeAct extends BaseCtrl {
    constructor();
    /**
     *  摇晃动作
     * @param x  空间的x坐标
     * @param y  空间的y坐标
     * @param speed 瞬时速度
     * @param optional
     * @param optional.xrate 对于结果的 x 值的缩放比例
     * @param optional.yrate 对于结果的 y值 的缩放比例
     * @param optional.speedDropLimit 丢弃的速度  比如 100 (丢弃100速度以下的数据)
     * @returns 返回一个Boolean类型的值。表示 是否触发划船动作
     */
    shake(x: number, y: number, speed: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): boolean;
}
/** 高位挥打动作 */
export declare class HeightWaveAct extends BaseCtrl {
    constructor();
    /**
     * 高位挥打动作
     * @param x  空间的x坐标
     * @param y  空间的y坐标
     * @param speed 瞬时速度
     * @param optional
     * @param optional.xrate 对于结果的 x 值的缩放比例
     * @param optional.yrate 对于结果的 y值 的缩放比例
     * @param optional.speedDropLimit 丢弃的速度  比如 100 (丢弃100速度以下的数据)
     * @returns 返回一个Boolean类型的值。表示 是否触发高位挥打动作
     */
    heightWave(x: number, y: number, speed: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): boolean;
}
/** 滑冰动作 */
export declare class SkateAct extends BaseCtrl {
    constructor();
    /**
     * 滑冰动作
     * @param x  空间的x坐标
     * @param y  空间的y坐标
     * @param speed 瞬时速度
     * @param optional
     * @param optional.xrate 对于结果的 x 值的缩放比例
     * @param optional.yrate 对于结果的 y值 的缩放比例
     * @param optional.speedDropLimit 丢弃的速度  比如 100 (丢弃100速度以下的数据)
     * @returns 返回一个游泳的速度。大于0表示触发游泳动作,0 表示没有触发游泳动作
     */
    skate(x: number, y: number, speed: number, optional?: {
        xRate?: number;
        yRate?: number;
        speedDropLimit?: number;
    }): number;
}
export {};
