import React from "react";
import { View } from "react-native";
import { LinearProgressProps } from "./types";

export const LinearProgress: React.FC<LinearProgressProps> = ({
  value,
  color = "#FFFFFF",
  ...props
}) => {
  return (
    <View
      style={{ width: `${value * 100}%`, backgroundColor: color, height: 4 }}
      {...props}
    />
  );
};

// export default LinearProgress;
// This component uses the iOS LinearProgress from Expo's UI library
