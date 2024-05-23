import {CalcIterationSum, generateIterationMatrix, MaxDistance} from "./CommonIteration.js";

function RelaxationIteration(A, b, Y, omega, epsilon, M) {
    const n = A.length;
    let k = 1;
    let x = [...Y];

    // 生成迭代矩阵
    const g = generateIterationMatrix(A, b, epsilon, omega);

    while (true) {
        // 迭代
        for (let i = 0; i <= n - 1; i++) {
            let S = CalcIterationSum(i, A, x);
            x[i] = g[i] + S;
            // console.log(g[i],S, x[i]);
        }
        // console.log(x);

        // 评估
        if (MaxDistance(x, Y) < epsilon) {
            console.log(`迭代步数: ${k}`);
            return x;
        } else {
            if (++k > M) {
                console.log(`达到最大迭代次数，解为: [${x}]`);
                throw '超过求解最大步数';
            }
            Y = [...x]; // 注意使用拷贝，直接赋值 Y 将随 x 同步修改
        }
    }
}

function testRI() {
    const A = [[8, -3, 2], [4, 11,-1], [6,3,12]];
    const b = [20, 33,36];
    const Y = [0, 0, 1];
    const x = RelaxationIteration(A, b, Y, 0.1,1e-5, 10);
    console.log(x);
}

testRI();
