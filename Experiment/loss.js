function f1(x) {
    const sqrtX = Math.sqrt(x);
    const  sqrtX1 = Math.sqrt(x + 1);
    return sqrtX * (sqrtX1 - sqrtX);
}

function f2(x) {
    const sqrtX = Math.sqrt(x);
    const  sqrtX1 = Math.sqrt(x + 1);
    return sqrtX / (sqrtX + sqrtX1);
}

function TestLoss() {
    console.log('------Test Loss Start------')
    const bound = 10 ** 14;
    for (let x = 1; x <= bound; x *= 10 ) {
        const r1 = f1(x), r2 = f2(x);
        console.log(`At x=${x},  f1(x)=${r1}, f2(x)=${r2}, diff=${Math.abs(r1 - r2)}`);
    }
    console.log('------Test Loss End------')
}

TestLoss();
