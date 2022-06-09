import { StyleSheet, Switch, Text, View } from 'react-native'
import React from 'react'
import { Box } from 'native-base'
import { connect } from 'react-redux'

const ArduinoScreen = (props) => {
    
    return (
        <Box>
            <Switch></Switch>
        </Box>
    )
}
const mapStateToProps = state => state
export default connect() (ArduinoScreen)

const styles = StyleSheet.create({})