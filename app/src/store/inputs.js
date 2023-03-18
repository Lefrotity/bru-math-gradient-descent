import { makeAutoObservable } from "mobx";

class Inputs {
  f = "";
  df = "";
  iterationCount = 30;
  initialStep = 0;
  lambda = 0.1;
  arrangeStart = 0;
  arrangeStop = 5;
  arrangeStep = 0.1;

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

  updateArrangeStart(val) {
    this.arrangeStart = val;
  }

  updateArrangeStop(val) {
    this.arrangeStop = val;
  }

  updateArrangeStep(val) {
    this.arrangeStep = val;
  }
}

const inputs = new Inputs();

export default inputs;
