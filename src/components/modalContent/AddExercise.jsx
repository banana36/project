import Spacer from "@components/common/Spacer";
import { Subtitle } from "@components/typography";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";

const AddExercise = ({ onPress }) => {
  const [exercise, setExercise] = useState("");
  const [set, setSet] = useState("");
  const [rep, setRep] = useState("");

  return (
    <>
      <Subtitle text={"Aggiungi Esercizio"} />
      <Spacer small />
      <TextInput
        label="Esercizio"
        value={exercise}
        onChangeText={(text) => setExercise(text)}
      />
      <Spacer small />
      <TextInput
        label="Serie"
        value={set}
        onChangeText={(text) => setSet(text)}
      />
      <Spacer small />
      <TextInput
        label="Ripetizioni"
        value={rep}
        onChangeText={(text) => setRep(text)}
      />
      <Spacer small />
      <Button
        icon="plus"
        mode="contained"
        onPress={() => {
          onPress(exercise, set, rep);
        }}
      >
        Aggiungi
      </Button>
    </>
  );
};

export default AddExercise;
