import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Chart from "../Chart";

interface GlobalStatsProps {
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
}

const GlobalStats = ({
  TotalConfirmed,
  TotalDeaths,
  TotalRecovered,
}: GlobalStatsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Global Cases</Text>
      <Text style={styles.headerSubTitle}>
        Overall statistics of COVID-19 cases across all countries
      </Text>
      <Chart
        TotalConfirmed={TotalConfirmed}
        TotalRecovered={TotalRecovered}
        TotalDeaths={TotalDeaths}
      />
      <View style={styles.wrapper}>
        <View style={[styles.card, { backgroundColor: "#ff7f5c" }]}>
          <Text style={styles.title}>Confirmed </Text>
          <Text style={styles.subTitle}>{TotalConfirmed.toLocaleString()}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Deaths</Text>
          <Text style={styles.subTitle}>{TotalDeaths.toLocaleString()}</Text>
        </View>
        <View style={[styles.card, { backgroundColor: "#9393ac" }]}>
          <Text style={styles.title}>Recovered</Text>
          <Text style={styles.subTitle}>{TotalRecovered.toLocaleString()}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e8e8ed",
    height: 350,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 25,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 20,
  },
  card: {
    borderRadius: 15,
    backgroundColor: "#161642",
    width: 100,
    height: 70,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
    color: "#161642",
  },
  headerSubTitle: {
    fontSize: 12,
    fontWeight: "400",
    color: "#161642",
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#f7f7ff",
    textAlign: "center",
    marginTop: 5,
  },
  smallTitle: {
    fontSize: 10,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
});

export default GlobalStats;
