import { getMyClients } from "@actions/query";
import { ClientCard, Page } from "@components/common";
import Spacer from "@components/common/Spacer";
import { Title } from "@components/typography";
import { AuthContext } from "@navigation/AuthProvider.ios";
import { useIsFocused } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Searchbar } from "react-native-paper";
import { useSelector } from "react-redux";

const MyClientScreen = ({ navigation }) => {
  const focused = useIsFocused();
  const { user } = useContext(AuthContext);

  const { collaborations } = useSelector((state) => state.collaboration);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (focused) {
      getMyClients(user);
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
          data={collaborations}
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
