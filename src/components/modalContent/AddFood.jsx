import Spacer from "@components/common/Spacer";
import { Subtitle } from "@components/typography";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";

const AddFood = ({ split, onPress }) => {
  const [alimento, setAlimento] = useState("");
  const [quantity, setQuantity] = useState("");

  return (
    <>
      <Subtitle text={"Aggiungi Alimento"} />
      <Spacer small />
      <TextInput
        label="Alimento"
        value={alimento}
        onChangeText={(text) => setAlimento(text)}
      />
      <Spacer small />
      <TextInput
        label="Quantità (GR)"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
      />
      <Spacer small />
      <Button
        icon="plus"
        mode="contained"
        onPress={() => {
          onPress(split, alimento, quantity);
        }}
      >
        Aggiungi
      </Button>
    </>
  );
};

export default AddFood;
