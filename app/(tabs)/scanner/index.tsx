import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import axios from 'axios';

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleScanResult = ({ data }) => {
    console.log("Scanned Data:", data);
    setScanned(true);
    setScannedData(data);
  };

  // const handleBuy = async () => {
  //   try {
  //     // Ensure scanned data is available
  //     if (!scannedData) {
  //       alert("Please scan a QR code first!");
  //       return;
  //     }
  
  //     // Send request and store response
  //     const response = await axios.post('http://192.168.1.15:8000/api/buy', {
  //       control_no: scannedData
  //     });
  
  //     // Check response status
  //     if (response.status === 200) {
  //       alert("Voucher purchased successfully!");
  //     } else {
  //       alert(response.data.error || "Something went wrong.");
  //     }
  //   } catch (error) {
  //     console.error("Error calling the API:", error);
  //     alert("Uh oh, something went wrong!");
  //   }
  // };
  
  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        ratio="1:1"
        onBarcodeScanned={scanned ? undefined : handleScanResult}
        barcodeScannerSettings={{
          barcodeTypes: ["code128"],
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.topOverlay} />
          <View style={styles.bottomOverlay} />
          <View style={styles.leftOverlay} />
          <View style={styles.rightOverlay} />
          <View style={styles.scanFrame} />
        </View>
      </CameraView>

      {/* Input field to display scanned QR code */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={scannedData} // Show scanned QR code here
          placeholder="Scanned QR code will appear here"
          editable={false}
        />
        <View
          style={{
            gap: 2,
            flexDirection: "row",
            width: "100%",
            marginVertical: 5,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              padding: 5,
              borderRadius: 15,
              alignItems: "center",
              backgroundColor: "#8146ff",
            }}
            // onPress={handleBuy}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
              Buy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              padding: 5,
              borderRadius: 15,
              alignItems: "center",
              backgroundColor: "transparent",
              borderWidth: 2, // This replaces "outline"
              borderColor: "#8146ff", // This replaces "outlineColor"
            }}
          >
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#8146ff" }}
            >
              Claim
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setScanned(false);
            setScannedData("");
          }}
        >
          <Text style={styles.text}>Scan Again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    height: "50%",
  },
  buttonContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "gray",
  },
  button: {
    justifyContent: "center",
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    alignItems: "center",
    backgroundColor: "gray",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  inputContainer: {
    padding: 20,
    backgroundColor: "white",
    height: "50%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: "80%",
    height: "40%",
    borderWidth: 1,
    borderColor: "white",
  },
  topOverlay: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "30%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "30%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  leftOverlay: {
    position: "absolute",
    left: 0,
    width: "10%",
    height: "40%",
    top: "30%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  rightOverlay: {
    position: "absolute",
    right: 0,
    width: "10%",
    height: "40%",
    top: "30%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});
