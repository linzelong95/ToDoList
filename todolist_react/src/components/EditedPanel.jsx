import React from "react"
import editedpanel from "@/less/editedpanel.less"
//import { DatePicker } from 'antd'
//import bootcss from "bootstrap/dist/css/bootstrap.css"

export default class EditedPanel extends React.Component{
    constructor(props){
        super(props);
        this.state={item:{},addMark:"0",fixedAddMark:"0"};
        this.exit=this.exit.bind(this);
        //this.add=this.add.bind(this);
        this.update=this.update.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    
    exit(){
        let msg={display:"none"};
        this.props.showPanel(msg);
        this.setState({fixedAddMark:"0"});
        this.props.addMark2("0");
    }
    add(num){
        
        let title=this.refs.titleInput.value;
        let content=this.refs.contentInput.value;
        let timer=this.refs.timeInput.value;
        if(title.length==0){
            alert("请输入标题");
            return false;
        }
        if(isNaN(parseInt(timer.substring(11,13))) || isNaN(parseInt(timer.substring(14,16)))){
            alert("请完善时间");
            return false;
        }
        let timeStamp=new Date(timer).getTime();
        if(timeStamp<=new Date().getTime()){
            alert("请把时间设置在当前时间之后！");
            return false;
        }
        let events=JSON.parse(localStorage.getItem("events"));
        
        //num==0为添加，num!=0为更新
        if(num==0){

            if(events==null){
                events={};
                num=1;
            }else{
                for(let e in events){
                    if(num<events[e]["num"]*1){
                        num=events[e]["num"]*1;
                    }
                }
                if(num==500){
                    alert("备忘事项已达上限（500条）");
                    return false;
                }else{
                    num++;
                }
            }
        }
        events[num.toString()]={"num":num.toString(),"title":title,"content":content,"timer":timer,"check":"0","style":{}};
        let e=JSON.stringify(events);
        localStorage.setItem("events",e);
        this.exit();
    }

    update(){
        let num=this.state.item["num"];
        this.add(num*1);
    }
    handleChange(e){
        let item=this.state.item;
        if(item==null){
            item={"num":"","title":"","content":"","timer":"","check":"","style":{}};
            this.setState({item:item});
        }
        if(this.state.addMark=="1"){
            item["num"]="";
            item["title"]="";
            item["content"]="";
            item["timer"]="";
            this.setState({addMark:"0"});
            this.props.addMark2("0");
        }
        let value=e.target.value;
        item[e.target.id]=value;
        this.setState({item:item});
        
    }
    componentWillMount(){
        this.setState({addMark:this.props.addMark,fixedAddMark:this.props.addMark});
    }
    componentWillReceiveProps(nextProps) {
        this.setState({item:nextProps.item});
        if(this.state.addMark!=nextProps.addMark){
            this.setState({addMark:nextProps.addMark});
        }
        if(nextProps.addMark=="1"){
            this.setState({fixedAddMark:nextProps.addMark});
        }
    }
    
    render(){
        let item=this.state.item;
        let flag=this.state.addMark=="1";
        return(
            <div className={editedpanel.Panel}>
                <div className={editedpanel.allcontent}>
                    <span className={editedpanel.titleSpan}>请输入标题：</span>
                    <input className={editedpanel.title} type="text" ref="titleInput" value={flag?"":item==null?"":typeof(item["title"])=="undefined"?"":item["title"]} onChange={this.handleChange} id="title"/>
                    <span className={editedpanel.contentSpan}>请输入事件详情：</span>
                    <textarea className={editedpanel.content} ref="contentInput" value={flag?"":item==null?"":typeof(item["content"])=="undefined"?"":item["content"]} onChange={this.handleChange} id="content"></textarea>
                    <span className={editedpanel.timerSpan}>请设置提醒时间：</span>
                    <input className={editedpanel.timer} type="datetime-local" ref="timeInput" value={flag?"":item==null?"":typeof(item["timer"])=="undefined"?"":item["timer"]} onChange={this.handleChange} id="timer"/>
                    <button className={editedpanel.add} onClick={this.add.bind(this,0)} style={{ display: this.state.fixedAddMark=="1" ? "inline-block":"none" }}>添加</button>
                    <button className={editedpanel.update} onClick={this.update} style={{ display: this.state.fixedAddMark=="1" ? "none" : "inline-block" }}>更新</button>
                    <button className={editedpanel.exit} onClick={this.exit}>取消</button>
                </div>
            </div>


        )  
    }
}