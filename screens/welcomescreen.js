import React,{Component} from'react';
import {View,StyleSheet,Text,Image,TouchableOpacity,TextInput,Alert,Modal, KeyboardAvoidingViewComponent} from 'react-native';
import db from '../config';
import firebase from 'firebase'
import MyHeader from '../Components/myheader'


 
export default class WelcomeScreen extends Component{
    constructor(){
        super()
            this.state = {
                emailId: '',
                password:'',
                firstName:'',
                lastName:'',
                Address:'',
                Contact:'',
                ConfirmPassword:'',
                isModalVisible: 'false'
            }
        }

          userLogin = (emailId, password)=>{
              firebase.auth().signInWithEmailAndPassword(emailId,password)
              .then(()=>{
                 this.props.navigation.navigate('Donate')
              })
              .catch((error)=>{
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  return Alert.alert(errorMessage)
              })
          }

          userSignUp = (emailId,password,ConfirmPassword)=>{
              if(password !== ConfirmPassword){
                  return Alert.alert('password doesnt match')
              }
              else{

              
              firebase.auth().createUserWithEmailAndPassword(emailId,password)
              .then(()=>{
                  db.collection("users").add({
                    first_Name: this.state.firstName,
                  last_Name: this.state.last_Name,
                  Contact: this.state.Contact,
                  email_id:this.state.emailId,
                  Address:this.state.Address,
                  isBookRequestActive: false
                  })
                  return Alert.alert("User Added Successfully", "", [ { text: "OK", onPress: () => this.setState({ isModalVisible: false }) } ])
              })
              .catch(function(error){
                  //Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.code;
                  var errorMessage = error.message;
                  return Alert.alert(errorMessage)
              })
            }
          }

          showModal = ()=>{
              return(
                  <Modal
                      animationType = "fade"
                      transparent = {true}
                      visible = {this.state.isModalVisible}
                 >
                     <View style = {styles.modalContainer}>
                         <ScrollView style = {{width:'100%'}}>
                             <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
                                 <Text
                                 style = {styles.modalTitle}
                                 >Registration</Text>
                                 <TextInput 
                                 style = {styles.formTextInput}
                                 placeholder={"First Name"}
                                 maxLength = {8}
                                 onChangeText={(text)=>{
                                     this.setState({
                                         firstName: text
                                     })
                                 }}
                                 />

                                 <TextInput
                                 style = {styles.formTextInput}
                                 placeholder = {"last name"}
                                 maxLength = {8}
                                 onChangeText = {(text)=>{
                                     this.setState({
                                        lastName:text
                                     })
                                 }}
                                />

                                <TextInput
                                style = {styles.formTextInput}
                                placeholder = {"Contact"}
                                maxLength = {10}
                                keyboardType = {"numeric"}
                                onChangeText = {(text) => {
                                    this.setState ({
                                        Contact:text
                                    })
                                }}
                                />

                            <TextInput
                                style = {styles.formTextInput}
                                placeholder = {"Address"}
                                multiline = {true}
                                onChangeText = {(text) => {
                                    this.setState ({
                                        Address:text
                                    })
                                }}
                                />

                            <TextInput
                                style = {styles.formTextInput}
                                placeholder = {"Email"}
                                keyboardType = {"email-address"}
                                onChangeText = {(text) => {
                                    this.setState ({
                                        Email:text
                                    })
                                }}
                                />

                            <TextInput
                                style = {styles.formTextInput}
                                placeholder = {"password"}
                               secureTextEntry = {true}
                                onChangeText = {(text) => {
                                    this.setState ({
                                        password:text
                                    })
                                }}
                                /> 
                                
                            <TextInput
                                style = {styles.formTextInput}
                                placeholder = {"ConfirmPassword"}
                               secureTextEntry = {true}
                                onChangeText = {(text) => {
                                    this.setState ({
                                        ConfirmPassword:text
                                    })
                                }}
                                />
                                <View>
                                    <TouchableOpacity
                                    style = {styles.registerButton}
                                    onPress={()=>{
                                        this.userSignUp(this.state.emailId,this.state.password,this.state.ConfirmPassword)
                                    }}>
                                        <Text>register</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity
                                    style = {styles.CancelButton}
                                    onPress={()=>{
                                        this.setState({"isModalVisible":false})
                                    }}>
                                        <Text>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                                
                                </KeyboardAvoidingView>
                         </ScrollView>
                     </View>
                 </Modal>
              )
          } 
          

        render(){
            return(
                <View>
                    <View>
                     <TextInput
                     style={styles.loginBox}
                     placeholder= 'emailId'
                     placeholderTextColor= 'green'
                     KeyboardType='email-address'
                     onChangeText={
                         (text)=>{
                             this.setState({
                                 emailId: text
                             })
                         }
                     }
                     />
                     <TextInput
                     style={styles.loginBox}
                     secureTextEntry = {true}
                     placeholder='password'
                     placeholderTextColor= 'yellow'
                     onChangeText={
                         (text)=>{
                             this.setState({
                                password: text
                             })
                         }
                     }
                     />
                     <TouchableOpacity
                     style = {styles.button}
                     onPress={
                         ()=>{
                             this.userLogin(this.state.emailId,this.state.password)
                         }
                     }>
                         <Text style = {styles.buttonText}>login</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                     style={styles.button}
                     onPress={
                         ()=>{
                            this.setState({
                                isModalVisible:true
                            })
                     }
                    }>
                         <Text style = {styles.buttonText}>sign up</Text>
                     </TouchableOpacity>


                    </View>
                </View>
            )
        }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#F8BE85'
    },
    profileContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    title :{
      fontSize:65,
      fontWeight:'300',
      paddingBottom:30,
      color : '#ff3d00'
    },
    loginBox:{
      width: 300,
      height: 40,
      borderBottomWidth: 1.5,
      borderColor : '#ff8a65',
      fontSize: 20,
      margin:10, 
      paddingLeft:10
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
    buttonText:{
      color:'#ffff',
      fontWeight:'200',
      fontSize:20
    },
    buttonContainer:{
      flex:1,
      alignItems:'center'
    }
  })