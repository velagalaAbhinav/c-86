import React,{Component} from 'react'
import {View,StyleSheet,Text,Image,TouchableOpacity,TextInput,Alert,Modal,KeyboardAvoidingView} from 'react-native';
import db from '../config';
import firebase from 'firebase'
import MyHeader from '../Components/myheader'

export default class BookRequestScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            userId: firebase.auth().currentUser.email,
            bookName:'',
            reasonToRequest:'',
            isBookRequestActive : "",
            reuqestedBookName:"",
            BookStatus:"",
            RequestId:"",
            UserDocId:"",
            DocId:""
        }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }
    addRequest = async(bookName,reasonToRequest)=>{
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection('requested_books').add({
            user_Id: userId,
            book_name:bookName,
            reason_request:reasonToRequest,
            request_Id: randomRequestId
        })
        await this.getBookRequest()
        db.collection("users").where('email_id','==',userId).get()
        .then()
        .then((snapshot)=>{
            snapshot.forEach(doc =>{
                db.collection("users").doc(doc.id).update({
                    isBookRequestActive:true
                })
            })
        })
        this.setState({
            bookName:'',
            reasonToRequest:'',
            RequestId:randomRequestId
        })
        return Alert.alert('bookRequestedSuccessfully')
    }

    recievedBooks = (bookName) =>{
        var UserId = this.state.UserId
        var RequestId = this.state.RequestId
        db.collection("recieved_books").add({
            user_Id:UserId,
            book_name:bookName,
            request_Id:RequestId,
            BookStatus:"recieved"
        })
    }

    getIsBookRequestActive = ()=>{
        db.collection("users").where('email_id','==',this.state.UserId)
        .onSnapShot(querySnapshot =>{
            querySnapshot.forEach(doc =>{
                this.setState({
                    isBookRequestActive:doc.data().thisbookRequestActive,
                    UserDocId:doc.id
                })
            })
        })
    }

    getBookRequest = ()=>{
        var bookRequest = db.collection("requested_books").where('user_Id','==',this.state.UserId).get()
        .then((snapshot)=>{
            snapshot.forEach(doc =>{
                if(doc.data().book_status!== 'recieved'){
                    this.setState({
                        RequestId:doc.data().request_Id,
                        reuqestedBookName:doc.data().book_name,
                        BookStatus:doc.data().book_status,
                        docId:doc.id
                    })
                }
            })
        })
    }

    componentDidMount(){
        this.getBookRequest()
        this.getIsBookRequestActive()
    }
 
    updateBookRequestStatus = () => { 
        db.collection('requested_books').doc(this.state.docId)
        .update({
            book_status:'recieved'
        })
        db.collection("users").where('email_id','==',userId).get()
        .then()
        .then((snapshot)=>{
            snapshot.forEach(doc =>{
                db.collection("users").doc(doc.id).update({
                    isBookRequestActive:false
                })
            })
        })
    }

    sendNotification = ()=>{
        db.collection("users").where('email_id','==',userId).get()
        .then((snapshot)=>{
            snapshot.forEach(()=>{
                var name = doc.data().first_name
                var lastName = doc.data().last_name
                
            })
        })
    }
    
    render(){
        return(
            <View>
          <MyHeader title = {'requestBook'}/>
          <KeyboardAvoidingView>
          <TextInput
                                 style = {styles.formTextInput}
                                 placeholder = {"enter book name "}
                                 onChangeText = {(text)=>{
                                     this.setState({
                                        bookName:text
                                     })
                                 }}
                                 value={this.state.bookName}
                                />

                                <TextInput
                                style = {[styles.formTextInput,{height:300}]}
                                multiline
                                numberOfLines = {8}
                                placeholder = {"why do you need the book"}
                                onChangeText = {(text) => {
                                    this.setState ({
                                        reasonToRequest:text
                                    })
                                }}
                                value={this.state.reasonToRequest}
                                />
                                <TouchableOpacity
                                style = {styles.button}
                                onPress={()=>{this.addRequest(this.state.bookName,this.state.reasonToRequest)}}
                                >
                                    <Text>Request</Text>
                                </TouchableOpacity>

          </KeyboardAvoidingView>
                
            </View>
        )
    }
}