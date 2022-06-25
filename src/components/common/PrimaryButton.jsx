import { palette } from "@theme/palette";
import { DimensionsUtils } from "@utils/dimensions";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "../typography";

const PrimaryButton = ({
  buttonStyleName,
  title,
  titleColor,
  subTitle,
  subTitleColor,
  onPress,
  buttonColor,
  buttonBorderColor,
  iconName,
  iconDimension,
  iconColor,
  disabled = false,
  isAnimationActive = false,
  animationName = "blackLoader",
  containerStyle,
  right,
  titleSize = 22,
  descriptionSize = 12
}) => {
  const getButtonStyle = () => {
    switch (buttonStyleName) {
      case "primary":
        return {
          backgroundColor: palette.blue,
          buttonBorderColor: palette.blue,
          titleColor: palette.white,
          subTitleColor: palette.black,
          iconColor: palette.white,
          animationName: "whiteLoader"
        };
      case "secondary":
        return {
          backgroundColor: palette.white,
          buttonBorderColor: palette.black,
          titleColor: palette.black,
          subTitleColor: palette.black,
          iconColor: palette.black,
          animationName
        };
      case "tertiary":
        return {
          backgroundColor: palette.white,
          buttonBorderColor: palette.white,
          titleColor: palette.black,
          subTitleColor: palette.black,
          iconColor: palette.black,
          animationName
        };
      case "power":
        return {
          backgroundColor: palette.yellow,
          buttonBorderColor: palette.yellow,
          titleColor: palette.black,
          subTitleColor: palette.black,
          iconColor: palette.black,
          animationName
        };
      case "gas":
        return {
          backgroundColor: palette.waterGreen,
          buttonBorderColor: palette.waterGreen,
          titleColor: palette.black,
          subTitleColor: palette.black,
          iconColor: palette.black,
          animationName
        };
      case "dual":
        return {
          backgroundColor: palette.blue,
          buttonBorderColor: palette.blue,
          titleColor: palette.white,
          subTitleColor: palette.white,
          iconColor: palette.white,
          animationName: "whiteLoader"
        };
      default:
        return {
          backgroundColor: buttonColor || palette.white,
          buttonBorderColor: buttonBorderColor || palette.black,
          titleColor: titleColor || palette.black,
          subTitleColor: subTitleColor || palette.black,
          iconColor: iconColor || palette.black,
          animationName
        };
    }
  };
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
              { backgroundColor: getButtonStyle().backgroundColor },
              { borderColor: getButtonStyle().buttonBorderColor }
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
                  center={!iconName}
                  right={right}
                  color={getButtonStyle().titleColor}
                  fontSize={titleSize}
                >
                  {title}
                </Text>

                {subTitle && (
                  <Text
                    paddingRight={DimensionsUtils.getDP(16)}
                    regular
                    color={getButtonStyle().subTitleColor}
                    textAlign={"left"}
                    fontSize={descriptionSize}
                  >
                    {subTitle}
                  </Text>
                )}
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
