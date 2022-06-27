import firestore, { firebase } from "@react-native-firebase/firestore";

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

export const choosePT = async (currentUser, ptData) => {
  try {
    await firestore().collection("collaborations").add({
      clientId: currentUser.uid,
      ptId: ptData.uid
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
