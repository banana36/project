import { Subtitle } from "@components/typography";
import { Card, UserImg } from "@styles/FeedStyles";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const PtCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("PTProfile", { ptData: item });
      }}
    >
      <Card key={item.id}>
        <UserImg
          source={{
            uri:
              "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
          }}
        />
        <Subtitle text={`${item.fname} ${item.lname}`} />
      </Card>
    </TouchableOpacity>
  );
};

export default PtCard;
