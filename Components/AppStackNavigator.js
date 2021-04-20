import React,{Component} from 'react'
import {createStackNavigator} from 'react-navigation - stack'
import BookDonateScreen from '../screens /bookDonateScreen'
import RecieverDetailsScreens from '../screens /recieverdetailsScreen'

export const AppStackNavigator = createStackNavigator({
    bookDomateList: {
        screen:BookDonateScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    recieverDetailsList: {
        screen:RecieverDetailsScreens,
        navigationOptions:{
            headerShown:false
        }
    },
},
{
    intialRouteName:'bookDonateList'
    
})