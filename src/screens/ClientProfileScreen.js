import { Page, PrimaryButton } from "@components/common";
import Spacer from "@components/common/Spacer";
import { Title } from "@components/typography";
import React from "react";

const ClientProfileScreen = ({ route }) => {
  const { clientInfo, collaboration } = route.params;
  console.log("DEBUG::  ~ collaboration", collaboration);

  const onPress = () => {};

  return (
    <>
      <Page hasHeader>
        <Spacer />
        <Title text={`${clientInfo.fname} ${clientInfo.lname}`} center />
        <Spacer />
        <PrimaryButton title={"Visualizza Info Cliente"} onPress={() => {}} />
        <Spacer />
        <PrimaryButton title={"Aggiungi Dieta"} onPress={() => {}} />
        <Spacer />
        <PrimaryButton title={"Aggiungi Allenamento"} onPress={() => {}} />
        <Spacer />
        <PrimaryButton title={"Aggiungi Integrazione"} onPress={() => {}} />
        <Spacer />
        <PrimaryButton title={"Visualizza Progressi"} onPress={() => {}} />
        <Spacer />
      </Page>
    </>
  );
};

export default ClientProfileScreen;
