import { Page, PrimaryButton } from "@components/common";
import CustomCard from "@components/common/CustomCard";
import Spacer from "@components/common/Spacer";
import { Title } from "@components/typography";
import { UserImg } from "@styles/FeedStyles";
import { DimensionsUtils } from "@utils/dimensions";
import React from "react";
import { StyleSheet, View } from "react-native";

const ClientProfileScreen = ({ route, navigation }) => {
  const { clientInfo, collaborationID } = route.params;

  return (
    <>
      <Page hasHeader>
        <Spacer />
        <View style={styles.header}>
          <Title text={`${clientInfo?.fname} ${clientInfo?.lname}`} />
          <UserImg
            source={{
              uri: "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
            }}
          />
        </View>

        <Spacer />
        <View style={styles.containerCard}>
          <CustomCard
            text={"Info Cliente"}
            navigation={navigation}
            style={{ marginRight: DimensionsUtils.getDP(8) }}
          />
          <CustomCard
            text={"Diet Plan"}
            navigation={navigation}
            style={{ marginLeft: DimensionsUtils.getDP(8) }}
            onPress={() => navigation.navigate("Diet", { collaborationID })}
          />
        </View>
        <Spacer />
        <View style={styles.containerCard}>
          <CustomCard
            text={"Workout Plan"}
            navigation={navigation}
            style={{ marginRight: DimensionsUtils.getDP(8) }}
            onPress={() => navigation.navigate("Workout", { collaborationID })}
          />
          <CustomCard
            text={"Integrazione"}
            navigation={navigation}
            style={{ marginLeft: DimensionsUtils.getDP(8) }}
          />
        </View>
        <Spacer />
        <CustomCard text={"Progressi"} navigation={navigation} />
        <Spacer />
      </Page>
    </>
  );
};

export default ClientProfileScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  containerCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
