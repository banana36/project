import { getClientInfo } from "@actions/query";
import { Subtitle } from "@components/typography";
import { Card, UserImg } from "@styles/FeedStyles";
import { palette } from "@theme/palette";
import { DimensionsUtils } from "@utils/dimensions";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ClientCard = ({ item, navigation }) => {
  const [clientInfo, setClientInfo] = useState(null);

  useEffect(() => {
    getClientInfo(item?.clientId, (data) => setClientInfo(data));
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ClientProfile", {
          clientInfo,
          collaboration: item
        });
      }}
    >
      <Card key={item.id} style={styles.imgTextBox}>
        <UserImg
          source={{
            uri:
              "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
          }}
        />
        <Subtitle
          text={`${clientInfo?.fname} ${clientInfo?.lname}`}
          containerStyle={styles.nameSurname}
        />
      </Card>
    </TouchableOpacity>
  );
};

export default ClientCard;

const styles = StyleSheet.create({
  container: {},
  imgTextBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: DimensionsUtils.getDP(10),
    borderColor: palette.black,
    borderWidth: 1
  },
  nameSurname: {
    paddingLeft: DimensionsUtils.getDP(10)
  }
});
