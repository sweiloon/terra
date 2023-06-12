import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";

const SocialButtons = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <View style={styles.iconWrapper}>
          <Image
            style={{ height: "150%", width: "150%" }}
            resizeMode="contain"
            source={require("../assets/phone.png")}
          />
        </View>
        <Text style={styles.buttonText}>Phone</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <View style={styles.iconWrapper}>
          <Image
            style={{ height: "150%", width: "150%" }}
            resizeMode="contain"
            source={require("../assets/facebook.png")}
          />
        </View>
        <Text style={styles.buttonText}>Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SocialButtons;

const styles = StyleSheet.create({
  container: {
    height: hp("8%"),
    width: wp("90%"),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginTop: hp("0%"),
    marginBottom: hp("8%")
  },
  button: {
    height: "100%",
    width: "47%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C1C1C1",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    height: hp("3%"),
    width: hp("3%"),
    marginRight: wp("4%"),
    top: -5
  },
  buttonText: {
    color: "#000",
    fontSize: rf(18),

  },
});
