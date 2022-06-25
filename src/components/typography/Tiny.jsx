import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { palette } from "../../theme";
import { Text } from "./index";
import { textPropTypes } from "./Text";

const Tiny = ({
  containerStyle,
  color = palette.black,
  text,
  bold,
  light,
  center,
  right,
  onFirstAnchorPress,
  firstAnchorColor,
  onSecondAnchorPress,
  secondAnchorColor,
  boldColor,
  replace,
  capitalizeAll,
  upperCase,
  lowerCase,
  underline,
  lineTrough,
  lineHeight = 18
}) => (
  <>
    {!!text && (
      <View style={[containerStyle]}>
        <Text
          underline={underline}
          color={color}
          fontSize={12}
          lineHeight={lineHeight}
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
          boldColor={boldColor || color}
          lineTrough={lineTrough}
        >
          {text}
        </Text>
      </View>
    )}
  </>
);

Tiny.propTypes = {
  containerStyle: PropTypes.any,
  text: PropTypes.string.isRequired,
  ...textPropTypes
};

export default Tiny;
