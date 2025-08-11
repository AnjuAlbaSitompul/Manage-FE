import * as ImagePicker from "expo-image-picker";

export const imagePicker = async (): Promise<string | undefined> => {
  let permission = await ImagePicker.requestCameraPermissionsAsync();
  if (permission.granted) {
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.back,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      return result.assets[0].uri;
    }
  }
  return undefined;
};
