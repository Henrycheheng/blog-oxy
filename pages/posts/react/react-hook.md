---
title: Reack Hooks小记
subtitle: react小记
date: 2023-10-31
# updated: 更新的时间
categories: react
tags:
  - Reack Hooks
top: 1
aplayer: true
codeHeightLimit: 300
---

React Hooks 是 React 16.8 版本新增的特性,它允许在函数组件中使用 state 及其他 React 特性,不再必须转换成 class 组件。
React Hooks 的主要功能

### 1. useState: 在函数组件中声明状态变量

```tsx
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### 2. useEffect: 在函数组件各个生命周期执行副作用操作

#### 基本语法

```tsx
useEffect(callback, dependencies);
// callback: 在组件渲染后执行的副作用操作的函数
// dependencies（可选）: 这是一个数组，它包含影响副作用操作执行的依赖项。
// 当依赖项发生变化时，副作用操作会被重新执行。
```

#### 使用方法

```tsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

useEffect结合了 class 组件中生命周期函数(componentDidMount、componentDidUpdate 和 componentWillUnmount)的功能

常见的 useEffect 使用方式:

#### 2.1 执行只运行一次的 effect(componentDidMount 等价)

```tsx
useEffect(() => {
  // 数据获取操作
  fetch('<https://api.example.com/data>')
    .then(response => response.json())
    .then(data => {
      // 更新组件状态
      setData(data);
    });
}, []); // 空数组表示副作用操作只在组件挂载时执行
```

#### 2.2 根据依赖条件执行 effect(componentDidUpdate 等价)

```tsx
useEffect(() => {
  // 这个副作用操作依赖于count的值
  document.title = `Count: ${count}`;
}, [count]); // 依赖项列表中的任何值发生变化，副作用操作将被重新执行。
```

#### 2.3 清除 effect(componentWillUnmount 等价)

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    // 定时操作
  }, 1000);
  return () => {
    // 清理操作，在组件卸载时执行
    clearInterval(timer);
  };
}, []);
```

#### 2.4 多个 useEffect

// 在一个组件中使用多个 `useEffect`，每个 `useEffect` 可以负责不同的副作用操作和依赖项

```tsx
useEffect(() => {
  // 副作用操作 A
}, [dependencyA]);

useEffect(() => {
  // 副作用操作 B
}, [dependencyB]);
```

### 3. useContext:用于在函数式组件中访问上下文（context）

#### 3.1 基本语法

```tsx
const value = useContext(MyContext);
// MyContext: 是一个 React 上下文对象，它通常是通过 `React.createContext` 创建的。
```

#### 3.2 使用方式

例如A、B、C三个组件，逐层嵌套A>B>C
// MyContext.js

```tsx
import { createContext } from 'react';

// 使用createContext建立一个context，并导出
const MyContext = createContext();
export default MyContext;
```

#### 3.3 使用改进

//组件A

```tsx
import React from "react";
import B from "./B";
import MyContext from './MyContext';

function App() {
  const value = 'This is the context value';
  return (
    // 传递数据组件里使用Provide包裹着子组件，并且在用value属性来传递数据
    <MyContext.Provider value={value}>
      {/*这里可以包含你的组件树*/}
      <B />
    </MyContext.Provider>
  );
}
export default App;
```

//组件B

```tsx
import C from "./C";

function B() {
  return (
    <>
      <C />
    </>
  );
}

export default B;
```

//组件C

```tsx
import React from "react";
import MyContext from './MyContext';

function C() {
  return (
    // 接受数据的组件导入定义的context使用Consumer来接收,可接收到的是一个函数。
    <MyContext.Consumer>
      {(value) => <span>{value}</span>}
    </MyContext.Consumer>
  );
}

export default C;
```

但是，当有多个context，在C中使用将会变得很不友好

// myContext2.js

```tsx
import { createContext } from 'react';

// 使用createContext建立一个context，并导出
const MyContext2 = createContext();
export default MyContext2;
```

//组件A

```tsx
import React from "react";
import B from "./B";
import MyContext from './MyContext';
import MyContext2 from './MyContext2';

function App() {
  return (
    const value = 'This is the context value';
    const value2 = 'This is the context2 value';

    <MyContext.Provider value={value}>
      <MyContext2.Provider value={value2}>
        <B />
      </MyContext2.Provider>
    </MyContext.Provider>
  );
}

export default App;
```

//组件C

```tsx
import React from "react";
import MyContext from './MyContext';
import MyContext2 from './MyContext2';

function C() {
  return (
    <MyContext.Consumer>
      {(value) => (
        <>
          <span>{value}</span>
          <MyContext2.Consumer>
            {(value2) => <span>{value2}</span>}
          </MyContext2.Consumer>
        </>
      )}
    </MyContext.Consumer>
  );
}

export default C;
```

此时可以通过useContext来重新获取A组件传递的值

```tsx
 import React from "react";
import MyContext from './MyContext';
import MyContext2 from './MyContext2';

