import { CommonActions } from "@react-navigation/native";
import * as React from "react";

export const navigationRef = React.createRef();
export const isReadyRef = React.createRef();

export class NavigationHelper {
  static navigate(name, params) {
    if (isReadyRef?.current && navigationRef?.current && !!name) {
      // Perform navigation if the app has mounted
      try {
        navigationRef?.current?.navigate(name, params || undefined);
      } catch (navigateException) {
        console.log(
          "[NavigationHelper] navigateException:: ",
          navigateException
        );
      }
    } else {
      // You can decide what to do if the app hasn't mounted
      console.error(
        "[NavigationHelper] navigation is impossible 'cause app hasn't mounted yet."
      );
    }
  }

  static goBack() {
    if (isReadyRef?.current && navigationRef?.current) {
      // Perform back navigation if the app has mounted
      navigationRef?.current?.goBack();
    } else {
      // You can decide what to do if the app hasn't mounted
      console.log(
        "[NavigationHelper] navigation back is impossible 'cause app hasn't mounted yet."
      );
    }
  }

  static pop(navigation) {
    if (!!navigation) {
      // Perform pop navigation if the app has mounted
      try {
        navigation?.pop();
      } catch (popException) {
        console.log("[NavigationHelper] popException:: ", popException);
      }
    } else {
      // You can decide what to do if the app hasn't mounted
      console.log(
        "[NavigationHelper] navigation pop is impossible 'cause app hasn't mounted yet."
      );
    }
  }

  static goToSupport() {
    try {
      NavigationHelper.navigate("Support");
    } catch (goToSupportException) {
      console.log(
        "[NavigationHelper] goToSupportException:: ",
        goToSupportException
      );
    }
  }

  static goToHome() {
    try {
      NavigationHelper.navigate("Home");
    } catch (goToHomeException) {
      console.log("[NavigationHelper] goToHomeException:: ", goToHomeException);
    }
  }

  static resetFirstLevel(nameRoute, navigation) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: nameRoute }]
      })
    );
  }

  static resetSecondLevel(
    firstRoute,
    secondRoute,
    navigation
    // paramsNavigation
  ) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: firstRoute,
            state: {
              routes: [
                {
                  name: secondRoute

                  // name: secondRoute,
                  // params: {
                  //   paramasNavigation: paramsNavigation
                  // }
                }
              ]
            }
          }
        ]
      })
    );
  }
}
