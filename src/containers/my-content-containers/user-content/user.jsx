import React, {useEffect, useState} from "react";
import "./index.css"
import {Button, Table, Modal, Input} from "antd";
import {addUser, deleteUser, getUser, modifyUser} from "../../../api/user";



export default function User() {

    const columns = [
        {
            title: '昵称',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
        }, {
            title: '上次登陆',
            dataIndex: 'last_login',
            key: 'last_login',
        }, {
            title: '操作',
            key: 'operate',
            width: 200,
            render: (a, b, c) => (
                <>
                    <Button onClick={update.bind(this, a, b, c)}>修改</Button> &nbsp;&nbsp;
                    <Button danger onClick={delData.bind(this, a, b, c)}>删除</Button>
                </>
            )
        },
    ];

    const [dataSource, setDataSource] = useState([])

    // 页面显示的相关操作
    const [isVisible, setIsVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    // 数据控制的相关操作
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [userId, setUserId] = useState(-1)


    const readData = () => {
        getUser().then((res) => {
            // console.log(res)
            setDataSource(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }


    // 调用一次
    useEffect(() => {
        readData()
    }, [])


    function delData(data) {

        deleteUser(data.id).then((res) => {
            // console.log(res)
            readData()
        }).catch((error) => {
            console.log(error)
        })
    }

    function add() {
        setPassword("")
        setUsername("")

        if (userId > 0) {
            setUserId(-1)
        } else {
            setUserId(userId - 1)
        }
        setIsVisible(true)
    }


    const update = (data) => {
        setUsername(data.username)
        setPassword(data.password)
        setUserId(data.id)

        setIsVisible(true)
    }


    // 提交表单
    function handleOK() {
        setConfirmLoading(true);

        let data = {
            username: username,
            password: password,
        }

        if (userId <= 0) {
            setUserId(userId - 1)
            addUser(data).then((res) => {
                // console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        } else {
            data.id = userId

            modifyUser(data).then((res) => {
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
        <div className={"cv"}>
            <div className={"operate"}>
                <Button type="primary" onClick={add}>新增</Button>
            </div>

            <div className={"cv-content"}>
                <Table dataSource={dataSource} columns={columns}/>
            </div>


            <Modal title="新增" visible={isVisible}
                   onCancel={() => (setIsVisible(false))}
                   confirmLoading={confirmLoading}
                   onOk={handleOK}
            >
                <div className={"add-content-title"}>昵称：
                    <div className={"add-content-degree-right"}>
                        <Input defaultValue={username} key={userId}
                               onChange={(data) => (setUsername(data.target.value))}/>
                    </div>
                </div>
                <div className={"add-content-title"}>
                    密码：
                    <div className={"add-content-degree-right"}>
                        <Input defaultValue={password} key={userId}
                               onChange={(data) => (setPassword(data.target.value))}/>
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
//         skillName: 'Golang',
//         skillMastery: 60,
//         skillIntro: "go 熟悉基本数据结构的底层实现，了解 并发模 ....",
//     },
//     {
//         id :"2",
//         skillName: 'Golang',
//         skillMastery: 60,
//         skillIntro: "go 熟悉基本数据结构的底层实现，了解 并发模 ....",
//     }
// ];
