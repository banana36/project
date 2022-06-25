import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Text } from "./index";
import { textPropTypes } from "./Text";

const Label = ({
  containerStyle,
  center,
  right,
  bold,
  light,
  color,
  text,
  onFirstAnchorPress,
  firstAnchorColor,
  onSecondAnchorPress,
  secondAnchorColor,
  replace,
  capitalizeAll,
  upperCase,
  lowerCase,
  boldColor,
  noLineHeight,
  onPress,
  lineHeight = 24,
  underline
}) => (
  <>
    {!!text && (
      <View style={[containerStyle]}>
        <Text
          color={color}
          fontSize={16}
          lineHeight={!!noLineHeight ? 0 : lineHeight}
          bold={bold}
          light={light}
          center={center}
          right={right}
          onFirstAnchorPress={onFirstAnchorPress}
          firstAnchorColor={firstAnchorColor}
          onSecondAnchorPress={onSecondAnchorPress}
          secondAnchorColor={secondAnchorColor}
          replace={replace}
          capitalizeAll={capitalizeAll}
          upperCase={upperCase}
          lowerCase={lowerCase}
          onPress={onPress}
          boldColor={boldColor || color}
          underline={underline}
        >
          {text}
        </Text>
      </View>
    )}
  </>
);

Label.propTypes = {
  containerStyle: PropTypes.any,
  text: PropTypes.string.isRequired,
  ...textPropTypes
};

export default Label;
