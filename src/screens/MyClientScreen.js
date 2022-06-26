import { getMyClients } from "@actions/query";
import { ClientCard, FormInput, Page } from "@components/common";
import Spacer from "@components/common/Spacer";
import { Title } from "@components/typography";
import { AuthContext } from "@navigation/AuthProvider.ios";
import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";

const MyClientScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [listMyClients, setListMyClients] = useState(null);
  console.log("DEBUG::  ~ listMyClients", listMyClients);
  const [value, setValue] = useState("");

  useEffect(() => {
    getMyClients(user, (result) => {
      setListMyClients(result);
    });
  }, []);

  return (
    <>
      <Page>
        <Title text={"I miei clienti"} center />
        <Spacer />
        <FormInput
          labelValue={value}
          onChangeText={(text) => setValue(text)}
          placeholderText="Tipologia Cliente"
          iconType="user"
        />
        <Spacer />
        <FlatList
          data={listMyClients}
          renderItem={({ item }) => (
            <ClientCard item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Page>
    </>
  );
};

export default MyClientScreen;
