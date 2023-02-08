import React, {useEffect, useState} from "react";
import {Button, DatePicker, Input, Modal} from "antd";

import "./index.css"
import moment from "moment";
import {addLoveInfo, getLoveInfo, modifyLoveInfo} from "../../../api/love";

const {TextArea} = Input;

export default function LoveContent() {
    const dateFormat = "YYYY年MM月DD日";

    // 页面显示的相关操作
    const [isVisible, setIsVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    // 数据控制的相关操作
    const [extraInfo, setExtraInfo] = useState("暂无")
    const [loveConfession, setLoveConfession] = useState("1997-12-31")
    const [loveKnown, setLoveKnown] = useState("1997-12-31")
    const [loveName, setLoveName] = useState("张德钰")
    const [loveId, setLoveId] = useState(0)


    const readData = () => {
        getLoveInfo().then((res) => {
            // console.log(res.data)
            if (res.data.length >= 0) {
                let data = res.data[0]

                setLoveName(data.love_name)
                setLoveKnown(moment(data.known_time).format(dateFormat))
                setLoveConfession(moment(data.confession_time).format(dateFormat))
                setExtraInfo(data.extra_info)
                setLoveId(data.id)
            }

        }).catch((error) => {
            console.log(error)
        })
    }

    // 调用一次
    useEffect(() => {
        readData()
    }, [])


    const handleAdd = () => {
        setIsVisible(true)
    }


    // 提交表单
    function handleOK() {
        setConfirmLoading(true);

        let data = {
            love_name: loveName,
            known_time: moment(loveKnown, dateFormat).format(moment.ISO_8601.__momentBuiltinFormatBrand),
            confession_time: moment(loveConfession, dateFormat).format(moment.ISO_8601.__momentBuiltinFormatBrand),
            extra_info: extraInfo,
        }

        if (loveId <= 0) {
            setLoveId(loveId - 1)
            addLoveInfo(data).then((res) => {
                console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        } else {
            data.id = loveId
            modifyLoveInfo(data).then((res) => {
                // console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        }

        setIsVisible(false);
        setConfirmLoading(false);
    }


    return (
        <>

            <div className={"love"}>
                <h3>嘿嘿嘿</h3>
                <div className={"love_button"}><Button onClick={handleAdd}>又有新的信息啦！</Button></div>
                <div className={"love_name"}> 名字: <p>{loveName}</p></div>
                <div className={"love_known"}> 相识时间: <p>{loveKnown}</p></div>
                <div className={"love_confession"}> 确立关系: <p>{loveConfession} </p></div>
                <div className={"love_extraInfo"}> 预留信息: <p> {extraInfo} </p></div>
            </div>

            <Modal title="新增" visible={isVisible}
                   onCancel={() => (setIsVisible(false))}
                   confirmLoading={confirmLoading}
                   onOk={handleOK}
            >
                <div className={"add-content-title"}>名字： <div className={"add-content-degree-right"}><Input
                    defaultValue={loveName} key={loveId}
                    onChange={(data) => (setLoveName(data.target.value))}/></div></div>
                {/*<div className={"add-content-title"}>就职时间： <div className={"add-content-degree-right"}> <DatePicker defaultValue={moment(workYear, dateFormat)} key={workId} onChange={(_, data)=>(setWorkYear(moment(data).format(dateFormat)))}   /></div></div>*/}
                <div className={"add-content-title"}>相识时间： <div className={"add-content-degree-right"}><DatePicker
                    defaultValue={moment(loveKnown, dateFormat)} key={loveId}
                    onChange={(_, data) => (setLoveKnown(moment(data).format(moment.ISO_8601.__momentBuiltinFormatBrand)))}/>
                </div></div>
                <div className={"add-content-title"}>确立关系： <div className={"add-content-degree-right"}><DatePicker
                    defaultValue={moment(loveConfession, dateFormat)} key={loveId}
                    onChange={(_, data) => (setLoveConfession(moment(data).format(moment.ISO_8601.__momentBuiltinFormatBrand)))}/>
                </div></div>
                <div className={"add-content-title need-height-100"}>预留信息： <div className={"add-content-degree-right"}>
                    <TextArea defaultValue={extraInfo} key={loveId}
                              onChange={(data) => (setExtraInfo(data.target.value))}
                              rows={4}/></div></div>
            </Modal>
        </>


    )
}