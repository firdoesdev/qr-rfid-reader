import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";


import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

export default function QrCamera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [qrData, setQrData] = useState<string | null>(null);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission {permission}</Text>
      </View>
    );
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  

  return (
    <View style={styles.container}>
      <CameraView 
      barcodeScannerSettings={{
        barcodeTypes:['qr']
      }}
      onBarcodeScanned={({ data }) => {
        console.log("Barcode scanned:", data);
        setQrData(data);
      }}
      style={styles.camera} facing='back'></CameraView>
      <View style={styles.buttonContainer}>
        <Text style={styles.title}>QR Code Scanner</Text>
        <Text style={styles.subTitle}>Scanned: {qrData}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#F5FCFF',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  camera: {
    flex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 16,
  },
  errorContainer: {
    marginTop: 20,
    backgroundColor: "#ffe0b2",
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 16,
  },
});
