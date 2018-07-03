import React from "react"
import navigator from "@/less/navigator.less"
//import bootcss from "bootstrap/dist/css/bootstrap.css"
import { Icon,Modal,message } from 'antd';

message.config({top:150,duration:1});

export default class Navigator extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:"1",
            display:"1"
        };
        this.addWarnning=this.addWarnning.bind(this);
        this.filter=this.filter.bind(this);
        this.roll=this.roll.bind(this);
        this.delAll=this.delAll.bind(this);
    }
    showConfirm() {
        
      }
    addWarnning(){
        let msg={display:"block"};
        this.props.showPanel(msg);
        this.props.addMark("1");
    }
    filter(){
        let newShow=this.state.show=="1"?"0":"1";
        this.setState({show:newShow});
        this.props.seletedShow(newShow);
    }
    roll(){
        let newDisplay=this.state.display=="1"?"0":"1";
        this.setState({display:newDisplay});
        this.props.display_roll(newDisplay);
    }
    delAll(){
        if(localStorage.getItem("events")==null){
            message.warning("列表已空");
            return false;
        }
        Modal.confirm({
            title: "确定全部删除吗?",
            content: "注意：删除后将无法恢复！",
            onOk() {
                localStorage.removeItem("events");
            },
            onCancel() {},
          });
    }
    render(){
        return(
            <div className={navigator.navBar}>
                <div className={navigator.finish} onClick={this.filter}>
                    <div style={{display:this.state.show=="0"?"block":"none"}}><Icon type="clock-circle" style={{ fontSize: 16, color: "blue" }}/>&nbsp;全部</div>
                    <div style={{display:this.state.show=="0"?"none":"block"}}><Icon type="tags" style={{ fontSize: 16, color: "blue" }}/>&nbsp;待做</div>
                </div>
                <div className={navigator.show} onClick={this.roll}>
                    <div style={{display:this.state.display=="0"?"block":"none"}}><Icon type="down-circle" style={{ fontSize: 16, color: "red" }}/>&nbsp;展开</div>
                    <div style={{display:this.state.display=="0"?"none":"block"}}><Icon type="up-circle" style={{ fontSize: 16, color: "red" }}/>&nbsp;收起</div>
                </div>
                <div className={navigator.add}  onClick={this.addWarnning}>
                    <Icon type="plus-circle" style={{ fontSize: 16, color: "orange" }}/>&nbsp;添加事项
                </div>
                <div className={navigator.deleteAll}  onClick={this.delAll}>
                    <Icon type="close-circle" style={{ fontSize: 16, color: "red" }}/>&nbsp;全部删除
                </div>
            </div>
        )
    }
}