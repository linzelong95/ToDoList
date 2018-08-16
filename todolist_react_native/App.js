import React from "react";
import ToDoListMain from "./ToDoList/ToDoListMain";
import ToDoListAdd from "./ToDoList/ToDoListAdd";
import ToDoListEdit from "./ToDoList/ToDoListEdit";



export default class App extends React.Component{
  
  state={
    isEditin:false,//多选状态
    editItem:{},
    current:"main",//展示界面 
    isAllChecked:false,//是否全选
    todoList:[
      {
        level: 'info',
        detail: '一般的任务',
        isChecked: false,
        key: '0'
      },
      {
          level: 'warning',
          detail: '较重要的任务',
          isChecked: false,
          key:'1'
      },
      {
          level: 'error',
          detail: '非常重要且紧急的任务',
          isChecked: false,
          key: '2'
      }
    ]
  }

  //启动多选
  onEdit=()=>this.setState({isEditing:!this.state.isEditing});

  //全选与反选
  toggleCheckAll=()=>{
    const {todoList,isAllChecked}=this.state;
    this.setState({
      todoList:todoList.map(item=>({...item,isChecked:!isAllChecked})),
      isAllChecked:!isAllChecked
    });
  }

  //每个事件的选中与反选
  toggleItemCheck=(key)=>{
    const {todoList}=this.state;
    this.setState({
      todoList:todoList.map(newItem=>newItem.key==key?{...newItem,isChecked:!newItem.isChecked}:newItem)
    });
  }

  //返回
  onBack=()=>this.setState({current:"main"});

  //点击添加
  onAddItem=()=>this.setState({current:"add"});
  
  //完成内容的添加
  addText=(text)=>{
    const {todoList}=this.state;
    const item={
      level:"info" ,
      detail:text,
      isChecked:false,
      key:todoList.length.toString()
    }
    this.setState({todoList:[...todoList,item],current:"main"});
    alert("添加成功");
  }

  //删除
  deleteItem=()=>{
    const {todoList}=this.state;
    this.setState({
      isEditing:false,
      todoList:todoList.filter(item=>item.isChecked!==true)
    });
    alert("删除成功");
  }

  //点击编辑
  editing=(editItem)=>this.setState({current:"edit",editItem});

  //完成编辑
  refesh=(detail,key)=>{
    const {todoList}=this.state;
    this.setState({
      todoList:todoList.map(item=>item.key==key?{...item,detail}:item),
      current:"main"
    })
    alert("更新成功");
  }

  render(){
    const {current,todoList,isAllChecked,editItem,isEditing}=this.state;
    if(current==="main"){
      return(
        <ToDoListMain
          isAllChecked={isAllChecked}
          toggleCheckAll={this.toggleCheckAll}
          toggleItemCheck={this.toggleItemCheck}
          onAddItem={this.onAddItem}
          deleteItem={this.deleteItem}
          todoList={todoList}
          isEditing={isEditing}
          editing={this.editing}
          onEdit={this.onEdit}
        />
      );
    }else if(current==="add"){
      return(
        <ToDoListAdd 
          onBack={this.onBack}
          addText={this.addText}
        />
      );
    }else{
      return(
        <ToDoListEdit 
          onBack={this.onBack}
          addText={this.addText}
          editItem={editItem}
          refesh={this.refesh}
        />
      );
    }
    
  }
}







