import React from "react";
import Text from "./Text";

const B = ({ children, color }) => (
  <Text bold color={color}>
    {children}
  </Text>
);

export default B;
