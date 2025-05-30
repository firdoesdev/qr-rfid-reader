import { useMqtt } from "@/src/hooks/useMqtt";

type TPayloadScanQrDocument = {
  type: string;
  value: string;
  lineCode: string;
  identityGate: string;
  noContainer: string;
  vehicleNumber: string;
  timestamp: number;
  direction: string;
};

// type TPayloadScanQrDocument = {
//   type: string
//   value: string
//   line: string
//   gateId: string
//   noContainer: string
//   vehicleNumber: string
//   timestamp: string
// };

const topics = "jiipe-autogate-infra/scan-qr-request";

export const useScanQrDocument = () => {
  const { publish, status } = useMqtt();

  const onScanDocument = (payload: TPayloadScanQrDocument) => {
    //TODO Publish the tagId to the MQTT topic
    // publish(topics, JSON.stringify(payload));
    const message = {
      type: payload.type,
      value: payload.value,
      lineCode: payload.lineCode,
      identityGate: payload.identityGate,
      noContainer: payload.noContainer,
      vehicleNumber: payload.vehicleNumber,
      timestamp: payload.timestamp,
      direction: payload.direction,
    };
    // const message = {
    //   type: payload.type,
    //   value: payload.value,
    //   lineCode: payload.lineCode,
    //   identityGate: payload.identityGate,
    //   noContainer: payload.noContainer,
    //   vehicleNumber: payload.vehicleNumber,
    //   timestamp: payload.timestamp,
    //   direction: payload.direction,
    // };
    publish(topics, JSON.stringify(message));
    console.log("Published message:", message);
  };

  return { onScanDocument, status };
};
