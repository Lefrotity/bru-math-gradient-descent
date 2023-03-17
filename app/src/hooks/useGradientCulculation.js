import React, { useCallback } from "react";

function useGradientCulculation() {
  const defineFunctions = useCallback((f, df) => {
    window.definedFunctions = {};
    const defStr = `window.definedFunctions = {
          f: function (x) { return ${f};},
          df: function (x) { return ${df};}
        }`;
    eval(defStr);
  }, []);

  // https://stackoverflow.com/questions/28658522/how-to-arange-list-of-numbers-in-javascript
  const arrange = useCallback((start, stop, step) => {
    step = step || 1;
    var arr = [];
    for (var i = start; i < stop; i += step) {
      arr.push(i);
    }
    return arr;
  }, []);

  const sign = useCallback((val) => {
    if (val === 0) return 0;
    return val > 0 ? 1 : -1;
  }, []);

  // TODO: add ckecking for functions correctness
  const startCulculations = useCallback(
    ({ f, df, iterationCount, initialStep }) => {
      defineFunctions(f, df);
      const defF = window.definedFunctions.f;
      const defDF = window.definedFunctions.df;

      const axisPointsX = arrange(0, 5, 0.1);
      const axisPointsF = axisPointsX.map((x) => defF(x));

      // culc all gradient point positions
      // alorithm was taken here https://www.youtube.com/watch?v=OKeZEbJgQKc
      let xx = initialStep;
      let mn = 100;
      let gradientPoints = [xx];

      for (let i = 1; i < iterationCount; i++) {
        let lmd = 1 / Math.min(i + 1, mn);
        xx = xx - lmd * sign(defDF(xx));
        gradientPoints.push(xx);
      }

      return { axisPointsX, axisPointsF, gradientPoints };
    },
    [arrange, defineFunctions, sign]
  );
  return { startCulculations };
}

export default useGradientCulculation;
