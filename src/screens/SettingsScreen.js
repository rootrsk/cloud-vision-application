import React,{useEffect, useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView,Text,Heading,Box,Flex,Divider,useColorMode,Button,useToast } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux'
import {postApi,getApi} from '../utils/userApi'
import { removeUser } from '../redux/actions/auth';
import * as SecureStore from 'expo-secure-store';
const SettingsScreen = (props) => {
    const [isLoading,setIsLoading] =useState(false)
    const [isLoadingV,setIsLoadingV] = useState(false)
    const [isLoadingP,setIsLoadingP] = useState(false)
    const toast = useToast()
    const verifyAccout = async() =>{
        setIsLoadingV(true)
        const {data,error} = await postApi('/user/generate-verify-link',{email:props.user.email})
        setIsLoadingV(false)
        if (error) {
            toast.show({
                title: 'Error',
                status: 'error',
                description: error
            })
        }
        if(data.status==='success'){
            toast.show({
                title:'Success',
                status:'success',
                description:'Verification link has been send to registered email.'
            })
        }        
    }
    const sendPasswordReset = async()=>{
        try{
            setIsLoadingP(true)
            const {error,data} = await postApi(`/user/generate-password-reset-link`,{email:props.user.email})
            console.log(error)
            setIsLoadingP(false)
            if (error) {
                toast.show({
                    title: 'Error',
                    status: 'error',
                    description: error
                })
                return
            }
            if (data.status === 'success') {
                toast.show({
                    title: 'Success',
                    status: 'success',
                    description: 'Reset link has been send to registered email.'
                })
            }
        }catch(e){
            console.log(e)
            toast.show({
                title:'Error',
                status:'error',
                description: 'Something went wrong.'
            })
            setIsLoadingP(false)
        }
    }
    useEffect(()=>{
        return ()=>null
    },[])
    const logoutHandler = async() =>{
        setIsLoading(true)
        try {
            let result = await SecureStore.getItemAsync('authtoken');
            console.log(result)
            if (result) {
                await SecureStore.deleteItemAsync('authtoken');
                removeUser()
            } else {
                removeUser()
            }
        } catch (error) {
            console.log(error)
        }
        
        setIsLoading(false)
    }
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <ScrollView
            _light={{backgroundColor:'gray.200'}}
            _dark={{backgroundColor:'blueGray.800'}}
        >
            <Box
                _light={{backgroundColor:'#ffffff'}}
                _dark={{backgroundColor:'darkBlue.900'}}
                mt='2'
                p='2'
                // m='2'
                // borderRadius={4}
            >
                <Heading>Theme</Heading>
                <Divider />
                <Flex direction='row' justify='space-between' >
                    <Text>Theme</Text> <Text>Standard</Text>
                </Flex>
                <Flex direction='row' justify='space-between' >
                    <Text>Theme Mode</Text> <Text>{colorMode=='light'?'Light':'Dark'}</Text>
                </Flex>
            </Box>
            <Box
                _light={{backgroundColor:'#ffffff'}}
                _dark={{backgroundColor:'darkBlue.900'}}
                p='2'
                mt='2'
                // m='2'
                // borderRadius={4}
            >
                <Heading>Account Status</Heading>
                <Divider />
                {props.user && <Flex direction='row' justify='space-between' >
                    <Text color={props.user.is_verified?'green.600':'red.600'} fontSize={20} >
                        {props.user.is_verified?'Verified':'Not Verified'}
                    </Text>        

                    <AntDesign 
                        name={props.user.is_verified?'checkcircle':'closecircle'} 
                        color={props.user.is_verified?'green':'red'} 
                        size={30} />
                    
                </Flex>}
                {
                    props.user && !!!props.user.is_verified && 
                    <Box mt='3'>
                        <Button
                            isLoading={isLoadingV}
                            isLoadingText='sending mail.'
                            _light={{
                                bg:'darkBlue.900'
                            }}
                            _hover={{
                                bg:'black'
                            }}
                            _pressed={{
                                bg:'darkBlue.700',
                            }}
                            onPress={verifyAccout}
                        >Verify Now</Button>
                    </Box>
                }           
            </Box>
            <Box
                _light={{backgroundColor:'#ffffff'}}
                _dark={{backgroundColor:'darkBlue.900'}}
                p='2'
                mt='2'
            >
                <Heading>Password Reset</Heading>
                <Divider mb='2' />
                <Button 
                    isLoading={isLoadingP} 
                    isLoadingText='Sending reset link' 
                    onPress={sendPasswordReset} 
                    _light={{
                        bg:'darkBlue.900'
                    }}
                    _hover={{
                        bg:'black'
                    }}
                    _pressed={{
                        bg:'darkBlue.700',
                    }}
                >Request Password Reset</Button>
            </Box>
            <Box
                _light={{backgroundColor:'#ffffff'}}
                _dark={{backgroundColor:'darkBlue.900'}}
                p='2'
                mt='2'
            >
                <Heading>Manage Account</Heading>
                <Divider mb='2' />
                <Button 
                    isLoading={isLoading} 
                    isLoadingText='Logging out' 
                    onPress={logoutHandler} 
                    _light={{
                        bg:'darkBlue.900'
                    }}
                    _hover={{
                        bg:'black'
                    }}
                    _pressed={{
                        bg:'darkBlue.700',
                    }}
                >Logout</Button>
            </Box>
        </ScrollView>
    )
}
const mapStateToProps=(state)=> state.auth
export default connect(mapStateToProps) (SettingsScreen)

const styles = StyleSheet.create({})
