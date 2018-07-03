import React from "react"
import cmtitem from "@/less/cmtitem.less"
//import bootcss from "bootstrap/dist/css/bootstrap.css"
import { message,Button,Checkbox } from 'antd';
export default class CmtItem extends React.Component{
    constructor(props){
        super(props);
        this.handleOnChange=this.handleOnChange.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.handleEdit=this.handleEdit.bind(this);
    }

    handleOnChange(e){
        let num=this.props.item.num;
        let events=JSON.parse(localStorage.getItem("events"));
        if(e.target.checked){
            events[num]["check"]="1";
        }else{
            events[num]["check"]="0";
        }
        let ev=JSON.stringify(events);
        localStorage.setItem("events",ev);
    }
    handleDelete(){
        let num=this.props.item.num;
        let events=JSON.parse(localStorage.getItem("events"));
        delete events[num];
        let e=JSON.stringify(events);
        localStorage.setItem("events",e);
        message.info("删除成功");
    }
    handleEdit(){
        let msg={display:"block"};
        this.props.showPanel(msg);
        this.props.neededMsg(JSON.parse(localStorage.getItem("events"))[this.props.item["num"]]);
    }
    render(){
        let item=this.props.item;
        return(
            <li className={cmtitem.item} key={item.num}>
                <span className={cmtitem.title} style={item.style}>{item.title}</span>
                {/* <input className={cmtitem.checkbox} type="checkbox" checked={item.check=="0"?false:true} onChange={this.handleOnChange}/>
                <button className={cmtitem.edit} onClick={this.handleEdit}>编辑</button>
                <button className={cmtitem.delete} onClick={this.handleDelete}>删除</button> */}
                <Checkbox className={cmtitem.checkbox} checked={item.check=="0"?false:true} onChange={this.handleOnChange}/>
                <Button size="small" className={cmtitem.edit} onClick={this.handleEdit}>编辑</Button>
                <Button size="small" className={cmtitem.delete} onClick={this.handleDelete}>删除</Button>
                <span className={cmtitem.content} style={item.style}>{item.content}</span>
                <span className={cmtitem.timer} style={item.style}>{item.timer}</span>
            </li>
        );
    }
}