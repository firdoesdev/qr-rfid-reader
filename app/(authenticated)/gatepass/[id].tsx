import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import NfcManager, { NfcTech } from "react-native-nfc-manager";

import { useLocalSearchParams } from "expo-router";
import { useDetailCompanyEmployee } from "@/hooks/features/gatepass/useDetailGatePass";
import {useUpdateGatepassNumber} from "@/hooks/features/gatepass/useUpdateGatepassNumber";
// import {useMqtt} from '@/hooks/useMqtt';

export default function asyncTabTwoScreen() {
  const [isReading, setIsReading] = useState(false);
  const [errors, setErrors] = useState<unknown | null>(null);
  const [hasNfc, setHasNFC] = useState(false);
  const [tagId, setTagId] = useState<string | undefined>();
  const { id } = useLocalSearchParams();
  const { data:employeeData } = useDetailCompanyEmployee({id: id as string, enabled: !!id});
  // console.log("ID from params:", id);
  const { connected, updateGatepassNumber } = useUpdateGatepassNumber({ id: id as string });

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

      console.warn("Tag found", tag?.id);
      updateGatepassNumber(tag?.id as string)
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
    <View style={styles.container}>
      <Text style={styles.title}>{connected ? 'Connected' : 'Disconnected'}</Text>
      <View>
        {employeeData ?(
          <View style={styles.employeeCard}>
            
            <Text style={styles.employeeName}>{employeeData.data.name}</Text>
            <Text style={styles.employeeDetail}>NIP: {employeeData.data.nip}</Text>
            <Text style={styles.employeeDetail}>Email: {employeeData.data.email}</Text>
            <Text style={styles.employeeDetail}>Status: {employeeData.data.status}</Text>
            <Text style={styles.employeeDetail}>GatePass Number: {employeeData.data.gatepass_number}</Text>
          </View>
        ) : (
          <Text>Loading employee data...</Text>)}

      </View>
      <View>
        {tagId && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Tag ID:</Text>
            <Text style={styles.resultValue}>{tagId}</Text>
          </View>
        )}
        <>
          {isReading ? <Text>Scanning...</Text> : null}
          <Button
            onPress={handleStartScan}
            title={isReading ? "Stop Reading" : "Gatepass Card"}
          />

          {errors && (
            <View>
              <Text>
                {hasNfc ? "NFC is supported" : "NFC is not supported"}
              </Text>
              <Text style={styles.errorText}>{JSON.stringify(errors)}</Text>
            </View>
          )}
        </>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
    gap: 16,
  },
  employeeCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  employeeDetail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
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
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
