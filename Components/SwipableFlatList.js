import React,{Component} from 'react'
import {View,StyleSheet,Text,Image,TouchableOpacity,TextInput,Alert,Morda,KeyboardAvoidingView,Animated,TouchableHighlight,Dimensions} from 'react-native'
import {ListItem,Icon} from 'react-native-elements'
import {SwipeListView} from 'react-native-swipe-list-view'
import db from '../config'

export default class SwipeableFlatList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allNotifications: this.props.allNotifications,

        }
    }
    renderItem = (data)=>(
        <Animated.View>
        <ListItem
        
        title = {data.item.book_name}
        subtitle = {data.item.message}
        leftElement = {<Icon name = "book"type = "font-awesome" color = 'yellow'/> }
        titleStyle = {{color:'black',fontWeight:'bold'}}
        bottomDivider
        />
        </Animated.View>
    )

    renderHiddenItem = ()=>(
        <View style = {styles.RowBack}>
            <View style = {[style.backRightBtn, styles.backRightBtnRight]}>
                <Text style = {styles.BackText}>mark as read</Text>
            </View>
        </View>
    )

    updateMarkAsRead = (notification) =>{
        db.collection('all_Notifications')
        .doc(notification.doc_id)
        .update({
            notification_status: "read"
        })
    }

    OnSwipeValueChange = (swipeData) =>{
        var allNotifications = this.state.allNotifications
        const {Key,value} = swipeData
        if(value<-Dimensions.get("window").width){
            constNewData = [...allNotifications]
            this.updateMarkAsRead(allNotifications[Key])
            newData.splice(Key,1)
            this.setState({
                allNotifications:newData,
            })
        }
    }



    
    render(){
        return(
            <View style = {styles.container}>
                <SwipeListView
                disableRightSwipe
                data = {this.state.allNotifications}
                renderItem = {this.renderItem}
                renderHiddenItem = {this.renderHiddenItem}
                RightOpenValue = {-Dimensions.get("window").width}
                previewRowKey  = {"0"}
                previewOpenValue = {-40}
                previewOpenDelay = {3000}
                OnSwipeValueChange = {this.OnSwipeValueChange}
                keyExtractor = {(index,item) => index.toString()}
                />
            </View>
        )
    }
}
