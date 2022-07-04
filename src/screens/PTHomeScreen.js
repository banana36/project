import { Page } from "@components/common";
import CustomCard from "@components/common/CustomCard";
import Spacer from "@components/common/Spacer";
import { Subtitle } from "@components/typography";
import { DimensionsUtils } from "@utils/dimensions";
import React from "react";
import { StyleSheet, View } from "react-native";

const PTHomeScreen = ({ navigation }) => {
  return (
    <Page hasHeader headerProps={{ hideGoBack: true }}>
      <View>
        <Spacer />
        <Subtitle text={"Dashboard"} bold />
        <Spacer />
        <View style={styles.containerCard}>
          <CustomCard
            text={"Dieta"}
            navigation={navigation}
            style={{ marginRight: DimensionsUtils.getDP(8) }}
            onPress={() => navigation.navigate("Messages")}
          />
          <CustomCard
            text={"Dieta"}
            navigation={navigation}
            style={{ marginLeft: DimensionsUtils.getDP(8) }}
          />
        </View>
        <Spacer />
        <View style={styles.containerCard}>
          <CustomCard
            text={"Dieta"}
            navigation={navigation}
            style={{ marginRight: DimensionsUtils.getDP(8) }}
          />
          <CustomCard
            text={"Dieta"}
            navigation={navigation}
            style={{ marginLeft: DimensionsUtils.getDP(8) }}
          />
        </View>
      </View>
    </Page>
  );
};

export default PTHomeScreen;

const styles = StyleSheet.create({
  containerCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
