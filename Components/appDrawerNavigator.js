import React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './AppTabNavigator'
import {customSideBarMenu} from './customSideBarmenu'
import SettingsScreen from '../screens /settingsScreen'
import myDonationScreen from '../screens /MyDonationScreen'
import NotificationScreen from '../screens /NotificationsScreen'

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
        screen:AppTabNavigator
    },
    myDonation:{
        screen:myDonationScreen
    },
    Notification:{
        screen:NotificationScreen
    },
    settings:{
        screen:SettingsScreen
    }
},
{
    contentComponent:customSideBarMenu
},
{intialRouteName:'Home'


})