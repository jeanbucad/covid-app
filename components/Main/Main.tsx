import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";
import Countries from "../Countries";
import GlobalStats from "../GlobalStats";

const { width, height } = Dimensions.get("window");

interface Stats {
  TopFiveCountries: [];
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
}

const Main = () => {
  const [stats, setStats] = useState<Stats>({
    TopFiveCountries: [],
    TotalConfirmed: 0,
    TotalDeaths: 0,
    TotalRecovered: 0,
    NewConfirmed: 0,
    NewDeaths: 0,
    NewRecovered: 0,
  });

  React.useEffect(() => {
    const fetchData = async () => {
      fetch("https://api.covid19api.com/summary", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setStats({
            TopFiveCountries: response.Countries.sort(
              (low: number, high: number) =>
                Number(high.TotalConfirmed - low.TotalConfirmed)
            ).slice(0, 5),
            TotalConfirmed: response.Global.TotalConfirmed,
            TotalDeaths: response.Global.TotalDeaths,
            TotalRecovered: response.Global.TotalRecovered,
            NewConfirmed: response.Global.NewConfirmed,
            NewDeaths: response.Global.NewDeaths,
            NewRecovered: response.Global.NewRecovered,
          });
        });
    };
    if (stats.TopFiveCountries.length === 0) {
      fetchData();
    }
  }, [stats.TopFiveCountries]);

  return (
    <SafeAreaView style={styles.bg}>
      <StatusBar />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headerTitle}>Covid-19 Cases</Text>
          <Countries topFive={stats.TopFiveCountries} />
          <GlobalStats
            TotalConfirmed={stats.TotalConfirmed}
            TotalDeaths={stats.TotalDeaths}
            TotalRecovered={stats.TotalRecovered}
            NewConfirmed={stats.NewConfirmed}
            NewDeaths={stats.NewDeaths}
            NewRecovered={stats.NewRecovered}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#fdfdfd",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    top: 10,
    color: "#161642",
    marginBottom: 10,
  },
  container: {
    backgroundColor: "#fdfdfd",
    height,
    width,
    margin: 0,
    padding: 0,
    top: 0,
  },
});

export default Main;
