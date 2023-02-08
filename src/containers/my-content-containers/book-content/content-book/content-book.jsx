import React, {useEffect, useState} from "react";
import {Button, Col, Input, message, Modal, Row, Table} from "antd";

import "../index.css"
import CardBook from "../../../../component-library/card-book/card-book";
import {
    addBookContent,
    deleteBookContent,
    getBookContent,
    getBooksList,
    modifyBookContent,
} from "../../../../api/book";
import moment from "moment";

const { TextArea } = Input;
const dateFormat = "YYYY年MM月DD日";



export default function ContentBook(){

    const columns = [
        {
            title: '内容',
            dataIndex: 'book_content',
            key: 'bookContent',
            width: "55%",
        },
        {
            title: '发表时间',
            dataIndex: 'create_time',
            key: 'createTime',
            render: createTime => (
                moment(createTime, moment.ISO_8601).format(dateFormat)
            )
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
    const [dataSourceBooksList, setDataSourceBooksList] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const [activeBookId, setActiveBookId] = useState(-1)

    const [bookContentId, setBookContentId] = useState(-1)
    const [content, setContent] = useState("")
    const [createTime, setCreateTime] = useState()


    const readBookList = () => {
        getBooksList().then(res => {
            // console.log(res)
            setDataSourceBooksList(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        readBookList()
    }, [])

    const readData = () => {
        if (activeBookId < 0) {
            return
        }

        getBookContent(activeBookId).then(res=>{
            // console.log(res)
            setDataSource(res.data)
        }).catch(error=>{
            console.log(error)
        })
    }

    useEffect(() => {
        readData()
    }, [activeBookId])

    // 提交表单
    function handleOK() {
        setConfirmLoading(true);

        let data = {
            book_content: content,
            book_id: activeBookId,
        }

        if (bookContentId <= 0) {
            setBookContentId(bookContentId - 1)

            addBookContent(data).then((res) => {
                // console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        } else {
            data.id = bookContentId
            data.create_time=createTime

            modifyBookContent(data).then((res) => {
                // console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        }

            setIsVisible(false);
            setConfirmLoading(false);
    }

    const handleActive = (bookId) => {
        // console.log(bookId)
        setActiveBookId(bookId)
    }



    function updateData(data) {
        // console.log(data)
        setBookContentId(data.id)
        setContent(data.book_content)
        setCreateTime(data.create_time)

        setIsVisible(true)
    }

    function delData(data) {
        // console.log(data)
        deleteBookContent(data.id).then((res) => {
            // console.log(res)
            readData()
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleAddButton = () => {
        if (activeBookId < 0) {
            message.error("请先点击文章，否则无法新增内容！", 10)
            return
        }

        if (bookContentId < 0) {
            setBookContentId(bookContentId -1)
        }else {
            setBookContentId(-1)
        }
        setContent("")
        setIsVisible(true)
    }


    return (
        <div className={"book"}>
            <Row>
                <Col className={"book-cards"} span={6}>
                    {dataSourceBooksList.map((book)=>(
                        <div onClick={handleActive.bind(this, book.id)}>
                            <CardBook title={book.book_name} abstract={book.abstract} active={book.id === activeBookId}  />
                        </div>
                    ))}
                    {/*<CardBook title={"哲学的慰籍"} abstract={"......"} active={true} />*/}
                    {/*<CardBook title={"哲学的慰籍"} abstract={"......"} />*/}
                    {/*<CardBook title={"哲学的慰籍"} abstract={"......"} />*/}
                </Col>
                <Col span={18} className={"book-content-single"}>
                    <div className={"book-content-operate"}>
                        <Button type="primary" onClick={handleAddButton}>新增</Button>
                    </div>
                    <div className={"book-content"}>
                        <Table dataSource={dataSource} columns={columns} />
                    </div>

                    <Modal title="新增" visible={isVisible}
                           onCancel={()=>(setIsVisible(false))}
                           confirmLoading={confirmLoading}
                           onOk={handleOK}
                    >
                        <div className={"add-content-title need-height-100"}>
                            内容：
                            <div className={"add-content-degree-right"}>
                                <TextArea rows={4} key={bookContentId} defaultValue={content} onChange={(data)=>(setContent(data.target.value))} />
                            </div>
                        </div>
                    </Modal>
                </Col>
            </Row>
        </div>
    )
}


//
// const dataSource = [
//     {
//         id :"1",
//         bookContent: '天总会亮',
//         createTime: "2020年1月1日"
//     },
// ];

