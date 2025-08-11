import { size } from "@/constants/SIze";
import { UserDataModels } from "@/models/users/usersModels";
import { updateUser } from "@/services/private/user-services";
import { toastShow } from "@/utils/toastShow";
import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import EditPicker from "../pickers/EditPicker";
import EditTextInputs from "../textInputs/EditTextInputs";

export type EditUserFormProps = {
  username: string;
  name: string;
  role: UserDataModels["role"];
  password?: string;
  isActive?: boolean;
};

const DetailUserForm = ({
  id,
  createdAt,
  updatedAt,
  ...props
}: UserDataModels) => {
  const [dataUser, setDataUser] = useState<EditUserFormProps>({
    ...props,
    isActive: true,
  });

  const onPressHandler = async () => {
    const response = await updateUser(dataUser, id);

    if (response.status === "success") {
      toastShow({
        text: response.message,
        type: "success",
      });
    }
    if (response.status === "error") {
      toastShow({
        text: response.message,
        type: "error",
      });
    }
  };
  return (
    <KeyboardAvoidingView>
      <View style={styles.formControl}>
        <EditTextInputs
          value={dataUser.name}
          iconName="person-outline"
          title="Nama User"
          onChangeText={(text) =>
            setDataUser((prev) => ({ ...prev, name: text }))
          }
          onPress={() => onPressHandler()}
        />
        <EditPicker
          value={dataUser.role}
          iconName="person-outline"
          title="Role User"
          data={["MANDOR", "SPV"]}
          onValueChange={(text) =>
            setDataUser((prev) => ({
              ...prev,
              role: text as UserDataModels["role"],
            }))
          }
          onPress={() => onPressHandler()}
        />
        <EditTextInputs
          value={dataUser.username}
          iconName="person-outline"
          title="Username"
          onChangeText={(text) =>
            setDataUser((prev) => ({ ...prev, username: text }))
          }
          onPress={() => onPressHandler()}
        />
        <EditTextInputs
          value={
            dataUser.password !== undefined
              ? dataUser.password
              : "Update Password"
          }
          iconName="lock-closed-outline"
          title="Password"
          onChangeText={(text) =>
            setDataUser((prev) => ({ ...prev, password: text }))
          }
          onPress={() => onPressHandler()}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default DetailUserForm;

const styles = StyleSheet.create({
  formControl: {
    paddingTop: size.sm,
    gap: size.sm,
  },
});
