/* DEMO-LINJILEI */
'use strict';

/**
 * 生成一个随机数
 * @param {number} max 随机数上限
 * @param {number} min 随机数下限
 */
function random(max, min) {
    if (max === void 0) { max = 2; }
    if (min === void 0) { min = 1; }
    return Math.round(Math.random() * (max - min)) + (min);
}
// 获取屏幕宽高
var _a = getComputedStyle(document.body);
var bodyWidth = _a.width;
var bodyHeight = _a.height;
var width = parseInt(bodyWidth, 10);
var height = parseInt(bodyHeight, 10);
//# sourceMappingURL=helper.js.map

var tween = 5000;
/**
 * 移动点
 * @param origin 原来的点
 * @param target 目标点
 * @param mousePointer 鼠标的坐标
 */
function movePointer(origin, target, mousePointer) {
    function space(defaultValue) {
        var space = ~~(origin - target) / tween;
        return space === 0 ? defaultValue : space;
    }
    if (origin > target) {
        return origin + space(1);
    }
    else if (origin < target) {
        return origin + space(-1);
    }
    else {
        return origin;
    }
}
var Pointer = (function () {
    function Pointer() {
        var _a = this.init(), x = _a.x, y = _a.y;
        this.x = x;
        this.y = y;
        this.setTarget();
        this.isMouse = false;
    }
    Pointer.prototype.init = function (isTarget) {
        return {
            x: random(width) + (isTarget ? (random(2) > 1 ? -width : width) : 0),
            y: random(height) + (isTarget ? (random(2) > 1 ? -height : height) : 0)
        };
    };
    Pointer.prototype.move = function (mousePointer) {
        var org = this.x;
        this.x = movePointer(this.x, this.targetX, mousePointer);
        this.y = movePointer(this.y, this.targetY, mousePointer);
    };
    Pointer.prototype.setTarget = function (x, y) {
        var pointer = this.init(true);
        if (arguments.length === 0) {
            x = pointer.x;
            y = pointer.y;
        }
        this.targetX = x;
        this.targetY = y;
    };
    Pointer.prototype.destory = function () {
        for (var key in this) {
            delete this[key];
        }
    };
    return Pointer;
}());

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = width;
canvas.height = height;
var pow2 = function (x) { return Math.pow(x, 2); };
var nearPointer = function (origin, target) { return pow2(origin.x - target.x) + pow2(origin.y - target.y); };
var mousePointer = new Pointer();
var isOut = function (_a) {
    var x = _a.x, y = _a.y;
    return (x > width || x < 0) || (y > height || y < 0);
};
var App = (function () {
    function App() {
        this.pointers = [];
    }
    App.prototype.addPointer = function () {
        this.pointers.push(new Pointer());
    };
    App.prototype.pointersRender = function () {
        var _this = this;
        this.pointers.forEach(function (pointer) {
            if (isOut(pointer)) {
                var index = _this.pointers.indexOf(pointer);
                _this.pointers.splice(index, 1);
                // pointer.destory()
                // pointer = null
                _this.pointers.push(new Pointer());
            }
            if (nearPointer(mousePointer, pointer)) {
                pointer.move(mousePointer);
            }
            else
                [
                    pointer.move()
                ];
            ctx.beginPath();
            ctx.arc(pointer.x, pointer.y, 1, 0, 2 * Math.PI, true);
            ctx.fillStyle = pointer.isMouse ? 'rgba(0, 0, 0, 0)' : '#000';
            ctx.fill();
        });
    };
    App.prototype.linesRender = function () {
        var _this = this;
        this.pointers.forEach(function (pointer1) {
            _this.pointers.forEach(function (pointer2) {
                var space = nearPointer(pointer1, pointer2);
                if (space < 5000) {
                    ctx.beginPath();
                    ctx.moveTo(pointer1.x, pointer1.y);
                    ctx.lineTo(pointer2.x, pointer2.y);
                    ctx.strokeStyle = "rgba(0, 0, 0, " + (1 - (space / 5000)) + ")";
                    ctx.stroke();
                }
            });
        });
    };
    App.prototype.render = function () {
        ctx.clearRect(0, 0, width, height);
        this.pointersRender();
        this.linesRender();
        requestAnimationFrame(this.render.bind(this));
    };
    return App;
}());
var app = new App();
for (var i = 0; i < 100; i++) {
    app.addPointer();
}
app.render();
mousePointer.isMouse = true;
canvas.addEventListener('mouseenter', function () {
    app.pointers.push(mousePointer);
});
canvas.addEventListener('mousemove', function (_a) {
    var clientX = _a.clientX, clientY = _a.clientY;
    mousePointer.x = mousePointer.targetX = clientX;
    mousePointer.y = mousePointer.targetY = clientY;
});
canvas.addEventListener('mouseleave', function () {
    app.pointers.splice(app.pointers.indexOf(mousePointer));
});
//# sourceMappingURL=stage.js.map
