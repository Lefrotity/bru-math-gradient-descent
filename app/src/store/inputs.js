import { makeAutoObservable } from "mobx";

class Inputs {
  f = "";
  df = "";
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

export default new Inputs();
