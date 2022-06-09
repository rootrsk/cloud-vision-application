import React, { useState, useEffect } from 'react';
import {View, StyleSheet,Text, Pressable, TouchableOpacity} from 'react-native';
import { Heading, Center,Box,FormControl,Input, Button,ScrollView,Avatar,useToast,Image } from "native-base"
import axios from 'axios'
import { AntDesign,Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { authenticateUser } from '../redux/actions/auth';
import * as SecureStore from 'expo-secure-store'
const SignupScreen = (props) => {
    const toast = useToast()
    const [fullname, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const [hidePassword, setHidePassword] = useState(true)

    const signupHandler = async() => {
        setLoading(true) 
        try {
            const { data } =await axios({
                url: '/signup',
                method:'POST',
                data:{email,username,password,fullname}
            })
            console.log(data)
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


    return (
        <View>
            <ScrollView >
                <Box m='5'></Box>
                 <Center>
                    
                    <Image 
                        source={{uri:'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'}}
                        style={styles.profile_image}
                        alt='logo'
                        mt='10'
                    />
                    <Heading>Signup</Heading>
                </Center>
                {/* <Heading>Signup</Heading> */}
                <Input 
                    m='5'
                    pl='2'
                    variant="outline" 
                    placeholder="Username"
                    value={username} 
                    onChangeText={setUsername}
                    InputLeftElement={
                        <AntDesign name="user" style={styles.icon} size={20} color="black" />
                    }
                    _focus={{borderColor:"blueGray.900"}}
                    borderColor={'blueGray.700'}
                />
                
                <Input 
                    m='5'
                    mt='0'
                    pl='2'
                    variant="outline" 
                    placeholder="FullName"
                    value={fullname} 
                    onChangeText={setFullName}
                    InputLeftElement={
                        <AntDesign name="user" style={styles.icon} size={20} color="black" />
                    }
                    _focus={{borderColor:"blueGray.900"}}
                    borderColor={'blueGray.700'}
                />
                <Input 
                    m='5'
                    mt='0'
                    pl='2'
                    variant="outline" 
                    placeholder="Email"
                    value={email} 
                    onChangeText={setEmail}
                    InputLeftElement={
                        <Ionicons name="mail-outline" style={styles.icon} size={20} color="black" />
                    }
                    _focus={{borderColor:"blueGray.900"}}
                    borderColor={'blueGray.700'}
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
                        </TouchableOpacity> 
                    }
                    
                />
                
                <Button
                    // variant={'outline'}
                    m='5'
                    mt='0'
                    p='3'
                    onPress={signupHandler}
                    isLoading={loading}
                    bg="blueGray.900"
                >
                    Signup
                </Button>
                <Button 
                    variant={'link'} 
                    onPress={()=>props.navigation.navigate("Login")}
                >
                    Already Have An Account ?
                </Button>
                {/* <Button 
                    m='2'
                    mt='0'
                    variant={'link'} 
                    onPress={()=>navigation.navigate("Forgot")}
                >
                    Forgot Password ?
                </Button> */}
            </ScrollView>
        </View>
    );
}
const mapStateToProps = (state) => state
export default connect(mapStateToProps) (SignupScreen);
const styles = StyleSheet.create({
    authPage:{
        backgroundColor: 'white'
    },
    title:{
        marginTop:3,
        marginBottom: 15
    },
    icon:{
        paddingLeft: 5,
        // paddingRight:2,

    },
    icon2: {
        paddingRight: 10
    },
    first:{
        marginBottom:10,
    },
    input:{
        marginBottom: 5,
        // paddingTop:10,
        // paddingBottom: 10,
        backgroundColor: 'transparent'
    },
    label:{
        color: '#c4c4c4',
        fontWeight: 'bold',
        // marginTop: 10
    },
    button:{
        // marginTop:20,
        paddingLeft:40,
        paddingRight:40,
        marginBottom: 20
    },
    error:{
        borderColor: 'red',
        color:'red',
        marginBottom: 10,
        marginTop: 10
    },
    ani:{
        marginTop:5
    },
    transButton:{
        backgroundColor: 'transparent'
    },
    formControl:{
        backgroundColor: "white"
    },
    profile_image: {
        width: 150,
        height: 150,
        borderRadius: 50
    },
})