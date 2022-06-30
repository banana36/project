import { getWorkout } from "@actions/query";
import { Page, PrimaryButton } from "@components/common";
import Spacer from "@components/common/Spacer";
import { Label, Title } from "@components/typography";
import { useIsFocused } from "@react-navigation/native";
import { DimensionsUtils } from "@utils/dimensions";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";

const WorkoutScreen = ({ navigation, route }) => {
  const { collaborationID } = route.params;
  const focused = useIsFocused();

  const [workoutList, setWorkoutList] = useState([]);

  // const { ptData } = route.params;

  useEffect(() => {
    if (focused) {
      getWorkout(collaborationID, (data) => setWorkoutList(data));
    }
  }, [focused]);

  const onPress = () => {
    navigation.navigate("InsertWorkout", { collaborationID });
  };

  return (
    <>
      <Page hasHeader>
        <Spacer />
        <Title text={"Schede"} center />
        {workoutList?.map((item) => {

          return (
            <>
              <Spacer micro />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ModifyWorkout", {
                    collaborationID,
                    workoutInfo: item,
                    workoutList
                  })
                }
              >
                <Card mode="outlined">
                  <Card.Content style={styles.food}>
                    <Label text={item?.day} />
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </>
          );
        })}
        <Spacer small />
        <PrimaryButton title={"Aggiungi"} onPress={() => onPress()} />
      </Page>
    </>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  surface: {
    paddingVertical: DimensionsUtils.getDP(20),
    alignItems: "center",
    justifyContent: "center"
  }
});
