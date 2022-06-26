import { useEffect, useState } from "react";
import { Alert } from "react-native";
import React from "react";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { Label, Title } from "@components/typography";
import { FormInput, Page, PostCard } from "@components/common";
import Spacer from "@components/common/Spacer";
import { FlatList } from "react-native-gesture-handler";

const Posts = [
  {
    id: "1",
    userName: "Jenny Doe",
    userImg: require("../assets/users/user-3.jpg"),
    postTime: "4 mins ago",
    post:
      "Hey there, this is my test for a post of my social app in React Native.",
    postImg: require("../assets/posts/post-img-3.jpg"),
    liked: true,
    likes: "14",
    comments: "5"
  },
  {
    id: "2",
    userName: "John Doe",
    userImg: require("../assets/users/user-1.jpg"),
    postTime: "2 hours ago",
    post:
      "Hey there, this is my test for a post of my social app in React Native.",
    postImg: "none",
    liked: false,
    likes: "8",
    comments: "0"
  },
  {
    id: "3",
    userName: "Ken William",
    userImg: require("../assets/users/user-4.jpg"),
    postTime: "1 hours ago",
    post:
      "Hey there, this is my test for a post of my social app in React Native.",
    postImg: require("../assets/posts/post-img-2.jpg"),
    liked: true,
    likes: "1",
    comments: "0"
  },
  {
    id: "4",
    userName: "Selina Paul",
    userImg: require("../assets/users/user-6.jpg"),
    postTime: "1 day ago",
    post:
      "Hey there, this is my test for a post of my social app in React Native.",
    postImg: require("../assets/posts/post-img-4.jpg"),
    liked: true,
    likes: "22",
    comments: "4"
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: require("../assets/users/user-7.jpg"),
    postTime: "2 days ago",
    post:
      "Hey there, this is my test for a post of my social app in React Native.",
    postImg: "none",
    liked: false,
    likes: "0",
    comments: "0"
  }
];

const SearchPtScreen = ({ navigation }) => {
  const [listPT, setListPT] = useState(null);
  console.log("DEBUG::  ~ listPT", listPT);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [value, setValue] = useState("");

  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection("users")
        // .orderBy("postTime", "desc")
        .get()
        .then((querySnapshot) => {
          console.log("Total Posts: ", querySnapshot.size);

          querySnapshot.forEach((users) => {
            const { email, fname, lname, typeUser } = users.data();
            if (typeUser === "PT") {
              list.push({
                email,
                fname,
                lname,
                typeUser
              });
            }
          });
        });

      setListPT(list);

      if (loading) {
        setLoading(false);
      }

      console.log("Posts: ", listPT);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

  return (
    <>
      <Page>
        <Title text={"wrfrwf"} center />
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
            <Label text={item.fname + " " + item.lname} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Page>
    </>

    // <SafeAreaView style={{ flex: 1 }}>
    //   {loading ? (
    //     <ScrollView
    //       style={{ flex: 1 }}
    //       contentContainerStyle={{ alignItems: "center" }}
    //     >
    //       <SkeletonPlaceholder>
    //         <View style={{ flexDirection: "row", alignItems: "center" }}>
    //           <View style={{ width: 60, height: 60, borderRadius: 50 }} />
    //           <View style={{ marginLeft: 20 }}>
    //             <View style={{ width: 120, height: 20, borderRadius: 4 }} />
    //             <View
    //               style={{
    //                 marginTop: 6,
    //                 width: 80,
    //                 height: 20,
    //                 borderRadius: 4
    //               }}
    //             />
    //           </View>
    //         </View>
    //         <View style={{ marginTop: 10, marginBottom: 30 }}>
    //           <View style={{ width: 300, height: 20, borderRadius: 4 }} />
    //           <View
    //             style={{
    //               marginTop: 6,
    //               width: 250,
    //               height: 20,
    //               borderRadius: 4
    //             }}
    //           />
    //           <View
    //             style={{
    //               marginTop: 6,
    //               width: 350,
    //               height: 200,
    //               borderRadius: 4
    //             }}
    //           />
    //         </View>
    //       </SkeletonPlaceholder>
    //       <SkeletonPlaceholder>
    //         <View style={{ flexDirection: "row", alignItems: "center" }}>
    //           <View style={{ width: 60, height: 60, borderRadius: 50 }} />
    //           <View style={{ marginLeft: 20 }}>
    //             <View style={{ width: 120, height: 20, borderRadius: 4 }} />
    //             <View
    //               style={{
    //                 marginTop: 6,
    //                 width: 80,
    //                 height: 20,
    //                 borderRadius: 4
    //               }}
    //             />
    //           </View>
    //         </View>
    //         <View style={{ marginTop: 10, marginBottom: 30 }}>
    //           <View style={{ width: 300, height: 20, borderRadius: 4 }} />
    //           <View
    //             style={{
    //               marginTop: 6,
    //               width: 250,
    //               height: 20,
    //               borderRadius: 4
    //             }}
    //           />
    //           <View
    //             style={{
    //               marginTop: 6,
    //               width: 350,
    //               height: 200,
    //               borderRadius: 4
    //             }}
    //           />
    //         </View>
    //       </SkeletonPlaceholder>
    //     </ScrollView>
    //   ) : (
    //     <Container>
    //       <FlatList
    //         data={posts}
    //         renderItem={({ item }) => (
    //           <PostCard
    //             item={item}
    //             onDelete={handleDelete}
    //             onPress={() =>
    //               navigation.navigate("HomeProfile", { userId: item.userId })
    //             }
    //           />
    //         )}
    //         keyExtractor={(item) => item.id}
    //         ListHeaderComponent={ListHeader}
    //         ListFooterComponent={ListHeader}
    //         showsVerticalScrollIndicator={false}
    //       />
    //     </Container>
    //   )}
    // </SafeAreaView>
  );
};

export default SearchPtScreen;
