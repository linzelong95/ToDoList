import React from "react"
import Navigator from "@/components/Navigator"
import CmtItem from "@/components/CmtItem"
import EditedPanel from "@/components/EditedPanel"
import cmtlist from "@/less/cmtlist.less"
import bootcss from "bootstrap/dist/css/bootstrap.css"

export default class CmtList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            style: { display: "none" },
            item: {},
            show: "1",
            display: "1",
            addMark:"0",
            finishedNum: 0,
            timeoutNum: 0,
            willdoNum: 0,
            allNum: 0
        };
        this.display = this.display.bind(this);
        this.update = this.update.bind(this);
        this.showALLOrPart = this.showALLOrPart.bind(this);
        this.roll_up = this.roll_up.bind(this);
        this.addMark=this.addMark.bind(this);
    }
    addMark(msg){
        this.setState({ addMark: msg });
    }
    display(msg) {
        this.setState({ style: msg });
    }

    update(item) {
        this.setState({ item: item });
    }
    showALLOrPart(msg) {
        this.setState({ show: msg });
    }
    roll_up(msg) {
        this.setState({ display: msg });
    }


    getDateStr(addDayCount) {
        let dd = new Date();
        dd.setDate(dd.getDate() + addDayCount);//获取addDayCount天后的日期 
        let y = dd.getFullYear();
        let m = dd.getMonth() + 1;//获取当前月份的日期 
        let d = dd.getDate();
        m = m.toString().length == 1 ? "0" + m : m;
        d = d.toString().length == 1 ? "0" + d : d;
        return y + "-" + m + "-" + d;
    }
    componentDidMount() {
        setInterval(() => {
            let events = JSON.parse(localStorage.getItem("events"));
            let list_willdo = [];
            let list_finish = [];
            let list_timeout = [];
            let list_all = [];
            let finishedNum = 0;
            let timeoutNum = 0;
            let willdoNum = 0;
            let allNum = 0;
            for (let e in events) {
                let timer = events[e]["timer"];
                let timeStamp = new Date(timer).getTime();
                let year = timer.substring(0, 4);
                let month = timer.substring(5, 7);
                let day = timer.substring(8, 10);
                let hour = timer.substring(11, 13);
                let minute = timer.substring(14, 16);
                let date3 = this.getDateStr(-1);//昨天
                let str3 = date3.split("-");
                let date0 = this.getDateStr(0);//今天
                let str0 = date0.split("-");
                let date1 = this.getDateStr(1);//明天
                let str1 = date1.split("-");
                let date2 = this.getDateStr(2);//后天
                let str2 = date2.split("-");
                if (year == str3[0] && month == str3[1] && day == str3[2]) {
                    timer = "昨天" + " " + hour + ":" + minute
                } else if (year == str0[0] && month == str0[1] && day == str0[2]) {
                    timer = "今天" + " " + hour + ":" + minute
                } else if (year == str1[0] && month == str1[1] && day == str1[2]) {
                    timer = "明天" + " " + hour + ":" + minute
                } else if (year == str2[0] && month == str2[1] && day == str2[2]) {
                    timer = "后天" + " " + hour + ":" + minute
                } else {
                    timer = timer.replace("T", " ");
                }
                events[e]["timer"] = timer;
                if (events[e]["check"] == "1") {
                    events[e]["style"] = { color: "grey", textDecoration: "line-through" };
                    list_finish.push(events[e]);
                } else {
                    if (timeStamp <= new Date().getTime()) {
                        events[e]["style"] = { color: "red" };
                        list_timeout.push(events[e]);
                    } else {
                        list_willdo.push(events[e]);
                    }
                }

            }
            if (this.state.show == "1") {
                list_all = list_willdo.concat(list_timeout).concat(list_finish);
            } else {
                list_all = list_willdo.concat(list_timeout);
            }
            finishedNum = list_finish.length;
            timeoutNum = list_timeout.length;
            willdoNum = list_willdo.length;
            allNum = list_all.length;

            this.setState({
                list: list_all,
                finishedNum: finishedNum,
                timeoutNum: timeoutNum,
                willdoNum: willdoNum,
                allNum: allNum
            });
        }, 1000)
    }

    render() {
        let finishedPer="";
        let timeoutPer="";
        let willdoPer="";
        if (this.state.allNum) {
            finishedPer = (this.state.finishedNum * 100 / this.state.allNum).toFixed(2) + "%";
            timeoutPer = (this.state.timeoutNum * 100 / this.state.allNum).toFixed(2) + "%";
            willdoPer = (this.state.willdoNum * 100 / this.state.allNum).toFixed(2) + "%";
        }
        return (
            <div>
                <h1 className={cmtlist.bigTitle}>ToDoList</h1>
                <Navigator showPanel={this.display} seletedShow={this.showALLOrPart} display_roll={this.roll_up} addMark={this.addMark}/>
                <ul className={cmtlist.list} style={{ display: this.state.display == "1" ? "block" : "none" }}>
                    {
                        this.state.list.map((item, index) =>

                            <CmtItem

                                item={item}
                                key={index}
                                showPanel={this.display}
                                neededMsg={this.update}
                            />
                        )
                    }
                </ul>
                <div className={cmtlist.tip} style={{ display: this.state.display == "1" ? "none" : "block" }}>列表已折叠...</div>
                <div className={cmtlist.progressBar}>
                <div className={cmtlist.aboutShow}>{this.state.show == "1"?"Warnning:已展示全部":"Warnning:仅展示待做部分"}</div>
                <div className={cmtlist.aboutEvents}>
                    事项总数：<span>{this.state.allNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    待做（未超时）数：<span>{this.state.willdoNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    待做（超时）数：<span>{this.state.timeoutNum}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    已完成数：<span>{this.state.show == "1"?this.state.finishedNum:"0"}</span>
                </div>
                    <div className="progress progress-striped active"> 
                        <div className="progress-bar progress-bar-info" role="progressbar"
                            aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                            style={{ width:willdoPer }}>
                            <span>{willdoPer}待做（未超时）</span>
                        </div>
                        <div className="progress-bar progress-bar-warning" role="progressbar"
                            aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                            style={{ width: timeoutPer }}>
                            <span>{timeoutPer}待做（超时）</span>
                        </div>
                        <div className="progress-bar progress-bar-success" role="progressbar"
                            aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                            style={{ width: finishedPer }}>
                            <span>{finishedPer}已完成</span>
                        </div>
                    </div>
                </div>
                
                <div style={this.state.style}>
                    <EditedPanel showPanel={this.display} item={this.state.item} addMark={this.state.addMark} addMark2={this.addMark}/>
                </div>
            </div>
        )
    }
}