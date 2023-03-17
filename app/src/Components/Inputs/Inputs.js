import React from "react";
import inputs from "../../store/inputs";
import { observer } from "mobx-react-lite";
import { TextField } from "@shopify/polaris";
import AdvancedInputs from "../AdvancedInputs";
import Gap from "../@Helpers/Gap";

const Inputs = observer(() => {
  const { f, df } = inputs;

  return (
    <>
      <TextField
        label="Функция f(x)"
        placeholder="Пример: x*x - 5*x + 5"
        value={f}
        onChange={(val) => inputs.updateF(val)}
        clearButton
        onClearButtonClick={() => inputs.updateF("")}
        autoComplete="off"
      />
      <Gap />
      <TextField
        label="Функция df(x)"
        placeholder="Пример: 2*x - 5"
        value={df}
        onChange={(val) => inputs.updateDF(val)}
        clearButton
        onClearButtonClick={() => inputs.updateDF("")}
        autoComplete="off"
      />
      <Gap />
      <AdvancedInputs />
    </>
  );
});

export default Inputs;
