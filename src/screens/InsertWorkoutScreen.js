import { insertWorkout } from "@actions/query";
import { Page } from "@components/common";
import Spacer from "@components/common/Spacer";
import AddExercise from "@components/modalContent/AddExercise";
import ChangeDay from "@components/modalContent/ChangeDay";
import { Label, Title } from "@components/typography";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import DraggableFlatList, {
  ScaleDecorator
} from "react-native-draggable-flatlist";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Button,
  Card,
  Modal,
  Portal,
  Provider,
  TextInput
} from "react-native-paper";

const InsertWorkoutScreen = ({ navigation, route }) => {
  const { collaboration } = route.params;

  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [nameWorkout, setNameWorkout] = useState("Scheda");
  const [dayWorkout, setDayWorkout] = useState("");
  const [workout, setWorkout] = useState([]);
  console.log("DEBUG::  ~ workout", workout);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  // useEffect(() => {
  //   getDiet(collaboration?.uid, day, (value) => setDiet(value));
  // }, []);

  const insertWorkoutInPlan = () => {
    insertWorkout(collaboration?.uid, workout, dayWorkout);
  };
  // const removeFoodMealPlan = (item) => {
  //   removeFromDiet(collaboration?.uid, item);
  //   getDiet(collaboration?.uid, day, (value) => setDiet(value));
  // };

  const addExerciseInWorkout = (value, value1, value2) => {
    workout.push({ key: 1, exercise: value, set: value1, rep: value2 });
    hideModal();
  };

  const addExercise = () => {
    setModalContent(
      <AddExercise
        onPress={(value, value1, value2) =>
          addExerciseInWorkout(value, value1, value2)
        }
      />
    );
    showModal();
  };

  const changeDay = () => {
    setModalContent(
      <ChangeDay
        onPress={(dayChoosed) => {
          setDayWorkout(dayChoosed);
          hideModal();
        }}
      />
    );
    showModal();
  };

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          // disabled={isActive}
          style={[
            styles.rowItem,
            { backgroundColor: isActive ? "red" : item.backgroundColor }
          ]}
        >
          <Card mode="outlined">
            <Card.Content style={styles.food}>
              <Label text={item.exercise} />
              <Label text={item.set} />
              <Label text={item.rep} />
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <>
      <Provider>
        <Portal>
          <Page
            hasHeader
            hasButton
            buttonProps={{
              title: "Salva",
              onPress: () => {
                insertWorkoutInPlan();
                navigation.pop();
              }
            }}
          >
            <>
              <Spacer />
              <Title text={nameWorkout} />
              <Spacer />
              <Label text={"Cambia giorno"} center onPress={changeDay} />
              <Spacer />
              <TextInput
                label="Giorno"
                value={dayWorkout}
                onChangeText={(text) => setDayWorkout(text)}
              />
              <Spacer />
              <DraggableFlatList
                data={workout}
                onDragEnd={({ data }) => setWorkout(data)}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
              />
              <Spacer />
              <Button mode="contained" onPress={() => addExercise()}>
                Aggiungi esercizio
              </Button>

              {/* {daySplit?.map((split) => {
              return (
                <>
                  <Spacer small />
                  <Subtitle text={split} />
                  {diet?.map((item) => {
                    return (
                      item?.split === split &&
                      item?.day === day && (
                        <>
                          <Spacer micro />
                          <Card mode="outlined">
                            <Card.Content style={styles.food}>
                              <Tiny text={item?.alimento} />
                              <Tiny text={item?.quantity} />
                              <Button
                                icon="close"
                                mode="outlined"
                                onPress={() => removeFoodMealPlan(item)}
                              ></Button>
                            </Card.Content>
                          </Card>
                        </>
                      )
                    );
                  })}
                  <Spacer small />
                  <Button
                    icon="plus"
                    mode="contained"
                    onPress={() => addFood(split)}
                  >
                    Aggiungi
                  </Button>
                </>
              );
            })} */}
              <Spacer />
            </>
          </Page>
        </Portal>
      </Provider>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default InsertWorkoutScreen;

const styles = StyleSheet.create({
  food: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
