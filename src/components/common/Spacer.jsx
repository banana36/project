import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { DimensionsUtils } from "@utils/dimensions";

const Spacer = ({
  small,
  tiny,
  micro,
  large,
  extraLarge,
  size,
  index = Math.random()
}) => (
  <View
    index={index}
    style={[
      styles.regular,
      !!small && styles.small,
      !!tiny && styles.tiny,
      !!micro && styles.micro,
      !!large && styles.large,
      !!extraLarge && styles.extraLarge,
      !!size && { height: DimensionsUtils.getDP(size) }
    ]}
  />
);

export default Spacer;

const styles = StyleSheet.create({
  regular: {
    height: DimensionsUtils.getDP(24)
  },
  small: {
    height: DimensionsUtils.getDP(16)
  },
  tiny: {
    height: DimensionsUtils.getDP(12)
  },
  micro: {
    height: DimensionsUtils.getDP(8)
  },
  large: {
    height: DimensionsUtils.getDP(32)
  },
  extraLarge: {
    height: DimensionsUtils.getDP(40)
  }
});

Spacer.propTypes = {
  size: PropTypes.number,
  small: PropTypes.bool,
  tiny: PropTypes.bool,
  micro: PropTypes.bool,
  large: PropTypes.bool
};
