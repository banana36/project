import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { commonStyles } from "../../theme";

const Container = ({
  noSafeArea,
  noSafeAreaBottom,
  noSafeAreaTop,
  hasNavbar,
  style,
  children,
  safeAreaColor,
  pointerEvents = true
}) => (
  <View
    style={[
      css.container,
      noSafeArea && css.noSafeArea,
      noSafeAreaTop && css.noSafeAreaTop,
      noSafeAreaBottom && css.noSafeAreaBottom,
      hasNavbar && commonStyles.hasNavBar,
      safeAreaColor ? { backgroundColor: safeAreaColor } : commonStyles.app,
      style
    ]}
    pointerEvents={pointerEvents ? "auto" : "none"}
  >
    <View
      style={[
        css.innerView,
        { backgroundColor: safeAreaColor || commonStyles.appBackgroundColor }
      ]}
    />
    {children}
  </View>
);

export default Container;

const css = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: commonStyles.safeAreaTop,
    paddingBottom: commonStyles.safeAreaBottom
  },
  innerView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: commonStyles.safeAreaTop
  },
  noSafeArea: { paddingBottom: 0, paddingTop: 0 },
  noSafeAreaBottom: { paddingBottom: 0 },
  noSafeAreaTop: { paddingTop: 0 }
});

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.any
  ]).isRequired,
  noSafeArea: PropTypes.bool,
  noSafeAreaBottom: PropTypes.bool,
  noSafeAreaTop: PropTypes.bool,
  hasNavbar: PropTypes.bool,
  style: PropTypes.object,
  safeAreaColor: PropTypes.string
};
