import React from "react";
import {
  ActivityIndicator, FlatList,
  RefreshControl, StyleSheet,
  Text, View
} from "react-native";

import { Link } from "expo-router";
import { useGates } from "@/src/hooks/features/gates/gates.hook";
import { IconSymbol } from "@/src/components/ui/IconSymbol";

const ListGates = () => {
  
  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGates();

  return (
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
        <Link
          href={{
            pathname: "/(authenticated)/gates/lanes",
            params: {
              gateId: item.id,
              identity_gate: item.identity_gate,
            },
          }}
        >
          <View style={styles.gateCard} key={item.id}>
            <View style={styles.iconContainer}>
              <IconSymbol size={54} name="boom.gate" color="#000" />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.identityText}>
                {item.identity_gate}
              </Text>
              <Text style={styles.titleText}>{item.name}</Text>
              <Text style={styles.subtitleText}>
                {item.gate_type === "Buffer Zone" ? item.gate_type + " " : null}
                {item.area?.description}
              </Text>
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
  );
};

export default ListGates;

const styles = StyleSheet.create({
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
