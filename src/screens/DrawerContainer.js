import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Homescreen from './HomeScreen';
import DashboardScreen from './DashboardScreen'
import DrawerContent from '../components/DrawerContent';
import { useColorMode } from 'native-base';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import AboutScreen from './AboutScreen';
import HelpScreen from './HelpScreen';
import LogoutScreen from './LogoutScreen';
const Drawer = createDrawerNavigator();

const DrawerContainer = (props) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Drawer.Navigator initialRouteName="Dashboard" drawerContent={props=><DrawerContent {...props} />}
            screenOptions = {{
                headerStyle: {
                    backgroundColor: colorMode === 'light' ? '#fff' : '#000e21', 
                },
                headerTintColor: colorMode==='light'?'#000':'#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Drawer.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: true}}  />
            <Drawer.Screen name="Profile" component={ProfileScreen} options={{headerShown: true}}  /> 
            <Drawer.Screen name="Settings" component={SettingsScreen} options={{headerShown: true}}  /> 
            <Drawer.Screen name="About" component={AboutScreen} options={{headerShown: true}}  /> 
            <Drawer.Screen name="Help" component={HelpScreen} options={{headerShown: true}}  /> 
            <Drawer.Screen  name="Logout" component={LogoutScreen} options={{headerShown: true}}  /> 
        </Drawer.Navigator>
    );
}

export default DrawerContainer

const styles = StyleSheet.create({})