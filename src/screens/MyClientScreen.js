import { getMyClients } from "@actions/query";
import { ClientCard, Page } from "@components/common";
import Spacer from "@components/common/Spacer";
import { Title } from "@components/typography";
import { AuthContext } from "@navigation/AuthProvider.ios";
import { useIsFocused } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Searchbar } from "react-native-paper";

const MyClientScreen = ({ navigation }) => {
  const focused = useIsFocused();
  const { user } = useContext(AuthContext);

  const [listMyClients, setListMyClients] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (focused) {
      getMyClients(user, (result) => {
        setListMyClients(result);
      });
    }
  }, [focused]);

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <>
      <Page>
        <Title text={"I miei clienti"} center />
        <Spacer />
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
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
