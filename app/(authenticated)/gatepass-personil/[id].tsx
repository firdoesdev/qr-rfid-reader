import React, { useState, useEffect } from "react";
import { Button, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import NfcManager, { NfcTech } from "react-native-nfc-manager";

import { useLocalSearchParams } from "expo-router";
import { useDetailCompanyEmployee } from "@/src/hooks/features/gatepass/useDetailGatePass";
import { useUpdateGatepassNumber } from "@/src/hooks/features/gatepass/useUpdateGatepassNumber";
// import {useMqtt} from '@/hooks/useMqtt';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ban, Check } from "lucide-react-native";
import { Colors } from "@/src/constants/Colors";

const DetailGatepass = () => {
  const [isReading, setIsReading] = useState(false);
  const [errors, setErrors] = useState<unknown | null>(null);
  const [hasNfc, setHasNFC] = useState(false);
  const [tagId, setTagId] = useState<string | undefined>();
  const { id } = useLocalSearchParams();
  const { data: employeeData, refetch, isLoading } = useDetailCompanyEmployee({
    id: id as string,
    enabled: !!id,
  });
  // console.log("ID from params:", id);
  const { status, updateGatepassNumber } = useUpdateGatepassNumber({
    id: id as string,
  });

  useEffect(() => {
    const checkIsSupported = async () => {
      console.warn("Checking NFC support...");
      const deviceIsSupported = await NfcManager.isSupported();
      console.warn(" NFC supported:", deviceIsSupported);
      setHasNFC(deviceIsSupported);
      if (deviceIsSupported) {
        await NfcManager.start();
      }
    };

    checkIsSupported();
  }, []);

  async function readNdef() {
    setIsReading(true);
    setTagId(undefined);
    try {
      console.warn("Starting NFC scan...");
      // register for the NFC tag with NDEF in it
      const tech = await NfcManager.requestTechnology(NfcTech.Ndef);

      // wait for the NFC tag to be detected
      // this will return a promise that resolves when a tag is detected
      // and the promise will be resolved with the tag object
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.log("tag data", tag);
      console.warn("Tag found", tag?.id);
      updateGatepassNumber(tag?.id as string);
      setTagId(tag?.id);
    } catch (ex) {
      console.warn("Oops!", JSON.stringify(ex));
      setIsReading(false);
    } finally {
      // stop the nfc scanning
      setIsReading(false);
      NfcManager.cancelTechnologyRequest();
    }
  }

  const handleStopScan = () => {
    setIsReading(false);
    NfcManager.cancelTechnologyRequest();
  };

  const handleStartScan = () => {
    if (!isReading) {
      readNdef();
    } else {
      handleStopScan();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: status.connected ? "#24810a" : "#f3ea1c" },
            ]}
          />
        </View>
      
        <View style={{marginVertical: 20}}>
          {employeeData ? (
            <View style={styles.employeeCard}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.employeeName}>
                    {employeeData.data.name}
                  </Text>
                  {employeeData.data.status ? (
                    <Check color="#4CAF50" />
                  ) : (
                    <Ban color="#F44336" />
                  )}
                </View>
                <Text style={styles.employeeDetail}>
                  {employeeData.data.nip}
                </Text>
              </View>

              {isReading ? (
                <Text>Scanning...</Text>
              ) : (
                <Text style={styles.employeeDetail}>
                  No. RFID:{" "}
                  <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
                    {employeeData.data.rfid}
                  </Text>
                </Text>
              )}
            </View>
          ) : (
            <Text>Loading employee data...</Text>
          )}
        </View>
        <View>
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={handleStartScan}
              
            >
              <Text style={styles.buttonText}>
                {isReading ? "Stop Reading" : "Scan Gatepass Card"}
              </Text>
            </TouchableOpacity>

            {errors && (
              <View>
                <Text>
                  {hasNfc ? "NFC is supported" : "NFC is not supported"}
                </Text>
                <Text style={styles.errorText}>{JSON.stringify(errors)}</Text>
              </View>
            )}
            <Text>
              {status.errors ? `Errors: ${JSON.stringify(status.errors)}` : ""}
            </Text>
            {status.errors && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{`Errors: ${JSON.stringify(
                  status.errors
                )}`}</Text>
              </View>
            )}
          </>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailGatepass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
    gap: 16,
  },
  statusBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusIndicator: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginLeft: 8,
  },
  employeeCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 2,
    elevation: 0,
    flexDirection: "column",
    justifyContent: "space-between",
    height: 120,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  employeeDetail: {
    fontSize: 14,
    color: "#666",
    // marginBottom: 10,
  },
  employeeInfoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  employeeLabel: {
    fontSize: 14,
    fontWeight: "bold",
    width: 80,
  },
  employeeValue: {
    fontSize: 14,
    flex: 1,
  },
  badgeContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "bold",
    overflow: "hidden",
  },
  permanentBadge: {
    backgroundColor: "#e0f7fa",
    color: "#0277bd",
  },
  temporaryBadge: {
    backgroundColor: "#fff8e1",
    color: "#ff8f00",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
