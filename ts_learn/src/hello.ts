// hello.ts

export {};

let message: string = "hello, typescript!";
console.log(message);

console.log('I say "Hi"');

// 1. 带类型注解的箭头函数（显式返回）
const add = (a: number, b: number): number => a + b;
console.log('add(2,3)=', add(2, 3));

// 2. 隐式返回，类型由上下文推断
const square = (n: number) => n * n;
console.log('square(5)=', square(5));

// 3. 箭头函数的词法 this：箭头函数不会创建自己的 this
class Counter {
	count = 0;
	start() {
		setTimeout(function (this: any) {
			// 普通函数的 this 在这里不是 Counter 实例（严格模式下为 undefined）
			console.log('function callback this is', this);
		}, 10);

		setTimeout(() => {
			// 箭头函数继承外层的 this，因此可以访问 this.count
			this.count++;
			console.log('arrow callback this.count =', this);
		}, 20);
	}
}
const c = new Counter();
// c.start();

// 4. 箭头函数没有 arguments，可使用剩余参数
const restLen = (...args: any[]) => args.length;
console.log('restLen(1,2,3)=', restLen(1, 2, 3));

// 5. 泛型箭头函数
const id = <T>(x: T): T => x;
console.log('id<string>("hi")=', id<string>('hi'));

// 6. 使用函数类型注解
const f: (x: number) => number = x => x * 2;
console.log('f(4)=', f(4));

// 1. 可选参数（age 可选，放在必选参数 name 后面）
function getUser(name: string, age?: number): string {
  return age ? `${name}, ${age}岁` : name;
}
console.log(getUser("张三")); // 合法（省略可选参数）
console.log(getUser("张三", 25)); // 合法

// 3. 默认参数在前（需显式传 undefined 跳过）
function fn(a: number = 10, b: number): number {
  return a + b;
}
console.log(fn(5, 20)); // 合法（a 用默认值 10，b 传 20）

// 剩余参数 nums 为 number 数组，返回所有数字的和
function sum(...nums: number[]): number {
  return nums.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3)); // 6
console.log(sum(4, 5, 6, 7)); // 22

// 剩余参数 + 固定参数
function logInfo(name: string, ...details: string[]): void {
  console.log(`姓名：${name}，详情：${details.join(", ")}`);
}
logInfo("张三", "25岁", "前端开发"); // 姓名：张三，详情：25岁, 前端开发

const nums = [1,2,3];
const sum1 = nums.reduce((acc, n) => acc + n, 0); 
console.log(sum1); // 6

// 1、泛型函数定义：<T> 是泛型参数（T是占位符，可自定义名称，如<K> <U>）
// T 会动态接收传入参数的类型，参数val类型为T, 返回类型也为T
function identity<T>(val: T): T{
    return val;
}

// 2、调用泛型函数（2种方式）
// 方式1：显式指定泛型类型（<number>表示 T = number）
const num2 = identity<number>(123); //num类型为number

// 方式2：TS自动推导泛型类型（推荐，简化代码）
const str2 = identity('abc'); //自动推导 T = string, str类型为string
const obj = identity({name: '张三'}); //自动推导 T = 对象类型

// 3. 多泛型参数（多个动态类型传递）
// T 表示第一个参数类型，U 表示第二个参数类型，返回值为 [T, U] 元组类型
function merge<T, U>(a: T, b: U):[T, U] {
    return [a, b];
}

// 自动推导 T=number，U=string，返回值类型为 [number, string]
const merged = merge(123, 'abc');
const [numVal, strVal] = merged; // numVal: number，strVal: string

// 需求：函数接收一个对象，返回对象的 length 属性（需确保对象有 length 属性）
interface HasLength {
    length: number; // 约束泛型必须有 length 属性
}

// 泛型约束：T extends HasLength → T 必须是 HasLength 的子类型（包含 length 属性）
function getLength<T extends HasLength>(val: T): number {
    return val.length; 
}

// 合法调用（传入值有 length 属性）
console.log(getLength('abc')); // 3
console.log(getLength([1, 2, 3]));
console.log(getLength({length: 5}));

// 1. 泛型类型别名（描述通用数组/对象）
// 通用数组类型（等价于 T[]）
type GenericArray<T> = Array<T>;
const numArr: GenericArray<number> = [1, 2, 3]; //数字数组
const strArr: GenericArray<string> = ['a', 'b', 'c']; //字符串数组

