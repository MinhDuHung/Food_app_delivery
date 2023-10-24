import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { CUS_ORANGE, CUS_YELLOW } from '../assets/colors';

const OnboardingPages = ({ currentPage, navigation }) => {
    const data = [1, 2, 3];

    function renderItem({ item }) {
        return (
            <View>
                {currentPage === item ? (
                    <TouchableOpacity onPress={() => {
              

                    }}
                        style={styles.main} />
                ) : (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate(`onboarding${item}`);
                    }
                    } style={styles.notMain} />
                )}
            </View>
        );
    }

    return (
        <View style={styles.onboardingPages}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.toString()}
                renderItem={renderItem}
                horizontal
                contentContainerStyle={{ gap: 10 }}
            />
        </View>
    );
};

export default OnboardingPages;

const styles = StyleSheet.create({
    onboardingPages: {
        alignSelf: 'center',
        marginTop: 20,
        height: 10,
    },
    main: {
        height: 10,
        width: 40, backgroundColor: CUS_ORANGE,
        borderRadius: 10
    },
    notMain: {
        height: 10, borderRadius: 10,
        width: 10, backgroundColor: CUS_YELLOW
    },
});
