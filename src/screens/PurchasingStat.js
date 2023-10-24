import { StyleSheet, Text, Dimensions, View } from 'react-native'
import React from 'react'
import { LineChart, PieChart, ProgressChart } from 'react-native-chart-kit'
const { height, width } = Dimensions.get('window')
const PurchasingStat = () => {
    const data1 = [0.2, 0.4, 0.6, 0.8]
    const data = [
        { name: 'Seoul', total: 150, color: 'rgba(131, 167, 234, 1)', legendFontColor: 'white', legendFontSize: 15 },
        { name: 'Toronto', total: 20, color: '#F00', legendFontColor: 'white', legendFontSize: 15 },
        { name: 'Beijing', total: 70, color: 'red', legendFontColor: 'white', legendFontSize: 15 },
        { name: 'New York', total: 100, color: '#ffffff', legendFontColor: 'white', legendFontSize: 15 },
        { name: 'Moscow', total: 2, color: 'rgb(0, 0, 255)', legendFontColor: 'white', legendFontSize: 15 }
    ]
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <LineChart
                data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                        {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                        }
                    ]
                }}
                width={width * .95}
                height={220}
                yAxisLabel="$"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    propsForDots: {
                        r: "5",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />

            <ProgressChart
                data={data1}
                width={width}
                height={220}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
            />
            <PieChart
                data={data}
                width={width}
                height={220}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                accessor="total"
                backgroundColor="#ffa726"
                absolute
            />
        </View>
    )
}

export default PurchasingStat

const styles = StyleSheet.create({})