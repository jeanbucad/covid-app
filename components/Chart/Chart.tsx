import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

interface ChartProps {
  TotalConfirmed: number;
  TotalRecovered: number;
  TotalDeaths: number;
}

const Chart = ({ TotalConfirmed, TotalRecovered, TotalDeaths }: ChartProps) => {
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;
  const total = TotalConfirmed + TotalRecovered + TotalDeaths;

  const TotalConfirmedPercentage = (TotalConfirmed / total) * 100;
  const TotalRecoveredPercentage = (TotalRecovered / total) * 100;
  const TotalDeathsPercentage = (TotalDeaths / total) * 100;

  const TotalConfirmedOffset =
    circleCircumference -
    (circleCircumference * TotalConfirmedPercentage) / 100;
  const TotalRecoveredOffset =
    circleCircumference -
    (circleCircumference * TotalRecoveredPercentage) / 100;
  const TotalDeathsOffset =
    circleCircumference - (circleCircumference * TotalDeathsPercentage) / 100;

  const TotalConfirmedAngle = (TotalConfirmed / total) * 360;
  const TotalRecoveredAngle = (TotalRecovered / total) * 360;
  const TotalDeathsAngle = (TotalDeaths / total) * 360;

  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height="160" width="160" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            {total === 0 ? (
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#F1F6F9"
                fill="transparent"
                strokeWidth="40"
              />
            ) : (
              <>
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#ff7f5c"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={TotalConfirmedOffset}
                  rotation={0}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#1c1c4a"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={TotalDeathsOffset}
                  rotation={TotalConfirmedAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#1c1c4a"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={TotalRecoveredOffset}
                  rotation={TotalRecoveredAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
              </>
            )}
          </G>
        </Svg>
        <Text style={styles.label}>{TotalConfirmedPercentage.toFixed(0)}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 24,
    color: "#161642",
  },
});

export default Chart;
