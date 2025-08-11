import { size } from "@/constants/SIze";
import { SignInTypes } from "@/models/forms/signInModels";
import { login } from "@/services/public/auth-services";
import { authStore } from "@/store/authStore";
import { toastShow } from "@/utils/toastShow";
import { ValidationForm } from "@/utils/ValidationForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import DefaultInputButtons from "../buttons/DefaultInputButtons";
import DefaultTextInputs from "../textInputs/DefaultTextInputs";

const SigninForms = () => {
  const setIsAuthenticated = authStore((state) => state.setIsAuthenticated);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<SignInTypes>({
    username: "",
    password: "",
  });

  const schema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSignIn = async (): Promise<void> => {
    const validate = await ValidationForm<SignInTypes>(form, schema);
    if (Object.keys(validate).length > 0) {
      Object.values(validate).forEach((error) => {
        toastShow({ text: error, type: "error" });
      });
      return;
    }
    setLoading(true);

    const response = await login(form);
    if (response.status === "success" && response.data) {
      await AsyncStorage.setItem("token", response.data.accessToken);
      toastShow({ text: response.message, type: "success" });
      setIsAuthenticated();
    } else {
      toastShow({ text: response.message, type: "error" });
    }
    setLoading(false);
  };
  return (
    <>
      <DefaultTextInputs
        style={styles.input}
        title="Username"
        iconName="person"
        placeholder="Enter your username"
        iconSize="md"
        iconColor="inactive"
        value={form.username}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, username: text }))
        }
      />
      <DefaultTextInputs
        style={styles.input}
        title="Password"
        iconName="lock-closed"
        placeholder="Enter your Password"
        secureTextEntry
        iconSize="md"
        iconColor="inactive"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
      />
      <DefaultInputButtons
        text="Sign In"
        onPress={handleSignIn}
        loading={loading}
      />
    </>
  );
};

export default SigninForms;

const styles = StyleSheet.create({
  input: {
    marginBottom: size.xl,
  },
});
