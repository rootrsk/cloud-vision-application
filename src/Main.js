
import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,HeaderStyleInterpolators,TransitionPresets } from '@react-navigation/stack';

import Homescreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from  './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotScreen from './screens/ForgotScreen';
import { connect } from 'react-redux';
import DrawerContainer from './screens/DrawerContainer';
import { fetchSocket } from './redux/actions/socket';
import ImageDetailScreen from './screens/ImageDetailScreen';
const Stack = createStackNavigator();

const Main = (props) => {
    useEffect(()=>{
        fetchSocket()
    },[])
    // console.log(props)
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    ...TransitionPresets.SlideFromRightIOS,
                    headerShown: false,
                }}
            >
                { !(props.auth && props.auth.token) ?
                    <Stack.Group
                        screenOptions={{
                            ...TransitionPresets.SlideFromRightIOS,
                        }}
                    >
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Signup" component={SignupScreen} />
                        <Stack.Screen name="Forgot" component={ForgotScreen} />
                    </Stack.Group>:
                    <>
                        <Stack.Group screenOptions={{headerShown:true}} >
                            <Stack.Screen name="Drawer" component={DrawerContainer} options={{headerShown:false}} />
                            <Stack.Screen name="Home" component={Homescreen} />
                            <Stack.Screen name="Dashboards" component={DashboardScreen} />
                            <Stack.Screen 
                                name='Image' 
                                component={ImageDetailScreen} 
                                options={{
                                    ...TransitionPresets.ScaleFromCenterAndroid,
                                    headerShown:false
                                }} 
                            />
                        </Stack.Group>
                    </>
                    
                }  
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mapStateToProps = state => state
export default connect(mapStateToProps) (Main);
