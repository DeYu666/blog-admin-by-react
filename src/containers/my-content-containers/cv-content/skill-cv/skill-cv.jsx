import React, {useEffect, useState} from "react";
import "../index.less"
import {Button, Table, Modal, Slider, Input} from "antd";
import {
    addCvSkill,
    deleteCvSkill,
    getCvSkill, modifyCvSkill
} from "../../../../api/cv";

const {TextArea} = Input;


export default function SkillCv() {

    const columns = [
        {
            title: '技能名称',
            dataIndex: 'skill_name',
            key: 'skill_name',
        }, {
            title: '技能熟练度',
            dataIndex: 'skill_mastery',
            key: 'skill_mastery',
            render: a => (
                a + "%"
            )
        }, {
            title: '技能介绍',
            dataIndex: 'skill_intro',
            key: 'skill_intro',
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
    const [skillName, setSkillName] = useState("")
    const [skillMastery, setSkillMastery] = useState(0)
    const [skillIntro, setSkillIntro] = useState("")
    const [skillId, setSkillId] = useState(0)


    const readData = () => {
        getCvSkill().then((res) => {
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

        deleteCvSkill(data.id).then((res) => {
            // console.log(res)
            readData()
        }).catch((error) => {
            console.log(error)
        })
    }

    function add() {
        setSkillName("")
        setSkillMastery(0)
        setSkillIntro("")

        if (skillId > 0) {
            setSkillId(-1)
        } else {
            setSkillId(skillId - 1)
        }
        setIsVisible(true)
    }



    const update = (data) => {
        setSkillName(data.skill_name)
        setSkillMastery(data.skill_mastery)
        setSkillIntro(data.skill_intro)
        setSkillId(data.id)

        setIsVisible(true)
    }


    // 提交表单
    function handleOK() {
        setConfirmLoading(true);

        let data = {
            skill_name: skillName,
            skill_mastery: skillMastery,
            skill_intro: skillIntro,
        }

        if (skillId <= 0) {
            setSkillId(skillId - 1)
            addCvSkill(data).then((res) => {
                // console.log(res)
                readData()
            }).catch((error) => {
                console.log(error)
            })
        } else {
            data.id = skillId

            modifyCvSkill(data).then((res) => {
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
                <div className={"add-content-title"}>技能名称： <div className={"add-content-degree-right"}><Input
                    defaultValue={skillName} key={skillId} onChange={(data) => (setSkillName(data.target.value))}/>
                </div></div>
                <div className={"add-content-title"}>技能熟练度： <div className={"add-content-degree-right"}><Slider
                    defaultValue={skillMastery} key={skillId} onChange={(data) => (setSkillMastery(data))}/></div></div>
                <div className={"add-content-title need-height-100"}>技能介绍： <div className={"add-content-degree-right"}>
                    <TextArea rows={4} key={skillId} defaultValue={skillIntro}
                              onChange={(data) => (setSkillIntro(data.target.value))}/></div></div>
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
