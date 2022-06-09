import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Box,ScrollView, useToast } from 'native-base';
import { fetchImage } from '../redux/actions/image';
import { connect } from 'react-redux';
import ImageContainer from '../components/ImageContainer'
import SocketSensors from '../components/SocketSensors';

const DashboardScreen = (props) => {
    const toast = useToast()
    useEffect(()=>{
        if(props.savedImages&& props.savedImages.images  && props.savedImages.images.length >0){
            return
        }
        fetchImage()
    },[])
    return (
        <ScrollView 
            bg='gray.300' 
            h={900}
            _dark={{bg:'#002B39'}}    
        >
            <SocketSensors sensors={props.sensors} socket={props.socketConnection.socket}  />

            {
                props.savedImages && props.savedImages.images &&
                props.savedImages.images.map((image,index)=>{
                    return <ImageContainer image={image} navigation={props.navigation} key={index+1} />
                })
            }
        </ScrollView>
    )
}
const mapStateToProps = state =>state

export default connect(mapStateToProps) (DashboardScreen);

const styles = StyleSheet.create({});
