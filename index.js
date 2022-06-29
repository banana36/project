/**
 * @format
 */
import moment from "moment";
import localization from "moment/locale/it";
import { AppRegistry, LogBox } from "react-native";
import "react-native-gesture-handler";
import App from "./App";
import { name as appName } from "./app.json";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

moment.updateLocale("it", localization);

AppRegistry.registerComponent(appName, () => App);
