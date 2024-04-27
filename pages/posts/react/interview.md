---
title: 记录一次react面试
subtitle: react小记
date: 2023-10-17
updated: 2023-10-17
categories: react
tags:
  - react面试
top: 1
aplayer: true
---

#### 1.setState是同步还是异步的

在React中，setState通常是异步的。当你调用setState时，React会将状态更新放入队列，然后在稍后的某个时间点才会执行实际的状态更新。这是出于性能和优化的考虑，因为React会批量处理状态更新以最小化DOM操作，从而提高性能。

这意味着在调用setState之后，你不能立即依赖于状态已经被更新。如果你需要在状态更新后执行某些操作，可以使用setState的第二个参数，它是一个回调函数，会在状态更新完成后被调用，例如：

```javascript

this.setState({ count: this.state.count + 1 }, () => {
  // 在这个回调函数中可以访问到更新后的状态
  console.log(this.state.count);
});
```

以下是一些可能导致`setState`同步执行的情况：

1. **在合成事件处理函数中的`setState`**：当`setState`被调用时，React通常会将多个`setState`调用合并成单个更新，以提高性能。然而，在合成事件处理函数中，React不会进行批量处理，因此`setState`可能会同步执行。

```javascript
buttonClickHandler() {
  this.setState({ count: this.state.count + 1 });
  console.log(this.state.count); // 这里可能是同步的
}
```

2. **`setState`的第二个参数**：`setState`的第二个参数是一个回调函数，它会在状态更新完成后被调用。在这个回调函数中，你可以访问到更新后的状态，这是同步的。

```javascript
this.setState({ count: this.state.count + 1 }, () => {
  console.log(this.state.count); // 这里是同步的
});
```

在大多数情况下，你应该将`setState`视为异步操作，而且不应该依赖于状态的即时更新。

#### 2.函数组件如何执行卸载

在React中，函数组件卸载的过程是由React自动管理的，无需手动执行。当一个函数组件从DOM中移除时，React会自动触发卸载生命周期方法，主要包括`componentWillUnmount`（在React 16.3之前）和`useEffect`中的清理函数（在React 16.3及以后）。

在函数组件中，你可以使用`useEffect`来模拟类组件的卸载操作。你可以在`useEffect`中返回一个清理函数，它会在组件卸载时执行。例如：

```javascript
import React, { useEffect } from 'react';

function MyComponent() {
  // 在这里定义副作用
  useEffect(() => {
    // 执行一些操作

    // 返回一个清理函数，会在组件卸载时执行
    return () => {
      // 执行卸载时需要的清理操作
    };
  }, []); // 空数组作为第二个参数表示只在组件挂载和卸载时执行
}
```

当函数组件被卸载时，React会自动调用这个清理函数，你可以在这里进行一些资源释放或取消订阅等操作。这是React函数组件管理生命周期的一种方式，确保在组件卸载时执行必要的清理操作。

#### 3.react类组件的生命周期

在React类组件中，生命周期可以分为三个阶段：挂载、更新和卸载。以下是React类组件的主要生命周期方法：

1. **挂载阶段**：

   - `constructor(props)`: 组件的构造函数，用于初始化状态和绑定事件处理函数。
   - `static getDerivedStateFromProps(props, state)`: 从属性中派生状态的静态方法（React 16.3+）。
   - `render()`: 渲染方法，返回虚拟DOM。
   - `componentDidMount()`: 组件挂载后调用，通常用于发送网络请求或订阅数据。

2. **更新阶段**：

   - `static getDerivedStateFromProps(props, state)`: 更新阶段也可以用来派生状态。
   - `shouldComponentUpdate(nextProps, nextState)`: 决定是否重新渲染组件，优化性能。
   - `render()`: 重新渲染组件。
   - `getSnapshotBeforeUpdate(prevProps, prevState)`: 获取更新前的DOM快照（React 16.3+）。
   - `componentDidUpdate(prevProps, prevState, snapshot)`: 更新完成后调用，通常用于处理DOM更新之后的操作。

3. **卸载阶段**：

   - `componentWillUnmount()`: 组件卸载前调用，通常用于清理操作、取消订阅或定时器等。

此外，还有一些生命周期方法在React 16.3之前存在，但在后续版本中已被弃用，不推荐使用：

- `componentWillMount()`: 挂载前调用，现在一般用`constructor`替代。
- `componentWillReceiveProps(nextProps)`: 接收新属性时调用，现在推荐使用`getDerivedStateFromProps`。
- `componentWillUpdate(nextProps, nextState)`: 更新前调用，现在推荐使用`getSnapshotBeforeUpdate`和`componentDidUpdate`。

需要注意的是，React 16.3之后，生命周期方法的使用方式发生了变化，引入了新的生命周期方法以支持更多的场景。如果你使用React 16.3或更高版本，建议使用新的生命周期方法，如`getDerivedStateFromProps`和`getSnapshotBeforeUpdate`。

#### 4.执行多次事件是如何渲染

最终会渲染一次，会进行合并。

