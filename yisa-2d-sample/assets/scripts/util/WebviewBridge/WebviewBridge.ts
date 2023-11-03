interface cb {
    (...prop: any): any;
}

/** 定义和原生交互的方法 */
const WebviewBridge = new class {


    onP1GSensorCallback: cb = null
    onP1GSensorCallbackObj: cb = null
    onP2GSensorCallback: cb = null
    onP2GSensorCallbackObj: cb = null
    onSetP2DataCallback: cb = null
    onSetP2DataCallbackObj: cb = null
    onP1MoveCallback: cb = null
    onP1MoveCallbackObj: cb = null
    onP2MoveCallback: cb = null
    onP2MoveCallbackObj: cb = null
    actionOperationCb: cb = null
    actionOperationCbObj: cb = null
    terminationGameCb: cb = null
    terminationGameCbObj: cb = null
    onVKeyboardNumCb: cb = null
    onVKeyboardNumCbObj: cb = null
    onShowFrontCallback: cb = null
    onShowFrontbackObj: cb = null
    //陀螺仪回调
    onAppleGyroCallback: cb = null
    onAppleGyroCallbackObj: cb = null
    //加速度计回调
    onAppleAccelerometerCallback: cb = null
    onAppleAccelerometerCallbackObj: cb = null
    //姿态的回调
    onAppleAttitudeCallback: cb = null
    onAppleAttitudeCallbackObj: cb = null

    constructor() {


    }

    /** 判断是否是安卓终端 */
    isAndroid() {

        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        return isAndroid

    }

    /** 判断是否是ios终端 */
    isIos() {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isiOS
    }


    setP1GSensorCallback(f, o) {
        this.onP1GSensorCallback = f;
        this.onP1GSensorCallbackObj = o;
    }

    setP2GSensorCallback(f, o) {
        this.onP2GSensorCallback = f;
        this.onP2GSensorCallbackObj = o;
    }

    cleanP1GSensorCallback() {
        this.onP1GSensorCallback = null;
        this.onP1GSensorCallbackObj = null;
    }

    cleanP2GSensorCallback() {
        this.onP2GSensorCallback = null;
        this.onP2GSensorCallbackObj = null;
    }

    setOnShowFrontCallback(f,o){
        this.onShowFrontCallback =f;
        this.onShowFrontbackObj = o;
    }

    setP1MoveCallback(f, o) {
        this.onP1MoveCallback = f;
        this.onP1MoveCallbackObj = o;
    }

    setP2MoveCallback(f, o) {
        this.onP2MoveCallback = f;
        this.onP2MoveCallbackObj = o;
    }

    setTerminationGameCb(f, o) {
        this.terminationGameCb = f;
        this.terminationGameCbObj = o;
    }

    setVKeyboardNumCb(f, o) {
        this.onVKeyboardNumCb = f;
        this.onVKeyboardNumCbObj = o;
    }

    setAppleAccelerometerCb(f, o) {
        this.onAppleAccelerometerCallback = f;
        this.onAppleAccelerometerCallbackObj = o;
    }

    setAppleGyroCb(f, o) {
        this.onAppleGyroCallback = f;
        this.onAppleGyroCallbackObj = o;
    }

    setAppleAttitudeCb(f, o) {
        this.onAppleAttitudeCallback = f;
        this.onAppleAttitudeCallbackObj = o;
    }


    /** 获取用户信息 */
    getP1Data(){
        if (this.isIos()) {
            return window["prompt"] && window["prompt"](JSON.stringify({ func: "getP1Data" }));
        } else if (this.isAndroid()) {
            return window["wjsb"] && window["wjsb"].jsGetP1Data();
        }
        return JSON.stringify({ userId: 10045, name: "TestGM",gender:1, head: "https://mp.weixin.qq.com/mpres/htmledition/images/pic/common/pic_kf_qrcode.jpg", exp: 2 });
    }


    /**
     * 打开陀螺仪
     * @param roleId 1 或者 2
     * @returns 
     */
    openGSensor(roleId: number) {
        if (this.isIos()) {
            return window["prompt"] && window["prompt"](JSON.stringify({ func: "openGSensor", args: `${roleId}` }));
        } else if (this.isAndroid()) {

            return window["wjsb"] && window["wjsb"].jsOpenGSensor(roleId);
        }
    }


      /**
     * 切换变盘虚拟按键
     * @param type 1 无按键 2 中键 3 上按键 下按键 4 左上按键 右上按键 下按键 5 上按键 下按键 左按键 右按键 6 上按键 下按键 左按键 右按键 中按键
     * @returns 
     */
       changeVirtualPanel(type: number) {
        if (this.isIos()) {
            return window["prompt"] && window["prompt"](JSON.stringify({ func: "jsVirtualKeys", args: `${type}` }));
        } else if (this.isAndroid()) {

            return window["wjsb"] && window["wjsb"].jsVirtualKeys(type);
        }
    }

    /**
     * 关闭陀螺仪 
     * @param roleId 1 或者 2
     * @returns 
     */
    closeGSensor(roleId: number) {
        if (this.isIos()) {
            return window["prompt"] && window["prompt"](JSON.stringify({ func: "closeGSensor", args: `${roleId}` }));
        } else if (this.isAndroid()) {
            return window["wjsb"] && window["wjsb"].jsCloseGSensor(roleId);
        }
    }
    

    /**
     * 关闭 p1的陀螺仪
     * @returns 
     */
    closeP1GSensor() {
        if (this.isIos()) {
            return window["prompt"] && window["prompt"](JSON.stringify({ func: "closeP1GSensor" }));
        } else if (this.isAndroid()) {
            return window["wjsb"] && window["wjsb"].jsCloseP1GSensor();
        }
    }


    /**
     * 关闭 p2的陀螺仪
     * @returns 
     */
    closeP2GSensor() {
        if (this.isIos()) {
            return window["prompt"] && window["prompt"](JSON.stringify({ func: "closeP2GSensor" }));
        } else if (this.isAndroid()) {
            return window["wjsb"] && window["wjsb"].jsCloseP2GSensor();
        }
    }


    /** 获取用户信息 */
    getGameInfo() {

        if (this.isIos()) {
            return window["prompt"] && window["prompt"](JSON.stringify({ func: "getGameInfo" }));
        } else if (this.isAndroid()) {
            let res = window["wjsb"] && window["wjsb"].jsGetGameInfo();
            return res;
        }
        return "{\"token\":\"smhl\",\"gid\":2024,\"uid\":10045,\"joinRaceId\":0,\"serverUrl\":\"https://servertest.10m.com.cn\"}";
    }


    /**关闭游戏 */
    closeGame() {
        if (this.isIos()) {
            return window["prompt"] && window["prompt"](JSON.stringify({ func: "closeGame" }));
        }
        else if (this.isAndroid()) {
            return window["wjsb"] && window["wjsb"].jsCloseGame();
        }
    }

    /** 废弃 */
    terminationGame() {

        if (this.terminationGameCb) {
            if (this.terminationGameCbObj) {
                this.terminationGameCb.call(this.terminationGameCbObj);
            }
            else {
                this.terminationGameCb();
            }
        }
    }



    /**处理后的p1数据*/
    moveP1Game(X, Y, Speed, X_Throw, Y_Throw, Z_Gravity, Count_Throw, X_Gravity, Y_Gravity) {
        if (this.onP1MoveCallback) {
            if (this.onP1MoveCallbackObj) {
                this.onP1MoveCallback.call(this.onP1MoveCallbackObj, X, Y, Speed, X_Throw, Y_Throw, Z_Gravity, Count_Throw, X_Gravity, Y_Gravity);
            }
            else {
                this.onP1MoveCallback(X, Y, Speed, X_Throw, Y_Throw, Z_Gravity, Count_Throw, X_Gravity, Y_Gravity);
            }
        }
    }

    /**处理后的p2数据*/
    moveP2Game(X, Y, Speed, X_Throw, Y_Throw, Z_Gravity, Count_Throw, X_Gravity, Y_Gravity) {
        if (this.onP2MoveCallback) {
            if (this.onP2MoveCallbackObj) {
                this.onP2MoveCallback.call(this.onP2MoveCallbackObj, X, Y, Speed, X_Throw, Y_Throw, Z_Gravity, Count_Throw, X_Gravity, Y_Gravity);
            }
            else {
                this.onP2MoveCallback(X, Y, Speed, X_Throw, Y_Throw, Z_Gravity, Count_Throw, X_Gravity, Y_Gravity);
            }
        }
    }

    /**获取虚拟按键*/
    getVKeyboardNum(num: number) {
        if (this.onVKeyboardNumCb) {
            if (this.onVKeyboardNumCbObj) {
                this.onVKeyboardNumCb.call(this.onVKeyboardNumCbObj, num);
            }
            else {
                this.onVKeyboardNumCb(num);
            }
        }
    }
    /**退出游戏返回大厅的时候使用 */
    onShowFront(gid:number){
        if (this.onShowFrontCallback) {
            if (this.onShowFrontbackObj) {
                this.onShowFrontCallback.call(this.onShowFrontbackObj, gid);
            }
            else {
                this.onShowFrontCallback(gid);
            }
        }
    }

    loadingFinish(){
        if (this.isIos()) {
            return window["prompt"] && window["prompt"](JSON.stringify({ func: "loadingFinish" }));
        }
        // else if (this.isAndroid()) {
        //     console.log("to jsloadingFinish");
        //     return window["wjsb"] && window["wjsb"].jsloadingFinish();
        // }
    }

    /**
     * 进入H5游戏 
     * @param gameInfo 1 或者 2
     * @returns
     */
    enterH5Game(gameInfo: string) {
        if (this.isIos()) {
            return window["prompt"] && window["prompt"](JSON.stringify({ func: "enterH5Game", args: `${gameInfo}` }));
        } 
        else if (this.isAndroid()) {
            return window["wjsb"] && window["wjsb"].enterH5Game(gameInfo);
        }
    }

    /**
     * 
     * 获取apple watch数值
     * 
     */
    appleMove(a_x:number, a_y:number, a_z:number, r_x:number, r_y:number, r_z:number, roll:number, pitch:number, yaw:number) {
        // appleMove(roll:number, pitch:number, yaw:number) {
        //a_x,a_y,a_z 加速度
        //r_x,r_y,r_z 陀螺仪角速度
        //roll,pitch,yaw 姿态
        if (this.onAppleAccelerometerCallback) {
            if (this.onAppleAccelerometerCallbackObj) {
                this.onAppleAccelerometerCallback.call(this.onAppleAccelerometerCallbackObj, a_x/100000, a_y/100000, a_z/100000);
            } 
            else {
                this.onAppleAccelerometerCallback(a_x/100000, a_y/100000, a_z/100000);
            }
        }   

        if (this.onAppleGyroCallback) {
            if (this.onAppleGyroCallbackObj) {
                this.onAppleGyroCallback.call(this.onAppleGyroCallbackObj, r_x/100000, r_y/100000, r_z/100000);
            } 
            else {
                this.onAppleGyroCallback(r_x/100000, r_y/100000, r_z/100000);
            }
        }  

        if (this.onAppleAttitudeCallback) {
            if (this.onAppleAttitudeCallbackObj) {
                this.onAppleAttitudeCallback.call(this.onAppleAttitudeCallbackObj, roll/100000, pitch/100000, yaw/100000);
            }
            else {
                this.onAppleAttitudeCallback(roll/100000, pitch/100000, yaw/100000);
            }
        }
    }


    /** new 一个新的类实例 */
    reset() {

        window["WebviewBridge"] = new this["__proto__"].constructor();
    }
}

window["WebviewBridge"] = WebviewBridge;