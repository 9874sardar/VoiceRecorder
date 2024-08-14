import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
} from "react-native";
import React, { useEffect, useState } from "react";
// import { BubbleChart } from "react-native-charts-wrapper";
import { WebView } from "react-native-webview";
import { Button } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChartScreen = ({navigation}) => {
  const [wordData,setWordData] = useState([{ x: 1, y: 2, label: 'hello' },   
    { x: 2, y: 5, label: 'hi' },      
    { x: 3, y: 2, label: 'gone' },    
    { x: 4, y: 4, label: 'working' }]);

    useEffect(() => {
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('word_count');
          console.log('word_count', jsonValue);
    
          if (jsonValue) {
            formatData(jsonValue);
          }
        } catch (e) {
          console.log("Error retrieving data", e);
        }
      };
      getData();
    }, []);
    
    const formatData = (data) => {
      try {
        const parsedData = JSON.parse(data);
        const finalData = Object.entries(parsedData).map(([key, value], index) => {
          return { x: index + 1, y: value, label: key };
        });
        const data2 = finalData.filter(item => item.y > 2);
        console.log("checking data", data2);
        setWordData(data2);
      } catch (error) {
        console.log("Error parsing JSON:", error.message);
      }
    };
    


  // const chartHtml = `
  //   <html>
  //     <head>
  //       <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  //       <style>
  //       h1{text-align: center;
  //       font-size:60;
  //       padding:10px;}
  //       </style>
  //       </head>
  //     <body>
  //     <canvas id="myChart" width="300" height="200"></canvas>
  //     <h1>Bar Chart</h1>
  //     <canvas id="myChart1" width="300" height="200"></canvas>
  //     <h1>Doughnut Chart</h1>
  //     <canvas id="bubble" width="300" height="200"></canvas>
  //     <h1>Bubble Chart</h1>
  //       <script>
  //         var ctx = document.getElementById('myChart').getContext('2d');
  //         var myChart = new Chart(ctx, {
  //           type: 'bar',
  //           data: {
  //             labels: ['Red', 'Blue', 'Yellow', 'Green'],
  //             datasets: [{
  //               label: '# of Votes',
  //               data: [12, 19, 3, 5],
  //               backgroundColor: [
  //                 'rgba(255, 99, 132, 0.2)',
  //                 'rgba(54, 162, 235, 0.2)',
  //                 'rgba(255, 206, 86, 0.2)',
  //                 'rgba(75, 192, 192, 0.2)',
  //                 'rgba(153, 102, 255, 0.2)',
  //                 'rgba(255, 159, 64, 0.2)'
  //               ],
  //               borderColor: [
  //                 'rgba(255, 99, 132, 1)',
  //                 'rgba(54, 162, 235, 1)',
  //                 'rgba(255, 206, 86, 1)',
  //                 'rgba(75, 192, 192, 1)',
  //                 'rgba(153, 102, 255, 1)',
  //                 'rgba(255, 159, 64, 1)'
  //               ],
  //               borderWidth: 1
  //             }]
  //           },
  //           options: {
  //             scales: {
  //               y: {
  //                 beginAtZero: true
  //               }
  //             }
  //           }
  //         });
  //       </script>
  //       <script>
  //         var ctx = document.getElementById('myChart1').getContext('2d');
  //         var myChart = new Chart(ctx, {
  //           type: 'doughnut',
  //           data: {
  //             labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  //             datasets: [{
  //                label: 'Word Frequency Scatter Plot',
  //               data: [
  //                    { x: 1, y: 2, label: 'hello' },   // hello: frequency = 2
  //                   { x: 2, y: 5, label: 'hi' },      // hi: frequency = 5
  //                   { x: 3, y: 2, label: 'gone' },    // gone: frequency = 2
  //                   { x: 4, y: 4, label: 'working' },   // working: frequency = 4
  //               ],
  //               backgroundColor: 'rgba(75, 192, 192, 0.6)',
  //               borderColor: 'rgba(75, 192, 192, 1)',
  //               borderWidth: 1
  //             }]
  //           },
  //           options: {
  //             scales: {
  //               x: {
  //                       type: 'linear',
  //                       position: 'bottom'
  //                   }
  //             }
  //           },
            
  //         });
  //       </script>
  //       <script>
  //         var ctx = document.getElementById('bubble').getContext('2d');
  //         var myChart = new Chart(ctx, {
  //           type: 'bubble',
  //           data: {
  //             labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //              datasets: [{
  //               label: 'First Dataset',
  //               data: [{
  //               x: 20,
  //               y: 30,
  //               r: 15
  //               }, {
  //               x: 40,
  //               y: 10,
  //               r: 10
  //               }],
  //               backgroundColor: 'rgb(255, 99, 132)'
  //           }]
  //           },
  //           options: {
              
  //           }
  //         });
  //       </script>
  //       <br/>
  //       <br/>
  //       <br/>
  //       <br/>
  //       <br/>
  //     </body>
  //   </html>
  // `;

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
      <canvas id="myChart1" width="300" height="200"></canvas>
      <h1>Scatter Plot</h1>
      <script>
        var ctx = document.getElementById('myChart1').getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'scatter',
          data: {
            datasets: [{
              label: 'Word Frequency Scatter Plot',
              data: ${JSON. stringify(wordData)},
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              pointRadius: 15,
              pointHoverRadius: 12,
            }]
          },     
          options: {
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                title: {
                  display: true,
                  text: 'X-Axis',
                  font: {
                    size: 55 
                  }
                },
                ticks: {
                  stepSize: 1,
                  font: {
                    size: 24 
                  }
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Frequency',
                  font: {
                    size: 55 
                  }
                },
                ticks: {
                  stepSize: 1,
                  font: {
                    size: 24 
                  }
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 40 
                  }
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.raw.label || '';
                    const frequency = context.raw.y;
                    return label + ': Count ' + frequency;
                  }
                },
                bodyFont: {
                  size: 40
                },
                titleFont: {
                  size: 40
                }
              }
            },
           
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
        style={{ width: "98%", height: 300 }}
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
