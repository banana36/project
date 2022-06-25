import React from "react";
import Text from "./Text";

const A = ({ children, onPress, color }) => (
  <Text onPress={onPress} bold underline color={color}>
    {children}
  </Text>
);

export default A;
