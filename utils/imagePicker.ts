import * as ImagePicker from "expo-image-picker";

export const imagePicker = async (): Promise<
  ImagePicker.ImagePickerAsset | undefined
> => {
  let permission = await ImagePicker.requestCameraPermissionsAsync();
  if (permission.granted) {
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.back,
      aspect: [4, 3],
      quality: 0.3,
    });
    if (!result.canceled) {
      return result.assets[0];
    }
  }
  return undefined;
};
