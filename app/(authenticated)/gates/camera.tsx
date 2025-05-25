import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Colors } from "@/src/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { useScanQrDocument } from "@/src/hooks/features/scan-qr/scan-qr-document.hook";

export default function QrCamera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [qrData, setQrData] = useState<string | null>(null);
  const scanQRDocument = useScanQrDocument();
  const [scanned, setScanned] = useState(0);

  const { gateId, laneId, lane_code, identity_gate } = useLocalSearchParams();

  // console.log({ gateId, laneId, lane_code, identity_gate });

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
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={({ data }) => {
          try {
            // Parse the QR data as JSON
            // Replace all double single quotes with double quotes and ensure valid JSON
            let idHeader = "";
            const firstPart = data.split(",")[0];
            // Extract the value between two single quotes after idHeader:
            const match = firstPart.match(/idHeader:\s*''([^']+)''/);
            const idHeaderValue = match ? match[1] : "";

            // Set the QR data to display
            // setQrData(parsedData.idHeader || "No ID Header found");

            // Increment the scanned counter
            setScanned((prev) => prev + 1);

            // Call the scan document function with the parsed data
            scanQRDocument.onScanDocument({
              type: "QR",
              value: idHeaderValue,
              lineCode: lane_code as string,
              identityGate: identity_gate as string,
              noContainer: "MRSK-wkwkwkwkkwkwwkkwkw",
              vehicleNumber: "N 4444 SI",
              timestamp: Date.now(),
              direction: "IN",
            });
          } catch (error) {
            console.error("Error parsing QR data:", error);
            setQrData("Invalid QR format");
          }
        }}
        style={styles.camera}
        facing="back"
      ></CameraView>
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
    backgroundColor: "#F5FCFF",
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
    color: "#000",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
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
