import { Page, PrimaryButton } from "@components/common";
import Spacer from "@components/common/Spacer";
import { Title } from "@components/typography";
import { DimensionsUtils } from "@utils/dimensions";
import React from "react";
import { StyleSheet } from "react-native";

const WorkoutScreen = ({ navigation, route }) => {
  const { collaboration } = route.params;
  console.log("DEBUG::  ~ collaboration", collaboration);

  // const { ptData } = route.params;

  const onPress = () => {
    navigation.navigate("InsertWorkout", { collaboration });
  };

  return (
    <>
      <Page hasHeader>
        <Spacer />
        <Title text={"Schede"} center />

        <Spacer small />
        <PrimaryButton title={"Aggiungi"} onPress={() => onPress()} />
      </Page>
    </>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  surface: {
    paddingVertical: DimensionsUtils.getDP(20),
    alignItems: "center",
    justifyContent: "center"
  }
});
