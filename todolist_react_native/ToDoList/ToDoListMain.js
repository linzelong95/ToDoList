import React from "react";
import {View,Text,FlatList,CheckBox,StyleSheet,Button} from "react-native";
import ToDoListItem from "./ToDoListItem"

const ToDoListMain =(props)=>{
    const {isAllChecked,toggleCheckAll,onAddItem,todoList,deleteItem,editing,toggleItemCheck,isEditing,onEdit}=props;
    return(
        <View>
            <View style={styles.nav}>
                <Text onPress={onAddItem} style={styles.add}>添加</Text>
                <Text style={styles.willdo}>待办事项</Text>
                <Text onPress={onEdit} style={styles.select}>{isEditing?"取消":"选择"}</Text>
            </View>
            <FlatList data={todoList} extraData={props} renderItem={({item})=><ToDoListItem key={item.key} item={item} editing={editing} toggleItemCheck={toggleItemCheck} isEditing={isEditing} />}/>
            {
                isEditing &&
                <View style={styles.bottom}>
                    <View style={styles.bottomLeft}>
                        <CheckBox onValueChange={toggleCheckAll} value={isAllChecked}/>
                        <Text style={{padding:6}}>{isAllChecked?"反选":"全选"}</Text>
                    </View>
                    <View style={styles.bottomRight}>
                        <Text style={{padding:6}}>已选择{todoList.filter(item=>item.isChecked).length}项</Text>
                        <Button title="删除" onPress={deleteItem}/>
                    </View>
                </View>
            }
        </View>  
    );
}

const styles=StyleSheet.create({
  nav:{
    flexDirection:"row",
    justifyContent:"space-between",
    backgroundColor:"lightgreen",
  },
  add:{
      marginLeft:8,
      fontSize:20,
  },
  select:{
    marginRight:8,
    fontSize:20,
  },
  willdo:{
    fontSize:20,
  },
  bottom:{
    flexDirection:"row",
    justifyContent:"space-between",
    backgroundColor:"gray",
    height:50,
    padding:8,
    marginTop:25,
  },
  bottomLeft:{
    flexDirection:"row"
  },
  bottomRight:{
    flexDirection:"row",
  }
});

export default ToDoListMain;