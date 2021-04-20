import React,{Component} from 'react'
import{View,StyleSheet,Text,Image,TouchableOpacity,TextInput,Alert,Morda,KeyboardAvoidingView} from 'react-native'
import db from '../config';
import firebase from 'firebase'
import MyHeader from '../Components/myheader'

export default class RecieverDetailsScreens extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userId: firebase.auth().currentUser.email,
            RecieverId: this.props.navigation.getParam('details')["user_Id"],
            RequestId: this.props.navigation.getParam('details')["request_Id"],
            BookName: this.props.navigation.getParam('details')["book_name"],
            reason_for_requesting: this.props.navigation.getParam('details')["Reason_to_Request"],
            receiverName: '',
            recieverContact:'',
            recieverAddress:'',
            recieverRequestDocId:''
        }
    }
    AddNotification = ()=>{
        var message = this.state.username + "has shown interest in donating the book"
        db.collection('all_Notifications').add({
            targeted_User_Id: this.state.RecieverId,
            donor_Id:this.state.userId,
            request_Id:this.state.requestId,
            book_name:this.state.BookName,
            date:firebase.firestore.FieldValue.serverTimeStamp(),
            Notification_Status:"unread",
            message:message
        })
    }
    updateBookStatus = ()=>{
        db.collection('all_Donations').add({
            book_name:this.state.BookName,
            request_Id: this.state.RequestId,
            Requested_by: this.state.receiverName,
            Donar_Id: this.state.userId,
            request_status: "dono interested"
        })
    }

    componentDidMount(){
        this.getRecieverDetails()
    }
    getRecieverDetails = ()=>{
        db.collection('Users').where('email_id','==',this.state.RecieverId).get()
            .then(snapshot =>{
                snapshot.forEach(doc=>{
                    this.setState({
                        receiverName:doc.data().first_name,
                        recieverContact:doc.data().Contact,
                        recieverAddress:doc.data().Address
                    })
                })
            }
        )
        db.collection('requested_books').where('request_id','==',this.state.requestId).get()
            .then(snapshot=>{
                snapshot.forEach(doc=>{
                    this.setState({
                        recieverRequestDocId:doc.id
                    })
                })
            })
    }
    
    render(){
        return(
            <View>
                <View style = {{flex:0.1}}>
                    <Header
                    leftComponent = {<Icon name = 'arrow-left'type='feather'color='green' onPress ={()=>this.props.navigation.goBack()}/>}
                    centerComponent = {{text:"donate books",style:{color:'black',fontSize:20,fontWeight:"bold",}}}
                    backgroundColor = "red"
                    />
                </View>
                <View style ={{flex:0.3}}>
                    <Card
                    title = {"book information"}
                    titleStyle = {{fontSize:20}}>
                        <Card>
                            <Text style = {{fontWeight:'bold'}}>
                                name:{this.state.BookName}
                            </Text>
                        </Card>
                        <Card>
                            <Text style = {{fontWeight:'bold'}}>
                                Reason:{this.state.reason_for_requesting}
                            </Text>
                        </Card>

                    </Card>
                </View>
                <View style = {{flex:0.3}}>
                    <Card
                    title = {"reciever information"}
                    titleStyle = {{fontSize:20}}>
                        <Card>
                            <Text style = {{fontWeight:'bold'}}>
                                name:{this.state.receiverName}
                            </Text>
                        </Card>
                        <Card>
                            <Text style = {{fontWeight:'bold'}}>
                                Contact:{this.state.recieverContact}
                            </Text>
                        </Card>

                        <Card>
                            <Text style = {{fontWeight:'bold'}}>
                                Address:{this.state.receiverAddress}
                            </Text>
                        </Card>

                     </Card>
                </View>
                <View style = {style.buttonContainer}>
                    {
                        this.state.RecieverId!== this.state.userId
                        ?(
                            <TouchableOpacity
                           style = {styles.button}
                           onPress={()=>{
                               this.updateBookStatus()
                               this.AddNotification()
                               this.props.navigation.navigate('MyDonations')
                               
                           }} >
                               <Text>I want to donate</Text>
                           </TouchableOpacity>
                        ):
                        null
                    }

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer : { 
        flex:0.3, 
        justifyContent:'center', 
        alignItems:'center' 
    },
    button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#ff9800",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
      },
})