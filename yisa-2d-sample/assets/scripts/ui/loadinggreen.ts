import { _decorator, Component, Node, ProgressBar, director, find, Sprite } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('loadinggreen')
export class loadinggreen extends Component {
    item: number;

    progressBar: ProgressBar;

    start() {
        // 获取进度条节点
        this.progressBar = find("Canvas/loading/JDT_BG").getComponent(ProgressBar);
        // 将进度条图的填充总量置为0
        this.progressBar.progress = 0;

        // 使用计时器进行进度条更新
        this.schedule(this.updateProgressBar, 0.1);
    }

    updateProgressBar() {
        // 随机数字
        let math_random = Math.ceil(Math.random() * 6 + 6);
        //let math_random = 10;
        // 进度条填充总量增加
        this.progressBar.progress += math_random / 100;

        // 判断进度条是否加载完全
        if (this.progressBar.progress >= 1.0) {
            // 进行下一步操作
            // 切换到game场景
            director.loadScene("game");
        }

        // console.log("progressBar.progress = ", this.progressBar.progress);
    }
}
