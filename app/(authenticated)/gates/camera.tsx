import React, { useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Colors } from "@/src/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { useScanQrDocument } from "@/src/hooks/features/scan-qr/scan-qr-document.hook";
import { useRouter } from "expo-router";

export default function QrCamera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [qrData, setQrData] = useState<string | null>(null);
  const scanQRDocument = useScanQrDocument();
  const [scanned, setScanned] = useState(0);
  const router = useRouter();
  const [vehicle, setVehicle] = useState("N 4444 SI");
  const [container, setContainer] = useState("MRSK-wkwkwkwkkwkwwkkwkw");
  const [direction, setDirection] = useState("IN");
  const [showModal, setShowModal] = useState(false);

  const { gateId, laneId, lane_code, identity_gate } = useLocalSearchParams();

  const onScanDocument = (data: string) => {
    console.log({
      gateId,
      laneId,
    });
    try {
      // Parse the QR data as JSON
      // Replace all double single quotes with double quotes and ensure valid JSON
      let idHeader = "";
      const firstPart = data.split(",")[0];
      // Extract the value between two single quotes after idHeader:
      const match = firstPart.match(/idHeader:\s*''([^']+)''/);
      const idHeaderValue = match ? match[1] : "";

      // Increment the scanned counter
      setScanned((prev) => prev + 1);

      // Call the scan document function with the parsed data
      scanQRDocument.onScanDocument({
        type: "QR",
        value: idHeaderValue,
        lineCode: lane_code as string,
        identityGate: identity_gate as string,
        noContainer: container,
        vehicleNumber: vehicle,
        timestamp: Date.now(),
        direction: direction,
      });
      router.replace("/(authenticated)/gates");
    } catch (error) {
      console.error("Error parsing QR data:", error);
      setQrData("Invalid QR format");
    }
  };

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
        onBarcodeScanned={({ data }) => onScanDocument(data)}
        style={styles.camera}
        facing="back"
      ></CameraView>
      <View style={styles.contentContainer}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <View
            style={[
              styles.statusIndicator,
              {
                backgroundColor:
                  scanQRDocument.status.connected &&
                  !scanQRDocument.status.errors
                    ? "#24810a"
                    : "#f3ea1c",
              },
            ]}
          />
        </View>
        <Text style={styles.title}>QR Code Scanner</Text>
        <View style={{ marginBottom: 20 }}>
          <Text>Gate: {identity_gate}</Text>
          <Text>Lane: {lane_code}</Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { marginBottom: 10 }]}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.buttonText}>Edit Details</Text>
        </TouchableOpacity>
        <Modal
          visible={showModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowModal(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 20,
                width: "90%",
              }}
            >
              <Text style={styles.subTitle}>Container Number</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Text style={{ marginRight: 8 }}>No:</Text>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 6,
                  }}
                >
                  <TextInput
                    value={container}
                    onChangeText={setContainer}
                    placeholder="Enter container number"
                    style={{ padding: 8 }}
                    autoCapitalize="characters"
                  />
                </View>
              </View>
              <Text style={styles.subTitle}>Vehicle Number</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Text style={{ marginRight: 8 }}>No:</Text>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 6,
                  }}
                >
                  <TextInput
                    value={vehicle}
                    onChangeText={setVehicle}
                    placeholder="Enter vehicle number"
                    style={{ padding: 8 }}
                    autoCapitalize="characters"
                  />
                </View>
              </View>
              <Text style={styles.subTitle}>Direction</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor:
                      direction === "IN" ? Colors.light.primary : "#f0f0f0",
                    borderRadius: 6,
                    padding: 10,
                    marginRight: 8,
                  }}
                  onPress={() => setDirection("IN")}
                >
                  <Text
                    style={{
                      color: direction === "IN" ? "#fff" : "#000",
                      textAlign: "center",
                    }}
                  >
                    IN
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor:
                      direction === "OUT" ? Colors.light.primary : "#f0f0f0",
                    borderRadius: 6,
                    padding: 10,
                  }}
                  onPress={() => setDirection("OUT")}
                >
                  <Text
                    style={{
                      color: direction === "OUT" ? "#fff" : "#000",
                      textAlign: "center",
                    }}
                  >
                    OUT
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.button,
                    { marginRight: 10, backgroundColor: "#ccc" },
                  ]}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={[styles.buttonText, { color: "#000" }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  statusIndicator: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginLeft: 8,
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
  contentContainer: {
    flex: 1,

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
});
