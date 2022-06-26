import { getDiet, insertInDiet } from "@actions/query";
import { Page } from "@components/common";
import Spacer from "@components/common/Spacer";
import { Subtitle, Tiny, Title } from "@components/typography";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Card,
  Modal,
  Portal,
  Provider,
  TextInput
} from "react-native-paper";

const InsertDietScreen = ({ route }) => {
  const { collaboration } = route.params;

  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [diet, setDiet] = useState([]);

  const [alimento, setAlimento] = useState("");
  const [quantity, setQuantity] = useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const { day } = route.params;

  const daySplit = [
    "Colazione",
    "Spuntino 1",
    "Pranzo",
    "Spuntino2",
    "Post-workout",
    "Cena"
  ];

  useEffect(() => {
    getDiet(collaboration?.uid, day, (value) => setDiet(value));
  }, []);

  const insertUpdateMealPlan = (split) => {
    insertInDiet(collaboration?.uid, alimento, quantity, split, day);
    getDiet(collaboration?.uid, day, (value) => setDiet(value));
    hideModal();
  };

  const addFood = (split) => {
    setModalContent(
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
            insertUpdateMealPlan(split);
          }}
        >
          Aggiungi
        </Button>
      </>
    );
    showModal();
  };

  return (
    <>
      <Provider>
        <Portal>
          <Page
            hasHeader
            hasButton
            buttonProps={{ title: "conferma", onPress: () => {} }}
          >
            <Spacer />
            <Title text={day} center />
            {daySplit?.map((split) => {
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
            })}
            <Spacer />
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

export default InsertDietScreen;

const styles = StyleSheet.create({
  food: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
