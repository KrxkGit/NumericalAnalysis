/**
 * 生成迭代矩阵
 * @param A 传入A，将被原地修改为 迭代矩阵 B
 * @param b 输入 b
 * @param epsilon
 * @param omega 松弛因子。 当 omega = 1, 为 Seidel 方法
 * @returns {*[]} 返回 修改后的 b
 */
function generateIterationMatrix(A, b, epsilon, omega) {
    const n = A.length;
    // 构造迭代矩阵
    const g = [];
    for (let i = 0; i <= n - 1; i++) {
        if (Math.abs(A[i][i]) < epsilon) {
            throw '求解失败';
        }
        let T = A[i][i];
        for (let j = 0; j <= n - 1; j++) {
            A[i][j] /= -T;
            A[i][j] *= omega;
        }
        A[i][i] = 1 - omega;
        g[i] = b[i] / T;
        g[i] *= omega;
    }
    return g;
}

/**
 * 迭代变量和
 * @param i 对于 x[i] 进行迭代求值
 * @param A 迭代矩阵
 * @param Y 上一次出发点
 * @returns {number}
 */
function CalcIterationSum(i, A, Y) {
    const n = A.length;
    let S = 0;
    for (let j = 0; j <= n - 1; j++) {
        if (j === i) {
            continue;
        }
        S += A[i][j] * Y[j];
    }
    return S;
}

function MaxDistance(X0, X1) {
    // console.log(X0, X1);
    // 假设向量长度一致
    const n = X0.length;
    let S = 0;
    for (let i = 0; i < n; i++) {
        S = Math.max(S, Math.abs(X0[i] - X1[i]));
    }

    return S;
}

export {CalcIterationSum, MaxDistance, generateIterationMatrix};
