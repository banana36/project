import { choosePT } from "@actions/query";
import { Page } from "@components/common";
import Spacer from "@components/common/Spacer";
import { Title } from "@components/typography";
import { AuthContext } from "@navigation/AuthProvider.ios";
import React, { useContext } from "react";

const PtProfileScreen = ({ route }) => {
  const { user } = useContext(AuthContext);

  const { ptData } = route.params;

  const onPress = () => choosePT(user, ptData);

  return (
    <>
      <Page
        hasHeader
        hasButton
        buttonProps={{
          title: "Scegli",
          onPress
        }}
      >
        <Spacer />
        <Title text={`${ptData.fname} ${ptData.lname}`} center />
        <Spacer />

        <Spacer />
        {/* <FlatList
          data={listPT}
          renderItem={({ item }) => <PtCard item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        /> */}
      </Page>
    </>
  );
};

export default PtProfileScreen;
