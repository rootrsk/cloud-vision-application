import React from 'react'
import { View, BackHandler,StyleSheet, TouchableOpacity} from 'react-native'
import { DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
// import {Avatar, Title, Caption, Paragraph, Drawer, TouchableRipple, Switch} from 'react-native-paper'
import { Heading, Center,Box,VStack, Button,HStack,ScrollView,Avatar,Text,Pressable,Icon,Divider,Flex,Switch,useColorMode} from "native-base"
import styled from 'styled-components'
import { connect } from 'react-redux'
import { AntDesign,FontAwesome5,Feather } from '@expo/vector-icons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const DrawerContent = (props) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <ScrollView
            _light={{ backgroundColor: 'gray.50' }}
			_dark={{ backgroundColor: 'blueGray.800' }}
        >
            <DrawerContentScrollView {...props}>
                <MainSection>
                    {props && props.auth && props.auth.user && 
                        <ProfileView>
                            <Center>
                                <Avatar 
                                    source={{
                                        uri: props.auth.user.profile.avatar ? props.auth.user.profile.avatar:
                                        'https://365psd.com/images/istock/previews/1009/100996291-male-avatar-profile-picture-vector.jpg'
                                    }} 
                                    size='2xl'
                                />
                            </Center>
                            <Center>
                                <Heading size='lg' >{props.auth.user.full_name}</Heading>
                            </Center>
                            <Center>
                                <Text>@{props.auth.user.username}</Text>
                            </Center>
                        </ProfileView>
                    }
                    <VStack>
                        {props.state.routeNames.map((name,index)=>(
                            <TouchableOpacity key={name}>
                                <Pressable
                                    px="5"
                                    py="3"
                                    rounded="md"
                                    bg={index === props.state.index ? 'rgba(6, 182, 212, 0.1)' : 'transparent'}
                                    onPress={(event) => {
                                        console.log(name)
                                        if(name==="Logout") {
                                            props.navigation.navigate('Settings')
                                            return
                                        }
                                        props.navigation.navigate(name);
                                    }}
                                >
                                    <HStack space="7" w='100%' alignItems="center">
                                        <Icon
                                            color={index === props.state.index ? 'primary.500' : 'gray.500'}
                                            _dark={{color:index === props.state.index ? 'primary.500':'primary.50'}} 
                                            size="5" 
                                            as={<AntDesign name={getIcon(name)}/>}  
                                        />
                                        <Text 
                                            fontWeight="500" 
                                            _dark={{color:index === props.state.index ? 'primary.500':'primary.50'}} 
                                            color={index === props.state.index ? 'primary.500' : 'gray.700'}
                                        >
                                            {name}
                                        </Text>
                                    </HStack>
                                    
                                </Pressable>
                                <Divider />    
                            </TouchableOpacity>
                            

                        ))}
                        <Pressable
                                px="5"
                                py="3"
                                rounded="md"
                                bg={'transparent'}
                                
                            >
                                <Flex alignItems="center" direction='row' justify='space-between' >
                                        <Icon
                                            // color={'primary.100'}
                                            size="5" 
                                            as={<Feather name="sun"color="black" />}  
                                        />
                                        <Switch
                                            offTrackColor="muted.500"
                                            onTrackColor="muted.100"
                                            onThumbColor="muted.100"
                                            offThumbColor="muted.500"
                                            size='lg'
                                            onToggle={toggleColorMode}
                                            isChecked={colorMode!=='light'}
                                        />
                                        <Icon
                                            // color={'muted.800'}
                                            size="5" 
                                            as={<FontAwesome5 name='moon'/>}  
                                        />
                                    
                                    
                                    {/* <Text fontWeight="500" color={index === props.state.index ? 'primary.500' : 'gray.700'}>
                                        {name}
                                    </Text> */}
                                </Flex>
                        </Pressable>
                        <Divider />
                        {/* <Flex
                            px = "5"
                            py = "3"
                            variant='ghost'
                            justify='space-between'
                            display={'flex'}
                            direction='row'
                            _light={{
                                // bg:'red.500'
                            }}
                        >

                            
                            <Icon
                                size="5" 
                                as={<AntDesign name="logout" />}  
                            />
                            
                            <Text fontWeight={700} >Logout</Text>
                        </Flex> 
                        <Divider /> */}
                    </VStack>
                </MainSection>
                

            </DrawerContentScrollView>
            {/* <Bottom>
                <Text>Exit App</Text>
            </Bottom> */}
        </ScrollView>
    )
}
const mapStateToProps = state => state 

export default connect(mapStateToProps)(DrawerContent)

const styles = StyleSheet.create({
    profileImage:{
        width:300,
        height:400
    },
    scr:{
        display:'flex',
        flexDirection:'row',
        

    }
})

const DrawerView = styled.View`
    flex:1;
    background: #ffffff;
    color:#0d0920;
`
const MainSection = styled.View`
    color:#0d0920;  
    width:100%;                        
`
const Bottom = styled.View`
    // position:absolute;
    left:0;
    right:0;
    bottom:0;
    background:red;
`
const ProfileView = styled.View`

    margin:10px;

`
const ProfileDetails = styled.View`
    paddingLeft:10px;
`
const getIcon = (screenName) => {
    switch (screenName) {
        case 'Dashboard':
            return "dashboard"
        case 'Home':
            return "home"
        case 'Profile':
            return 'user'
        case 'Settings':
            return 'setting'
        case 'Logout':
            return 'logout'
        case 'About':
            return 'infocirlceo'
        case 'Help':
            return 'customerservice'
        default:
            return undefined
    }
}