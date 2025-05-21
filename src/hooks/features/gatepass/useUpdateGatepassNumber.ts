import { useMqtt } from "@/src/hooks/useMqtt";
import { useQueryClient } from "@tanstack/react-query";

interface IUpdateGatepassNumber {
  id?: string;
}

export const useUpdateGatepassNumber = (data: IUpdateGatepassNumber) => {
  const { id } = data;
  const { publish, status } = useMqtt();
  const queryClient = useQueryClient();

  const topics = "autogate/gatepass/update-number";

  const updateGatepassNumber = (tagId: string) => {
    if (!id) return;

    const payload = {
      id: id,
      tagId: tagId,
    };
    console.log("Payload to send:", payload);
    const isUpdatedNumber = publish(topics, JSON.stringify(payload));
    if (!isUpdatedNumber) {
      console.log("Failed to send payload");
      return;
    }

    queryClient.invalidateQueries({
      queryKey: ["company-employees"],
    });

    queryClient.setQueryData(["company-employee", id], (oldData: any) => {
      if (oldData) {
        return {
          ...oldData,
          data: {
            ...oldData.data,
            rfid: tagId,
          },
        };
      }
      return oldData;
    });

    console.log("Payload sent to MQTT broker");
  };

  
  return { updateGatepassNumber, status };
};
