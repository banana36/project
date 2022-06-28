import { getMyCollaborations } from "@actions/query";
import { Page } from "@components/common";
import Spacer from "@components/common/Spacer";
import ChangeDay from "@components/modalContent/ChangeDay";
import { Label, Subtitle, Tiny, Title } from "@components/typography";
import { AuthContext } from "@navigation/AuthProvider.ios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Card, Modal, Portal, Provider } from "react-native-paper";

const ViewDietScreen = () => {
  const { user } = useContext(AuthContext);

  const [collaboration, setCollaboration] = useState({});
  const [day, setDay] = useState(moment().format("dddd"));

  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const diet = collaboration?.[0]?.diet;
  console.log("DEBUG::  ~ diet", diet);

  const daySplit = [
    "Colazione",
    "Spuntino 1",
    "Pranzo",
    "Spuntino2",
    "Post-workout",
    "Cena"
  ];

  useEffect(() => {
    getMyCollaborations(user.uid, (value) => setCollaboration(value));
  }, []);

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
            {daySplit?.map((split) => {
              return (
                <>
                  <Spacer small />
                  <Subtitle text={split} />
                  {diet?.map((item) => {
                    return (
                      item?.split === split &&
                      item?.day?.toLowerCase() === day && (
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

export default ViewDietScreen;

const styles = StyleSheet.create({
  food: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
