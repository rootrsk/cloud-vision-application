import React, { useState, useEffect } from 'react';
import {View, StyleSheet,Text, Pressable} from 'react-native';
import { Heading, Center,Box,FormControl,Input, Button,Stack,ScrollView,useToast,Image } from "native-base"
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons';
const ForgotScreen = ({navigation}) => {
    const toast = useToast()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [otp,setOtp] = useState('')
    const [sent,setSent] = useState(false)
    const [loading,setLoading] = useState(false)
    const requestOtp = async( ) =>{
        setLoading(true)
        try {
            const {data} = await axios({
                url: '/user/generate-otp',
                method:'POST',
                data:{
                    email
                }
            })
            if(data && data.error){
                toast.show({
                    title:'Error',
                    description:data.error,
                    status:'error',
                    placement:'top-right'
                })
                setLoading(false)
                return
            }
            toast.show({
                description:data.message,
                status:'success',
                placement:'top-right'
            })
            setSent(true)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    } 
    const savePassword = async()=>{
        setLoading(true)
        if(cpassword !== password){
            return toast.show({
                title: "Password doesn't Match",
                statue: 'error',
                placement: 'top-right'
            })
            
        }
        console.log(otp)
        try {
            const {data} = await axios({
                url: 'https://rootrsk-security-api.herokuapp.com/user/reset-password',
                method:'POST',
                data:{
                    email,password,otp
                }
            })
            if(data && data.error){
                toast.show({
                    title:'Error',
                    description:data.error,
                    status:'error',
                    placement:'top-right'
                })
                setLoading(false)
                return
            }
            toast.show({
                description:data.message,
                status:'success',
                placement:'top-right'
            })
            setTimeout(()=>{
                navigation.navigate("Login")
            },1500)
            setLoading(false)
        } catch (error) {
            toast.show({
                title:'Something Went Wrong',
                statue:'error',
                placement:'top-right'
            })
        }
        setLoading(false)
    }
    return (
        <>
            <ScrollView
                _light={{
                    bg:'white'
                }}
            >
                <Center>
                    
                    <Image 
                        source={{uri:'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'}}
                        style={styles.profile_image}
                        alt='logo'
                        mt='70'
                    />
                    <Heading
                        textAlign='center'
                        mt='2' 
                        _light={{
                            color:'blueGray.800'
                        }}
                    >Forgot Password</Heading>
                </Center>
                
                
                <Input 
                    m='5'
                    mb='0'
                    pl='2'
                    variant={'outline'} 
                    placeholder=" Email"
                    value={email} 
                    _light={{
                        bg:'white',
                        outlineColor:'gray.300'
                    }}
                    _focus={{
                        outlineColor:'gray.400',
                        borderColor:'blueGray.900'
                    }}
                    isDisabled={sent}
                    onChangeText={setEmail}
                    InputLeftElement={
                        <AntDesign name="mail" style={styles.icon} size={20} color="black" />
                    }
                />
                {
                    sent && 
                    <>
                        <Input 
                            m='5'
                            mb='0'
                            pl='2'
                            variant="outline" 
                            placeholder="Password"
                            value={password} 
                            onChangeText={setPassword}
                            InputLeftElement={
                                <AntDesign name="lock" style={styles.icon} size={20} color='black' />
                            }
                            _light={{
                                bg:'white',
                                outlineColor:'gray.300'
                            }}
                            _focus={{
                                outlineColor:'gray.400',
                                borderColor:'blueGray.900'
                            }}
                        />  
                        <Input 
                            m='5'
                            mb='0'
                            pl='2'
                            variant="outline" 
                            placeholder="Confirm Password"
                            value={cpassword} 
                            onChangeText={setCPassword}
                            InputLeftElement={
                                <AntDesign name="lock" style={styles.icon} size={20} color='black' />
                            }
                            _light={{
                                bg:'white',
                                outlineColor:'gray.300'
                            }}
                            _focus={{
                                outlineColor:'gray.400',
                                borderColor:'blueGray.900'
                            }}
                        />   
                        <Input 
                            m='5'
                            mb='0'
                            pl='2'
                            variant="outline" 
                            placeholder="OTP"
                            value={otp} 
                            onChangeText={setOtp}
                            InputLeftElement={
                                <AntDesign name="key" style={styles.icon} size={20} color="black" />
                            }
                            _light={{
                                bg:'white',
                                outlineColor:'gray.300'
                            }}
                            _focus={{
                                outlineColor:'gray.400',
                                borderColor:'blueGray.900'
                            }}
                        />      
                    </>
                }
                
                <Button
                    variant={'outline'}
                    m='5'
                    onPress={sent?savePassword:requestOtp}
                    isLoading={loading}
                    _text={{
                        color:'blueGray.900'
                    }}
                    _light={{
                        bg:'white',
                        borderColor:"gray.700"
                    }}
                >
                    {sent?'Save Password':'Request OTP'}
                </Button>
               
            </ScrollView>
        </>
    );
};

export default ForgotScreen;

const styles = StyleSheet.create({
    authPage: {
        backgroundColor: 'white'
    },
    icon: {
        paddingLeft: 10,
        // paddingRight:2,
    },
    icon2: {
        paddingRight: 10
    },
    profile_image: {
        width: 150,
        height: 150,
        borderRadius: 50
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
        margin: 2,
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

