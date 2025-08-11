import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import { createUser } from "@/services/private/user-services";
import { ValidationForm } from "@/utils/ValidationForm";
import { toastShow } from "@/utils/toastShow";
import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import DefaultInputButtons from "../buttons/DefaultInputButtons";
import DefaultPicker from "../pickers/DefaultPicker";
import DefaultTextInputs from "../textInputs/DefaultTextInputs";
import HeaderText from "../texts/HeaderText";

export type AddUserFormTypes = {
  username: string;
  password: string;
  name: string;
  role: string;
};
const AddUserForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<AddUserFormTypes>({
    username: "",
    password: "",
    name: "",
    role: "",
  });

  const schema = Yup.object().shape({
    username: Yup.string().required("Username wajib diisi"),
    password: Yup.string().required("Password wajib diisi"),
    name: Yup.string().required("Nama wajib diisi"),
    role: Yup.string()
      .oneOf(["MANDOR", "SPV"], "Jabatan tidak valid")
      .required("Jabatan wajib diisi"),
  });

  const onPressHandler = async (): Promise<void> => {
    setLoading(true);
    const validate = await ValidationForm<AddUserFormTypes>(form, schema);
    if (Object.keys(validate).length > 0) {
      toastShow({ text: "Form tidak valid", type: "error" });
      setLoading(false);
      return;
    }

    const response = await createUser(form);
    if (response.status === "success") {
      toastShow({ text: response.message, type: "success" });
      setForm({
        username: "",
        password: "",
        name: "",
        role: "",
      });
    }
    if (response.status === "error") {
      toastShow({ text: response.message, type: "error" });
    }
    setLoading(false);
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.container}>
        <HeaderText title="Tambah User" icon="person-add-outline" />
        <View style={styles.formContainer}>
          <DefaultTextInputs
            placeholder="Nama Pengguna"
            iconName="person-outline"
            title="Nama Pengguna"
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, name: text }))
            }
            value={form.name}
          />
          <DefaultTextInputs
            placeholder="Username"
            iconName="person-circle-outline"
            title="Username"
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, username: text }))
            }
            value={form.username}
          />
          <DefaultTextInputs
            placeholder="Password"
            iconName="lock-closed-outline"
            secureTextEntry
            title="Password"
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, password: text }))
            }
            value={form.password}
          />
          <DefaultPicker
            data={["MANDOR", "SPV"]}
            title="Jabatan"
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, role: value }))
            }
          />
          <DefaultInputButtons
            text="Tambah User"
            onPress={() => onPressHandler()}
            loading={loading}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddUserForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: size.md,
    borderRadius: size.sm,
  },
  formContainer: {
    marginTop: size.sm,
    gap: size.sm,
  },
});
