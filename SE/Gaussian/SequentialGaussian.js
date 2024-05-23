/**
 * 策略模式，通过覆写该对象属性方法以支持列主元
 * @type {{doCalc: (function(*, *, *): *)}}
 */
export const helpCalcT = {
    doCalc : (A, k, i) => {
        return A[i][k] / A[k][k];
    }
}

export function SequentialGaussian(A, b, epsilon) {
    const n = A.length;

    // 消元
    for (let k = 0; k <= n - 2; k++) {
        if (Math.abs(A[k][k]) <= epsilon) {
            console.log('求解失败')
            return false;
        }

        for (let i = k + 1; i <= n - 1; i++) {
            // 求倍数
            let T = helpCalcT.doCalc(A, k, i);

            // 用该行
            b[i] -= T * b[k];

            for (let j = k + 1; j <= n - 1; j++) {
                A[i][j] -= T * A[k][j];
            }
        }
    }

    // 回代
    if (Math.abs(A[n - 1][n - 1]) <= epsilon) {
        console.log('求解失败')
        return false;
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

    return x;
}

export function testSG()
{
    const A = [[1, 2], [2, 3]];
    const b = [3, 4];
    const x = SequentialGaussian(A, b, 1e-5);
    console.log(x);
}

// testSG();
