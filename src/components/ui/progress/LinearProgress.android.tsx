import React from "react";
import { LinearProgressProps } from "./types";
import { LinearProgress as AndroidProgress } from "@expo/ui/jetpack-compose";

export const LinearProgress: React.FC<LinearProgressProps> = ({
  value,
  color = "#6200ee",
  ...props
}) => {
  return <AndroidProgress progress={value} color={color} {...props} />;
};

// export default LinearProgress;
// This component uses the Android LinearProgress from Expo's UI library
