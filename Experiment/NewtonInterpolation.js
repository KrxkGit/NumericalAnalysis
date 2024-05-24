/**
 * 计算 差熵
 * @param diffTable 差熵表，为 二维表格 :
 * x0 0阶差熵
 * x1 0阶差熵  1阶差熵
 * ...
 * @param x_append
 * @param y_append
 */
function DifferenceEntropy(diffTable, x_append, y_append) {
    if (diffTable.length == 0) { // 差熵表为空，从头计算
        diffTable.push([x_append, y_append]);
    } else { // 否则追加到差熵表中
        const len = diffTable.length - 1; // 差熵表原 阶数
        let save = [x_append, y_append];
        for (let i = 2; i <= 2 + len; i++) {
            save[i] = (save[i - 1] - diffTable[len][i - 1]) / (x_append - diffTable[len - i + 2][0]);
        }
        diffTable.push(save);
    }
}

function NewTonInterpolation(x_arr, y_arr, x) {
    if (x_arr.length != y_arr.length) {
        throw "自变量列表与因变量列表不等长";
    }
    let res = 0;
    const diffTable = [];
    const len = x_arr.length;

    // 生成 差熵表
    for (let i = 0; i < len; i++) {
        DifferenceEntropy(diffTable, x_arr[i], y_arr[i]);
    }

    res += helpCalc(diffTable, x, x_arr,0);

    return res;
}

function helpCalc(diffTable, x, x_arr , lastRes) {
    let res = lastRes;
    for (let i = 0; i < diffTable.length - 1; i++) {
        const diff = diffTable[i];
        let temp = diff[diff.length - 1];
        for (let j = 0; j < i; j++) {
            temp *= (x - x_arr[j]);
        }
        res += temp;
    }
    return res;
}

export function TestDE() {
    // let diffTable = [];
    // DifferenceEntropy(diffTable, 1, 2);
    // DifferenceEntropy(diffTable, 2, 3);
    // DifferenceEntropy(diffTable, 3, 5);
    //
    // for (let i = 0; i < diffTable.length; i++) {
    //     diffTable[i].forEach((item) => {
    //         console.log(item);
    //     })
    //     console.log('\n');
    // }
    console.log(NewTonInterpolation([1,2,3,4],[3,4,5,6],1.5));
}


export { NewTonInterpolation, DifferenceEntropy }

TestDE();
