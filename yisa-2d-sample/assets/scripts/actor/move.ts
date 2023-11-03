class MovementTracker {
    dataPointLimit: number;
    dataPoints: any[];
    circleThreshold: number;
    constructor() {
        this.dataPoints = [];
        this.dataPointLimit = 100; // 存储最近的100个数据点
        this.circleThreshold = 500; // 画圈动作的阈值
    }

    onGsencor(x, y, speed, xThrow, yThrow, Z_Gravity, X_Gravity, Y_Gravity) {
        // 存储新的数据点
        this.dataPoints.push({ x, y, speed, xThrow, yThrow, Z_Gravity, X_Gravity, Y_Gravity });

        // 如果存储的数据点超过了限制，移除最老的数据点
        if (this.dataPoints.length > this.dataPointLimit) {
            this.dataPoints.shift();
        }

        // 判断是否发生了画圈动作
        this.detectCircle();
    }

    // 基础的画圈动作检测方法
    detectCircle() {
        let totalMovement = 0;

        // 计算最近的数据点中的总移动量
        for (let dataPoint of this.dataPoints) {
            totalMovement += Math.abs(dataPoint.xThrow) + Math.abs(dataPoint.yThrow);
        }

        // 如果总移动量超过了阈值，那么判断为发生了画圈动作
        if (totalMovement > this.circleThreshold) {
            console.log("Circle motion detected");

            // 这里可以放你处理画圈动作的代码
            // this.updateGameState('circle');
        }
    }
}
