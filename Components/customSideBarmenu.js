import React,{Component} from 'react';
import {View,StyleSheet,text,Image,TouchableOpacity,TextInput,Alert,Modal,KeyboardAvoidingViewComponent} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer'

export default class customSideBarMenu extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <View style = {styles.drawerItemsContainer}>
                    <DrawerItems{...this.props}/>
                </View>
                <View style = {styles.logOutContainer}>
                    <TouchableOpacity style = {styles.logOutButton}
                    onPress = {()=>{
                        this.props.navigation.navigate('WelcomeScreen')
                        firebase.auth().signOut()
                    }}>
                        <Text>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container : {
      flex:1
    },
    drawerItemsContainer:{
      flex:0.8
    },
    logOutContainer : {
      flex:0.2,
      justifyContent:'flex-end',
      paddingBottom:30
    },
    logOutButton : {
      height:30,
      width:'100%',
      justifyContent:'center',
      padding:10
    },
    logOutText:{
      fontSize: 30,
      fontWeight:'bold'
    }
  })