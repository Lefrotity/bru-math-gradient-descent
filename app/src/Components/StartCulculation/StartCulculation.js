import { Button, LegacyStack } from "@shopify/polaris";
import React from "react";
import Gap from "../@Helpers/Gap";

const StartCulculation = () => {
  return (
    <>
      <Gap />
      <LegacyStack alignment="center" distribution="center">
        <Button primary>Начать рассчеты</Button>
      </LegacyStack>
      <Gap />
    </>
  );
};

export default StartCulculation;
