import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Text } from "./index";
import { palette } from "../../theme";

const Title = ({
  containerStyle,
  color = palette.black,
  text,
  center,
  right,
  onFirstAnchorPress,
  firstAnchorColor,
  onSecondAnchorPress,
  secondAnchorColor,
  replace,
  capitalizeAll,
  upperCase,
  lowerCase,
  boldColor,
  children
}) => (
  <>
    {(!!text || !!children) && (
      <View style={[containerStyle]}>
        <Text
          fontSize={30}
          bold
          center={center}
          right={right}
          color={color}
          onFirstAnchorPress={onFirstAnchorPress}
          firstAnchorColor={firstAnchorColor}
          onSecondAnchorPress={onSecondAnchorPress}
          secondAnchorColor={secondAnchorColor}
          replace={replace}
          capitalizeAll={capitalizeAll}
          upperCase={upperCase}
          lowerCase={lowerCase}
          lineHeight={36}
          boldColor={boldColor || color}
        >
          {text || children}
        </Text>
      </View>
    )}
  </>
);

Title.propTypes = {
  containerStyle: PropTypes.any,
  text: PropTypes.string,
  center: PropTypes.bool,
  right: PropTypes.bool,
  color: PropTypes.string
  //   ...parserPropTypes
};

export default Title;
