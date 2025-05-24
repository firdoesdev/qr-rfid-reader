import React from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useGatePass from "@/src/hooks/features/gatepass/useGatePass";
import { Link } from "expo-router";
import { useGates } from "@/src/hooks/features/gates/gates.hook";

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
  console.log("Gates Data:", data);

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
        <View style={styles.employeeCard}>
          <View>
            <Text style={styles.employeeName}>{item.identity_gate}</Text>
            <Text style={{fontSize:12}}>{item.name}</Text>
          </View>
        </View>
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
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  employeeCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 2,
    elevation: 0,
    flexDirection: "column",
    justifyContent: "space-between",
    height: 150,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: "bold",
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
    alignItems: "center",
    justifyContent: "flex-start",
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
