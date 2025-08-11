import React from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import IconButtons from "@/components/buttons/IconButtons";
import { colors } from "@/constants/Colors";
import { screenSize, size } from "@/constants/SIze";
import { useNavigation } from "expo-router";
const Header = () => {
  const route = useNavigation();
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            source={require("@/assets/images/others/icon.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
      <View>
        <IconButtons iconName="menu" onPress={() => route.toggleDrawer()} />
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  imageWrapper: {
    width: screenSize.width / 4,
    aspectRatio: 3,
  },
  header: {
    padding: size.md,
    backgroundColor: colors.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flexDirection: "row",
  },
  container: {
    flex: 1,
  },
});
