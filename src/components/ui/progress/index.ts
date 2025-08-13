import { Platform } from "react-native";
export type { LinearProgressProps } from "./types";
import { LinearProgress as IOSProgress } from "./LinearProgress.android";
import { LinearProgress as AndroidProgress } from "./LinearProgress.android";
import { LinearProgress as WebProgress } from "./LinearProgress.web";

const LinearProgress = Platform.select({
  android: AndroidProgress,
  ios: IOSProgress,
  web: WebProgress,
});

export default LinearProgress;
