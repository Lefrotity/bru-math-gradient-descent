import React from "react";
import inputs from "../../store/inputs";
import { observer } from "mobx-react-lite";
import { Button, Collapsible, TextField } from "@shopify/polaris";
import Gap from "../@Helpers/Gap";
import { useState, useCallback } from "react";

const AdvancedInputs = observer(() => {
  const {
    iterationCount,
    initialStep,
    arrangeStart,
    arrangeStop,
    arrangeStep,
  } = inputs;
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => setOpen((open) => !open), []);

  return (
    <>
      <div style={{ color: "#0c852c" }}>
        <Button
          monochrome
          outline
          ariaControls="adv-inputs-collapsible"
          onClick={handleToggle}
          ariaExpanded={open}
        >
          Расширенные настройки
        </Button>
      </div>
      <Collapsible
        id="adv-inputs-collapsible"
        open={open}
        transition={{ duration: "200ms", timingFunction: "ease-in-out" }}
        expandOnPrint
      >
        <Gap />
        <TextField
          label="Количество итераций"
          placeholder="30"
          type="number"
          value={iterationCount}
          onChange={(val) => inputs.updateIterationCount(val)}
        />
        <Gap />
        <TextField
          label="Начальный шаг"
          placeholder="0"
          type="number"
          value={initialStep}
          onChange={(val) => inputs.updateInitialStep(val)}
        />
        <Gap />
        <b>Данные для построения графика f(x) </b>
        <Gap />
        <TextField
          label="Начальное значение"
          placeholder="0"
          type="number"
          value={arrangeStart}
          onChange={(val) => inputs.updateArrangeStart(val)}
        />
        <Gap />
        <TextField
          label="Конечное значение"
          placeholder="5"
          type="number"
          value={arrangeStop}
          onChange={(val) => inputs.updateArrangeStop(val)}
        />
        <Gap />
        <TextField
          label="Шаг"
          placeholder="0.1"
          type="number"
          value={arrangeStep}
          onChange={(val) => inputs.updateArrangeStep(val)}
        />
      </Collapsible>
    </>
  );
});

export default AdvancedInputs;
