import React, {useEffect, useState} from "react";
import {Button, Col, Input, Row, Table} from "antd";

import "../index.css"
import TitleUser from "../../../../component-library/title-user/title-user";
import {addTags, deleteTags, getTags, modifyTags} from "../../../../api/blog/tag";




export default function TagsBlog() {
    const columns = [
        {
            title: '标签名称',
            dataIndex: 'name',
            key: 'tagName',
            width: 100
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
    const [tagName, setTagName] = useState("")
    const [tagId, setTagId] = useState(-1)


    const readData = () => {
        getTags().then(res => {
            // console.log(res)
            setDataSource(res.data)
        }).catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {
        readData()
    }, [])


    function updateData(data) {
        // console.log(data)
        setTagId(data.id)
        setTagName(data.name)
    }

    function delData(data) {
        // console.log(data)
        deleteTags(data.id).then((res) => {
            // console.log(res)
            readData()
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleOk = () => {
        let data = {
            name: tagName,
        }

        if (tagId <= 0) {
            setTagId(tagId - 1)
            addTags(data).then((res) => {
                console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        } else {
            data.id = tagId
            modifyTags(data).then((res) => {
                // console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    const handleCancel = () => {
        if (tagId > 0) {
            setTagId(-1)
        }else {
            setTagId(tagId-1)
        }
        setTagName("")
    }

    useEffect(()=>{
        handleCancel()
    },[dataSource])


    return (
        <div className={"general-cate-blog"}>
            <Row gutter={[48, 16]}>
                <Col span={10}>
                    <div className={"category-content"}>
                        <Table dataSource={dataSource} columns={columns} />
                    </div>
                </Col>

                <Col span={14}>
                    <div className={"add-or-update"}>
                        <div className={"title"}><TitleUser title={"新增或更新"}/></div>
                        <div className={"add-content-title"}>
                            标签名称：
                            <div className={"add-content-degree-right"}>
                                <Input defaultValue={tagName} key={tagId} onChange={(data)=>{setTagName(data.target.value)}} />
                            </div>
                        </div>
                        <div className={"my-button-container2"}>
                            <Row>
                                <Col span={12}>
                                    <Button onClick={handleCancel}>取消</Button>
                                </Col>
                                <Col span={12}>
                                    <Button onClick={handleOk}>确定</Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>

        </div>
    )
}


// const dataSource = [
//     {
//         id :"1",
//         tagName: 'markdown',
//     },
//     {
//         id :"2",
//         tagName: '小工具',
//     },
// ];