// 通用对象类型（键为 string，值为 T 类型）
type GenericObj<T> = {[key: string]: T};
// 注：属性名写为未加引号的标识符（如 a）在 JS 中会被当作字符串键处理，
// {a: 1, b: 2} 与 {'a': 1, 'b': 2} 在运行时等价，都会创建字符串键 'a' 和 'b'.
const obj1:GenericObj<number> = {a: 1, b: 2};
const obj2:GenericObj<string> = {name: "张三", age: "25"};

// 2. 泛型接口（描述通用函数/对象）
interface GenericFu<T, U> {
    (parm: T): U; //接受T类型参数， 返回U类型值
}

// 实现泛型接口：T = number, U = string
const numToString: GenericFu<number, string> = (num) => num.toString();
console.log(numToString(123));

const stringToNum: GenericFu<string, number> = (str) => Number(str);
console.log(stringToNum("123"));

// 泛型默认值：T 默认为 string 类型
function createArray<T = string>(length: number, val: T): T[] {
    return Array(length).fill(val);
}

console.log(createArray(3, "abc")); // 合法，T默认为string

// 2. 未指定泛型，无法推导（val 未传？不，这里 val 必传，换个例子）
// 泛型默认值示例 2：T 默认为 number
type DefaultGeneric<T = number> = {value: T};
const obj3: DefaultGeneric = {value: 123}; // T = number（使用默认值）
const obj4: DefaultGeneric<string> = {value : "abc"}; // T = string（显式指定类型）

// 1. typeof 类型守卫（基础类型判断）
function handleValue(val: number | string | boolean) {
	if(typeof val === "string") {
		console.log(val.length); //val 为 string，可调用 length 属性
	} else if(typeof val === "number") {
		console.log(val.toFixed(2)); // val 为 number，可调用 toFixed
	} else{
		console.log(val ? "true" : "false"); // val 为 boolean类型
	}
}

// 2. instanceof 类型守卫（引用类型判断）
class Animal {name: string; constructor(name: string) {this.name = name;}}
class Dog extends Animal { bark() {console.log('汪汪');} }
class Cat extends Animal { meow() {console.log('喵喵');} }

function animalSound(animal: Animal) {
	if(animal instanceof Dog) {
		animal.bark(); // animal 为 Dog 类型，可调用 bark方法
	} else if(animal instanceof Cat) {
		animal.meow(); // animal 为 Cat 类型，可调用 meow 方法
	}
}

const dog1 = new Dog("旺财");

animalSound(dog1);
console.log(dog1.name);

// 3. in 类型守卫（对象属性判断）
type User = { id: number, name: string };
type Product = { id: number,  price: number };

function getInfo(item: User | Product) {
	if("name" in item) {
		console.log(`用户：${item.name}`); // item 为 User 类型，有 name属性
	} else {
		console.log(`商品价格：${item.price}`);  // item 为 Product 类型，有 price属性
	}
}

const user1: User = {id: 1, name: "张三"};
const product1: Product = {id: 1, price: 100};

getInfo(user1);
getInfo(product1);

// 4. 自定义类型守卫（复杂类型判断）
// 自定义函数，返回值为 `val is User`（类型谓词），表示若返回 true，则 val 是 User 类型
function isUser(val: any): val is User {
	return typeof val === "object" && val != null && "id" in val && "name" in val && typeof val.id === "number";
}

function printUser(val: any) {
	if(isUser(val)) {
		console.log(val.id, val.name); //TS确定val是User类型， 无报错
	} else {
		console.log("不是User类型");
	}	
}

printUser({id: 1, name: "张三"});
printUser({price: 100});

type UserA = {
	id: number;
	name: string;
	age:number;
};

// 1. keyof T：获取 User 的所有属性名组成的联合类型 → "id" | "name" | "age"
type UserKeys = keyof UserA;
const key1: UserKeys = "id"; // 合法
const key2: UserKeys = "name"; // 合法
// const key3: UserKeys = "gender"; // 报错：不在属性名联合类型中

// 2. T[K]：获取属性值类型（K 是属性名类型）
// 获取 User 中 "id" 属性的类型 → number
type IdType = UserA["id"];
// 获取 User 中 "name" 属性的类型 → string
type NameType = UserA["name"];
// 获取 User 中多个属性的类型 → number | string
type MixedType = UserA["id" | "name"];

