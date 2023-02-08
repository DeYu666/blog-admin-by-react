import React, {useEffect, useState} from "react";
import {Button, Col, Input, Row, Select, Table} from "antd";

import "../index.css"
import TitleUser from "../../../../component-library/title-user/title-user";
import {
    addCategory,
    deleteCategory,
    getCategory, getGeneralCate,
    modifyCategory,
} from "../../../../api/blog/category";


const {Option} = Select;


export default function CategoryBlog() {
    const columns = [
        {
            title: '分类名称',
            dataIndex: 'name',
            key: 'categoryName',
            width: 100
        },
        {
            title: '总类名称',
            dataIndex: 'general',
            key: 'generalCategory',
            width: 100,
            render: (general) => {
                return general.name
            }
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
    const [dataSource, setDataSource] = useState([])
    const [dataSourceGeneralCate, setDataSourceGeneralCate] = useState([])

    const [categoryId, setCategoryId] = useState(-1)
    const [categoryName, setCategoryName] = useState("")
    const [generalCate, setGeneralCate] = useState({})



    function updateData(data) {
        // console.log(data)
        setCategoryId(data.id)
        setCategoryName(data.name)
        setGeneralCate(data.general)
    }

    function delData(data) {
        // console.log(data)
        deleteCategory(data.id).then((res) => {
            // console.log(res)
            readData()
        }).catch((error) => {
            console.log(error)
        })
    }

    const readData = () => {
        getCategory().then(res => {
            // console.log(res)
            setDataSource(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    const readGeneralCateData = () => {
        getGeneralCate().then(res => {
            // console.log(res)
            setDataSourceGeneralCate(res.data)
        })
    }


    useEffect(() => {
        readData()
        readGeneralCateData()
    }, [])

    useEffect(() => {
        handleCancel()
    },[dataSource])

    function handleChange(gCateId) {

        // console.log(`selected ${gCateId}`);
        let gCate
        for (gCate in dataSourceGeneralCate) {

            if (dataSourceGeneralCate[gCate].id === gCateId) {
                setGeneralCate(dataSourceGeneralCate[gCate])
                break
            }
        }
    }



    const handleOk = () => {
        let data = {
            name: categoryName,
            general_id: generalCate.id
        }

        if (categoryId <= 0) {
            setCategoryId(categoryId - 1)
            addCategory(data).then((res) => {
                // console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        } else {
            data.id = categoryId
            modifyCategory(data).then((res) => {
                // console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    const handleCancel = () => {
        if (categoryId > 0) {
            setCategoryId(-1)
        }else {
            setCategoryId(categoryId-1)
        }
        setCategoryName("")
        setGeneralCate({})
    }

    return (
        <div className={"general-cate-blog"}>
            <Row gutter={[48, 16]}>
                <Col span={10}>
                    <div className={"category-content"}>
                        <Table dataSource={dataSource} columns={columns}/>
                    </div>
                </Col>

                <Col span={14}>
                    <div className={"add-or-update"}>
                        <div className={"title"}>
                            <TitleUser title={"新增或更新"}/>
                        </div>
                        <div className={"add-content-title"}>
                            分类名称：
                            <div className={"add-content-degree-right"}>
                                <Input key={categoryId} defaultValue={categoryName}
                                       onChange={(data) => (setCategoryName(data.target.value))}/>
                            </div>
                        </div>
                        <div className={"add-content-title"}>
                            总类名称：
                            <div className={"add-content-degree-right"}>
                                <Select key={categoryId} defaultValue={generalCate.id} style={{width: 120}}
                                        onChange={handleChange}>
                                    {dataSourceGeneralCate.map((gCate) => (
                                        <Option value={gCate.id}>{gCate.name}</Option>
                                    ))}

                                    {/*<Option value="lucy">Lucy</Option>*/}
                                    {/*<Option value="Yiminghe">yiminghe</Option>*/}
                                </Select>
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
//         categoryName: '区块链',
//         generalCategory: '技术文章',
//     },
//     {
//         id :"2",
//         categoryName: '区块链',
//         generalCategory: '编程语言',
//     },
// ];


