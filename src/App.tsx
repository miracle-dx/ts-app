import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const result = identity<string>('3');
    console.info(result);
    const result1 = identity1<number>(1);
    console.info(result1);
    const result2 = identity2({ a: 1 });
    console.info(result2);
    // 泛型类
    class GenericNumber<T> {
      zeroValue: T | undefined;
      add: ((x: T, y: T) => T) | undefined;
    }
    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 1;
    myGenericNumber.add = function (x, y) {
      return x + y;
    };
    myGenericNumber.add(1, 3);
    let myGenericNumberString = new GenericNumber<string>();
    myGenericNumberString.zeroValue = 'a';
    myGenericNumberString.add = function (x, y) {
      return x + y;
    };
    myGenericNumberString.add(myGenericNumberString.zeroValue, '2');
  }, []);
  const clickFun = <T,>(arg: Array<T>) => {
    console.log(arg, arg.length);
    return arg;
  };
  // 通过泛型定义函数本身的类型
  // 泛型函数和非泛型函数都可以定义函数本身的类型
  const identity: <T>(arg: T) => T = (num) => {
    return num;
  };
  // 使用带有调用签名的对象字面量来定义泛型函数
  const identity1: { <T>(arg: T): T } = (num) => {
    return num;
  };
  // 泛型接口
  interface GenericIdentityFn<T> {
    (arg: T): T;
  }
  const identity2: GenericIdentityFn<object> = (num) => {
    return num;
  };
  // 泛型约束
  interface LengthWise {
    length: number;
  }
  const loggingIdentity = <T extends LengthWise>(arg: T) => {
    console.info(arg.length);
  };
  // 在泛型约束中使用类型参数
  const obj = { a: 1, b: 2, c: 3 };
  const getProperty = <T, K extends keyof T>(obj: T, key: K) => {
    console.info(obj[key]);
  };
  console.info(3);
  // 在泛型中使用类类型
  // c:{new():T}里的'new'是Constructor Type Literal，下面new c()里的'new'是new operator，二者是不同的东西。
  // {new():T} 和 c:new()=>T是一样的，后者是前者的简写，意即c的类型是对象类型且这个对象包含返回类型是T的构造函数。
  // 注意，':'后面是Type Information，这里的'=>'不是arrow function，只是用来标明函数返回类型。
  class An {
    numberLeg: number | undefined;
  }
  const create = <T extends An>(c: { new (): T }): T => {
    return new c();
  };
  return (
    <div className='App'>
      <button
        onClick={() => {
          // 明确声明类型
          clickFun<string>(['1', '2']);
          // 使用类型推论
          clickFun([1, 2]);
          loggingIdentity({ length: 11 });
          getProperty(obj, 'c');
          console.info(
            create(
              class Ai extends An {
                numberLeg = 1;
              },
            ).numberLeg,
          );
        }}>
        btn
      </button>
    </div>
  );
}

export default App;
