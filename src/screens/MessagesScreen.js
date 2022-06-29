import { getMyChats } from "@actions/query";
import { AuthContext } from "@navigation/AuthProvider.ios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import {
  Card,
  Container,
  MessageText,
  PostTime,
  TextSection,
  UserImg,
  UserImgWrapper,
  UserInfo,
  UserInfoText,
  UserName
} from "../styles/MessageStyles";

const MessagesScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState({});

  useEffect(() => {
    getMyChats(user, (data) => setChats(data));
  }, []);

  return (
    <Container>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            onPress={() => navigation.navigate("Chat", { chatID: item?.uid })}
          >
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={item?.userImg} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item?.ptName}</UserName>
                  <PostTime>
                    {moment(item?.lastMessageTimestamp).format("hh:mm dddd")}
                  </PostTime>
                </UserInfoText>
                <MessageText>{item?.lastMessage}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
