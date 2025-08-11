import AddUserForm from "@/components/forms/AddUserForm";
import { size } from "@/constants/SIze";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const AddUser = () => {
  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <AddUserForm />
      </ScrollView>
    </View>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  contentContainer: {
    padding: size.md,
  },
});
