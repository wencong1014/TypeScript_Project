// study1.ts
// TypeScript 高级特性

export {};

class Person {
    // 1. 属性类型声明（必选，TS 要求显式声明属性类型）
    name: string;
    age: number;
    readonly gender: string; // 只读属性，一旦赋值后不可更改

    // 2. 构造函数（初始化属性，参数可声明类型）
    constructor(name: string, age: number, gender: string) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    // 3. 方法类型声明（参数类型 + 返回值类型）
    sayHello(): string {
        return `Hello, 我是 ${this.name}, ${this.age} 岁`;
    }

    // 方法参数类型约束
    setAge(newAge: number): void {
        if(newAge > 0 && newAge < 150) {
            this.age = newAge;
        }
    }
}

// 实例化类（参数类型必须匹配构造函数）
const person = new Person("张三", 25, "男");
console.log(person.sayHello());
person.setAge(30);


class Parent {
    public publicProp: string = "public"; //公开属性
    private privateProp: string = "private"; //私有属性
    protected protectedProp: string = "protected"; //受保护属性
    
    public publicMethod() {
        //类内部可访问所有属性
        console.log(this.publicProp, this.privateProp, this.protectedProp);
    }

    private privateMethod() {
        console.log("私有方法");
    }
}

// 外部访问 Parent 实例
const parent1 = new Parent();
console.log(`访问${parent1.publicProp}`);
// console.log(`访问${parent1.privateProp}`); //属性“privateProp”为私有属性，只能在类“Parent”中访问。
// console.log(`访问${parent1.protectedProp}`); //属性“protectedProp”受保护，只能在类“Parent”及其子类中访问。
parent1.publicMethod();
// parent1.privateMethod(); //属性“privateMethod”为私有属性，只能在类“Parent”中访问。

// 子类继承 Paren
class Child extends Parent {
    childMethod() {
        // 子类可访问 public 和 protected 属性，不能访问 private 属性
        console.log(this.publicProp);
        console.log(this.protectedProp);
        // console.log(this.privateProp); // 这里会报错，因为 private 属性在子类中不可访问（封装性原则）
        
        this.publicMethod(); // 合法
        // this.privateMethod(); // 报错：私有属性，子类不能访问
    }
}

const child = new Child();
console.log(`访问child${child.publicProp}`);
// console.log(`访问child${child.protectedProp}`); // 报错：受保护属性，外部不能访问
child.childMethod();

// 抽象类 （不能实例化）
abstract class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    // 普通方法（有具体实现，子类可继承）
    eat(): void {
        console.log(`${this.name} 在吃东西`);
    }

    // 抽象方法（无具体实现，用 abstract 声明，子类必须实现）
    abstract makeSound(): void;
}

// 子类继承抽象类（必须实现抽象方法 makeSound）
class Dog extends Animal {
    // 实现抽象方法（方法名、参数、返回值必须与抽象方法一致）
    makeSound(): void {
        console.log(`${this.name} 汪汪叫`);
    }
}

class Cat extends Animal {
    // 实现抽象方法
    makeSound(): void {
        console.log(`${this.name} 喵喵叫`);
    }
}

const dog = new Dog("旺财");
dog.eat();
dog.makeSound();

const cat = new Cat("小花");
cat.eat();
cat.makeSound();

// 报错：抽象类不能实例化
// const animal = new Animal("动物"); //无法创建抽象类的实例。

