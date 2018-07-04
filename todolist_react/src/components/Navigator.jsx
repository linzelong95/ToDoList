import React from "react"
import navigator from "@/less/navigator.less"
//import bootcss from "bootstrap/dist/css/bootstrap.css"

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
            alert("列表已空");
            return false;
        }
        if(confirm("确定删除？")){
            localStorage.removeItem("events");
        }
    }
    render(){
        return(
            <div className={navigator.navBar}>
                <div className={navigator.finish} onClick={this.filter}>
                    未完成/全部
                </div>
                <div className={navigator.show} onClick={this.roll}>
                    展开/收起
                </div>
                <div className={navigator.add}  onClick={this.addWarnning}>
                    添加事项
                </div>
                <div className={navigator.deleteAll}  onClick={this.delAll}>
                    全部删除
                </div>
            </div>
        )
    }
}