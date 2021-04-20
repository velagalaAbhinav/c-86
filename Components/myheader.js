import React,{Component} from 'react'
import{Header,Icon,Badge} from 'react-native-elements'
import {View,Text,StyleSheet,Alert} from 'react-native'


export default class MyHeader extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value:""
        }
    }
    getNumberOfUnreadNotification = ()=>{
        db.collection('All_Notification').where('Notification_status','==',"unread")
        onSnapshot((snapshot)=>{
            var unreadNotification = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                value: unreadNotification.length
            })
        })
    }
 bellIconWithBadge=(props)=>{
    return(
        <View>
        <Icon name = 'bell' type = 'font-awesome' color = 'black' size = {25} 
        onPress ={()=>{
            props.navigation.navigate('Notification')
        }}></Icon>
        <Badge value = {this.state.value}
        containerStyle = {{position:'absolute',top:-4,right:-4}}></Badge>
        </View>
    )
}
componentDidMount(){
    this.getNumberOfUnreadNotification()
}
render(){
    return(
        <Header
        leftConponent = {<Icon name = 'bars' type = 'font-awesome' color = 'green' onPress = {()=>{
            props.navigation.toggleDrawer()
        }}></Icon>}
        centerComponent = {{text:props.title, style:{color:'yellow',fontsize:20,fontWeight:"bold",}}}
       rightComponent = {<this.bellIconWithBadge {...props}/>}
        backgroundColor = "white"

        />
    )
}
}

