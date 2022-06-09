import React,{useState} from 'react'
import { StyleSheet, View,TouchableOpacity } from 'react-native'
import { Button,Heading,Text,ScrollView,Input,Box,Avatar,Center,Modal,Image,useToast,Icon,IconButton,Flex,Divider } from 'native-base'
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import axios from 'axios';
import { PermissionsAndroid } from 'react-native';
import { authenticateUser } from '../redux/actions/auth';
const ProfileScreen = (props) => {
    const [image,setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading,setLoading] = useState(false)
    const [fullname,setFullName] = useState(props.auth.user && props.auth.user.fullname)
    const [contact, setContactNumber] = useState(props.auth.user && props.auth.user.contact)
    const [email, setEmail] = useState(props.auth.user && props.auth.user.email)
    const toast = useToast()
    const uploadProfilePic = async()=>{
        if(!image){
            toast.show({
                title:'Please select an image firset.',
                status:'warning'
            })
            return 
        }
        setLoading(true)
        
        try {
            const response = await axios({
                url: '/user/profile-img',
                method: "post",
                data: image,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Accept': 'application/json',
                }
            })
            console.log(response.data)
            if (response && response.data.status == 'success') {
                toast.show({
                    title: "Profile Picture",
                    status: "success",
                    description: "Profile picture has been updated successfully.",
                })
                authenticateUser({
                    user: response.data.user,
                    token: response.data.token
                })
            }
            setLoading(false)
            setPreview(null)
        } catch (error) {
            console.log(error)
        }
        // .catch(e=>{
        //     console.log(e)
        //     setLoading(false)
        //     toast.show({
        //         title: "Error",
        //         status: "error",
        //         description: "Something went wrong.",
        //     })
        // })
        
    }
    const updateProfileDetails = async() =>{
        setLoading(true)
        const response = await axios({
            url: '/user/profile',
            method: "patch",
            data: {fullname,contact,email},
        }).catch(e => {
            console.log(e)
            setLoading(false)
            toast.show({
                title: "Error",
                status: "error",
                description: "Something went wrong.",
            })
        })
        console.log(response.data)
        if (response && response.data.error) {
            toast.show({
                title: response.data.error,
                status: "success",
            })
            setLoading(false)
            return
        }
        if (response && response.data.status == 'success') {
            toast.show({
                title: "Profile Details",
                status: "success",
                description: "Profile details has been updated successfully.",
            })
            authenticateUser({
                user:response.data.user,
                token:response.data.token
            })
        }
        setLoading(false)
    }
    const pickImage = async() =>{
        try {
            // let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            // let x = await ImagePicker.launchCameraAsync()
            // console.log(x)
            
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.1,
                base64:true
            });
            console.log(result);
            console.log()
            if (!result.cancelled) {
                // setImage(result.uri);
                let data = new FormData();
                data.append('img', {
                    name: result.uri.split("ImagePicker/")[1],
                    type: result.type,
                    uri: result.uri,
                });
                setPreview(result.uri)
                setImage(data)
            }
            // const res = await launchImageLibrary({
            //     mediaType:'photo',
            //     maxHeight:400,
            //     maxWidth:400,
            //     height:400,
            //     width:400,
            //     cropping:true
            // });
            // if(res.assets){
            //     const data = new FormData();
            //     data.append('image', {
            //         name: res.assets[0].fileName,
            //         type: res.assets[0].type,
            //         uri: res.assets[0].uri,
            //     });
            //     setPreview(res.assets[0].uri)
            //     setImage(data)
            // }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <ScrollView
            _light={{ backgroundColor: 'gray.300' }}
			_dark={{ backgroundColor: 'blueGray.800' }}
        >
            <Box
                m='3'
                pb='5'
                pt='2'
                mt='3'
                _light={{backgroundColor:'#ffffff'}}
                _dark={{backgroundColor:'darkBlue.900'}}
                style={{position:'relative'}}
                shadow={2}
                borderRadius='4'
            >
                <Center>
                    <TouchableOpacity
                            onPress={pickImage}
                        >
                        <Avatar 
                            source={{
                                uri:(props.auth.user && props.auth.user.profile.avatar) ? props.auth.user.profile.avatar
                                :'https://365psd.com/images/istock/previews/1009/100996291-male-avatar-profile-picture-vector.jpg'
                            }}
                            size='2xl'
                            borderWidth='5'
                            borderColor='gray.50'
                            
                            // shadow='1'
                        >
                        </Avatar> 
                    </TouchableOpacity>
                    <Heading color='black' >{props.auth.user.fullname}</Heading>
                    <Text>@{props.auth.user && props.auth.user.username}</Text>   
                </Center>
            </Box>
            <Box
                m='3'
                pb='10'
                mt='3'
                _light={{backgroundColor:'#ffffff'}}
                _dark={{backgroundColor:'darkBlue.900'}}
                style={{position:'relative'}}
                shadow={5}
                borderRadius='4'
            >
                
                <Box
                    mt={2}
                >
                    <Center>
                        {/* <Heading>{props.auth.user.fullname}</Heading>
                        <Text>@{props.auth.user.username}</Text>
                        <Divider m='4' mb='4' width="70%"  /> */}
                        <Text
                            w='90%'
                            // fontWeight='700'
                            color='primary.600'
                            mt='2'
                            mb='2'
                            
                        >Username</Text>
                        <Input 
                            w='90%'
                            value={props.auth.user.username}
                            isDisabled
                            // isDisabled={true}
                        />
                        <Text
                            w='90%'
                            // fontWeight='700'
                            color='primary.600'
                            mt='2'
                            mb='2'
                            
                        >Full Name</Text>
                        <Input 
                            w='90%'
                            value={fullname}
                            onChangeText={setFullName}
                            // isDisabled={true}
                        />
                        <Text
                            w='90%'
                            // fontWeight='700'
                            color='primary.600'
                            mt='2'
                            mb='2'
                        >Contact </Text>
                        <Input 
                            w='90%' 
                            value={contact}
                            onChangeText={setContactNumber}
                        />
                        <Text
                            w='90%'
                            // fontWeight='700'
                            color='primary.600'
                            mt='2'
                            mb='2'
                        >Email </Text>
                        <Input 
                            w='90%' 
                            isDisabled={true}
                            value={props.auth.user.email}
                        />
                        <Button
                            variant='filled'
                            mt='5'
                            pl='20'
                            pr='20'
                            isLoading={loading}
                            isLoadingText='Updating'
                            onPress={updateProfileDetails}
                            _light={{
                                bg:'blueGray.900'
                            }}
                        >
                            Update</Button>
                    </Center>
                </Box>
            </Box>
            <Center
            >  
                
                <Modal isOpen={preview} onClose={()=>setPreview(null)}  >
                    <Modal.Content>
                        <Modal.CloseButton />
                        <Modal.Body>
                        <Image 
                            source={{uri:preview}}
                            alt='profile'
                            size='2xl'
                        /> 
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onPress={uploadProfilePic} isLoading={loading} >Upload</Button>
                    </Modal.Footer>  
                    </Modal.Content>
                </Modal>
            </Center>
        </ScrollView>
    )
}
const mapStateToProps = state => state
export default connect(mapStateToProps) (ProfileScreen)

