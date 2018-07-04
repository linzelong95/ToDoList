import React from "react"
import editedpanel from "@/less/editedpanel.less"
//import bootcss from "bootstrap/dist/css/bootstrap.css"
import { LocaleProvider, DatePicker, message,Button } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
message.config({top:150,duration:1});

export default class EditedPanel extends React.Component{
    constructor(props){
        super(props);
        this.state={item:"",addMark:"0",fixedAddMark:"0",timerChangeMark:"0",localTime:""};
        this.update=this.update.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    
    exit(addFlag){
        let msg={display:"none"};
        this.props.showPanel(msg);
        this.setState({fixedAddMark:"0",timerChangeMark:"0"});
        this.props.addMark2("0");
        if(addFlag==0){
            message.success("添加成功");
        }else if(addFlag>0){
            message.success("更新成功");
        }else{
            message.success("退出成功");
        }
    }
    add(num){
        let title=this.refs.titleInput.value;
        let content=this.refs.contentInput.value;
        //let timer=this.refs.timeInput.value;
        let timer=this.state.item["timer"];
        if(title.length==0){
            message.warning("请输入标题");
            return false; 
        }
        let timeStamp=new Date(timer).getTime();
        if(isNaN(parseInt(timer.substring(11,13))) || isNaN(parseInt(timer.substring(14,16))) ||timeStamp<=new Date().getTime()){
            message.warning("请完善时间,并设置为当前时间之后");
            return false;
        }
        let events=JSON.parse(localStorage.getItem("events"));
        let addFlag=num;
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
        this.exit(addFlag);
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

        item[e.target.id]=e.target.value;
        this.setState({item:item});
        
    }
    componentWillMount(){
        this.setState({addMark:this.props.addMark,fixedAddMark:this.props.addMark,timerChangeMark:this.props.addMark,item:this.props.item});
    }
    componentWillReceiveProps(nextProps) {
        if(this.state.addMark!=nextProps.addMark){
            this.setState({addMark:nextProps.addMark});
        }
        if(nextProps.addMark=="1"){ 
            this.setState({fixedAddMark:nextProps.addMark,timerChangeMark:nextProps.addMark});
        }
        this.setState({item:nextProps.item});
    }

    timeFormat(value){
        let dd;
        if(value===0){
            dd = new Date();
        }else{
            dd = new Date(value);
        }
        let y = dd.getFullYear();
        let m = dd.getMonth() + 1;//获取当前月份的日期 
        let d = dd.getDate();
        let h=dd.getHours();
        let mm=dd.getMinutes()
        m = m.toString().length == 1 ? "0" + m : m;
        d = d.toString().length == 1 ? "0" + d : d;
        h = h.toString().length == 1 ? "0" + h : h;
        mm = mm.toString().length == 1 ? "0" + mm : mm;
        let localTime=y + "-" + m + "-" + d+" "+h+":"+mm;
        return localTime;
    }
    changeTime(value){
        this.setState({timerChangeMark:"0"});
        let localTime=this.timeFormat(value);
        let item=this.state.item;
        if(item==null){
            item={"num":"","title":"","content":"","timer":"1970-01-01 08:00","check":"","style":{}};
            this.setState({item:item});
        }
        if(this.state.addMark=="1"){
            item["num"]="";
            item["title"]="";
            item["content"]="";
            item["timer"]="1970-01-01 08:00";
            this.setState({addMark:"0"});
            this.props.addMark2("0");
        }
        item["timer"]=localTime;
        this.setState({item:item});
    }
    
    render(){
        let show=this.state.show;
        let disc=this.state.disc;
        let item=this.state.item;
        let flag=this.state.addMark=="1";
        let flag_1=this.state.timerChangeMark=="1";
        let initTime=moment(this.timeFormat(0),"YYYY-MM-DD HH:mm");
        let timer=moment(item["timer"],"YYYY-MM-DD HH:mm");
        return(
            <div className={editedpanel.Panel}>
                <div className={editedpanel.allcontent}>
                    <span className={editedpanel.titleSpan}>请输入标题：</span>
                    <input className={editedpanel.title} type="text" ref="titleInput" value={flag?"":item==null?"":typeof(item["title"])=="undefined"?"":item["title"]} onChange={this.handleChange} id="title"/>
                    <span className={editedpanel.contentSpan}>请输入事件详情：</span>
                    <textarea className={editedpanel.content} ref="contentInput" value={flag?"":item==null?"":typeof(item["content"])=="undefined"?"":item["content"]} onChange={this.handleChange} id="content"></textarea>
                    <span className={editedpanel.timerSpan}>请设置提醒时间：</span>
                    {/* <input className={editedpanel.timer} type="datetime-local" ref="timeInput" value={flag?"":item==null?"":typeof(item["timer"])=="undefined"?"":item["timer"]} onChange={this.handleChange} id="timer"/> */}
                    <LocaleProvider locale={zhCN}>
                        <span className={editedpanel.timer}>
                            <DatePicker showTime="true" format="YYYY-MM-DD HH:mm" onChange={value=>this.changeTime(value)} value={flag_1?initTime:item==null?initTime:typeof(item["timer"])=="undefined"?initTime:timer}/>
                        </span>
                    </LocaleProvider>
                    <Button type="primary" className={editedpanel.add} onClick={this.add.bind(this,0)} style={{ display: this.state.fixedAddMark=="1" ? "inline-block":"none" }}>添加</Button>
                    <Button type="primary" className={editedpanel.update} onClick={this.update} style={{ display: this.state.fixedAddMark=="1" ? "none" : "inline-block" }}>更新</Button>
                    <Button type="danger" className={editedpanel.exit} onClick={this.exit.bind(this,-1)}>取消</Button>
                </div>
            </div>


        )  
    }
}