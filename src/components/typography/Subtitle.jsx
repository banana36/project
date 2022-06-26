import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import { palette } from "../../theme";
import { Text } from "./index";
import { textPropTypes } from "./Text";

const Subtitle = ({
  containerStyle = {},
  color = palette.black,
  text,
  regular,
  bold,
  children,
  onFirstAnchorPress,
  firstAnchorColor,
  onSecondAnchorPress,
  secondAnchorColor,
  boldColor,
  replace,
  capitalizeAll,
  upperCase,
  lowerCase,
  center,
  right,
  noLineHeight
}) => (
  <>
    {(!!text || !!children) && (
      <View style={[containerStyle]}>
        <Text
          fontSize={22}
          lineHeight={noLineHeight ? 0 : 33}
          light={!bold && !regular}
          regular={regular}
          bold={bold}
          color={color}
          onFirstAnchorPress={onFirstAnchorPress}
          firstAnchorColor={firstAnchorColor}
          onSecondAnchorPress={onSecondAnchorPress}
          secondAnchorColor={secondAnchorColor}
          replace={replace}
          capitalizeAll={capitalizeAll}
          upperCase={upperCase}
          lowerCase={lowerCase}
          center={center}
          right={right}
          boldColor={boldColor || color}
        >
          {text || children}
        </Text>
      </View>
    )}
  </>
);

Subtitle.propTypes = {
  containerStyle: PropTypes.any,
  text: PropTypes.string.isRequired,
  regular: PropTypes.bool,
  ...textPropTypes
};

export default Subtitle;
