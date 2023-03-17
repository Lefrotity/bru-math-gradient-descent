import React from "react";
import Inputs from "../Inputs";
import { Page, LegacyCard } from "@shopify/polaris";
import StartCulculation from "../StartCulculation";

const MainPage = () => {
  return (
    <Page
      title="Метод градиентного спуска"
      subtitle="Работа выполнена Павлом Помозовым ИСТСЗ-201 как курсовой проект"
    >
      <LegacyCard sectioned title="Вводимые значения">
        <Inputs />
      </LegacyCard>
      <StartCulculation />
    </Page>
  );
};

export default MainPage;
