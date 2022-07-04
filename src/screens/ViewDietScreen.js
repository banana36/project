import { Page } from "@components/common";
import Spacer from "@components/common/Spacer";
import ChangeDay from "@components/modalContent/ChangeDay";
import { Label, Subtitle, Tiny, Title } from "@components/typography";
import moment from "moment";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Card, Modal, Portal, Provider } from "react-native-paper";
import { useSelector } from "react-redux";

const ViewDietScreen = () => {
  const { myCollaboration } = useSelector((state) => state.ClientReducer);

  const [day, setDay] = useState(moment().format("dddd"));

  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const diet = myCollaboration?.[0]?.diet;
  console.log("DEBUG::  ~ diet", diet);

  const daySplit = [
    "Colazione",
    "Spuntino 1",
    "Pranzo",
    "Spuntino2",
    "Post-workout",
    "Cena"
  ];

  const changeDay = () => {
    setModalContent(
      <ChangeDay
        onPress={(dayChoosed) => {
          setDay(dayChoosed);
          hideModal();
        }}
      />
    );
    showModal();
  };

  return (
    <>
      <Provider>
        <Portal>
          <Page>
            <Spacer />
            <Title text={day} center />
            <Label text={"Cambia giorno"} center onPress={changeDay} />
            {daySplit?.map((split) => (
              <>
                <Spacer small />
                <Subtitle text={split} />
                {diet?.map(
                  (item) =>
                    item?.split === split &&
                    item?.day?.toLowerCase() === day?.toLowerCase() && (
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
                )}
              </>
            ))}
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

export default ViewDietScreen;

const styles = StyleSheet.create({
  food: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
