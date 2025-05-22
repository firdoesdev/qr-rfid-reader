import { Client } from "paho-mqtt";
import {MQTT_URL, MQTT_PORT, MQTT_CLIENT_ID} from '@/src/constants/Configs'

export const mqttClient = new Client(MQTT_URL, Number(MQTT_PORT), MQTT_CLIENT_ID);