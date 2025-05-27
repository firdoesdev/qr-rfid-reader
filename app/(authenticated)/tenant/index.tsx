import React from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

import { Link } from "expo-router";
import useAuth from "@/src/hooks/features/useAuth";
import { useListCiesaDocuments } from "@/src/hooks/features/ciesa/list-ciesa.hook";
import { Colors } from "@/src/constants/Colors";

const ListCiesaDocuments = ({ nitku }: { nitku: string }) => {
  const listCiesa = useListCiesaDocuments(nitku);

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={listCiesa.isLoading}
          onRefresh={listCiesa.refetch}
        />
      }
      data={listCiesa.data}
      renderItem={({ item }) => (
        <Link
          href={{
            pathname: "/(authenticated)/tenant/camera",
            params: {
              id: item.id,
              kode_dokumen: item.no_dok_in_out,
              nitku: item.nitku,
              no_dok_in_out: item.no_dok_in_out,
              documentId: item.id,
            },
          }}
          key={item.id}
          style={{ flex: 1, marginBottom: 10 }}
        >
          <View style={styles.employeeCard}>
            <View>
              <View style={styles.headerSection}>
                <Text style={styles.employeeName}>{item.no_dok_in_out}</Text>
              </View>
              <Text style={styles.employeeDetail}>
                {item.tanggal_dok_in_out}
              </Text>
            </View>
            <View style={styles.employeeInfoRow}>
              <Text style={{ ...styles.employeeValue, fontStyle: "italic" }}>
                Status
              </Text>

              <View
                style={[
                  styles.statusIndicator,
                  {
                    backgroundColor:
                      item.status_jalur === "HIJAU"
                        ? "#24810a"
                        : Colors.light.primary,
                  },
                ]}
              />
            </View>
          </View>
        </Link>
      )}
    />
  );
};

export default function TenantDocumentsScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user?.company.name}</Text>

      <ListCiesaDocuments nitku={user?.company.npwp as string} />
    </View>
  );
}

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
    padding: 16,
    borderRadius: 2,
    elevation: 0,
    flexDirection: "column",
    justifyContent: "space-between",
    height: 120,
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
  statusIndicator: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginLeft: 8,
  },
});
