import React from "react";
import { Text as RNText, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Parser } from "../../core/translations";
import { DimensionsUtils } from "../../utils/dimensions/Dimensions";

const Text = ({
  children,
  center,
  right,
  bold,
  light,
  underline,
  fontSize,
  color,
  onFirstAnchorPress,
  firstAnchorColor,
  onSecondAnchorPress,
  secondAnchorColor,
  boldColor,
  replace,
  onPress,
  capitalizeAll,
  upperCase,
  lowerCase,
  lineHeight,
  lineTrough,
  containerStyle = {}
}) => (
  <>
    {!!children && (
      <RNText
        style={[
          styles.fontFamilyRegular,
          styles.textColor,
          containerStyle,
          !!center && styles.textAlignCenter,
          !!right && styles.textAlignRight,
          !!bold && styles.fontFamilyBold,
          !!light && styles.fontFamilyLight,
          !!underline && styles.textDecorationUnderline,
          !!lineTrough && styles.textDecorationLineThrough,
          !!fontSize && {
            fontSize: DimensionsUtils.getFontSize(fontSize)
          },
          !!color && { color },
          !!lineHeight && { lineHeight }
        ]}
        suppressHighlighting
        onPress={onPress}
      >
        <Parser
          onFirstAnchorPress={onFirstAnchorPress}
          firstAnchorColor={firstAnchorColor}
          onSecondAnchorPress={onSecondAnchorPress}
          secondAnchorColor={secondAnchorColor}
          replace={replace}
          capitalizeAll={capitalizeAll}
          upperCase={upperCase}
          lowerCase={lowerCase}
          boldColor={boldColor}
        >
          {children}
        </Parser>
      </RNText>
    )}
  </>
);

export const textPropTypes = {
  // ...parserPropTypes,
  center: PropTypes.bool,
  right: PropTypes.bool,
  bold: PropTypes.bool,
  light: PropTypes.bool,
  color: PropTypes.string
};

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  underline: PropTypes.bool,
  fontSize: PropTypes.number,
  onPress: PropTypes.func,
  lineHeight: PropTypes.number,
  ...textPropTypes
};

const styles = StyleSheet.create({
  fontFamilyRegular: {
    fontFamily: "Lato-Regular"
  },
  textColor: {
    color: "black"
  },
  fontFamilyBold: { fontFamily: "Kufam-SemiBoldItalic" },
  fontFamilyLight: { fontFamily: "Kufam-SemiBoldItalic" },
  textAlignCenter: { textAlign: "center" },
  textAlignRight: { textAlign: "right" },
  textDecorationUnderline: {
    textDecorationLine: "underline"
  },
  textDecorationLineThrough: {
    textDecorationLine: "line-through"
  }
});

export default Text;
