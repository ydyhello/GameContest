/*
 * @Author: YaoDY
 * @Date: 2023-07-18 11:17:47
 * @LastEditors: YaoDY
 * @LastEditTime: 2023-10-09 22:55:53
 * @Description: Read this code carefully
 * @FilePath: \yisa-2d-sample\assets\scripts\ui\UIWin.ts
 */
import { Component, _decorator, director } from "cc";
const { ccclass, property, requireComponent } = _decorator;


@ccclass("UIWin")
export class UIWin extends Component {    

    onBtnRetryClicked() {//重试        
        director.loadScene("game");
    }
}