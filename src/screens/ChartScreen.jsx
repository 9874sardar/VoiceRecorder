import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
} from "react-native";
import React from "react";
// import { BubbleChart } from "react-native-charts-wrapper";
import { WebView } from "react-native-webview";
import { Button } from "react-native-paper";

const ChartScreen = ({navigation}) => {
  const chartHtml = `
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
        h1{text-align: center;
        font-size:60;
        padding:10px;}
        </style>
        </head>
      <body>
      <canvas id="myChart" width="300" height="200"></canvas>
      <h1>Bar Chart</h1>
      <canvas id="myChart1" width="300" height="200"></canvas>
      <h1>Doughnut Chart</h1>
      <canvas id="bubble" width="300" height="200"></canvas>
      <h1>Bubble Chart</h1>
        <script>
          var ctx = document.getElementById('myChart').getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green'],
              datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        </script>
        <script>
          var ctx = document.getElementById('myChart1').getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
              datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                  'violet',
                  'green',
                  'blue',
                  'pink',
                  'red',
                  'purplr'
                ],
                hoverOffset:4
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        </script>
        <script>
          var ctx = document.getElementById('bubble').getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'bubble',
            data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
               datasets: [{
                label: 'First Dataset',
                data: [{
                x: 20,
                y: 30,
                r: 15
                }, {
                x: 40,
                y: 10,
                r: 10
                }],
                backgroundColor: 'rgb(255, 99, 132)'
            }]
            },
            options: {
              
            }
          });
        </script>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 ,backgroundColor:"white"}}>
      <Button
        onPress={() => navigation.navigate("home")}
        mode="contained"
        buttonColor="#0ea5e9"
        className="text-white font-semibold m-5"
      >
        Go Back to Home
      </Button>
      <WebView
        style={{ width: "100%", height: 300 }}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ html: chartHtml }}
      />
    </View>
  );
};

export default ChartScreen;

const styles = StyleSheet.create({});
