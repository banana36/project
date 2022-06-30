import { Page, PrimaryButton } from "@components/common";
import Spacer from "@components/common/Spacer";
import { Title } from "@components/typography";
import { DimensionsUtils } from "@utils/dimensions";
import React from "react";
import { StyleSheet } from "react-native";

const DietScreen = ({ navigation, route }) => {
  const { collaborationID } = route.params;

  const days = [
    "Lunedi",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
    "Domenica"
  ];

  // const { ptData } = route.params;

  const onPress = (day) => {
    navigation.navigate("InsertDiet", { day, collaborationID });
  };

  return (
    <>
      <Page hasHeader>
        <Spacer />
        <Title text={"Alimentazione"} center />
        {days?.map((day) => {
          return (
            <>
              <Spacer small />
              <PrimaryButton title={day} onPress={() => onPress(day)} />
            </>
          );
        })}
      </Page>
    </>
  );
};

export default DietScreen;

const styles = StyleSheet.create({
  surface: {
    paddingVertical: DimensionsUtils.getDP(20),
    alignItems: "center",
    justifyContent: "center"
  }
});
