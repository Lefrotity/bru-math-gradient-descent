import {
  LegacyCard,
  LegacyStack,
  Button,
  Collapsible,
  RangeSlider,
  Checkbox,
} from "@shopify/polaris";
import React, { useEffect, useState, useCallback } from "react";
import inputs from "../../store/inputs";
import { observer } from "mobx-react-lite";
import useGradientCulculation from "../../hooks/useGradientCulculation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Gap from "../@Helpers/Gap";

const CulculatedCard = observer(({ updater }) => {
  const {
    f,
    df,
    iterationCount,
    initialStep,
    arrangeStart,
    arrangeStep,
    arrangeStop,
  } = inputs;
  const [gradientPoints, setGradientPoints] = useState([]);
  const [gradientPoint, setGradientPoint] = useState([]);
  const [rechartData, setRechartData] = useState([]);
  const [error, setError] = useState([]);

  const [open, setOpen] = useState(false);
  const handleToggle = useCallback(() => setOpen((open) => !open), []);

  const [rangeValue, setRangeValue] = useState(1);
  const [checked, setChecked] = useState(false);

  const { startCulculations } = useGradientCulculation();

  useEffect(() => {
    const { err, rechartFPoints, gradientPoints } = startCulculations({
      f,
      df,
      iterationCount,
      initialStep,
      arrangeStart,
      arrangeStep,
      arrangeStop,
    });
    setError(err);
    if (!err) {
      setRechartData(rechartFPoints);
      setGradientPoints(gradientPoints);
    }
  }, [updater, setRechartData, setGradientPoints]);

  useEffect(() => {
    if (checked) {
      setGradientPoint([gradientPoints[rangeValue - 1]]);
    } else {
      setGradientPoint([]);
    }
  }, [checked, rangeValue, setGradientPoint, gradientPoints]);

  return (
    <>
      {error && updater > 0 && (
        <LegacyCard sectioned title="График и расчеты">
          <p style={{ color: "red" }}>
            Во время расчетов произошла ошибка. Пожалуйста убедитесь что все
            данные введены корректно.
          </p>
          <p style={{ color: "gray" }}>
            Не забывайте, что для задания тригонометрических функиций, таких как
            косинус или синус нужно использовать следущую конструкцию{" "}
            <b>Math.sin(x)</b> или <b>Math.cos(x)</b>
          </p>
          <p style={{ color: "gray" }}>
            Также помните что только <b>x</b> может являться динамической
            переменной <b>y</b> и другие переменные недопустимы
          </p>
        </LegacyCard>
      )}
      {!error && (
        <LegacyCard sectioned title="График и расчеты">
          <div>
            <p>
              <span style={{ color: "#8884d8", fontWeight: "bold" }}>
                Синий график
              </span>{" "}
              является точной репрезентацией заданой формулы <b>f(x)</b>.
            </p>
            <p>
              <span style={{ color: "#a61c2a", fontWeight: "bold" }}>
                Красные точки
              </span>{" "}
              находятся в местах минимума функции на момент каждой итерации
              градиентного метода.
            </p>
          </div>
          <Gap />
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
                animationDuration={0}
              />
              <Line
                data={!checked ? gradientPoints : gradientPoint}
                type="monotone"
                dataKey="y"
                stroke="#a61c2a"
                strokeDasharray="3 3"
                dot={{
                  stroke: "red",
                  strokeWidth: 1,
                  r: 2,
                  strokeDasharray: "",
                }}
                animationDuration={0}
              />
              <Tooltip />
            </LineChart>
          </LegacyStack>
          <Gap />
          <Checkbox
            label="Показать итерации поточечно"
            checked={checked}
            onChange={setChecked}
          />
          <Gap />
          {checked && (
            <RangeSlider
              min={1}
              max={gradientPoints.length}
              label={`Точка для итерации ${rangeValue} имеет значение ${
                gradientPoints[rangeValue - 1]?.x
              }`}
              value={rangeValue}
              onChange={setRangeValue}
            />
          )}
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
                <p key={i}>
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
      )}
    </>
  );
});

export default CulculatedCard;

// TODO: add inputs for arrange, ability use sin, cos...