`shouldComponentUpdate` 是 React 类组件中的一个生命周期方法，用于决定组件是否需要重新渲染，从而可以优化性能。当组件的状态或属性发生变化时，React 会调用 `shouldComponentUpdate` 方法，你可以在这个方法中返回 `true` 或 `false` 来告诉 React 是否继续进行渲染。

下面是对 `shouldComponentUpdate` 方法的详细讲解：

1. **作用**：
   - `shouldComponentUpdate(nextProps, nextState)` 在更新阶段被调用。
   - 接收两个参数：`nextProps` 表示下一个属性（props），`nextState` 表示下一个状态（state）。
   - 你可以在这个方法中根据新的属性和状态来判断是否需要重新渲染组件。

2. **返回值**：
   - 如果 `shouldComponentUpdate` 返回 `true`，组件将会重新渲染。
   - 如果 `shouldComponentUpdate` 返回 `false`，组件将不会重新渲染，以提高性能。

3. **使用场景**：
   - 性能优化：`shouldComponentUpdate` 可用于避免不必要的渲染，特别是当你明确知道组件在某些条件下不需要更新时。
   - 深层次属性比较：你可以在这个方法中比较属性或状态的深层次内容，从而减少不必要的渲染。
   - 避免子组件的渲染：如果你知道子组件也实现了 `shouldComponentUpdate`，你可以在父组件中使用它来进一步优化性能。

4. **注意事项**：
   - 调用 `shouldComponentUpdate` 时，不要直接修改组件的状态或属性，这可能导致不稳定的行为。
   - 如果你不提供 `shouldComponentUpdate` 方法，React 默认会返回 `true`，即每次属性或状态变化都会触发重新渲染。

示例代码：

```javascript
class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // 根据条件判断是否需要重新渲染
    if (this.props.someValue === nextProps.someValue) {
      return false; // 不重新渲染
    }
    return true; // 重新渲染
  }

  render() {
    // 渲染组件的内容
  }
}
```

使用 `shouldComponentUpdate` 可以帮助你更精细地控制组件的渲染，以减少不必要的性能开销。

`shouldComponentUpdate` 是一个生命周期方法，用于告诉React是否要重新渲染组件。在React 16.3之后，它并没有被废弃，仍然存在，但是在函数组件中不再可用，因为函数组件没有生命周期方法。

对于类组件，`shouldComponentUpdate` 仍然会被自动调用，以判断是否需要重新渲染组件。这个方法的返回值仍然有效，但不再建议在函数组件中使用。在函数组件中，你可以使用`React.memo`或`PureComponent`（对类组件而言）来达到类似的性能优化目的。而在函数组件中，你可以使用`useMemo`或`useCallback`来控制何时重新计算组件的部分内容。

总之，`shouldComponentUpdate` 仍然是React类组件的一部分，并在适当的情况下使用它可以帮助提高性能，但在函数组件中已经不再适用。

#### 5.foreach/map等方法和for循环相比有什么优缺点

数组的方法循环无法终止单次循环，而for循环可以`break`和单次`continue`。或者`return`.
终止的方法还有 `||` `default` || `setTimeout`

```javascript
let div = document.querySelector('div')
let btn = document.querySelector('btn')

    function() {
      console.log('123')
    }

    dv.addEventListener('click', function()){

    }

    btn.onclick = function() {
      dv.removeEventListener('click', function() {

      }
    }
```

#### 6.PureComponent和component的区别

`PureComponent` 是 React 中的一个优化工具，是 `React.Component` 的一个变种，用于减少组件重新渲染的频率，以提高性能。它在React中自动执行浅比较（shallow comparison）来检测属性和状态的变化，从而避免不必要的渲染。以下是 `PureComponent` 的详细介绍：

1. **性能优化**：
   - `PureComponent` 用于性能优化，适用于那些属性和状态变化不频繁的组件。
   - 与普通的 `React.Component` 不同，`PureComponent` 在 `shouldComponentUpdate` 中执行浅比较，只有在属性或状态发生实际变化时才重新渲染组件。

2. **自动实现的 `shouldComponentUpdate`**：
   - `PureComponent` 自动实现了 `shouldComponentUpdate` 方法，无需手动编写。
   - 它会对属性（`props`）和状态（`state`）进行浅比较，以确定是否需要重新渲染组件。

3. **浅比较**：
   - 在浅比较中，`PureComponent`会比较属性和状态的引用，而不是其内部内容。
   - 这意味着如果属性或状态中的对象引用没有实际变化，`PureComponent` 将认为它们没有改变，从而跳过重新渲染。

4. **使用场景**：
   - `PureComponent` 特别适用于那些具有稳定不变属性和状态的组件，或者属性和状态更新频率较低的组件。
   - 避免在 `PureComponent` 中使用可变数据结构，因为浅比较可能会无法检测到数据结构内部的变化。

示例代码：

```javascript
import React, { PureComponent } from 'react';

class MyPureComponent extends PureComponent {
  render() {
    return <div>{this.props.someData}</div>;
  }
}
```

总之，`PureComponent` 是一个有助于减少不必要的渲染的工具，但在使用时需要注意它的适用场景，确保属性和状态的比较满足浅比较的要求，以获得最佳性能。如果你有不稳定或频繁变化的属性和状态，使用 `PureComponent` 可能不会带来明显的性能提升。
