import { LegacyCard, LegacyStack, Button, Collapsible } from "@shopify/polaris";
import React, { useEffect, useState, useCallback } from "react";
import inputs from "../../store/inputs";
import { observer } from "mobx-react-lite";
import useGradientCulculation from "../../hooks/useGradientCulculation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import Gap from "../@Helpers/Gap";

const CulculatedCard = observer(({ updater }) => {
  const { f, df, iterationCount, initialStep } = inputs;
  const [gradientPoints, setGradientPoints] = useState([]);
  const [rechartData, setRechartData] = useState([]);

  const [currentAnimatedPoint, setCurrentAnimatedPoint] = useState([
    {
      x: 0,
      y: 0,
    },
  ]);

  const [open, setOpen] = useState(false);
  const handleToggle = useCallback(() => setOpen((open) => !open), []);

  const { startCulculations } = useGradientCulculation();

  useEffect(() => {
    const { rechartFPoints, gradientPoints } = startCulculations({
      f,
      df,
      iterationCount,
      initialStep,
    });
    setRechartData(rechartFPoints);
    setGradientPoints(gradientPoints);
    // startAnimation(gradientPoints);
  }, [updater, setRechartData, setGradientPoints]);

  // const startAnimation = useCallback((gradientPoints) => {

  // })

  return (
    <LegacyCard sectioned title="Графиг и расчеты">
      <LegacyStack distribution="center" alignment="center">
        <LineChart width={600} height={400} data={rechartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" />
          <YAxis dataKey="y" type="number" />
          <Line
            data={rechartData}
            type="monotone"
            dataKey="y"
            stroke="#8884d8"
            strokeWidth={1}
            dot={false}
          />
          <Line
            data={gradientPoints}
            type="monotone"
            dataKey="y"
            stroke="#a61c2a"
            strokeDasharray="3 3"
            dot={{ stroke: "red", strokeWidth: 1, r: 4, strokeDasharray: "" }}
          />
        </LineChart>
      </LegacyStack>
      <Gap />
      <div style={{ color: "#0c852c" }}>
        <Button
          monochrome
          outline
          ariaControls="adv-inputs-collapsible"
          onClick={handleToggle}
          ariaExpanded={open}
        >
          Развернуть итерации
        </Button>
      </div>
      <Gap />
      <Collapsible
        id="adv-inputs-collapsible"
        open={open}
        transition={{ duration: "200ms", timingFunction: "ease-in-out" }}
        expandOnPrint
      >
        {!!gradientPoints?.length &&
          gradientPoints.map(({ x, y }, i) => (
            <p>
              Итерация <b>{i + 1}</b> значение минимума: <b>{x}</b>
            </p>
          ))}
      </Collapsible>
      <Gap />
      <p>
        Итоговое значение минимума было получено на{" "}
        <b>{gradientPoints.length}</b> итерации, ответом является число{" "}
        <b>{gradientPoints[gradientPoints.length - 1]?.x || 0}</b>{" "}
      </p>
    </LegacyCard>
  );
});

export default CulculatedCard;
