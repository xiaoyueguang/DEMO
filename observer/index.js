let depId = 0;
let watcherId = 0;
let currentWatcher = undefined;
export const deps = [];
export const watchers = [];
class Dep {
    constructor() {
        this.id = depId++;
        this.watchers = [];
        // 调试用. 了解该依赖对应的键值
        this.key = '';
        deps.push(this);
    }
    /**
     * 将当前Watcher搜集起来
     */
    depend() {
        const id = this.id;
        if (currentWatcher) {
            if (!currentWatcher.depIds.has(id)) {
                currentWatcher.depIds.add(id);
                this.watchers.push(currentWatcher);
            }
        }
    }
    /**
     * 触发搜集过来的所有Watcher
     */
    notify() {
        for (const watcher of this.watchers) {
            watcher.update();
        }
    }
}
let flushing = false;
let waiting = false;
// 待执行的watcher队列
const queue = [];
let has = {};
let index = 0;
export class Watcher {
    constructor(context, getter, cb) {
        this.id = watcherId++;
        // 该Watcher被搜集的依赖的ID集合
        this.depIds = new Set();
        this.context = context;
        this.cb = cb;
        this.expression = getter.toString();
        this.getter = getter;
        this.value = this.get();
        watchers.push(this);
    }
    // 返回值 并搜集依赖
    get() {
        currentWatcher = this;
        const value = this.getter.call(this.context, this.context);
        currentWatcher = undefined;
        return value;
    }
    /**
     * 更新watcher
     * 依赖触发更新时, 会将搜集到需要更新的watcher传入一个队列
     * 队列在flushing时, 必定是已经排序.
     * 排序是为了watcher能的执行顺序是正确的.
     * 根据是否处于flushing状态
     * 而后将watcher传入队列或尽可能的正确位置
     * 插入完成后, 则开始异步调用
     * 采用异步调用可以保证在执行时, watcher已经进入到队列了(同步)
     * wait确保该调度一次只能有一个在执行
     * flaush则说明在该状态下watcher应该怎么进入队列
     * has是一个对象, 表明该watcher已经在当前队列中执行过了
     */
    update() {
        const id = this.id;
        if (has[id] == null) {
            has[id] = true;
            if (!flushing) {
                queue.push(this);
            }
            else {
                let i = queue.length - 1;
                while (i > index && queue[i].id > id) {
                    /**
                     * 加两种情况, 是为了尽可能的将watcher插入到最接近的位置.
                     * 如果一开始index为0, 则插入的则是最正确的位置.
                     * 如果index大于0, 则只能接近, 但是不能再插入到之前的去了
                     * 因为循环指针已经到index这里了, 再往前就不会被执行了
                     */
                    i--;
                }
                queue.splice(i + 1, 0, this);
            }
            if (!waiting) {
                waiting = true;
                setTimeout(function () {
                    flushing = true;
                    queue.sort((a, b) => a.id - b.id);
                    for (index = 0; index < queue.length; index++) {
                        const watcher = queue[index];
                        has[watcher.id] = null;
                        watcher.run();
                    }
                    queue.length = index = 0;
                    has = {};
                    waiting = flushing = false;
                });
            }
        }
    }
    // 执行回调. 触发对应的更新
    run() {
        const oldValue = this.value;
        const value = this.get();
        this.value = value;
        this.cb.call(this.context, value, oldValue);
    }
}
export class Observer {
    constructor(value) {
        const deps = {};
        Object
            .keys(value)
            .forEach(key => {
            deps[key] = new Dep();
        });
        return new Proxy(value, {
            get(target, key, reciver) {
                if (currentWatcher) {
                    deps[key].depend();
                }
                return Reflect.get(target, key, reciver);
            },
            set(target, key, value, reciver) {
                deps[key].notify();
                return Reflect.set(target, key, value, reciver);
            }
        });
        // Object
        //   .keys(value)
        //   .forEach((key) => defineReactive(value, key))
    }
}
function defineReactive(obj, key) {
    const dep = new Dep();
    let val = obj[key];
    dep.key = key;
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            if (currentWatcher) {
                // 搜集
                dep.depend();
            }
            return val;
        },
        set(newVal) {
            val = newVal;
            // 通知
            dep.notify();
        }
    });
}
//# sourceMappingURL=index.js.map