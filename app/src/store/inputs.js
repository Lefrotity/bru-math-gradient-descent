import { makeAutoObservable } from "mobx";

class Inputs {
  f = "x*x - 5*x + 5";
  df = "2*x - 5";
  iterationCount = 30;
  initialStep = 0;
  lambda = 0.1;

  constructor() {
    makeAutoObservable(this);
  }

  updateF(val) {
    this.f = val;
  }

  updateDF(val) {
    this.df = val;
  }

  updateIterationCount(val) {
    this.iterationCount = val;
  }

  updateInitialStep(val) {
    this.initialStep = val;
  }

  updateLambda(val) {
    this.lambda = val;
  }
}

const inputs = new Inputs();

export default inputs;
