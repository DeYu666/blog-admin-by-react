import React, {useEffect, useState} from "react";
import {Button, Col, Input, message, Row, Table} from "antd";

import "../index.css"
import TitleUser from "../../../../component-library/title-user/title-user";
import {addGeneralCate, deleteGeneralCate, getGeneralCate, modifyGeneralCate} from "../../../../api/blog/category";





export default function GeneralCategoryBlog() {
    const columns = [
        {
            title: '总类名称',
            dataIndex: 'name',
            key: 'generalCategory',
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
    const [generalCateId, setGeneralCateId] = useState(-1)
    const [generalCateName, setGeneralCateName] = useState("")


    function updateData(data) {
        // console.log(data)
        setGeneralCateId(data.id)
        setGeneralCateName(data.name)
    }

    function delData(data) {
        // console.log(data)
        deleteGeneralCate(data.id).then((res) => {
            console.log(res)
            if(res.error_code === 0){
                readData()
            }else {
                message.error("无法删除，有分类与其关联！")
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const readData = () => {
        getGeneralCate().then(res=>{
            console.log(res)
            setDataSource(res.data)
        }).catch(error=>{
            console.log(error)
        })
    }


    const handleOk = () => {
        let data = {
            name: generalCateName,
        }

        if (generalCateId <= 0) {
            setGeneralCateId(generalCateId - 1)
            addGeneralCate(data).then((res) => {
                // console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        } else {
            data.id = generalCateId
            modifyGeneralCate(data).then((res) => {
                // console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    const handleCancel = () => {
        if (generalCateId > 0) {
            setGeneralCateId(-1)
        }else {
            setGeneralCateId(generalCateId-1)
        }
        setGeneralCateName("")
    }

    useEffect(()=>{
        readData()
    },[])

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
                        <div className={"add-content-title"}>总类名称：  <div className={"add-content-degree-right"}><Input defaultValue={generalCateName} key={generalCateId} onChange={(data) => (setGeneralCateName(data.target.value))} /></div></div>
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
//         generalCategory: '技术文章',
//     },
//     {
//         id :"2",
//         generalCategory: '编程语言',
//     },
// ];


