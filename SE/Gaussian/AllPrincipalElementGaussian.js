function AllPrincipalElementGaussian(A, b, epsilon) {
    const n = A.length;
    const d = []; // 用于记录 x 的位置
    // 记录原来的位置
    for (let i = 0; i <= n - 1; i++) {
        d[i] = i;
    }

    // 查找系数矩阵中主元
    for (let k = 0; k <= n - 1; k++) { // 代
        let save = [k, k];
        let t;
        // 在子系数矩阵中查找 主元
        for (let i = k; i <= n - 1; i++) {
            for (let j = k; j <= n - 1; j++) {
                if (Math.abs(A[i][j]) >= Math.abs(A[save[0]][save[1]])) {
                    save = [i, j];
                }
            }
        }

        // 如果涉及列交换，重新记录位置
        save[1] !== k && (t = d[k], d[k] = d[save[1]], d[save[1]] = t);
        for (let i = k; i <= n - 1; i++) {
            t = A[i][save[1]];
            A[i][save[1]] = A[i][k];
            A[i][k] = t;
        }
        // 如果需要行交换，则交换
        t = A[k], A[k] = A[save[0]], A[save[0]] = t;
        t = b[k], b[k] = b[save[0]], b[save[0]] = t;

        // 消元
        for (let i = k + 1; i <= n - 1; i++) {
            let T = A[i][k] / A[k][k];
            if (T <= epsilon) {
                throw '求解失败';
            }

            b[i] -= T * b[k];
            for (let j = k + 1; j <= n - 1; j++) {
                A[i][j] -= T* A[k][j];
            }
        }

        // 回代
        if (Math.abs(A[n - 1][n - 1]) <= epsilon) {
            throw '求解失败';
        }

        const x = [];
        x[n - 1] = b[n - 1] / A[n - 1][n - 1];
        for (let i = n - 2; i >= 0; i--) {
            let S = 0;
            for (let j = i + 1; j <= n - 1; j++) {
                S += A[i][j] * x[j];
            }
            x[i] = (b[i] - S) / A[i][i];
        }

        // 还原 x 的位置
        const x_origin = [];
        for (let k = 0; k <= n - 1; k++) {
            x_origin[d[k]] = x[k];
        }

        return x_origin;
    }
}


function testAPEG()
{
    const A = [[1, 2], [2, 3]];
    const b = [3, 4];
    const x = AllPrincipalElementGaussian(A, b, 1e-5);
    console.log(x);
}

testAPEG();
