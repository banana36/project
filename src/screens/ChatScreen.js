import { getChatMessages, getCurrentUser, sendMessage } from "@actions/query";
import { AuthContext } from "@navigation/AuthProvider.ios";
import firestore from "@react-native-firebase/firestore";
import { palette } from "@theme/palette";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import { StyleSheet, View } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";

const ChatScreen = ({ route }) => {
  const { user } = useContext(AuthContext);

  const [messagesList, setMessagesList] = useState([]);
  const [userData, setUserData] = useState(null);

  const { chatID } = route.params;

  useEffect(() => {
    getCurrentUser(user, (data) => setUserData(data));
  }, []);

  useLayoutEffect(() => {
    const fetchMessage = async () => {
      await firestore()
        .collection("chats")
        .doc(chatID)
        .onSnapshot((snapshot) => {
          snapshot
            .data()
            .messages?.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
            ?.forEach((element) => {
              messagesList.push({ ...element });
            });
        });
    };
    fetchMessage();
    // getChatMessages(chatID, (data) => setMessages(data));
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessagesList((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text } = messages[0];
    sendMessage(chatID, text, _id, user?.uid);
  }, []);

  const renderBubble = (props) => {
    const messageSenderId = props?.currentMessage?.user?._id;

    console.log("DEBUG::  ~ messageSenderId", props?.currentMessage?.user);
    console.log("DEBUG::  ~ user?.uid", user?.uid);

    return (
      <Bubble
        {...props}
        position={messageSenderId === user?.uid ? "right" : "left"}
        textStyle={{
          right: {
            color: palette.black,
            fontSize: 16
          },
          left: {
            color: palette.black,
            fontSize: 16
          }
        }}
        wrapperStyle={{
          right: {
            backgroundColor: palette.appViolet,
            marginRight: 5,
            marginVertical: 5
          },
          left: {
            marginVertical: 5
          }
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  return (
    <GiftedChat
      messages={messagesList}
      onSend={(message) => onSend(message)}
      user={{
        _id: user?.uid,
        name: userData?.fname,
        avatar: "https://placeimg.com/140/140/any"
      }}
      showAvatarForEveryMessage={true}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
