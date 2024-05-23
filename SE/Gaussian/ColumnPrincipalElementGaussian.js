import {helpCalcT, SequentialGaussian} from "./SequentialGaussian.js";

function ColumnPrincipalElementGaussian(A, b, epsilon) {
    // 覆盖方法以实现列主元
    helpCalcT.doCalc = (A, k, i) => {
        const n = A.length;
        let T, tid;
        for (let t = k; t <= n - 1; t++) {
            if (Math.abs(A[i][k]) >= Math.abs(A[t][k])) {
                tid = t;
            }
        }

        // 交换行
        if (tid !== i) {
            const temp = [A[i], b[i]];
            A[i] = A[tid];
            A[tid] = temp[0];
            b[i] = b[tid];
            b[tid] = temp[1];
        }

        T = A[i][k] / A[k][k];
        if (T < epsilon) {
            throw '求解失败';
        }
        return T;
    }
    return SequentialGaussian(A, b, epsilon);
}

function testCPEG()
{
    const A = [[1, 2], [2, 3]];
    const b = [3, 4];
    const x = ColumnPrincipalElementGaussian(A, b, 1e-5);
    console.log(x);

}

testCPEG();
