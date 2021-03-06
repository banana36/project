import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "./AuthProvider";
import AuthStack from "./AuthStack";
import PTStack from "./PTStack";
import ClientStack from "./ClientStack";

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [userData, setUserData] = useState(null);

  const typePT = userData?.typeUser === "PT";

  const onAuthStateChanged = (item) => {
    setUser(item);
    if (initializing) setInitializing(false);
  };

  const getUser = async () => {
    await firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    getUser();
  }, [user]);

  if (initializing) return null;

  if (!user) {
    return <NavigationContainer>{<AuthStack />}</NavigationContainer>;
  }

  return (
    <NavigationContainer>
      {typePT ? <PTStack /> : <ClientStack />}
    </NavigationContainer>
  );
};

export default Routes;
