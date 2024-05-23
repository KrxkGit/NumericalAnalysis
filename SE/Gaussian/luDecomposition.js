/**
 * LU 分解法
 * @param A
 * @param epsilon
 */
function luDecomposition(A, epsilon) {
    const n = A.length;
    // 分解为 L, U
    // 其中 L 为对角线 为 1 的下三角，U 为上三角
    const L = [];
    for (let i = 0; i <= n - 1; i++) {
        if (L[i] === undefined) {
            L[i] = [];
        }
        L[i][i] = 1;
        for (let j = i + 1; j <= n - 1; j++) {
            L[i][j] = 0;
        }
    }
    const U = [];
    for (let i = 0 ; i <= n - 1; i++) {
        if (U[i] === undefined) {
            U[i] = [];
        }
        for (let j = 0; j < i; j++) {
            U[i][j] = 0;
        }
    }

    // 根据矩阵乘法反推 L, U 矩阵
    for (let k = 0; k <= n - 1; k++) {
        for (let j = k; j <= n - 1; j++) {
            let S = 0;
            for (let m = 0; m <= k - 1; m++) {
                S += L[k][m] * U[m][j];
            }
            U[k][j] = A[k][j] - S;
        }

        if (Math.abs(U[k][k]) <= epsilon) {
            throw '求解失败';
        }
        for (let i = k + 1; i <= n - 1; i++) {
            let S = 0;
            for (let m = 0; m <= k - 1; m++) {
                S += L[i][m] * U[m][k];
            }
            L[i][k] = (A[i][k] - S) / U[k][k];
        }
    }

    return {L: L, U: U};
}

function solve(A, b, epsilon) {
    const n = A.length;
    // LU 分解
    const {L, U} = luDecomposition(A, epsilon);
    // 求解 Ly = b
    const y = [];
    y[0] = b[0];
    for (let i = 1; i <= n - 1; i++) {
        let S = 0;
        for (let j = 0; j <= i - 1; j++) {
            S += L[i][j] * y[j];
        }
        y[i] = b[i] - S;
    }
    // 求解 Ux = y
    const x = [];
    x[n - 1] = y[n - 1] / U[n - 1][n - 1];
    for (let i = n - 2; i >= 0; i--) {
        let S = 0;
        for (let j = i + 1; j <= n - 1; j++) {
            S += U[i][j] * x[j];
        }
        x[i] = (y[i] - S) / U[i][i];
    }
    return x;
}

function testLU() {
    const A = [[2, 3], [1, 4]];
    console.log(solve(A, [], 1e-5));
}

function testSolve() {
    const A = [[1, 2], [2, 3]];
    const b = [3, 4];
    const x = solve(A, b, 1e-5);
    console.log(x);
}

testSolve();
