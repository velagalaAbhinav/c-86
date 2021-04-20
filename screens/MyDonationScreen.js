import React,{Component} from 'react'
import{View,StyleSheet,Text,Image,TouchableOpacity,TextInput,Alert,Morda,KeyboardAvoidingView} from 'react-native'
import db from '../config';
import firebase from 'firebase'
import MyHeader from '../Components/myheader'

export default class MyDonation extends React.Component{
    static navigationOptions = {header:null}
    constructor(props){
        super(props)
        this.state = {
            UserId: firebase.auth().currentUser.email,
            AllDonations: []
        }
        this.requestRef = null
    }

    sendBook = (bookDetails)=>{
        if(bookDetails.request_status === "book sent"){
            var requestStatus = "donorInterested"
            db.collection("All_donation").doc(bookDetails.doc_Id).update({
                request_status:"donorInterested"
            })
            this.sendNotifications(bookDetails,requestStatus)
        }
        else{
            var requestStatus = "BookSent"
            db.collection("All_donations").doc(bookDetails.doc_Id).update({
                request_status:"BookSent"
            })
            this.sendNotifications(bookDetails,requestStatus)
        }
    }
    sendNotifications = (bookDetails,requestStatus)=>{
        var RequestId = bookDetails.request_Id
        var donorId = bookDetails.donor_Id
        db.collection("All_notifications")
        .where("request_Id","==",RequestId)
        .where("Donor_Id","==",donorId)
        .get()
        .then((snapshot)=>{
            snapshot.ForEach((doc)=>{
                var message = ""
                if(requestStatus === "book sent" ){
                    message = this.state.donorName + "sent u the book"
                }
                else{
                    message = this.state.donorName + "has Shown interest in donating the book"

                }
                db.collection("all_notifications").doc(doc.id).update({
                    message:message,
                    notification_status:"unread",
                    date:firebase.firestore.Fieldvalue.serverTimeStamp(),

                })
            }) 
        })
    }
    getAllDonations =()=>{
        this.requestRef = db.collection('All_Donations').where("donar_Id",'==',this.state.UserId)
        .onSnapshot((snapshot)=>{
            var AllDonations= snapshot.docs.map(document => document. data())
            this.setState({
                AllDonations: AllDonations
            })
        })
    }

    keyExtractor = (item,index) =>index.toString()
    renderItem = ({item,i})=>(
        <ListItem
        key = {i}
        title = {item.book_name}
        subtitle = {"requested by:" + item.requested_by+"\nStatus:" + item.request_status}
        leftElement = {<Icon name = "book"type = "font-awesome" color = 'yellow'/> }
        titleStyle = {{color:'black',fontWeight:'bold'}}
        rightElement = {
            <TouchableOpacity style = {styles.button}
            onPress={()=>{
                this.sendBook(item)
            }}>

                <Text>Send Book</Text>

            </TouchableOpacity>
        }
        bottomDivider
        />
    )

    componentDidMount(){
        this.getAllDonations()
    }
    componentWillUnmount(){
        this.requestRef()
    }
    
    render(){
        return(
            <View>
            <MyHeader title="My Donations" navigation ={this.props.navigation}/>
            <View>
                {
                    this.state.AllDonations.length === 0
                    ?
                    (
                        <View><Text> List of all donated books </Text></View>
                    )
                    :(
                        <FlatList
                        keyExtractor = {this.keyExtractor}
                        data = {this.state.AllDonations}
                        renderItem = {this.renderItem}
                        />
                    )


                }
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
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
