import { Platform, StatusBar, Dimensions } from "react-native";
import DeviceInfo from "react-native-device-info";
import { DimensionsUtils } from "@utils/dimensions";
import { isToDownscale } from "@utils/dimensions/libs";

const hasNotch = DeviceInfo.hasNotch();
const platform = Platform.OS;
const isIos = platform === "ios";
const isIphoneWithNotch = isIos && hasNotch;

const getNavigationBarHeight = () => {
  if (isIphoneWithNotch) return DimensionsUtils.getDP(75);
  if (isToDownscale()) return 50;
  if (Platform.OS === "android") {
    const navbarHeight =
      Dimensions.get("screen").height -
      Dimensions.get("window").height +
      (StatusBar?.currentHeight || 0);
    return DimensionsUtils.getDP(navbarHeight);
  }
  return DimensionsUtils.getDP(54);
};

const getAndroidCurrentHeight = () => {
  if ((StatusBar?.currentHeight || 0) > 24) {
    return DimensionsUtils.getDP(StatusBar?.currentHeight);
  }
  return DimensionsUtils.getDP(0);
};

const androidCurrentHeight = getAndroidCurrentHeight();

const getAndroid7orLower = () => {
  if (Platform.OS === "android") {
    DeviceInfo.getApiLevel().then((apiLevel) => {
      console.log("Android api Level: ", apiLevel);
      return apiLevel <= 25;
    });
  }

  return false;
};
const isAndroid7orLower = getAndroid7orLower();

const deviceSafeAreaTop = isIos
  ? DimensionsUtils.getDP(20)
  : androidCurrentHeight;
const safeAreaTop = isIphoneWithNotch
  ? DimensionsUtils.getDP(40)
  : deviceSafeAreaTop;
const safeAreaBottom = isIphoneWithNotch
  ? DimensionsUtils.getDP(34)
  : DimensionsUtils.getDP(0);

const defaultMarginBottom = DimensionsUtils.getDP(32);
const defaultPaddingHorizontal = DimensionsUtils.getDP(16);

const navBarHeight = getNavigationBarHeight();

const appBackgroundColor = "#fff";

export const commonStyles = {
  appBackgroundColor,
  app: {
    backgroundColor: appBackgroundColor
  },
  isIos,
  isIphoneWithNotch,
  safeAreaTop,
  safeAreaBottom,
  defaultMarginBottom,
  defaultPaddingHorizontal,
  isAndroid7orLower,
  hasNavBar: {
    paddingBottom: navBarHeight
  },
  navBarHeight,
  row: {
    flexDirection: "row"
  },
  column: {
    flexDirection: "column"
  },
  rowWrap: {
    flexWrap: "wrap"
  },
  alignCenter: {
    alignItems: "center"
  },
  alignStart: {
    alignItems: "flex-start"
  },
  alignEnd: {
    alignItems: "flex-end"
  },
  justifyBetween: {
    justifyContent: "space-between"
  },
  justifyCenter: {
    justifyContent: "center"
  },
  justifyEnd: {
    justifyContent: "flex-end"
  }
};
