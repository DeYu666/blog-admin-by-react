import React, {useEffect, useState} from "react";

import "../index.less"
import {Button, Table, Modal, Input} from "antd";
import { useNavigate } from "react-router-dom";
import {
    deleteCvProject,
    getCvProject,
    getCvProjectPs,
    modifyCvProjectPs
} from "../../../../api/cv";
import moment from "moment";


export default function ProjectCv(){

    const dateFormat = "YYYY年MM月DD日";

    const columns = [
        {
            title: '项目名称',
            dataIndex: 'project_name',
            key: 'projectName',
        },
        {
            title: '摘要',
            dataIndex: 'abstract',
            key: 'abstract',
            width: "40%",
        },
        {
            title: '是否开放',
            dataIndex: 'is_open',
            key: 'isOpen',
            render: a => {
                if(a){
                    return "是"
                }else {
                    return "否"
                }
            }
        },
        {
            title: '发表时间',
            dataIndex: 'publish_time',
            key: 'publishTime',
            render: publishTime => (
                moment(publishTime, moment.ISO_8601).format(dateFormat)
            ),
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
    const [isVisible, setIsVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [password, setPassword] = useState("**********")
    const [newPassword, setNewPassword] = useState("")
    const [passwordId, setPasswordId] = useState(-1)

    let navigate = useNavigate();

    function addProject() {
        navigate("/backstage/cv/project/add/", {state:{id:-1}})
    }


    const readData = () => {
        getCvProject().then((res) => {
            // console.log(res)
            setDataSource(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const readDataPs = () => {
        getCvProjectPs().then((res)=>{
            // console.log("res1")
            // console.log(res)
            if(res.data != null){
                setPasswordId(res.data[0].id)
                setPassword(res.data[0].password)
            }
            // console.log("res2")
        }).catch((error) => {
            console.log(error)
        })
    }

    // 调用一次
    useEffect(() => {
        readData()
        readDataPs()
    }, [])


    // 提交表单
    function handleOK() {
        setConfirmLoading(true);

        let data = {
            password:newPassword,
        }

        if (passwordId > 0){
            data.id = passwordId
        }

        modifyCvProjectPs(data).then((res)=>{
            // console.log(res)
            readDataPs()
            setIsVisible(false);
            setConfirmLoading(false);
        }).catch(error=>{
            console.log(error)
        })

    }


    function updateData(data) {
        // console.log(data)
        navigate("/backstage/cv/project/add/", {state:{id:data.id}})
    }

    function delData(data) {
        deleteCvProject(data.id).then((res) => {
            // console.log(res)
            readData()
        }).catch((error) => {
            console.log(error)
        })
    }

    return(
        <div className={"cv"}>
            <div className={"operate"}>
                <Button type="primary" onClick={addProject}>新增</Button> &nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={()=>(setIsVisible(true))}>更改观看密码</Button>
            </div>

            <div className={"cv-content"}>
                <Table dataSource={dataSource} columns={columns} />
            </div>

            <Modal title="更改观看密码" visible={isVisible}
                   onCancel={()=>(setIsVisible(false))}
                   confirmLoading={confirmLoading}
                   onOk={handleOK}

            >
                <div className={"add-content-title"}>当前密码：  <div className={"add-content-degree-right"}><Input key={passwordId} value={password} disabled/></div></div>
                <div className={"add-content-title"}>更改密码：  <div className={"add-content-degree-right"}> <Input onChange={(data) => (setNewPassword(data.target.value))} /></div></div>
            </Modal>


        </div>
    )
}

//
// const dataSource = [
//     {
//         id :"1",
//         projectName: '教链项目',
//         abstract: '无',
//         isOpen: "否",
//         publishTime: "2021/11/23",
//     },
//     {
//         id :"3",
//         projectName: '教链项目',
//         abstract: '无',
//         isOpen: "否",
//         publishTime: "2021/11/23",
//     },
// ];


