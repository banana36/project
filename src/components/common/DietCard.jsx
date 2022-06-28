import { Label } from "@components/typography";
import { palette } from "@theme/palette";
import { DimensionsUtils } from "@utils/dimensions";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DietCard = ({ navigation, style }) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <View style={styles.headerCard}>
        <Label text={"Dieta"} />
        <MaterialCommunityIcons
          name="food-apple-outline"
          color={palette.black}
          size={DimensionsUtils.getIconSize(24)}
        />
      </View>
    </View>
  );
};

export default DietCard;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    minHeight: DimensionsUtils.getDP(150),
    padding: DimensionsUtils.getDP(16),
    borderColor: palette.white,
    borderWidth: 2,
    borderRadius: DimensionsUtils.getDP(25),
    backgroundColor: palette.white
  },
  headerCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
