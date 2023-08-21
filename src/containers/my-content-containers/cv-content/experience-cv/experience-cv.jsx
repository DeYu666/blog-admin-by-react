import React, {useEffect, useState} from "react";
import "../index.less"
import {Button, Table, Modal, Input, DatePicker} from "antd";
import moment from 'moment';
import {addCvExperience, deleteCvExperience, getCvExperience, modifyCvExperience} from "../../../../api/cv";


const {TextArea} = Input;


export default function ExperienceCv() {


    const columns = [
        {
            title: '就职时间',
            dataIndex: 'work_year',
            key: 'year',
            render: year => (
                moment(year, moment.ISO_8601).format(dateFormat)
            ),
        }, {
            title: '企业名称',
            dataIndex: 'enterprise_name',
            key: 'age',
        }, {
            title: '从事岗位',
            dataIndex: 'work_name',
            key: 'address',
        }, {
            title: '操作',
            key: 'operate',
            width: 200,
            render: (a, b, c) => (
                <>
                    <Button onClick={handleUpdate.bind(this, a, b, c)}>修改</Button> &nbsp;&nbsp;
                    <Button danger onClick={handleDelete.bind(this, a, b, c)}>删除</Button>
                </>
            )
        },
    ];

    const [dataSource, setDataSource] = useState([]);

    const dateFormat = "YYYY年MM月DD日";

    // 页面显示的相关操作
    const [isVisible, setIsVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    // 数据控制的相关操作
    const [enterpriseName, setEnterpriseName] = useState("")
    const [workName, setWorkName] = useState("")
    const [workYear, setWorkYear] = useState("")
    const [workInfo, setWorkInfo] = useState("")
    const [workId, setWorkId] = useState(0)


    const readData = () =>{
        getCvExperience().then((res) => {
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


    function handleUpdate(data) {


        setEnterpriseName(data.enterprise_name)
        setWorkName(data.work_name)
        setWorkYear(data.work_year)
        setWorkInfo(data.work_info)
        setWorkId(data.id)


        // console.log(enterpriseName)

        setIsVisible(true)
    }

    function handleAdd() {
        // console.log(dataSource)
        setWorkName("")
        setWorkYear(moment().format(dateFormat))
        setWorkInfo("")
        setEnterpriseName("")
        if (workId > 0) {
            setWorkId(-1)
        } else {
            setWorkId(workId - 1)
        }

        setIsVisible(true)
    }

    function handleDelete(data) {

        deleteCvExperience(data.id).then((res) => {
            // console.log(res)
            readData()
        }).catch((error) => {
            console.log(error)
        })

    }


    // 提交表单
    function handleOK() {
        setConfirmLoading(true);

        let data = {
            work_year: moment(workYear, dateFormat).format(moment.ISO_8601.__momentBuiltinFormatBrand),
            work_name: workName,
            enterprise_name: enterpriseName,
            work_info: workInfo,
        }

        if (workId <= 0) {
            setWorkId(workId - 1)
            addCvExperience(data).then((res) => {
                console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        } else {
            data.id = workId
            modifyCvExperience(data).then((res) => {
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
                <Button type="primary" onClick={handleAdd}>新增</Button>
            </div>

            <div className={"cv-content"}>
                <Table dataSource={dataSource} columns={columns}/>
            </div>


            <Modal title="新增" visible={isVisible}
                   onCancel={() => (setIsVisible(false))}
                   confirmLoading={confirmLoading}
                   onOk={handleOK}
            >
                <div className={"add-content-title"}>企业名称： <div className={"add-content-degree-right"}><Input
                    defaultValue={enterpriseName} key={workId}
                    onChange={(data) => (setEnterpriseName(data.target.value))}/></div></div>
                {/*<div className={"add-content-title"}>就职时间： <div className={"add-content-degree-right"}> <DatePicker defaultValue={moment(workYear, dateFormat)} key={workId} onChange={(_, data)=>(setWorkYear(moment(data).format(dateFormat)))}   /></div></div>*/}
                <div className={"add-content-title"}>就职时间： <div className={"add-content-degree-right"}><DatePicker
                    defaultValue={moment(workYear, dateFormat)} key={workId}
                    onChange={(_, data) => (setWorkYear(moment(data).format(moment.ISO_8601.__momentBuiltinFormatBrand)))}/>
                </div></div>
                <div className={"add-content-title"}>从事岗位： <div className={"add-content-degree-right"}><Input
                    defaultValue={workName} key={workId} onChange={(data) => (setWorkName(data.target.value))}/></div>
                </div>
                <div className={"add-content-title need-height-100"}>工作内容： <div className={"add-content-degree-right"}>
                    <TextArea defaultValue={workInfo} key={workId} onChange={(data) => (setWorkInfo(data.target.value))}
                              rows={4}/></div></div>
            </Modal>
        </div>
    )
}

//
// const dataSource = [
//     {
//         id :"1",
//         workYear: '2021年10月10日',
//         enterpriseName: '西安电子科技大学',
//         workName: "学士学位",
//     },
//     {
//         id :"2",
//         workYear: '2021年10月10日',
//         enterpriseName: '西安电子科技大学',
//         workName: "学士学位",
//     },
// ];
