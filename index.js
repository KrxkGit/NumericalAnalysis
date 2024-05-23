import {TestLoss} from "./Experiment/loss.js";
import {Lagrange} from "./Experiment/Lagrange.js";
import {TestDE} from "./Experiment/NewtonInterpolation.js";
import {im} from "mathjs";


//TestLoss();
//console.log(Lagrange([1,2,3],[2,2,2], 1));
// TestDE();

//import './Experiment/TrapezoidalRule.js'
//import './Experiment/Romberg.js'
// import './Experiment/CubicSpline.js'

// import {testSG} from "./SE/Gaussian/SequentialGaussian.js";
// import './SE/Gaussian/ColumnPrincipalElementGaussian.js'
// import './SE/Gaussian/AllPrincipalElementGaussian.js';
// import './SE/Gaussian/luDecomposition.js';
// import './SE/Iteration/JacobiIteration.js';
// import './SE/Iteration/SeidelIteration.js';
// import './SE/Iteration/RelaxationIteration.js';
// import './SE/Iteration/Dichotomy.js';
// import './SE/Iteration/RelaxationMethod.js';
import './SE/Iteration/NewtonMethod.js';
