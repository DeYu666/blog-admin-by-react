import React, {useEffect, useState} from "react";
import {Button, Input, message, Modal, Table} from "antd";

import "../index.css"
import {addBooksList, deleteBooksList, getBooksList, modifyBooksList} from "../../../../api/book";
import moment from "moment";

const { TextArea } = Input;

const dateFormat = "YYYY年MM月DD日";



export default function ListBook(){

    const columns = [
        {
            title: '书名',
            dataIndex: 'book_name',
            key: 'bookName',
        },
        {
            title: '书籍状态',
            dataIndex: 'book_status',
            key: 'bookState',
        },
        {
            title: '发表时间',
            dataIndex: 'create_time',
            key: 'create_time',
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
    const [isVisible, setIsVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const [bookId, setBookId] = useState(-1)
    const [bookName, setBookName] = useState("")
    const [bookStatus, setBookStatus] = useState("")
    const [abstract, setAbstract] = useState("")
    const [createTime, setCreateTime] = useState("")

    const readData = () => {
        getBooksList().then(res => {
            console.log(res)
            setDataSource(res.data.shelf_arr)
        }).catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {
        readData()
    }, [])

    function updateData(data) {
        // console.log(data)
        setBookId(data.id)
        setBookName(data.book_name)
        setAbstract(data.abstract)
        setBookStatus(data.book_status)
        setCreateTime(data.create_time)
        setIsVisible(true)
    }

    function delData(data) {
        // console.log(data)
        deleteBooksList(data.id).then((res) => {
            // console.log(res)

            if(res.error_code === 0) {
                readData()
            }else {
                message.error("请先删除书籍内容！", 10)
            }

        }).catch((error) => {
            console.log(error)
        })
    }

    // 提交表单
    function handleOK() {
        setConfirmLoading(true);

        let data = {
            book_name: bookName,
            book_status: bookStatus,
            abstract: abstract,
        }

        if (bookId <= 0) {
            setBookId(bookId - 1)
            addBooksList(data).then((res) => {
                // console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        } else {
            data.id = bookId
            data.create_time=createTime

            modifyBooksList(data).then((res) => {
            // console.log(res)
            readData()
            }).catch((error) => {
                console.log(error)
            })
        }

        setIsVisible(false);
        setConfirmLoading(false);
    }

    const handleAddButton = () => {
        setIsVisible(true)
        if(bookId < 0) {
            setBookId(bookId-1)
        }else {
            setBookId(-1)
        }
        setBookName("")
        setAbstract("")
    }

    return (
        <div className={"book"}>
            <div className={"operate"}>
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
                <div className={"add-content-title"}>
                    书名：
                    <div className={"add-content-degree-right"}>
                        <Input defaultValue={bookName} key={bookId} onChange={(data)=>(setBookName(data.target.value))} />
                    </div>
                </div>
                <div className={"add-content-title need-height-100"}>
                    推荐理由：
                    <div className={"add-content-degree-right"}>
                        <TextArea rows={4} key={bookId} defaultValue={abstract} onChange={(data)=>(setAbstract(data.target.value))} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}



// const dataSource = [
//     {
//         id :"1",
//         bookName: '天总会亮',
//         bookState:"在看",
//         createTime:"2022年3月1日"
//     },
// ];

