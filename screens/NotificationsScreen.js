import React,{Component} from 'react'
import {View,StyleSheet,Text,Image,TouchableOpacity,TextInput,Alert,Morda,KeyboardAvoidingView} from 'react-native'
import SwipeableFlatList from '../Components/SwipableFlatList'
import MyHeader from '../Components/myheader'
import db from '../config'
import firebase from 'firebase'

export default class NotificationScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            UserId: firebase.auth().currentUser.email,
            AllDonations: []
        }
        this.notificationRef = null
    }
    keyExtractor=(item,index)=>index.toString()
    renderItem = ({item,index})=>(
        <ListItem
        key = {index}
        title = {item.book_name}
        subtitle = {item.message}
        leftElement = {<Icon name = "book"type = "font-awesome" color = 'yellow'/> }
        titleStyle = {{color:'black',fontWeight:'bold'}}
        bottomDivider
        />
    )

    
    
    render(){
        return(
            <View>
            <MyHeader title="Notifications" navigation ={this.props.navigation}/>
            <View>
                {
                    this.state.AllNotifications.length === 0
                    ?
                    (
                        <View><Text> No Notifications </Text></View>
                    )
                    :(
                        <SwipeableFlatList
                        allNotifications = {this.state.allNotifications}
                        />
                    )


                }
            </View>
        </View>
        )
    }
}