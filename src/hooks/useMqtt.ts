// hooks/useMqtt.ts
import { useEffect, useRef, useCallback, useState } from "react";
import { Client } from "paho-mqtt";
import { mqttClient } from '@/src/libs/mqttClient';
import { APP_ENV } from "@/src/constants/Configs";

type MessageHandler = (topic: string, message: string) => void;

export const useMqtt = () => {
  const client = useRef<Client | null>(null);
  const messageHandlers = useRef<Map<string, MessageHandler[]>>(new Map());
  const [status, setStatus] = useState<{
    connected: boolean;
    errors: unknown | null;
    loading?: boolean;
  }>({
    connected: false,
    errors: null,
    loading: false,
  });

  
  useEffect(() => {
    mqttClient.onConnectionLost = (response) => {
      if (response.errorCode !== 0) {
        console.log("MQTT: Connection lost ->", response.errorMessage);
      }
    };

    mqttClient.onMessageArrived = (message) => {
      const topic = message.destinationName;
      const payload = message.payloadString;
      
      console.log(`MQTT: Message received on ${topic} -> ${payload}`);
      
      // Call registered handlers for this topic
      if (messageHandlers.current.has(topic)) {
        messageHandlers.current.get(topic)?.forEach(handler => {
          handler(topic, payload);
        });
      }
    };

    mqttClient.connect({
      
      
      onSuccess: () => {
        console.log("MQTT: Connected ✅");
        setStatus({
          connected: true,
          errors: null,
          loading: false,
        });
      },
      onFailure: (err) => {
        console.log("MQTT: Connection failed ❌", err);
        setStatus({
          connected: false,
          errors: err,
          loading: false,
        });
      },
      useSSL: true,
      cleanSession: true,
      reconnect: true,
      timeout: 5,
    });

    client.current = mqttClient;

    return () => {
      // Unsubscribe from all topics and disconnect
      if (client.current?.isConnected()) {
        messageHandlers.current.forEach((_, topic) => {
          client.current?.unsubscribe(topic);
        });
        client.current.disconnect();
      }
    };
  }, []);
  
  // Subscribe to a topic
  const subscribe = useCallback((topic: string, handler: MessageHandler) => {
    if (!client.current?.isConnected()) {
      console.log("MQTT: Cannot subscribe, not connected");
      return false;
    }
    
    client.current.subscribe(topic);
    
    // Add handler to the topic
    if (!messageHandlers.current.has(topic)) {
      messageHandlers.current.set(topic, []);
    }
    messageHandlers.current.get(topic)?.push(handler);
    
    return true;
  }, []);
  
  // Unsubscribe from a topic
  const unsubscribe = useCallback((topic: string, handler?: MessageHandler) => {
    if (!client.current?.isConnected()) {
      return false;
    }
    
    if (handler && messageHandlers.current.has(topic)) {
      // Remove specific handler
      const handlers = messageHandlers.current.get(topic) || [];
      const filtered = handlers.filter(h => h !== handler);
      
      if (filtered.length === 0) {
        // No handlers left, unsubscribe from topic
        client.current.unsubscribe(topic);
        messageHandlers.current.delete(topic);
      } else {
        messageHandlers.current.set(topic, filtered);
      }
    } else {
      // Remove all handlers for topic
      client.current.unsubscribe(topic);
      messageHandlers.current.delete(topic);
    }
    
    return true;
  }, []);
  
  // Publish a message to a topic
  const publish = useCallback((topic: string, message: any) => {
    if (!client.current?.isConnected()) {
      console.log("MQTT: Cannot publish, not connected");
      return false;
    }
    
    client.current.send(topic, message);
    return true;
  }, []);
  
  return {
    subscribe,
    unsubscribe,
    publish,
    status,
  };
};
