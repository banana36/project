import { Container } from "@components/common";
import Spacer from "@components/common/Spacer";
import { Label, Title } from "@components/typography";
import { palette } from "@theme/palette";
import { DimensionsUtils } from "@utils/dimensions";
import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Agenda } from "react-native-calendars";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";

const PtCalendarScreen = () => {
  const [items, setItems] = useState({});
  console.log("DEBUG::  ~ items", items);

  const loadItems = (day) => {
    // setTimeout(() => {
    // for (let i = -15; i < 85; i++) {
    //   const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //   const strTime = timeToString(time);
    //   if (!items[strTime]) {
    //     items[strTime] = [];
    //     const numItems = Math.floor(Math.random() * 3 + 1);
    //     for (let j = 0; j < numItems; j++) {
    //       items[strTime].push({
    //         name: "Item for " + strTime + " #" + j,
    //         height: Math.max(50, Math.floor(Math.random() * 150))
    //       });
    //     }
    //   }
    // }
    // const newItems = {};
    // Object.keys(items).forEach((key) => {
    //   newItems[key] = items[key];
    // });
    setItems({
      "2022-06-27": [
        {
          name: "Item for 2022-01-11 #1"
        },
        {
          name: "Item for 2022-01-11 #1"
        }
      ],
      "2022-06-28": [
        {
          name: "Item for 2022-01-11 #1"
        },
        {
          name: "Item for 2022-01-11 #1"
        }
      ],
      "2022-06-29": [
        {
          name: "Item for 2022-01-11 #1"
        },
        {
          name: "Item for 2022-01-11 #1"
        }
      ]
    });
    // }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View style={styles.appointmentBox}>
              <Label text={item?.name} />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Container>
        <Spacer />
        <Title text={"Agenda"} center />
        <Spacer />
        <View style={{ flex: 1 }}>
          <Agenda
            items={items}
            selected={moment().format("YYYY-MM-DD")}
            loadItemsForMonth={loadItems}
            renderItem={renderItem}
          />
        </View>
      </Container>
    </>
  );
};

export default PtCalendarScreen;

const styles = StyleSheet.create({
  appointmentBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