function C() {
  const value = useContext(MyContext);
  const value2 = useContext(MyContext2);

  return (
    <>
      <span>{value}</span>
      <span>{value2}</span>
    </>
  );
}
export default C;
```

### 4. useReducer:通过 reducer 来管理组件局部状态

#### 4.1 基本用法

```tsx
const [state, dispatch] = useReducer(reducer, initialState);
// reducer函数: `(state, action) => newState` 的纯函数,
// 用于根据 old state 和 action 返回一个新的 state。
// initialState: 初始状态的值
```

#### 4.2 使用方式

```tsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const increment = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const decrement = () => {
    dispatch({ type: 'DECREMENT' });
  };

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
```

#### 4.3 示例

使用useReducer代替复杂的state，如果组件层级比较深，需要子组件触发state，可以同时使用useContext传递dispatch

以下是一个简化的购物车示例：

创建一个购物车上下文 CartContext，包含了 cartReducer 和一些自定义 Hook，如 CartProvider 和 useCart。CartProvider 将 useReducer 的结果放入上下文，useCart 允许组件访问购物车状态。

// CartContext.js

```tsx
import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { items: [...state.items, action.payload] };
    case 'REMOVE_FROM_CART':
      return { items: state.items.filter(item => item.id !== action.payload) };
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export { CartProvider, useCart };
```

然后，可以在应用中的各个组件中使用 useCart Hook 来访问和修改购物车状态，而不需要将购物车状态一层层地传递。

在 Product 组件中，通过使用 useCart Hook，它可以访问购物车上下文中的 dispatch 函数，以便将商品添加到购物车中。

// Product.js

```tsx
import React from 'react';
import { useCart } from './CartContext';

function Product({ product }) {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: {product.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}
```

在 Cart 组件中，同样使用 useCart Hook 来访问购物车状态和 dispatch 函数，以展示购物车内容并允许从购物车中移除商品。

// Cart.js

```tsx
import React from 'react';
import { useCart } from './CartContext';

function Cart() {
  const { cart, dispatch } = useCart();

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 5. useCallback: 用于优化性能，特别是在处理回调函数时，以避免不必要的重新渲染

#### 5.1 基本语法

```tsx
 const memoizedCallback = useCallback(callback, dependencies);
// callback: 是一个函数，需要被缓存的函数。
// dependencies: 回调函数所依赖的值数组,如果数组值发生变化,则生成新的函数
```

#### 5.2 使用方式

假设你有一个父组件，它传递一个回调函数给子组件。如果不使用 useCallback，每次父组件重新渲染时，回调函数都会重新创建，导致子组件不必要地重新渲染。

```tsx
import React, { useState } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

function ChildComponent({ onClick }) {
  return <button onClick={onClick}>Increment</button>;
}
```

handleClick 每次父组件重新渲染时都会重新创建，导致子组件重新渲染。为了避免这种情况，你可以使用 useCallback：

```tsx
import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

function ChildComponent({ onClick }) {
  return <button onClick={onClick}>Increment</button>;
}
```

### 6. useRef: 获取对 DOM 元素的引用

#### 6.1 基本语法

```tsx
const myRef = useRef(initialValue);
// initialValue 是可选的，它可以设置初始值。
// 通常情况下，initialValue 在创建 Ref 时设置为 null。
```

#### 6.2 使用方式: 访问 DOM 元素

```tsx
import React, { useRef, useEffect } from 'react';

function MyComponent() {
  const myInputRef = useRef(null);

  useEffect(() => {
    // 通过 myRef.current 访问该元素
    myInputRef.current.focus();
  }, []);

  return <input ref={myInputRef} />;
}
```

#### 6.3 存储可变数据: 使用 useRef 存储可变数据，不会引发组件的重新渲染

```tsx
import React, { useRef } from 'react';

function Timer() {
  // count 是一个 useRef 对象，它在多次渲染之间保持不变，并用于计算计时器的值。
  const count = useRef(0);

  const startTimer = () => {
    setInterval(() => {
      count.current += 1;
      console.log(`Timer count: ${count.current}`);
    }, 1000);
  };

  return (
    <div>
      <button onClick={startTimer}>Start Timer</button>
    </div>
  );
}
```

#### 6.4 访问子组件或函数组件的内部状态: 通过将 useRef 传递给子组件，你可以在父组件中访问子组件的状态或操作子组件的方法

```tsx
import React, { useRef } from 'react';

function ParentComponent() {
  const childRef = useRef(null);

  const handleChildClick = () => {
    childRef.current.doSomething();
  };

  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={handleChildClick}>Call Child's Method</button>
    </div>
  );
}

function ChildComponent() {
  const doSomething = () => {
    // 在子组件中执行某些操作
  };

  return <div>Child Component</div>;
}
```

### 7 使用React Hooks需要遵循的规则

#### 7.1 只在函数最外层调用Hooks,不要在循环、条件判断或者子函数中调用

这是为了确保Hooks在每次渲染中都按照同样的顺序被调用,这样React才能正确地保存Hooks的状态

错误示例:

```tsx
// 在条件判断中调用Hook:
function Counter() {
 const [count, setCount] = useState(0);

  if (count > 5) {
    const [highCount, setHighCount] = useState(0); // 错误!在条件判断中调用
  }

  // ...
}
```

#### 7.2仅在React函数组件或自定义Hooks中调用其他的Hooks

不要在普通的JavaScript函数中调用

### 8 自定义Hooks

#### 8.1 创建自定义的 Hook，应该以 "use" 前缀命名

// useTheme.js 自定义 Hook 处理主题切换逻辑

```tsx
import { useState } from 'react';

function useTheme() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}

export default useTheme;
```

#### 8.2 在组件中使用自定义 Hook

// ThemeSwitcher.js

```tsx
import React from 'react';
import useTheme from './useTheme';

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default ThemeSwitcher;
```

#### 8.3 可以在多个组件中共享同一个自定义 Hook，从而避免重复编写相同的逻辑

// AnotherComponent.js

```tsx
import React from 'react';
import useTheme from './useTheme';

function AnotherComponent() {
  const { theme } = useTheme();

  return <p>Theme in AnotherComponent: {theme}</p>;
}
```
