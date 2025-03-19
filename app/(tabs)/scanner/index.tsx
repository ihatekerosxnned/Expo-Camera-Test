import { CameraView,useCameraPermissions } from 'expo-camera';
import { useState} from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView} from 'react-native';

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={'back'}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      />

      {/* Here will display the control no. of barcode but right now scanning isn't working oh my oh my I need help!*/}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Scanned QR code will appear here"
          editable={false}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Scan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'gray',
  },
  button: {
    justifyContent: 'center',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  inputContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
