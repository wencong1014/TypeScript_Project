// src/index.ts（导入模块）

// 1. 导入命名导出（必须与导出名称一致，可重命名）
import { PI, add, subtract as sub } from "./utils";
console.log(PI);
console.log(add(1, 2));
console.log(sub(3, 2));

// 2. 导入默认导出（名称可自定义）
import Calc from "./utils";
const calc = new Calc();
console.log(calc.divide(10, 2));

// 3. 导入所有导出（用 * 接收，重命名为 utils）
import * as utils from "./utils";
console.log(utils.PI);
console.log(utils.multiply(3, 4));

