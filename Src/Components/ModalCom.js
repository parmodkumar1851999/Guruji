import React from "react";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Colors from "../Constants/Colors";


function ModalCom({
  children,
  isVisible=false,
  onBackdropPress=()=>{},
  contianerStyle
}) {
  return (
      <Modal 
      style={{...styles.contianer,...contianerStyle}}
      isVisible={isVisible}
      animationIn={'slideInUp'}
      backdropColor={Colors.Black}
      backdropTransitionOutTiming={10}
      onBackdropPress={onBackdropPress}
      >
       {children}
      </Modal>
  );
}

export default ModalCom;

const styles =StyleSheet.create({
      contianer:{

      }
})