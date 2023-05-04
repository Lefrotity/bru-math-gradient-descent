import { useCallback } from "react";

function useGradientCulculation() {
  const defineFunctions = useCallback((f, df) => {
    window.definedFunctions = {};
    const defStr = `window.definedFunctions = {
          f: function (x) { return ${f};},
          df: function (x) { return ${df};}
        }`;
    // eslint-disable-next-line
    eval(defStr);
  }, []);

  // https://stackoverflow.com/questions/28658522/how-to-arange-list-of-numbers-in-javascript
  const arrange = useCallback((start, stop, step) => {
    start = Number(start);
    stop = Number(stop);
    step = step || 1;
    step = Number(step);
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
    ({
      f,
      df,
      iterationCount,
      initialStep,
      arrangeStart,
      arrangeStep,
      arrangeStop,
    }) => {
      let err = false;
      try {
        if (f.length < 2 || df.length < 2) throw Error;
        defineFunctions(f, df);

        const defF = window.definedFunctions.f;
        const defDF = window.definedFunctions.df;

        const axisPointsX = arrange(arrangeStart, arrangeStop, arrangeStep);
        const axisPointsF = axisPointsX.map((x) => defF(x));
        const rechartFPoints = axisPointsX.map((x, i) => ({
          x,
          y: axisPointsF[i],
        }));

        // culc all gradient point positions
        // alorithm was taken here https://www.youtube.com/watch?v=OKeZEbJgQKc
        let xx = initialStep;
        let mn = 100;
        let gradientPoints = [{ x: xx, y: defF(xx) }];

        for (let i = 1; i < iterationCount; i++) {
          let lmd = 1 / Math.min(i + 1, mn);
          xx = xx - lmd * sign(defDF(xx));
          gradientPoints.push({ x: xx, y: defF(xx) });
        }

        return { err, rechartFPoints, gradientPoints };
      } catch (e) {
        err = true;
        return { err };
      }
    },
    [arrange, defineFunctions, sign]
  );
  return { startCulculations };
}

export default useGradientCulculation;
