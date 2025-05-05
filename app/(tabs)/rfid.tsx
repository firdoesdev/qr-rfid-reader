import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import NfcManager, {NfcTech, NfcEvents} from 'react-native-nfc-manager';

export default function asyncTabTwoScreen() {
  const [isReading, setIsReading] = useState(false);
  const [errors, setErrors] = useState<unknown | null>(null);
  const [hasNfc, setHasNFC ] = useState(false);

  useEffect(() => {
    const checkIsSupported = async () => {
      console.warn('Checking NFC support...');
      const deviceIsSupported = await NfcManager.isSupported()
      console.warn(' NFC supported:', deviceIsSupported);
      setHasNFC(deviceIsSupported)
      if (deviceIsSupported) {
        await NfcManager.start()
      }
    }

    checkIsSupported()
  }, [])

  

  async function readNdef() {
    try {
      console.warn('Starting NFC scan...');
      // register for the NFC tag with NDEF in it
      const tech = await NfcManager.requestTechnology(NfcTech.Ndef);
      setIsReading(true);
      
      // wait for the NFC tag to be detected
      // this will return a promise that resolves when a tag is detected
      // and the promise will be resolved with the tag object
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      setIsReading(false);
      console.warn('Tag found', tag?.id);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      setIsReading(false);
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pembacaan NFC</Text>

      {/* <TouchableOpacity
        style={styles.button}
        onPress={readNfc}
        disabled={isReading}
      >
        <Text style={styles.buttonText}>
          {isReading ? 'Mencari Tag...' : 'Mulai Membaca NFC'}
        </Text>
      </TouchableOpacity> */}
    <>
    <View>
    <View style={styles.errorContainer}>
     
      <Text>{hasNfc ? 'NFC is supported' : 'NFC is not supported'}</Text>
    </View>
    </View>
      <TouchableOpacity style={styles.button} onPress={readNdef}  disabled={isReading}>
        <Text>{isReading ?  `Scan a Tag` : 'Mulai Membaca NFC'}</Text>
      </TouchableOpacity>

      {/* {tagId && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>ID Tag (UID):</Text>
          <Text style={styles.resultValue}>{tagId}</Text>
        </View>
      )}*/}

      {errors && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{JSON.stringify(errors)}</Text>
        </View>
      )} 
      </>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 16,
  },
  errorContainer: {
    marginTop: 20,
    backgroundColor: '#ffe0b2',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
  },
});
