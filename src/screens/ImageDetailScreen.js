import React,{ useState} from 'react'
import { deleteApi } from '../utils/userApi';
import { deleteImage } from '../redux/actions/image'
import * as Animatable from 'react-native-animatable';
import { Dimensions, StyleSheet, View } from 'react-native'
import { Box, Button, Center, Divider, Flex, Heading, Image, Text, useToast,ScrollView } from 'native-base'
const ImageDetailScreen = (props) => {
    console.log(props)
    const toast = useToast()
    const _id = props.route.params.image._id
    const [loading, setLoading] = useState(false)
    const {width,height} = Dimensions.get("screen")
    const dateTime = new Date(props.route.params.image.captured_at).toString()
    const deleteHandler = async()=>{
        setLoading(true)
        const {data,error} = await deleteApi('/user/image',{_id})
        
        if (error){
            toast.show({
                title:error,
                status:"error"
            })
            return 
        }
        deleteImage({_id,callback:props.navigation.goBack})
        toast.show({
            title:"Image Deleted Successfully",
            status:"success",
            duration:1000
        })
        setLoading(false)
        //props.navigation.goBack
    }
    return (
        <ScrollView
            bg='blueGray.700'
        >
            {/* <Text>ImageDetailScreen</Text> */}
            <Box>
                <Image 
                    source={{uri:props.route.params.image.uri}}
                    alt='Image Details'
                    maxW={400}
                    h={250}
                />
                <Animatable.View iterationCount={1} animation="fadeInUpBig">
                    <Box bg='blueGray.700' top={-20} borderRadius={30} h={700} p='5' pt='0' >
                        <Heading color='white' fontSize={15} p='2' textAlign='center' >Image Details</Heading>
                        <Divider w={300} bg='white' />
                        <Text textAlign='center' color="white" pt='2' pb='2' >{dateTime}</Text>
                        <Divider w={300} bg='white' mt='1' />
                        <Box>
                            {
                                props.route && props.route.params.image && 
                                props.route.params.image.labels.map((label)=>{
                                    return (
                                        <Flex  p='3' direction='row' justifyContent='space-between' key={label.Name}>
                                            <Text color='white' >{label.Name}</Text>
                                            <Text>{Math.round(label.Confidence)}%</Text>
                                        </Flex>
                                    )
                                })
                            }
                        </Box>
                        <>
                            <Button 
                                // position='absolute' 
                                // justifyContent='center' 
                                // top={height-300} 
                                onPress={deleteHandler}
                                mt='2'
                                isLoading={loading}
                            >
                                Delete
                            </Button>
                        </>
                        
                    </Box>
                </Animatable.View>
            </Box>
        </ScrollView>
    )
}

export default ImageDetailScreen

const styles = StyleSheet.create({})
