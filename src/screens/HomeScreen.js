import { Box, Button, Text } from 'native-base';
import React from 'react';
import {View, StyleSheet} from 'react-native';

const Homescreen = ({ navigation }) => {
    return (
        <Box bg='red.200' h={900}>
            <Text>This is homepage</Text>
            <Button 
                onPress={()=>{
                    navigation.navigate("Dashboard")
                }}
            >Go to Dashboard</Button>
        </Box>
    );
}

const styles = StyleSheet.create({})

export default Homescreen;
