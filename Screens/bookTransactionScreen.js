import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet,TextInput,Image} from 'react-native';
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from  "expo-barcode-scanner";


export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state= {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: "",
            buttonState: "normal",
            scannedBookID: "",
            scannedStudentID: ""
        }
    }

    getCameraPermissions= async (IDvar)=>{
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState ({
            hasCameraPermissions: status==="granted",
            buttonState: IDvar,
            scanned: false
        })
    }

    handleBarcodeScanned= async ({type,data}) =>{
        this.setState ({
            scanned: true,
            scannedData: data,
            buttonState: "normal"
        })
    }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
    
        if(buttonState !== "normal" && hasCameraPermissions){
          return(
            <BarCodeScanner
              onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
              style = {StyleSheet.absoluteFillObject}
            />
          );
        }
    
        else if (buttonState === "normal"){
          return(
            <View style={styles.container}>
            <View>
              <Image
                source = {require("../assets/booklogo.jpg")}
                style= {{width:200, height:200}}/>
              <Text style={{textAlign:'center', fontSize:30,}}>Wily</Text>
            </View>
            <View style={styles.inputView}>
            <TextInput
              style={styles.inputBox}
              placeholder="Book Id"
              value={this.state.scannedBookId}/>
            <TouchableOpacity
              style={styles.scanButton}
              onPress={()=>{
                this.getCameraPermissions("BookId")
              }}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
            </View>
    
            <View style={styles.inputView}>
            <TextInput
              style={styles.inputBox}
              placeholder="Student Id"
              value={this.state.scannedStudentId}/>
            <TouchableOpacity
              style={styles.scanButton}
              onPress={()=>{
                this.getCameraPermissions("StudentId")
              }}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
            </View>
            <Text style={styles.transactionAlert}>{this.state.transactionMessage}</Text>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={async()=>{
                var transactionMessage = await this.handleTransaction();
              }}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          )
        }
      }
    }
    
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      displayText:{
        fontSize: 15,
        textDecorationLine: 'underline'
      },
      scanButton:{
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10
      },
      buttonText:{
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10
      },
      inputView:{
        flexDirection: 'row',
        margin: 20
      },
      inputBox:{
        width: 200,
        height: 40,
        borderWidth: 1.5,
        borderRightWidth: 0,
        fontSize: 20
      },
      scanButton:{
        backgroundColor: '#66BB6A',
        width: 50,
        borderWidth: 1.5,
        borderLeftWidth: 0
      },
      submitButton:{
        backgroundColor: '#FBC02D',
        width: 100,
        height:50
      },
      submitButtonText:{
        padding: 10,
        textAlign: 'center',
        fontSize: 20,
        fontWeight:"bold",
        color: 'white'
      }
    });