export const APP_ENV = process.env.EXPO_PUBLIC_APP_ENV;
export const API_URL = 'https://api.autogatekek-qa.devnstg.com/api/v1'; // Replace with your actual API URL

export const MQTT_URL = process.env.EXPO_PUBLIC_MQTT_URL;
export const MQTT_PORT = process.env.EXPO_PUBLIC_MQTT_PORT;

export const MQTT_CLIENT_ID = `${process.env.EXPO_PUBLIC_MQTT_CLIENT_ID}-${Date.now()}-${Math.random()
  .toString(36)
  .substring(2, 7)}`;
