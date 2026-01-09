"use strict";
// src/utils.ts��ģ���ļ���
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiply = exports.subtract = exports.PI = void 0;
exports.add = add;
// 1. ��������������������
exports.PI = 3.1415;
function add(a, b) {
    return a + b;
}
// 2. �����������������������
const subtract = (a, b) => a - b;
exports.subtract = subtract;
const multiply = (a, b) => a * b;
exports.multiply = multiply;
// 3. Ĭ�ϵ��� ��һ��ģ��ֻ����һ��Ĭ�ϵ�����
class Calculator {
    divide(a, b) {
        if (b === 0)
            throw new Error("��������Ϊ0");
        return a / b;
    }
}
exports.default = Calculator;
