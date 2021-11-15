import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getStats, Stats } from "../../api/covidStats";
import { useQuery } from "react-query";
import { Ionicons } from "@expo/vector-icons";
import { Routes } from "../../App";

interface Sorting {
  by: string;
  order: string;
}

const CountriesList = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<Stats[]>([]);
  const [sorting, setSorting] = useState<Sorting>({
    by: "Country",
    order: "asc",
  });

  const { data: countries } = useQuery<Stats[]>("countries", getStats, {
    initialData: [],
  });

  React.useEffect(() => {
    if (countries !== undefined) {
      setData(countries.Countries);
    }
  }, [countries]);

  const handleSearch = (text: string) => {
    const initData = countries.Countries;
    if (text.length > 0 && text !== "") {
      const formattedText = text.toLowerCase();

      let filteredData = initData.filter((item: any) => {
        return item.Country.toLowerCase().match(formattedText);
      });

      if (filteredData.length > 0) {
        setData(filteredData);
      }
    } else {
      setData(initData);
    }
  };

  const sortBy = (field: string, order: string) => {
    let currentOrder = sorting.order;
    switch (field) {
      case "Country":
        if (currentOrder === "desc") {
          setData(data.sort((a, z) => a.Country.localeCompare(z.Country)));
          setSorting({ by: field, order: "asc" });
        } else {
          setData(data.sort((a, z) => z.Country.localeCompare(a.Country)));
          setSorting({ by: field, order: "desc" });
        }

        break;
      case "Confirmed":
        if (currentOrder === "desc") {
          setData(
            data.sort((low, high) =>
              low.TotalConfirmed > high.TotalConfirmed ? 1 : -1
            )
          );
          setSorting({ by: field, order: "asc" });
        } else {
          setData(
            data.sort((low, high) =>
              high.TotalConfirmed > low.TotalConfirmed ? 1 : -1
            )
          );
          setSorting({ by: field, order: "desc" });
        }
        break;
      case "Deaths":
        if (currentOrder === "desc") {
          setData(
            data.sort((low, high) =>
              low.TotalDeaths > high.TotalDeaths ? 1 : -1
            )
          );
          setSorting({ by: field, order: "asc" });
        } else {
          setData(
            data.sort((low, high) =>
              high.TotalDeaths > low.TotalDeaths ? 1 : -1
            )
          );
          setSorting({ by: field, order: "desc" });
        }
        break;
      case "Recovered":
        if (currentOrder === "desc") {
          setData(
            data.sort((low, high) =>
              low.TotalRecovered > high.TotalRecovered ? 1 : -1
            )
          );
          setSorting({ by: field, order: "asc" });
        } else {
          setData(
            data.sort((low, high) =>
              high.TotalRecovered > low.TotalRecovered ? 1 : -1
            )
          );
          setSorting({ by: field, order: "desc" });
        }
        break;
    }
  };

  return (
    <SafeAreaView style={styles.bg}>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <TouchableOpacity onPress={() => navigation.navigate<Routes>("Main")}>
            <View style={styles.iconHolder}>
              <Ionicons name="arrow-back" size={20} style={styles.icon} />
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All Countries</Text>
          <TouchableOpacity>
            <View style={styles.iconHolder}>
              <Ionicons name="person" size={20} style={styles.icon} />
            </View>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.searchInput}
          underlineColorAndroid="transparent"
          placeholder="Search country here"
          onChangeText={(text) => {
            handleSearch(text);
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={
                sorting.by === "Country"
                  ? styles.activeButton
                  : styles.inactiveButton
              }
              onPress={() => {
                sortBy("Country");
              }}
            >
              <Text style={styles.buttonText}>Country</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                sorting.by === "Confirmed"
                  ? styles.activeButton
                  : styles.inactiveButton
              }
              onPress={() => {
                sortBy("Confirmed");
              }}
            >
              <Text style={styles.buttonText}>Confirmed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                sorting.by === "Deaths"
                  ? styles.activeButton
                  : styles.inactiveButton
              }
              onPress={() => {
                sortBy("Deaths");
              }}
            >
              <Text style={styles.buttonText}>Deaths</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                sorting.by === "Recovered"
                  ? styles.activeButton
                  : styles.inactiveButton
              }
              onPress={() => {
                sortBy("Recovered");
              }}
            >
              <Text style={styles.buttonText}>Recovered</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          style={styles.list}
          keyExtractor={(item, index) => index}
          data={data}
          renderItem={({ item, index }) => (
            <View style={styles.item} key={index}>
              <View style={styles.itemWrapper}>
                <Text style={styles.text}>{item.Country}</Text>
                <Text style={styles.text}>{item.TotalConfirmed}</Text>
                <Text style={styles.text}>{item.TotalDeaths}</Text>
                <Text style={styles.text}>{item.TotalRecovered}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inactiveButton: {
    width: "22%",
    backgroundColor: "#161642",
    padding: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  activeButton: {
    width: "22%",
    backgroundColor: "#ff7f5c",
    padding: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 11,
  },
  bg: {
    backgroundColor: "#fdfdfd",
  },
  list: {
    top: 0,
    margin: 0,
    width: "100%",
    backgroundColor: "#fdfdfd",
    height: "80%",
  },
  container: {
    backgroundColor: "#fdfdfd",
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  itemHolder: {
    backgroundColor: "#ff7f5c",
    marginRight: 10,
    padding: 5,
  },
  itemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconHolder: {
    backgroundColor: "#e8e8ed",
    borderRadius: 15,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  icon: {
    color: "#161642",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    top: 10,
    color: "#161642",
    marginBottom: 10,
  },
  listItem: {
    fontSize: 18,
    marginLeft: 20,
    padding: 5,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 10,
    borderRadius: 15,
    borderColor: "#747490",
    backgroundColor: "#fdfdfd",
  },
  item: {
    padding: 10,
    height: 80,
    borderBottomWidth: 0.2,
    borderColor: "#747490",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdfdfd",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    color: "#161642",
    width: "100%",
    flexShrink: 1,
    marginLeft: 10,
  },
});

export default CountriesList;
