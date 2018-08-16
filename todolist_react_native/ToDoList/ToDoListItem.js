import React from "react";
import {View,Text,StyleSheet,CheckBox,TouchableHighlight} from "react-native";

const ToDoListItem =({toggleItemCheck,item,isEditing,editing})=>{
    const {isChecked,detail,level,key}=item;
    return(
        <TouchableHighlight opacity={0.5} onPress={()=>editing(item)}>
            <View style={styles.container}>
                {
                    isEditing &&
                    <CheckBox 
                        onValueChange={(value)=>toggleItemCheck(key)}
                        value={isChecked}
                    />
                }
                <Text>{detail}</Text>
                <Text style={styles.level}>{level}</Text>
            </View>
        </TouchableHighlight>
    );
}
const styles=StyleSheet.create({
    container:{
      flexDirection:"row",
      backgroundColor:"yellow",
      height:40,
      marginTop:5,
      padding:8
    },
    level:{
        position:"absolute",
        right:8,
        top:8
    }
});
export default ToDoListItem;