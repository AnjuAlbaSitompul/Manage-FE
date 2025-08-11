import { Dimensions } from "react-native";

export const size = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const screenSize = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};
