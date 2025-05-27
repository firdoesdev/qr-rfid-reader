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
import { useScanVerificationTenant } from "@/src/hooks/features/scan-qr/scan-verification-tenant.hook";

export default function QrCamera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [qrData, setQrData] = useState<string | null>(null);
  const { kode_dokumen, nitku, no_dok_in_out, documentId } =
    useLocalSearchParams();

  const [scanned, setScanned] = useState(0);
  const router = useRouter();
  // const [no_nitku, setNitku] = useState(nitku);
  // const [container, setContainer] = useState(kode_dokumen);
  const [direction, setDirection] = useState("IN");
  const [showModal, setShowModal] = useState(false);

  const verifyDocument = useScanVerificationTenant();

  // kode_dokumen: item.kode_dokumen, nitku: item.nitku, no_dok_in_out: item.no_dok_in_out

  const onScanDocument = (data: string) => {
    try {
      // Parse the QR data as JSON

      setShowModal(true);

      // Call the scan document function with the parsed data

      // router.replace("/(authenticated)/tenant");
    } catch (error) {
      console.error("Error parsing QR data:", error);
    }
  };

  const onVerifyDocument = (documentId: string) => {
    verifyDocument.mutate(documentId)
    setShowModal(false);
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
            <Text style={styles.subTitle}>Kode Dokumen</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 6,
                }}
              >
                <Text style={{ padding: 12 }}>{no_dok_in_out}</Text>
              </View>
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
                onPress={() => onVerifyDocument(documentId as string)}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
