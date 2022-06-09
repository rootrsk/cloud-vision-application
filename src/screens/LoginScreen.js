import React, { useState, useEffect } from 'react';
import {View, StyleSheet,Text, Pressable} from 'react-native';
import { Heading, Center,Box,FormControl,Input, Button,Stack,ScrollView,Avatar, Image, useToast } from "native-base"
import axios from 'axios'
import { AntDesign,Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { authenticateUser } from '../redux/actions/auth';
import * as SecureStore from 'expo-secure-store';
/**
 * 
 * @param {Object} navigation provided by react-navigation 
 * @returns Login Component for user authentaction
 */
// https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png
const LoginScreen = ({navigation}) => {
    const toast = useToast()
    const [username, setUsername] = useState('rootrsk')
    const [password, setPassword] = useState('123456789') 
    const [error, setError] = useState('')
    const [login, setLogin] = useState(true)
    const [loading,setLoading] = useState(false)
    const [hidePassword,setHidePassword] = useState(true)

    const loginHandler = async() => {
        setLoading(true) 
        try {
            const { data } =await axios({
                url: '/login',
                method:'POST',
                data:{id: username,password}
            })
            if(data && data.token && data.user){
                await SecureStore.setItemAsync('authtoken', data.token);
                authenticateUser({user:data.user,token:data.token})
                return
            }
            toast.show({
                title: "Login Error",
                description:`${data.error}`,
                status: 'error',
                placement:'top-right'
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
    const tokenLoginHandler = async()=>{
        setLoading(true)
        try {
            let authorization = await SecureStore.getItemAsync('authtoken');
            if(!authorization){
                setLoading(false)
                return
            }
            const { data } = await axios({
                url: '/user/me',
                method:'GET',
                headers:{
                    authorization
                }
            })
            if(data && data.token && data.user){
                await SecureStore.setItemAsync('authtoken', data.token);
                authenticateUser({user:data.user,token:data.token})
                return
            }
            toast.show({
                title: "Login Error",
                description:`${data.error}`,
                status: 'error',
                placement:'top-right'
            })
        } catch (error) {
            toast.show({
                title: "Something Went Wrong",
                status:'error'
            })
        }
        setLoading(false)
    }
    useEffect(()=>{
        tokenLoginHandler()
    },[])
    return (
        <>
            
            <ScrollView 
                _light={{
                    bg:'white'
                }}
            >
                <Box m='5'></Box>
                {/* <Heading>Welcome Back,</Heading> */}
                <Center>
                    
                    <Image 
                        source={{uri:'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'}}
                        style={styles.profile_image}
                        alt='logo'
                        mt='10'
                    />
                    <Heading>Login</Heading>
                </Center>

                <Input 
                    m='5'
                    pl='2'
                    variant="outline" 
                    borderColor={'blueGray.700'}
                    placeholder="Username or Email"
                    value={username} 
                    _focus={{borderColor:"blueGray.900"}}
                    color="gray.800"
                    
                    onChangeText={setUsername}
                    InputLeftElement={<AntDesign name="user" style={styles.icon} size={20} color="black" />}
                />
                <Input 
                    _focus={{borderColor:"blueGray.900"}}
                    borderColor={'blueGray.700'}
                    m='5'
                    mt='0'
                    pl='2'
                    variant="outline" 
                    placeholder="Password"
                    value={password} 
                    onChangeText={setPassword}
                    type={hidePassword?'password':'text'}
                    InputLeftElement={
                        <AntDesign name="lock" style={styles.icon} size={20} color="black" />}
                    InputRightElement={
                        <TouchableOpacity onPress={()=>setHidePassword(!hidePassword)}>
                            <Ionicons 
                                name={hidePassword?"eye-outline":'eye-off-outline'} 
                                style={styles.icon2} size={20} 
                            />
                        </TouchableOpacity> }
                    
                />
                <Button
                    // variant={'outline'}
                    m='5'
                    mt='0'
                    p='3'
                    onPress={loginHandler}
                    isLoading={loading}
                    _light={{
                        bg:'darkBlue.900'
                    }}
                    _hover={{
                        bg:'black'
                    }}
                    _pressed={{
                        bg:'darkBlue.700',
                    }}
                >
                    Login
                </Button>
                <Button 
                    variant={'link'} 
                    onPress={()=>navigation.navigate("Signup")}
                >
                    New User ? Create an Account
                </Button>
                <Button 
                    m='2'
                    mt='0'
                    variant={'link'} 
                    onPress={()=>navigation.navigate("Forgot")}
                >
                    Forgot Password ?
                </Button>
            </ScrollView>
        </>
    );
};
{/* <AntDesign name="user" size={24} color="black" /> */}
const mapStateToProps = state =>state
export default connect(mapStateToProps) (LoginScreen);

const styles = StyleSheet.create({
    authPage: {
        backgroundColor: 'white'
    },
    icon:{
        paddingLeft:5,
        // paddingRight:2,

    },
    icon2:{
        paddingRight:10
    },
    profile_image:{
        width:150,
        height:150,
        borderRadius:50
    },
    title: {
        marginTop: 3,
        marginBottom: 15
    },
    first: {
        marginBottom: 10,
    },
    input: {
        marginBottom: 5,
        backgroundColor: 'transparent',
        margin:2,
    },
    label: {
        color: '#c4c4c4',
        fontWeight: 'bold',
        // marginTop: 10
    },
    button: {
        // marginTop:20,
        paddingLeft: 40,
        paddingRight: 40,
        marginBottom: 20
    },
    error: {
        borderColor: 'red',
        color: 'red',
        marginBottom: 10,
        marginTop: 10
    },
    ani: {
        marginTop: 5
    },
    transButton: {
        backgroundColor: 'transparent'
    },
    formControl: {
        backgroundColor: "white"
    }
})
