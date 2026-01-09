// src/utils.ts（模块文件）


// 1. 单个导出（命名导出）
export const PI: number = 3.1415;

export function add(a: number, b: number): number {
    return a + b;
}

// 2. 多个导出（批量命名导出）
const subtract = (a: number, b: number): number => a - b;
const multiply = (a: number, b: number): number => a * b;
export { subtract, multiply };

// 3. 默认导出 （一个模块只能有一个默认导出）
export default class Calculator {
    divide(a: number, b: number): number {
        if(b === 0) throw new Error("除数不能为0");
        return a/b;
    }
}

