import { Label } from "@components/typography";
import { palette } from "@theme/palette";
import { DimensionsUtils } from "@utils/dimensions";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CustomCard = ({ navigation, style, text, type, onPress }) => {
  return (
    <TouchableOpacity style={[styles.inputContainer, style]} onPress={onPress}>
      <View style={styles.headerCard}>
        <Label text={text} />
        <MaterialCommunityIcons
          name="food-apple-outline"
          color={palette.black}
          size={DimensionsUtils.getIconSize(24)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomCard;

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
