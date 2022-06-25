import { Text } from "@components/typography";
import { DimensionsUtils } from "@utils/dimensions";
import React, { useState } from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import { Icon } from "../icons";

const IconWithText = ({
  containerStyle,
  iconName,
  text,
  onPress = () => {},
  backgroundColor,
  iconSize,
  iconColor,
  bold,
  textColor,
  lineHeight = 24,
  noLineHeight,
  fontSize = 16,
  light,
  reverse,
  labelStyle
}) => {
  const [isDisabled, setDisabledStatus] = useState(false);
  return (
    <>
      {!!iconName && (
        <View style={containerStyle}>
          <TouchableHighlight
            style={[styles.touchableHighlightStyle, { backgroundColor }]}
            disabled={isDisabled}
            onPress={async () => {
              try {
                setDisabledStatus(true);
                await onPress();
              } finally {
                setDisabledStatus(false);
              }
            }}
            underlayColor="transparent"
            hitSlop={{
              top: DimensionsUtils.getDP(15),
              bottom: DimensionsUtils.getDP(15),
              left: DimensionsUtils.getDP(15),
              right: DimensionsUtils.getDP(15)
            }}
          >
            <View style={[styles.container, !!reverse && styles.rowReverse]}>
              {/* <Icon name={iconName} size={iconSize} color={iconColor} /> */}
              {!!text && (
                <Text
                  color={textColor}
                  fontSize={DimensionsUtils.getDP(fontSize)}
                  lineHeight={!!noLineHeight ? 0 : lineHeight}
                  bold={bold}
                  light={light}
                  onPress={onPress}
                  containerStyle={labelStyle || styles.labelContainerStyle}
                >
                  {text}
                </Text>
              )}
            </View>
          </TouchableHighlight>
        </View>
      )}
    </>
  );
};

export default IconWithText;

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  touchableHighlightStyle: {
    alignItems: "center",
    justifyContent: "center"
  },
  labelContainerStyle: {
    paddingLeft: DimensionsUtils.getDP(10)
  },
  rowReverse: { flexDirection: "row-reverse" }
});
