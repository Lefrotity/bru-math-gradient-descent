import React, { useCallback, useState } from "react";
import Inputs from "../Inputs";
import { Page, LegacyCard } from "@shopify/polaris";
import StartCulculation from "../StartCulculation";
import CulculatedCard from "../CulculatedCard";

const MainPage = () => {
  const [updater, setUpdater] = useState(0);
  const startClick = useCallback(() => {
    setUpdater(updater + 1);
  });

  return (
    <Page
      title="Метод градиентного спуска"
      subtitle="Работа выполнена Павлом Помозовым ИСТСЗ-201 как курсовой проект"
    >
      <LegacyCard sectioned title="Вводимые значения">
        <Inputs />
      </LegacyCard>
      <StartCulculation startClick={startClick} />
      {!!updater && <CulculatedCard updater={updater} />}
    </Page>
  );
};

export default MainPage;
