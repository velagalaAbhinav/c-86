import React,{Component} from 'react'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import BookDonateScreen from '../screens/bookDonateScreen'
import BookRequestScreen from '../screens/bookRequestScreen'

export const AppTabNavigator = createBottomTabNavigator({
    donateBooks: {
        screen:BookDonateScreen,
        NavigationOptions:{
            tabBarIcon : <Image source = {require("../assets/requsts-list.png")} style = {{width:20,height:20}}/>,
            tabBarLabel:"Donate Books"
        }
    },
    BookRequest:{
        screen:BookRequestScreen,
        NavigationOptions:{
            tabBarIcon : <Image source = {require("../assets/request-book.png")} style = {{width:20,height:20}}/>,
            tabBarLabel:"Request Books"
        }
    }
})