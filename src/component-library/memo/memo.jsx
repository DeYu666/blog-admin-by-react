import React, {useEffect, useState} from "react";
import {Button, Checkbox, Select, Input, Modal} from 'antd';

import "./index.less"
import {addMemoContent, getMemos, modifyMemoStatus} from "../../api/memo";
import moment from "moment";
import create from "@ant-design/icons/lib/components/IconFont";


const {TextArea} = Input;
const {Option} = Select;


export default function Memo(prop) {
    const dateFormat = "YYYY年MM月DD日";


    const [dataSource, setDataSource] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [memoContent, setMemoContent] = useState("")
    const [memoId, setMemoId] = useState(0)
    const [statusId, setStatusId] = useState("0")
    const [dataDone, setDataDone] = useState([])



    const readData = () => {
        getMemos(statusId).then((res) => {
            console.log(res)
            setDataSource(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    // 调用一次
    useEffect(() => {
        readData()

        getMemos(1).then((res)=>{
            setDataDone(res.data)
        })

    }, [])

    useEffect(() => {
        readData()
    }, [statusId])

    const onChange = (memoId) => {
        console.log("checked = ", memoId)

        if (memoId.length === 0) {
            return
        }

        let data = {
            id: memoId[0],
            status: 2
        }

        modifyMemoStatus(data).then((res) => {
            console.log(res)
            readData()
        }).catch((error) => {
            console.log(error)
        })

    }

    const createMemo = () => {
        let data = {
            content: memoContent,
        }

        setMemoId(memoId - 1)
        addMemoContent(data).then((res) => {
            // console.log(res)
            readData()
        }).catch((error) => {
            console.log(error)
        })

        setIsVisible(false)
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
        setStatusId(value)
    }

    return (
        <div className={"memo-container"}>
            <div className={"memo-title"}>
                <h3>
                    备忘录 &nbsp;&nbsp;&nbsp;
                    <Select defaultValue={statusId} style={{width: 100}} onChange={handleChange}>
                        <Option value="-1">全部</Option>
                        <Option value="2">已完成</Option>
                        <Option value="1">未完成</Option>
                    </Select>

                </h3>
            </div>


            <div className={"memo-content"}>
                {dataSource === null ? (
                    <div className={"memo-content-group"}>
                        <>暂无内容</>
                    </div>
                ) : (
                    <>
                        {dataSource.map((memoContent, index) => (
                            <div className={"memo-content-group"}>
                                <div className={"content-date"}>
                                    {moment(memoContent.create_time).format(dateFormat)}
                                </div>
                                {memoContent.content == null?(<div>  出现错误 </div>):(
                                    <div>
                                    <Checkbox.Group options={memoContent.content.map((data) => ({ value: data.id, label: data.content }))}
                                                    defaultValue={[]} onChange={onChange}/>
                                </div>
                                )}
                                
                            </div>
                        ))}
                    </>
                )}


            </div>

            <div className={"memo-bottom"}>
                <Button onClick={() => (setIsVisible(true))}> 添加内容 </Button>
            </div>


            <Modal title="新增" open={isVisible}
                   onCancel={() => (setIsVisible(false))}
                   confirmLoading={confirmLoading}
                   onOk={createMemo}
            >
                <div className={"add-content-title need-height-100"}>内容： <div className={"add-content-degree-right"}>
                    <TextArea defaultValue={memoContent} key={memoId}
                              onChange={(data) => (setMemoContent(data.target.value))}
                              rows={4}/></div></div>
            </Modal>


        </div>
    )
}