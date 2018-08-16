import React from "react";
import {View,Text,Button,TextInput,StyleSheet} from "react-native";

export default class ToDoListAdd extends React.Component{
    state={
        text:""
    }
    textChange=(text)=>this.setState({text});

    render(){
        const {onBack,addText}=this.props;
        const {text}=this.state;
        return(
            <View style={styles.container}>
                <View>
                    <Text onPress={onBack} style={styles.back}>&lt;返回</Text>
                </View>
                <View>
                    <TextInput placeholder="请输入内容" onChangeText={this.textChange} value={text} style={styles.input} multiline={true}/>
                </View>
                <View>
                    <Button title="确定" onPress={()=>addText(text)}></Button>
                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    back:{
        marginLeft:8,
        fontSize:20,
    },
    input:{
        marginTop:50,
        borderWidth:1,
        borderColor:"gray",
        height:100
    }
  });