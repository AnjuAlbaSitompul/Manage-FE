import { colors } from "@/constants/Colors";
import { size } from "@/constants/SIze";
import React, { useState } from "react";
import {
  Image,
  ImageProps,
  Pressable,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";
import ImageModal from "../modals/ImageModal";

type ImageModalButtonProps = ViewProps & {
  imageSource: ImageProps;
};

const ImageModalButton = ({ imageSource, style }: ImageModalButtonProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={[styles.imageWrapper, style]}
          android_ripple={{ color: colors.inactive }}
          onPress={() => setModalVisible(true)}
        >
          <Image source={imageSource} style={styles.image} />
        </Pressable>
      </View>
      <ImageModal
        visible={modalVisible}
        imageSource={imageSource}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      />
    </>
  );
};

export default ImageModalButton;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    overflow: "hidden",
    borderRadius: size.sm,
    elevation: 1,
    backgroundColor: colors.white,
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 1,
  },
});
