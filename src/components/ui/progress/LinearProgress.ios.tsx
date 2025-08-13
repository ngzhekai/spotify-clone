import React from "react";
import { LinearProgress as IOSProgress } from "@expo/ui/swift-ui";
import { LinearProgressProps } from "./types";

export const LinearProgress: React.FC<LinearProgressProps> = ({
  value,
  color = "#007AFF",
  ...props
}) => {
  return <IOSProgress progress={value} color={color} {...props} />;
};

// export default LinearProgress;
// This component uses the iOS LinearProgress from Expo's UI library