
## State(mapState 可以混入 computer)

由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态：

## Getter(mapGetters 混入 computer)

mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

## Mutation(mapMutations 混入 methods)

Mutation 必须是同步函数

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

## Action(mapActions 混入 methods)

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。
