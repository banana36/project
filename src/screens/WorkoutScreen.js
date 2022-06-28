import { Page } from "@components/common";
import Spacer from "@components/common/Spacer";
import WorkoutCard from "@components/common/WorkoutCard";
import { Title } from "@components/typography";
import { DimensionsUtils } from "@utils/dimensions";
import React from "react";
import { StyleSheet, View } from "react-native";

const WorkoutScreen = ({ navigation }) => {
  return (
    <Page>
      <View>
        <Spacer />
        <Title text={"Seleziona il tuo allenamento"} bold />
        <Spacer />
        <View style={styles.containerCard}>
          <WorkoutCard
            navigation={navigation}
            style={{ marginRight: DimensionsUtils.getDP(8) }}
          />
          <WorkoutCard
            navigation={navigation}
            style={{ marginLeft: DimensionsUtils.getDP(8) }}
          />
        </View>
        <Spacer />
        <View style={styles.containerCard}>
          <WorkoutCard
            navigation={navigation}
            style={{ marginRight: DimensionsUtils.getDP(8) }}
          />
          <WorkoutCard
            navigation={navigation}
            style={{ marginLeft: DimensionsUtils.getDP(8) }}
          />
        </View>
      </View>
    </Page>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  containerCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
