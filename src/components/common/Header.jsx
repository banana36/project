import { Subtitle } from "@components/typography";
import { palette } from "@theme/palette";
import { DimensionsUtils } from "@utils/dimensions";
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import IconWithText from "./IconWithText";

const Header = ({
  backgroundColor,
  borderBottomColor,
  hideLogo,
  isWhiteLogo,
  paddingHorizontal,
  onPressGoBack,
  backTextColor,
  backIconColor,
  bold,
  onPressHelp,
  helpIconColor,
  onPressClose,
  closeIconColor,
  title,
  isLogin
}) => {
  const { containerStyle } = styles;

  const getLeftSection = () => {
    if (!!onPressGoBack && typeof onPressGoBack === "function") {
      return (
        <IconWithText
          onPress={onPressGoBack}
          text={"Indietro"}
          iconName="arrow_left_chevron"
          bold={bold || true}
          textColor={backTextColor || palette.black}
          iconColor={backIconColor || palette.black}
        />
      );
    }
    if (!!title) {
      return <Subtitle text={title} regular />;
    }
    if (hideLogo) {
      return <View></View>;
    }
    if (isLogin) {
      return (
        <Image
          style={styles.logo}
          // source={require("../../assets/images/login/logo_login.svg")} // to do insert png
        />
      );
    }
    if (isWhiteLogo) {
      return (
        <Image
          style={styles.logo}
          // source={require("../../assets/images/nen_logo_white.png")}
        />
      );
    }
    return (
      <Image
        style={styles.logo}
        // source={require("../../assets/images/nen_logo.png")}
      />
    );
  };

  return (
    <View
      style={[
        containerStyle,
        {
          backgroundColor: backgroundColor || palette.white,
          borderBottomColor: borderBottomColor || palette.black,
          paddingHorizontal: paddingHorizontal || DimensionsUtils.getDP(16)
        }
      ]}
    >
      <>{getLeftSection()}</>
      <View style={styles.contentContainer}>
        {!!onPressHelp && typeof onPressHelp === "function" && (
          <IconWithText
            iconName={"support_outline"}
            onPress={onPressHelp}
            iconColor={helpIconColor || palette.black}
          />
        )}
        {!!onPressClose && typeof onPressClose === "function" && (
          <IconWithText
            iconName={"close"}
            onPress={onPressClose}
            iconColor={closeIconColor || palette.black}
            containerStyle={styles.onCloseContainerStyle}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: DimensionsUtils.getDP(57),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1
  },
  contentContainer: {
    flexDirection: "row"
  },
  logo: {
    height: DimensionsUtils.getDP(25),
    width: DimensionsUtils.getDP(160),
    paddingBottom: DimensionsUtils.getDP(27)
  },
  onCloseContainerStyle: {
    paddingLeft: DimensionsUtils.getDP(36)
  }
});

export default Header;
