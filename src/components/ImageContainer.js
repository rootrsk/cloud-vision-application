import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Box, Image } from 'native-base'

const ImageContainer = ({image,navigation}) => {
    // console.log(image.image.uri)
    const dateTime = new Date(image.captured_at)
    const navigateToImage = () =>{
        console.log('navigate to image')
        if(navigation){
            navigation.navigate('Image',{image})
        }
    }
    return (
        <TouchableOpacity onPress={navigateToImage} >
            <Box s='2' bg='white' m='5'borderRadius={3} overflow={'hidden'}
                mb = '1'
            >
                <Image 
                    source={{uri:image.uri}}
                    alt="ddd"
                    // m='5'
                    maxW={400}
                    h={200}
                    
                />
                <Text style={styles.time} >{dateTime.toString()}</Text>
            </Box>
        </TouchableOpacity>
    )
}

export default ImageContainer

const styles = StyleSheet.create({
    imageContainer:{
        
    },
    time:{
        fontSize:20,
        textAlign:'center',
        padding:5,
        paddingBottom:10
    }

})