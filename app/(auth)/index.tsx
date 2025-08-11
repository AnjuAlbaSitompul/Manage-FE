import SigninForms from "@/components/forms/SigninForms";
import { screenSize } from "@/constants/SIze";
import React from "react";
import { Image, KeyboardAvoidingView, StyleSheet, View } from "react-native";

const AuthIndex = () => {
  return (
    <View style={styles.main}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.imageWrapper}>
          <Image
            source={require("@/assets/images/others/icon.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <SigninForms />
      </KeyboardAvoidingView>
    </View>
  );
};

export default AuthIndex;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageWrapper: {
    width: screenSize.width / 2,
    aspectRatio: 2,
    alignSelf: "center",
  },
});