// 3. 泛型 + 索引类型（实战场景：安全获取对象属性）
// 函数功能：获取对象 obj 中 key 对应的属性值，确保 key 是 obj 的合法属性
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
	return obj[key];
}

const user: UserA = { id: 1, name: "张三", age: 25 };
// 合法调用：key 是 User 的属性名，返回值类型自动匹配
const userId = getProp(user, "id"); // number 类型
const userName = getProp(user, "name"); // string 类型

// 报错：key 不是 User 的属性名（TS 编译时拦截错误，避免运行时 bug）
// const userGender = getProp(user, "gender");

// 1. 字符串索引签名（属性名是 string，属性值是 number）
type NumObj = {
	[key: string]: number;
};
const obj5: NumObj = {a: 1, b: 2, c: 3}; //合法
// const obj2: NumObj = { a: 1, b: "2" }; // 报错：属性值必须是 number

type UserB = {
	id: number; //固定属性（number兼容任意属性类型）
	[key: string]: number | string; //任意属性，值可以是 number 或 string
};
const user2: UserB = {
	id: 1,
	name: "张三",
	age: 25,
};

type NumArray = {
	[key: number]: number;
};
const arr:NumArray = [1, 2, 3, 4];
arr[1] = 4;

// 原始类型
type UserC = {
  id: number;
  name: string;
  age: number;
};

// 1. 基础映射：遍历 UserC 的所有属性，属性值类型改为 string（批量修改类型）
type UserToString = {
  [K in keyof UserC]: string; // K 遍历 keyof UserC（"id" | "name" | "age"），值类型改为 string
};
// UserToString 等价于：{ id: string; name: string; age: string }
const user3: UserToString = { id: "1", name: "张三", age: "25" };


// 2. 映射 + 泛型：通用映射类型（复用）
// 通用映射：将任意类型 T 的所有属性值类型改为 U
type MapType<T, U> = {
  [K in keyof T]: U;
};

// 将 User 的所有属性值改为 boolean 类型
type UserToBoolean = MapType<User, boolean>;
// 等价于：{ id: boolean; name: boolean; age: boolean }


// 3. 映射 + 索引类型：基于原始属性值类型修改
// 通用映射：将任意类型 T 的所有属性值类型改为「原始类型 + string」的联合类型
type MapWithOriginalType<T> = {
  [K in keyof T]: T[K] | string; // T[K] 是原始属性值类型
};

type UserWithString = MapWithOriginalType<User>;
// 等价于：{ id: number | string; name: string | string; age: number | string }

// 1. Partial<T>：可选属性（常用于更新对象时，只传部分属性）
function updateUser(user: UserC, updates: Partial<UserC>): UserC {
	return { ...user, ...updates };
}

const oldUser: UserC = { id: 1, name: "张三", age: 25};
// 只更新name属性（其他属性可选）
const newUser = updateUser(oldUser, { name: "李四" });
console.log(newUser);

const upd: Partial<UserC> = { id: 2, name: "李四" };
console.log(upd);

// 2. Readonly<T>：只读属性（防止对象被修改）
const readonlyUser: Readonly<UserC> = { id: 2, name: "王二麻子", age: 22 };
console.log(readonlyUser);
// readonlyUser.age = 23; // 报错：无法赋值，因为 readonlyUser 是只读对象

// 3. Pick<T, K>：挑选属性（获取对象的部分属性）
type UserBasicInfo = Pick<UserC, "id" | "name">; //只保留id和name
const basicInfo: UserBasicInfo = { id: 1, name: "张三" };

// 4. Omit<T, K>：排除属性（剔除对象的部分属性）
type UserWithoutAge = Omit<UserC, "age">; //剔除age属性
const userWithoutAge: UserWithoutAge = { id: 1, name: "张三" };

// 5. Record<K, T>：通用对象类型（快速创建对象类型，常用）
// 场景 1：键为 string，值为 User（用户列表）
type UserList = Record<string, UserC>;
const userList: UserList = {
	"1": { id: 1, name: "张三", age: 25 },
	"2": { id: 2, name: "李四", age: 26 },
};

// 场景 2：键为联合类型，值为 string（状态描述）
type Status = "success" | "error" | "loading";
type StatusDesc = Record<Status, string>;
const statusDesc: StatusDesc = {
	success: "成功",
	error: "失败",
	loading: "加载中",
};


