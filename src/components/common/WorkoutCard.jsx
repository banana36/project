import { Label } from "@components/typography";
import { palette } from "@theme/palette";
import { DimensionsUtils } from "@utils/dimensions";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const image = {
  uri:
    "data:image/png;base64,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"
};

const WorkoutCard = ({ style }) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <ImageBackground
        source={image}
        style={styles.imgBackground}
        resizeMode="contain"
        imageStyle={{ borderRadius: DimensionsUtils.getDP(25) }}
      />
      <View style={styles.headerCard}>
        <Label text={"Workout"} />
        <MaterialIcons
          name="fitness-center"
          color={palette.black}
          size={DimensionsUtils.getIconSize(24)}
        />
      </View>
    </View>
  );
};

export default WorkoutCard;

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
  },
  imgBackground: {
    position: "absolute",
    top: 20,
    bottom: 0,
    left: 0,
    right: 0
  }
});
