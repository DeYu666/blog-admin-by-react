import React, {useEffect, useState} from "react";
import {Button, Table, Modal, Input, Checkbox, Switch, Anchor} from "antd";
import moment from "moment";

import {addDiary, deleteDiary, getDiary, getDiaryPs, modifyDiary, modifyDiaryPs} from "../../../api/diary";
import "./index.css"

const {TextArea} = Input;

const dateFormat = "YYYY年MM月DD日";


export default function DiaryContent() {

    const [contentIsOpen, setContentIsOpen] = useState(false)
    const openOrClose = () => {

        setContentIsOpen(!contentIsOpen)
    }


    const columns = [
        {
            title: '内容',
            dataIndex: 'content',
            key: 'diaryContent',
            width: "50%",
            render: (content,recode,index) => {

                if (contentIsOpen) {
                    return <div className={"content_open"}>{content}</div>
                }else  {
                    return  <div className={"content_close"}>{content}</div>
                }
            }
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
            title: '更新时间',
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
    const [dataSource, setDataSource] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [isVisible2, setIsVisible2] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [confirmLoading2, setConfirmLoading2] = useState(false)


    const [diaryId, setDiaryId] = useState(-1)
    const [diaryContent, setDiaryContent] = useState("")
    const [isOpen, setIsOpen] = useState(true)
    const [createTime, setCreateTime] = useState()


    const [password, setPassword] = useState("**********")
    const [newPassword, setNewPassword] = useState("")
    const [passwordId, setPasswordId] = useState(-1)


    const readData = () => {
        getDiary().then(res => {
            // console.log(res)
            setDataSource(res.data)
        }).catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {
        readData()
        readDataPs()
    }, [])

    const readDataPs = () => {
        getDiaryPs().then((res) => {
            // console.log(res)
            if (res.data != null) {
                setPasswordId(res.data[0].id)
                setPassword(res.data[0].password)
            }
        }).catch((error) => {
            console.log(error)
        })
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

        modifyDiaryPs(data).then((res) => {
            // console.log(res)
            readDataPs()
        }).catch(error => {
            console.log(error)
        })

        setIsVisible(false);
        setConfirmLoading(false);
    }


    // 提交表单
    function handleOK2() {
        setConfirmLoading2(true);

        let data = {
            content: diaryContent,
            is_open: isOpen,
            create_time: createTime,
            rePrint: checkedList,
        }

        if (diaryId <= 0) {
            setDiaryId(diaryId - 1)
            addDiary(data).then((res) => {
                // console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        } else {
            data.id = diaryId
            // data.publish_time = publishTime
            modifyDiary(data).then((res) => {
                // console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        }

        setIsVisible2(false);
        setConfirmLoading2(false);
    }


    function updateData(data) {

        setDiaryId(data.id)
        setDiaryContent(data.content)
        setCreateTime(data.create_time)
        setIsOpen(data.is_open)

        setIsVisible2(true)
    }

    function delData(data) {
        deleteDiary(data.id).then((res) => {
            // console.log(res)
            readData()
        }).catch((error) => {
            console.log(error)
        })
    }

    const CheckboxGroup = Checkbox.Group;
    const plainOptions = ['CSDN', '知乎', '。。。'];
    const defaultCheckedList = [];

    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);

    function onChange(list) {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    function onCheckAllChange(e) {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };


    return (
        <div className={"diary"}>
            <Anchor className={"button_open_or_close"} offsetTop={50}>
                <Button onClick={openOrClose}>{contentIsOpen?("折叠内容"):("展开内容")}</Button>
            </Anchor>

            <div className={"operate"}>
                <Button type="primary" onClick={() => (setIsVisible2(true))}>新增</Button> &nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={() => (setIsVisible(true))}>更改观看密码</Button>
            </div>

            <div className={"diary-content"}>
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

            <Modal title="新增或更高日记内容" visible={isVisible2}
                   onCancel={() => (setIsVisible2(false))}
                   confirmLoading={confirmLoading2}
                   onOk={handleOK2}
            >
                <div className={"add-content-title need-height-265"}>
                    内容：
                    <div className={"add-content-degree-right"}>
                        <TextArea key={diaryId} defaultValue={diaryContent} rows={13}
                                  onChange={(data) => (setDiaryContent(data.target.value))}/>
                    </div>
                </div>
                <div className={"add-content-title"}>
                    是否开放：
                    <div className={"add-content-degree-right"}>
                        <Switch key={diaryId} checkedChildren="开放" unCheckedChildren="关闭" defaultChecked={isOpen}
                                onChange={(data) => (setIsOpen(data))}/>
                    </div>
                </div>
                <div className={"add-content-title"}>
                    转载：
                    <div className={"add-content-degree-right"}>
                        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                            全选
                        </Checkbox>
                        <CheckboxGroup key={diaryId} options={plainOptions} value={checkedList} onChange={onChange}/>
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
//         diaryContent: '教链项目',
//         isOpen: "否",
//         publishTime: "2021/11/23",
//     },
//     {
//         id :"3",
//         diaryContent: '教链项目',
//         isOpen: "否",
//         publishTime: "2021/11/23",
//     },
// ];
//

