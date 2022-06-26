import firestore from "@react-native-firebase/firestore";

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
