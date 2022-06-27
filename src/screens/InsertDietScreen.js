import { getDiet, insertInDiet } from "@actions/query";
import { Page } from "@components/common";
import Spacer from "@components/common/Spacer";
import AddFood from "@components/modalContent/AddFood";
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

  const [alimento, setAlimento] = useState();
  console.log("DEBUG::  ~ alimento", alimento);
  const [quantity, setQuantity] = useState();
  console.log("DEBUG::  ~ quantity", quantity);

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

  const insertUpdateMealPlan = (split, food, gr) => {
    insertInDiet(collaboration?.uid, food, gr, split, day);
    getDiet(collaboration?.uid, day, (value) => setDiet(value));
    hideModal();
  };

  const addFood = (split) => {
    setModalContent(
      <AddFood
        split={split}
        onPress={(value, value1, value2) =>
          insertUpdateMealPlan(value, value1, value2)
        }
      />
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
