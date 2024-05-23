/**
 * 原本尝试实现多项式版本的，但由于该版本涉及范德蒙德行列式、高斯消元求解矩阵，较复杂，最终没有通过测试。
 * 改实现 y = kx + b 的简单版本
 */

function LSM(x_arr, y_arr) {
    const n = x_arr.length;

    let sx = 0;
    let sy = 0;
    let sxx = 0;
    let sxy = 0;

    for (let i = 0; i < n; i++) {
        sx += x_arr[i];
        sy += y_arr[i];
        sxx += Math.pow(x_arr[i], 2);
        sxy += x_arr[i] * y_arr[i];
    }

    const a = (sxx * sy - sx * sxy) / (n * sxx - Math.pow(sx, 2));
    const b = (n * sxy - sx * sy) / (n * sxx - Math.pow(sx, 2));

    return {'k' : b, 'b' : a};
}

/**
 * 下列为测试代码
 * @type {number[]}
 */
const xData = [0, 1, 2, 3, 4];
let yData = [1, 2, 3, 4, 5];

yData.forEach((value, index) => {
    yData[index] = value * 3 + 2;
})

console.log(yData)

const {k, b} = LSM(xData, yData);
console.log(k, b)
