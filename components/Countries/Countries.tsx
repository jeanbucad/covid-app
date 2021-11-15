import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../App";
import { TouchableOpacity } from "react-native-gesture-handler";

interface CountriesProps {
  topFive: [];
}

const Countries = ({ topFive }: CountriesProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top 5 Countries</Text>
      <Text style={styles.subTitle}>
        Countries with highest number of COVID-19 cases
      </Text>
      {topFive &&
        topFive.map((country) => {
          return (
            <View style={styles.item} key={country.ID}>
              <View style={styles.wrapper}>
                <Text style={styles.itemTitle}>{country.Country}</Text>
                <Text style={styles.itemLabel}>
                  {country.TotalConfirmed.toLocaleString()}
                </Text>
              </View>
            </View>
          );
        })}
      <TouchableOpacity
        onPress={() => navigation.navigate<Routes>("CountriesList")}
      >
        <Text style={styles.button}>See More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 335,
    margin: 15,
    backgroundColor: "#161642",
    borderRadius: 25,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    margin: 0,
    height: 40,
    padding: 10,
    borderWidth: 0.2,
    borderColor: "#fff",
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 10,
  },
  itemLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: "#fff",
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
    color: "#ffa48b",
  },
  subTitle: {
    fontSize: 12,
    fontWeight: "400",
    color: "#fff",
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 15,
  },
  button: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Countries;
