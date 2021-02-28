import React from "react";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

export default class TransactionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      scannedData: "",
      buttonState: "normal",
      scannnedStudentId: "",
      scannedBookId: "",
    };
  }
  getCameraPermission = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted",
      buttonState: id,
      scanned: false,
    });
  };
  handleBarCodeScanner = async ({ type, data }) => {
    const { buttonState } = this.state;
    if (buttonState === "bookId") {
      this.setState({
        buttonState: "normal",
        scanned: true,
        scannedData: data,
      });
    }
    if (buttonState === "studentId") {
      this.setState({
        buttonState: "normal",
        scanned: true,
        scannedData: data,
      });
    }
  };
  render() {
    const hasCameraPermission = this.state.hasCameraPermission;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if (buttonState !== "normal" && hasCameraPermission === true) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanner}
          style={StyleSheet.absoluteFillObject}
        ></BarCodeScanner>
      );
    } else if (buttonState === "normal") {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}
        >
          <View>
            <View>
              <Image
                source={require("../assets/booklogo.jpg")}
                style={{ width: 200, height: 200 }}
              ></Image>
              <Text style={{ textAlign: "center", fontSize: 30 }}>WilyApp</Text>
            </View>
            {/* <Text>
              {hasCameraPermission === true
                ? this.state.scannedData
                : "requestCameraPermissions"}
            </Text> */}
            <View style={styles.inputView}>
              <TextInput
                placeholder="bookId"
                style={styles.inputBox}
                value={this.state.scannedBookId}
              ></TextInput>
              <TouchableOpacity
                style={styles.scanButton}
                onPress={() => {
                  this.getCameraPermission("bookId");
                  console.log("scannedBookId");
                }}
              >
                <Text style={styles.scanText}>Scan code</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
              <TextInput
                placeholder="studentId"
                style={styles.inputBox}
                value={this.state.scannedStudentId}
              ></TextInput>
              <TouchableOpacity
                style={styles.scanButton}
                onPress={() => {
                  this.getCameraPermission("studentId");
                }}
              >
                <Text style={styles.scanText}>Scan code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  scanButton: {
    backgroundColor: "coral",
    width: 100,
    height: 50,
    borderRadius: 10,
  },
  scanText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  displayText: { fontSize: 15, textDecorationLine: "underline" },
  inputView: { flexDirection: "row", margin: 20 },
  inputBox: {
    width: 200,
    height: 40,
    borderWidth: 1.5,
    borderRightWidth: 0,
    fontSize: 20,
  },
});
