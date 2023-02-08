import React, {useEffect, useState} from "react";

import "../index.css"
import {Button, Table, Modal, Input,} from "antd";
import {useNavigate} from "react-router-dom";
import {deletePost, getBlogPostPs, getPostsList, modifyBlogPostPs} from "../../../../api/blog/post";
import moment from "moment";


const dateFormat = "YYYY年MM月DD日";

export default function PostListsBlog() {
    let navigate = useNavigate();

    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'projectName',
            width: "40%",

        },
        {
            title: '观看人数',
            dataIndex: 'views',
            key: 'views',
        },
        {
            title: '是否开放',
            dataIndex: 'is_open',
            key: 'isOpen',
            render: a => {
                if (a) {
                    return "是"
                } else {
                    return "否"
                }
            }
        },
        {
            title: '发表时间',
            dataIndex: 'create_time',
            key: 'create_time',
            render: create_time => (
                moment(create_time, moment.ISO_8601).format(dateFormat)
            ),
        },
        {
            title: '最近修改时间',
            dataIndex: 'modified_time',
            key: 'modified_time',
            render: modified_time => (
                moment(modified_time, moment.ISO_8601).format(dateFormat)
            ),
        },
        {
            title: '操作',
            key: 'operate',
            width: 200,
            render: (a, b, c) => (
                <>
                    <Button onClick={updateData.bind(this, a, b, c)}>修改</Button> &nbsp;&nbsp;
                    <Button danger onClick={delData.bind(this, a, b, c)}>删除</Button>
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


    function updateData(data) {
        // console.log(data)
        navigate("/backstage/blog/postAdd", {state: {id: data.id}})
    }

    function delData(data) {
        deletePost(data.id).then((res) => {
            // console.log(res)
            readData()
        }).catch((error) => {
            console.log(error)
        })
    }

    const readData = () => {
        getPostsList().then((res) => {
            // console.log(res)
            setDataSource(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const readDataPs = () => {
        getBlogPostPs().then((res) => {
            // console.log(res)
            if (res.data != null) {
                setPasswordId(res.data[0].id)
                setPassword(res.data[0].password)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        readData()
        readDataPs()
    }, [])

    function addProject() {
        navigate("/backstage/blog/postAdd", {state: {id: -1}})
    }

    // 提交表单
    function handleOK() {

        setConfirmLoading(true);

        let data = {
            password: newPassword,
        }

        if (passwordId > 0) {
            data.id = passwordId
        }

        modifyBlogPostPs(data).then((res) => {
            // console.log(res)
            readDataPs()
        }).catch(error => {
            console.log(error)
        })

        setIsVisible(false);
        setConfirmLoading(false);
    }


    return (
        <div className={"blog"}>
            <div className={"operate"}>
                <Button type="primary" onClick={addProject}>新增</Button> &nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={() => (setIsVisible(true))}>更改观看密码</Button>
            </div>

            <div className={"blog-content"}>
                <Table dataSource={dataSource} columns={columns}/>
            </div>

            <Modal title="更改观看密码" visible={isVisible}
                   onCancel={() => (setIsVisible(false))}
                   confirmLoading={confirmLoading}
                   onOk={handleOK}
            >
                <div className={"add-content-title"}>
                    <div className={"add-content-title"}>当前密码： <div className={"add-content-degree-right"}><Input
                        key={passwordId} value={password} disabled/></div></div>
                    <div className={"add-content-title"}>更改密码： <div className={"add-content-degree-right"}><Input
                        onChange={(data) => (setNewPassword(data.target.value))}/></div></div>
                </div>
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

