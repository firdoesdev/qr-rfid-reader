import React from "react";
import {
  ActivityIndicator, FlatList,
  RefreshControl, StyleSheet,
  Text, View
} from "react-native";

import { Link, useLocalSearchParams } from "expo-router";
import { IconSymbol } from "@/src/components/ui/IconSymbol";
import { useLanesByGate } from "@/src/hooks/features/lanes/lanes-by-gate.hook";

const ListLineByGate = () => {
  const { gateId, identity_gate } = useLocalSearchParams();
  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLanesByGate(gateId as string);

  

  if (isLoading) {
    return (
      <View
        style={{
          ...styles.container,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (data.length === 0) {
    return (
      <View
        style={{
          ...styles.container,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No lanes found for this gate.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        data={data}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        renderItem={({ item }) => (
          <Link href={{
            pathname: "/(authenticated)/gates/camera",
            params: {
              gateId: gateId as string,
              laneId: item.id,
              lane_code: item.lane_code,
              identity_gate: identity_gate as string,
            },
          }} >
            <View style={styles.gateCard} key={item.id}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconSymbol size={54} name="boom.gate" color="#000" />
              </View>
              <View style={{ flex: 2, justifyContent: "center" }}>
                <Text style={{ fontSize: 12, opacity: 0.3 }}>
                  {item.lane_code}
                </Text>
                <Text style={{ fontSize: 20 }}>{item.lane_name}</Text>
              
              </View>
            </View>
          </Link>
        )}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator size="small" /> : null
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ListLineByGate;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  gateCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 2,
    elevation: 0,
    flexDirection: "row",
    height: 120,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 2,
    justifyContent: "center",
  },
  identityText: {
    fontSize: 12,
    opacity: 0.3,
  },
  titleText: {
    fontSize: 24,
  },
  subtitleText: {
    fontSize: 14,
    fontStyle: "italic",
  },
});
