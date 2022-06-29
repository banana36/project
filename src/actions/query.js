import firestore, { firebase } from "@react-native-firebase/firestore";
import moment from "moment";

export const getAllPt = async (cb) => {
  try {
    const list = [];

    await firestore()
      .collection("users")
      // .orderBy("postTime", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((users) => {
          const { email, fname, lname, typeUser } = users.data();
          if (typeUser === "PT") {
            list.push({
              email,
              fname,
              lname,
              typeUser,
              uid: users.id
            });
          }
        });
      });

    console.log("list pt: ", list);

    cb(list);
  } catch (e) {
    console.log(e);
  }
};

export const getMyClients = async (user, cb) => {
  try {
    const list = [];

    await firestore()
      .collection("collaborations")
      // .orderBy("postTime", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((collaboration) => {
          const { ptId } = collaboration.data();
          if (ptId === user.uid) {
            list.push({
              ...collaboration.data(),
              uid: collaboration.id
            });
          }
        });
      });
    console.log("QUERY --> getMyClients", list);

    cb(list);
  } catch (e) {
    console.log(e);
  }
};

export const getDiet = async (id, day, cb) => {
  try {
    await firestore()
      .collection("collaborations")
      .doc(id)
      .get()
      .then((querySnapshot) => {
        const { diet } = querySnapshot.data();
        cb(diet);
      });
  } catch (e) {
    console.log(e);
  }
};

export const creatChat = async (currentUser, ptData) => {
  try {
    await firestore()
      .collection("chats")
      .add({
        clientId: currentUser.uid,
        ptId: ptData.uid,
        startDate: moment().format("DD-MM-YYYY"),
        messages: null,
        lastMessage: null,
        ptName: `${ptData.fname} ${ptData.lname}`,
        clientName: "jack",
        chatID: Date.now(),
        lastMessageTimestamp: null
      });
  } catch (e) {
    console.log(e);
  }
};

export const choosePT = async (currentUser, ptData) => {
  try {
    await firestore()
      .collection("collaborations")
      .add({
        clientId: currentUser.uid,
        ptId: ptData.uid,
        startDate: moment().format("DD-MM-YYYY")
      });
  } catch (e) {
    console.log(e);
  }
};

export const sendMessage = async (chatID, message, _id, userID) => {
  try {
    await firestore()
      .collection("chats")
      .doc(chatID)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          user: {
            _id: userID,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          },
          _id,
          text: message,
          createdAt: moment().format()
        })
      });
  } catch (e) {
    console.log(e);
  }
};

export const getChatMessages = async (chatID, cb) => {
  try {
    await firestore()
      .collection("chats")
      .doc(chatID)
      .get()
      .then((querySnapshot) => {
        const { messages } = querySnapshot.data();
        const messagesSorted = messages.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        cb(messagesSorted);
      });
  } catch (e) {
    console.log(e);
  }
};

export const insertInDiet = async (
  idCollaboration,
  alimento,
  quantity,
  split,
  day
) => {
  try {
    await firestore()
      .collection("collaborations")
      .doc(idCollaboration)
      .update({
        diet: firebase.firestore.FieldValue.arrayUnion({
          split,
          alimento,
          quantity,
          day,
          id: Date.now()
        })
      });
  } catch (e) {
    console.log(e);
  }
};

export const removeFromDiet = async (idCollaboration, item) => {
  try {
    await firestore()
      .collection("collaborations")
      .doc(idCollaboration)
      .update({
        diet: firebase.firestore.FieldValue.arrayRemove(item)
      });
  } catch (e) {
    console.log(e);
  }
};

export const getCurrentUser = async (user, cb) => {
  try {
    await firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          cb(documentSnapshot.data());
        }
      });
  } catch (e) {
    console.log(e);
  }
};

export const getClientInfo = async (id, cb) => {
  try {
    await firestore()
      .collection("users")
      .doc(id)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          cb(documentSnapshot.data());
        }
      });
  } catch (e) {
    console.log(e);
  }
};

export const getMyChats = async (user, cb) => {
  console.log("DEBUG::  ~ user", user);
  try {
    const list = [];

    await firestore()
      .collection("chats")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((chat) => {
          const { ptId, clientId } = chat.data();
          if (ptId === user.uid || clientId === user.uid) {
            list.push({
              ...chat.data(),
              uid: chat.id
            });
          }
        });
      });
    console.log("QUERY --> getMyChats", list);

    cb(list);
  } catch (e) {
    console.log(e);
  }
};

export const getMyCollaborations = async (userId, cb) => {
  try {
    const list = [];

    await firestore()
      .collection("collaborations")
      .orderBy("startDate", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((collaboration) => {
          const { clientId } = collaboration.data();
          if (clientId === userId) {
            list.push({
              ...collaboration.data(),
              uid: collaboration.id
            });
          }
        });
      });
    console.log("QUERY --> getMyCollaborations as Client", list);

    cb(list);
  } catch (e) {
    console.log(e);
  }
};
