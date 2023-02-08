import React, {useEffect, useState} from "react";
import {Button, Input, Modal, Table} from "antd";
import {addChickenSoup, deleteChickenSoup, getChickenSoup, modifyChickenSoup} from "../../../../api/blog/chicken-soup";


const { TextArea } = Input;




export default function ChickenSoupBlog(){
    const columns = [
        {
            title: '句子',
            dataIndex: 'sentence',
            key: 'chickenCoup',
            width: "80%",
        },
        {
            title: '操作',
            key: 'operate',
            width:200,
            render: (a,b,c) => (
                <>
                    <Button onClick={updateData.bind(this,a,b,c)}>修改</Button> &nbsp;&nbsp;
                    <Button danger onClick={delData.bind(this,a,b,c)}>删除</Button>
                </>
            )
        },
    ];
    const [dataSource, setDataSource] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const [sentence, setSentence] = useState("")
    const [chickenSoupId, setChickenSoupId] = useState(-1)

    const readData = () => {
        getChickenSoup().then(res => {
            // console.log(res)
            setDataSource(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        readData()
    }, [])


    // 提交表单
    function handleOK() {
        setConfirmLoading(true);

        let data = {
            sentence: sentence,
        }

        if (chickenSoupId <= 0) {
            setChickenSoupId(chickenSoupId - 1)
            addChickenSoup(data).then((res) => {
                // console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        } else {
            data.id = chickenSoupId
            modifyChickenSoup(data).then((res) => {
                // console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        }

        setIsVisible(false);
        setConfirmLoading(false);
    }

    function updateData(data) {
        // console.log(data)
        setChickenSoupId(data.id)
        setSentence(data.sentence)
        setIsVisible(true)
    }

    function delData(data) {
        // console.log(data)
        deleteChickenSoup(data.id).then((res) => {
            // console.log(res)
            readData()
        }).catch((error) => {
            console.log(error)
        })
    }


    const handleAddButton = () => {
        setIsVisible(true)
        if(chickenSoupId < 0) {
            setChickenSoupId(chickenSoupId-1)
        }else {
            setChickenSoupId(-1)
        }
        setSentence("")
    }

    return (
        <div className={"blog"}>
            <div className={"operate"}>
                <Button type="primary" onClick={handleAddButton}>新增</Button>
            </div>
            <div className={"blog-content"}>
                <Table dataSource={dataSource} columns={columns} />
            </div>


            <Modal title="新增" visible={isVisible}
                   onCancel={()=>(setIsVisible(false))}
                   confirmLoading={confirmLoading}
                   onOk={handleOK}
            >
                <div className={"add-content-title need-height-200"}>
                    句子：
                    <div className={"add-content-degree-right"}>
                        <TextArea rows={4} defaultValue={sentence} key={chickenSoupId} onChange={(data)=>{setSentence(data.target.value)}} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}


//
// const dataSource = [
//     {
//         id :"1",
//         chickenCoup: '天总会亮的。',
//     },
// ];


