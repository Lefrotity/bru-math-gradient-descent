import { LegacyCard } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import inputs from "../../store/inputs";
import { observer } from "mobx-react-lite";
import useGradientCulculation from "../../hooks/useGradientCulculation";

const CulculatedCard = observer(({ updater }) => {
  const { f, df, iterationCount, lambda, initialStep } = inputs;
  const [axisPointsX, setAxisPointsX] = useState([]);
  const [axisPointsF, setAxisPointsF] = useState([]);
  const [gradientPoints, setGradientPoints] = useState([]);

  const { startCulculations } = useGradientCulculation();

  useEffect(() => {
    const { axisPointsX, axisPointsF, gradientPoints } = startCulculations({
      f,
      df,
      iterationCount,
      lambda,
      initialStep,
    });
    setAxisPointsX(axisPointsX);
    setAxisPointsF(axisPointsF);
    setGradientPoints(gradientPoints);
  }, [updater, setAxisPointsX, setAxisPointsF, setGradientPoints]);

  console.log(gradientPoints);

  return <LegacyCard sectioned title="Графиг и расчеты"></LegacyCard>;
});

export default CulculatedCard;
