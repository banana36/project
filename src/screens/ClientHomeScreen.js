import { getMyCollaborations } from "@actions/query";
import { Page } from "@components/common";
import CustomCard from "@components/common/CustomCard";
import Spacer from "@components/common/Spacer";
import { Subtitle } from "@components/typography";
import { AuthContext } from "@navigation/AuthProvider.ios";
import { DimensionsUtils } from "@utils/dimensions";
import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";

const ClientHomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getMyCollaborations(user.uid);
  }, []);

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

export default ClientHomeScreen;

const styles = StyleSheet.create({
  containerCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
