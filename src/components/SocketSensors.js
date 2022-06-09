import { StyleSheet,View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Button, Flex,Heading,Switch,Text, useToast } from 'native-base'

const SocketSensors = ({sensors,socket}) => {
    const toast = useToast()
    const [loading,setLoading] = useState(false)
    const [status,setStatus] = useState('')
    const changeSensorStatue = (sensor) =>{
        console.log("change  state")
        if(!socket) return
        if(sensor === "flash"){
            socket.emit(sensors.F ? "FF" : "OF")
            // setSensors({...sensors,F:!(sensors.F)})
            return
        }
        if(sensor === "sound"){
            // setSensors({...sensors,S: !(sensor.S)})
            console.log("changeing sound sensor")
            socket.emit(sensors.S ? "FS" : "OS")
            return
        }
        if(sensor === "uv"){
            
            socket.emit(sensors.U ? "FU" : "OU")
            // setSensors({...sensors,U:!(sensors.U)})
            return
        }
    }
    const sendCaptureRequest = () => {
        if(!socket) return
        socket.emit("capture-image", "rootrsk")
    }
    
    useEffect(()=>{
        if(socket){
            socket.on('camera-update', (data) => {
                console.log(data)
                setStatus(data.status)
                if (data.status === 'requested') {
                    toast.show({
                        title: "Image status",
                        status: 'sucess',
                        placement: 'bottom-right',
                        description: 'Capture Image Requested by '+data.by,
                        duration: 2000
                    })
                    setLoading(true)
                    return
                }
                if (data.status === 'uploaded') {
                    toast.show({
                        title: "Image status",
                        status: 'sucess',
                        placement: 'bottom-right',
                        description: `Image ${data.status}`,
                        duration: 2000
                    })
                    setLoading(false)
                    return
                }
                // if (data.status === 'captured') {
                //     toast.show({
                //         title: "Image status",
                //         status: 'sucess',
                //         placement: 'top-right',
                //         description: `Image ${data.status}`,
                //         duration: 2000
                //     })
                //     return
                // }

            })
        }
        return ()=>{}
    }, [])
    
    return (
        <Box>
            <Flex 
                direction='row' 
                m='5'
                mb='1' 
                justify='space-between' 
                bg='blueGray.900' 
                p='4' 
                borderRadius={5} 
                _light={{
                    bg:'white'
                }}
                _dark={{
                    bg:'black',
                    borderColor:'white',
                    borderWidth:'1',
                    shadow:2
                    
                }}
            >
                <Text 
                    _light={{
                        color:'black'
                    }}
                >Camera</Text> 
                <Flex direction='row'>
                    <Text 
                        _light={{
                            color:'black'
                        }}
                    >{sensors.A?'Connected':"Disconnected"}</Text>
                    <Box 
                        w={5} 
                        h={5}
                        ml='2'
                        mr='2' 
                        borderRadius={50} 
                        bg={`${sensors.A?'green.400':'red.500'}`} 
                    ></Box>
                    
                </Flex>
            </Flex>
            <Flex direction='row' justify={'space-between'} m='5' 
                mb='1' 
            >
                <Box 
                    p='3' 
                    bg='white' 
                    alignItems={'center'} 
                    borderRadius={5}
                    _white={{
                        bg:'white'
                    }}
                    _dark={{
                        bg: 'black',
                        borderColor:'white',
                        borderWidth:'0.3px',
                        shadow:2
                    }}
                >
                    <Box 
                        w={5} 
                        h={5} 
                        borderRadius={50} 
                        bg={`${sensors.S?'green.400':'red.500'}`} 
                    >
                    </Box>
                    <Switch
                        isChecked={sensors.S}
                        onChange={(e)=>{
                            changeSensorStatue("sound")
                        }}
                    />
                    <Text 
                        _light={{
                            color:'black'
                        }}    
                        
                    >Sound</Text>
                </Box>
                <Box p='3' bg='gray.900' alignItems={'center'} borderRadius={5}
                
                    _light={{
                        bg:'white'
                    }}
                    _dark={{
                        bg: 'black',
                        borderColor:'white',
                        borderWidth:'0.3px',
                        shadow:2
                    }}
                >
                    <Box 
                        w={5} 
                        h={5} 
                        borderRadius={50} 
                        bg={`${sensors.F?'green.400':'red.500'}`} 
                    >
                    </Box>
                    <Switch
                        isChecked={sensors.F}
                        onChange={(e)=>{
                            changeSensorStatue("flash")
                        }}
                    />
                    <Text 
                        _light={{
                            color:'black'
                        }}    
                        
                    >Flash</Text>
                </Box>
                <Box p='3' bg='gray.900' alignItems={'center'} borderRadius={5}
                    _light={{
                        bg:'white'
                    }}
                    _dark={{
                        bg: 'black',
                        borderColor:'white',
                        borderWidth:'0.3px',
                        shadow:2
                    }}
                >
                    <Box 
                        w={5} 
                        h={5} 
                        borderRadius={50} 
                        bg={`${sensors.U?'green.400':'red.500'}`} 
                    >
                    </Box>
                    <Switch
                        isChecked={sensors.U}
                        onChange={(e)=>{
                            changeSensorStatue("uv")
                        }}
                    />
                    <Text 
                        _light={{
                            color:'black'
                        }}    
                        
                    >Motion</Text>
                </Box>
            </Flex>  
            <Flex 
                m='5' p='3' 
                direction='row' 
                justify='space-between' 
                bg='blueGray.900'
                alignItems='center' 
                borderRadius={5}
                mb='1' 
                _light={{
                        bg:'white'
                    }}
                _dark={{
                    bg: 'black',
                    borderColor:'white',
                    borderWidth:'0.3px',
                    shadow:2
                }}
            >
                <Text color='white' >{status.toUpperCase()}</Text>
                <Button 
                    onPress={sendCaptureRequest} 
                    // bg='white'
                    _light={{
                        bg:'darkBlue.900'
                    }}
                    _hover={{
                        bg:'black'
                    }}
                    _pressed={{
                        bg:'darkBlue.700',
                    }}
                    isLoading={loading}
                >
                    Capture Image
                </Button>
            </Flex>  
        </Box>
         
    )
}

export default SocketSensors

const styles = StyleSheet.create({})