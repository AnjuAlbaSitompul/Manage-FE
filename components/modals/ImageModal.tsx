import { size } from "@/constants/SIze";
import React from "react";
import { Image, ImageProps, Modal, StyleSheet, View } from "react-native";
import IconButtons from "../buttons/IconButtons";

type ImageModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  imageSource?: ImageProps;
};

const ImageModal = ({
  visible,
  onRequestClose,
  imageSource,
}: ImageModalProps) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modal}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <IconButtons
        iconName="close"
        iconSize="xl"
        iconColor="inactive"
        style={styles.closeButton}
        onPress={onRequestClose}
      />
    </Modal>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: size.md,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
});
