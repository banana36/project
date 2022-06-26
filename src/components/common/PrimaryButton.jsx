import { palette } from "@theme/palette";
import { DimensionsUtils } from "@utils/dimensions";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "../typography";

const PrimaryButton = ({
  title,
  titleColor,
  onPress,
  buttonColor,
  buttonBorderColor,
  disabled = false,
  isAnimationActive = false,
  // animationName = "blackLoader",
  containerStyle,
  right,
  titleSize = 22
}) => {
  return (
    <>
      {!!title && !!onPress && (
        <View
          style={[
            disabled || isAnimationActive ? styles.buttonDisabled : null,
            containerStyle
          ]}
        >
          <TouchableOpacity
            disabled={disabled}
            style={[
              styles.containerStyle,
              { backgroundColor: buttonColor || palette.white },
              { borderColor: buttonBorderColor || palette.black }
            ]}
            onPress={onPress}
            underlayColor={"transparent"}
          >
            {/* {!!isAnimationActive ? (
              <Lottie name={getButtonStyle().animationName}></Lottie>
            ) : ( */}
            <View style={[styles.flexDirectionRow]}>
              <View flex={1}>
                <Text
                  containerStyle={styles.subtitle}
                  regular
                  noLineHeight
                  center
                  right={right}
                  color={titleColor || palette.black}
                  fontSize={titleSize}
                >
                  {title}
                </Text>
              </View>
              {/* {!!iconName && (
                <Icon
                  name={iconName}
                  size={iconDimension}
                  color={getButtonStyle().iconColor}
                />
              )} */}
            </View>
            {/* // )} */}
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "transparent",
    paddingVertical: DimensionsUtils.getDP(12),
    paddingRight: DimensionsUtils.getDP(16),
    paddingLeft: DimensionsUtils.getDP(24)
  },
  buttonDisabled: {
    opacity: 0.5
  },
  subtitle: {
    paddingTop: 0
  },
  flexDirectionRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

PrimaryButton.propTypes = {
  buttonStyleName: PropTypes.string,
  title: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  buttonColor: PropTypes.string,
  buttonBorderColor: PropTypes.string,
  iconName: PropTypes.string,
  iconDimension: PropTypes.number,
  iconColor: PropTypes.string,
  disabled: PropTypes.bool
};
