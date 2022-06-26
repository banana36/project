import { getAllPt } from "@actions/query";
import { FormInput, Page, PtCard } from "@components/common";
import Spacer from "@components/common/Spacer";
import { Title } from "@components/typography";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";

const SearchPtScreen = ({ navigation }) => {
  const [listPT, setListPT] = useState(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    // fetchPosts();
    getAllPt((list) => {
      setListPT(list);
    });
  }, []);

  return (
    <>
      <Page>
        <Title text={"Ricerca PT"} center />
        <Spacer />
        <FormInput
          labelValue={value}
          onChangeText={(text) => setValue(text)}
          placeholderText="Tipologia Cliente"
          iconType="user"
        />
        <Spacer />
        <FlatList
          data={listPT}
          renderItem={({ item }) => (
            <PtCard item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Page>
    </>
  );
};

export default SearchPtScreen;
