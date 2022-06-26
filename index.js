/**
 * @format
 */
import moment from "moment";
import localization from "moment/locale/it";
import { AppRegistry } from "react-native";
import "react-native-gesture-handler";
import App from "./App";
import { name as appName } from "./app.json";

moment.updateLocale("it", localization);

AppRegistry.registerComponent(appName, () => App);
