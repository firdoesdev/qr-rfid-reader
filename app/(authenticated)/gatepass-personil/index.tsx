import React from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useGatePass from "@/hooks/features/gatepass/useGatePass";
import { Link } from "expo-router";

const ListGatePass = () => {
  const { employees, loading, error, refresh } = useGatePass();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Gate Pass List</Text>
      </View>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}

      {employees.length > 0 && (
        <ScrollView
          style={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} />
          }
        >
          {employees.map((employee) => (
            <Link
              href={{
                pathname: "/(authenticated)/gatepass-personil/[id]",
                params: { id: employee.id },
              }}
              key={employee.id}
              style={{ flex: 1, marginBottom: 10 }}
            >
              <View style={styles.employeeCard}>
                <View
                  style={styles.headerSection}
                >
                  <Text style={styles.employeeName}>{employee.name}</Text>
                  <Text
                    style={[
                      styles.badge,
                      employee.is_permanent
                        ? styles.permanentBadge
                        : styles.temporaryBadge,
                    ]}
                  >
                    {employee.is_permanent ? "Permanent" : "Temporary"}
                  </Text>
                </View>
                <Text style={styles.employeeDetail}>{employee.email}</Text>
                <View style={styles.employeeInfoRow}>
                  <Text style={styles.employeeLabel}>Gate Pass:</Text>
                  <Text style={styles.employeeValue}>
                    {employee.gatepass_number}
                  </Text>
                </View>
                <View style={styles.employeeInfoRow}>
                  <Text style={styles.employeeLabel}>Valid:</Text>
                  <Text style={styles.employeeValue}>
                    {employee.valid_start_at}{" "}
                    {employee.valid_end_at ? `- ` + employee.valid_end_at : ""}
                  </Text>
                </View>
              </View>
            </Link>
          ))}
        </ScrollView>
      )}
      {employees.length === 0 && !loading && <Text>No employees found.</Text>}
    </SafeAreaView>
  );
};

export default ListGatePass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f5f5f5",
    gap: 16,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  employeeCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
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
