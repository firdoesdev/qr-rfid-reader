// export const API_URL = 'https://api.autogatekek-qadev.devnstg.com/api/v1'; // Replace with your actual API URL
export const API_URL = 'https://api.autogatekek-qa.devnstg.com/api/v1'; // Replace with your actual API URL


// DEV
// export const MQTT_URL = "broker.emqx.io";
// export const MQTT_PORT = 8083;
// export const MQTT_CLIENT_ID = `backend-mqtt-client-rahasia123!-${Date.now()}-${Math.random()
//   .toString(36)
//   .substring(2, 7)}`;
export const MQTT_URL = "broker.emqx.io";
// export const MQTT_PORT = 8083; 
export const MQTT_PORT = 8084; // Use 8084 for secure connections
export const MQTT_CLIENT_ID = `backend-mqtt-client-staging-${Date.now()}-${Math.random()
  .toString(36)
  .substring(2, 7)}`;
