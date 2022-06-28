import { NavigationHelper } from "@core/navigator";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { DimensionsUtils } from "@utils/dimensions";
import PropTypes from "prop-types";
import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { commonStyles, palette } from "../../theme";
import Container from "./Container";
import Header from "./Header";
import PrimaryButton from "./PrimaryButton";

const Page = ({
  pointerEvents,
  isLogin,
  noSafeArea,
  noSafeAreaBottom = true,
  noPaddingBottom = false,
  noSafeAreaTop,
  lightStatusBar = false,
  statusBarBgColor = "transparent",
  hasNavbar,
  style,
  children,
  safeAreaColor,
  hasHeader,
  color,
  headerProps = {
    backgroundColor: palette.lightGrey,
    borderBottomColor: palette.black,
    hideLogo: true,
    isWhiteLogo: false,
    paddingHorizontal: DimensionsUtils.getDP(16),
    onPressGoBack: undefined,
    backIconColor: undefined,
    backTextColor: undefined,
    onPressHelp: NavigationHelper.goToSupport,
    helpIconColor: undefined,
    onPressClose: NavigationHelper.goToHome,
    closeIconColor: undefined,
    hideGoBack: false,
    hideSupport: false,
    hideClose: false,
    title: undefined
  },
  scrollExtraHeight = 100,
  noPaddingHorizontal = false,
  bounces = true,
  hasButton = false,
  buttonProps = {
    buttonStyleName: undefined,
    title: undefined,
    titleColor: undefined,
    onPress: undefined,
    buttonColor: undefined,
    buttonBorderColor: undefined,
    iconName: undefined,
    iconDimension: undefined,
    iconColor: undefined,
    disabled: undefined,
    isAnimationActive: undefined,
    animationName: undefined,
    containerStyle: undefined
  },
  hasLoader = false,
  loaderProps = {
    visible: false,
    overlayColor: undefined,
    loaderJson: undefined,
    containerStyle: undefined,
    speed: undefined,
    textLoader: undefined
  },
  hasErrorToast = false,
  errorToastProps = {
    onClose: () => {},
    message: ""
  }
}) => {
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const getHeaderOnPressGoBack = () => {
    if (headerProps?.onPressGoBack) return headerProps?.onPressGoBack;
    if (!headerProps?.hideGoBack) return () => NavigationHelper.pop(navigation);
    return undefined;
  };

  const getHeaderOnPressHelp = () => {
    if (headerProps?.onPressHelp) return headerProps?.onPressHelp;
    if (!headerProps?.hideSupport) return () => NavigationHelper.goToSupport();
    return undefined;
  };

  const getHeaderOnPressClose = () => {
    if (headerProps?.onPressClose) return headerProps?.onPressClose;
    if (!headerProps?.hideClose) return () => NavigationHelper.goToHome();
    return undefined;
  };

  // useEffect(() => {
  //   if (loaderProps.visible) {
  //     StatusBar.setBarStyle("dark-content");
  //     console.log("Page xxxx set visible");
  //   } else {
  //     console.log("Page xxxx set non visible");

  //     StatusBar.setBarStyle(lightStatusBar ? "light-content" : "dark-content");
  //   }
  // }, [loaderProps.visible]);

  return (
    <Container
      noSafeArea={noSafeArea}
      noSafeAreaBottom={noSafeAreaBottom}
      noSafeAreaTop={noSafeAreaTop}
      hasNavbar={hasNavbar}
      style={[
        style,
        Platform.OS === "android" && { paddingTop: StatusBar.currentHeight }
      ]}
      safeAreaColor={color || safeAreaColor}
      pointerEvents={pointerEvents}
    >
      {isFocused && (
        <StatusBar
          backgroundColor={statusBarBgColor}
          barStyle={lightStatusBar ? "light-content" : "dark-content"}
          hidden={false}
          translucent={true}
        />
      )}
      {!!hasHeader && (
        <Header
          hideLogo={!!headerProps?.hideLogo}
          isWhiteLogo={!!headerProps?.isWhiteLogo}
          paddingHorizontal={headerProps?.paddingHorizontal}
          borderBottomColor={headerProps?.borderBottomColor}
          backgroundColor={color || headerProps?.backgroundColor}
          onPressHelp={getHeaderOnPressHelp()}
          helpIconColor={headerProps?.helpIconColor}
          onPressClose={getHeaderOnPressClose()}
          closeIconColor={headerProps?.closeIconColor}
          onPressGoBack={getHeaderOnPressGoBack()}
          backIconColor={headerProps?.backIconColor}
          backTextColor={headerProps?.backTextColor}
          title={headerProps?.title}
          isLogin={isLogin}
        />
      )}
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.contentContainerStyle,
          !!noPaddingHorizontal && styles.noPaddingHorizontal,
          (!!noPaddingBottom || !!hasNavbar) && styles.noPaddingBottom
        ]}
        bounces={bounces}
        showsVerticalScrollIndicator={false}
        extraHeight={scrollExtraHeight}
      >
        {!!hasButton ? (
          <>
            <View zIndex={2} style={styles.flex}>
              {children}
            </View>
            <View zIndex={1}>
              <PrimaryButton
                buttonStyleName={buttonProps.buttonStyleName}
                center={buttonProps.center}
                right={buttonProps.right}
                title={buttonProps.title}
                titleColor={buttonProps.titleColor}
                onPress={buttonProps.onPress}
                buttonColor={buttonProps.buttonColor}
                buttonBorderColor={buttonProps.buttonBorderColor}
                iconName={buttonProps.iconName}
                iconDimension={buttonProps.iconDimension}
                iconColor={buttonProps.iconColor}
                disabled={buttonProps.disabled}
                isAnimationActive={buttonProps.isAnimationActive}
                animationName={buttonProps.animationName}
                containerStyle={
                  buttonProps.containerStyle || {
                    paddingTop: DimensionsUtils.getDP(16)
                  }
                }
              />
            </View>
          </>
        ) : (
          <>{children}</>
        )}
      </KeyboardAwareScrollView>
      {/* {!!hasLoader && (
        <>
          <AnimatedLoader
            visible={loaderProps.visible}
            overlayColor={loaderProps.overlayColor || palette.white}
            source={
              loaderProps.loaderJson ||
              require("@assets/lottie/Loader_Black.json")
            }
            animationStyle={loaderProps.containerStyle || styles.lottie}
            speed={loaderProps.speed || 1}
          >
            <Label
              text={loaderProps.textLoader}
              containerStyle={styles.loaderText}
              center
            />
          </AnimatedLoader>
        </>
      )} */}
      {/* {hasErrorToast && (
        <>
          {!!errorToastProps?.message && (
            <ErrorToast
              onClose={errorToastProps?.onClose}
              message={errorToastProps?.message}
              marginHorizontal={DimensionsUtils.getDP(-16)}
            />
          )}
        </>
      )} */}
    </Container>
  );
};

export default Page;

const styles = StyleSheet.create({
  noPaddingBottom: {
    paddingBottom: 0
  },
  noPaddingHorizontal: {
    paddingHorizontal: 0
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: commonStyles.defaultPaddingHorizontal,
    paddingBottom: commonStyles.defaultMarginBottom
  },
  flex: { flex: 1 },
  lottie: {
    width: 40,
    height: 40
  },
  loaderText: {
    paddingHorizontal: DimensionsUtils.getDP(16),
    marginTop: DimensionsUtils.getDP(48)
  }
});

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  noSafeArea: PropTypes.bool,
  noSafeAreaBottom: PropTypes.bool,
  noSafeAreaTop: PropTypes.bool,
  hasNavbar: PropTypes.bool,
  style: PropTypes.object,
  safeAreaColor: PropTypes.string,
  hasHeader: PropTypes.bool,
  headerProps: PropTypes.shape({ backgroundColor: PropTypes.string }),
  scrollExtraHeight: PropTypes.number,
  noPaddingHorizontal: PropTypes.bool,
  bounces: PropTypes.bool,
  hasButton: PropTypes.bool,
  buttonProps: PropTypes.object
};
