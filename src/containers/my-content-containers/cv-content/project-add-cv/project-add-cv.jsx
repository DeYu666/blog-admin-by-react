import React, {useEffect, useState} from "react";
import {Button, Input, Switch} from "antd";

import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";


import "./project-add-cv.less"
import "../index.less"
import {addCvProject,  getCvProjectById, modifyCvProject} from "../../../../api/cv";
import {useLocation, useNavigate} from "react-router-dom";


const {TextArea} = Input;


const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });



export default function ProjectAddCv(props) {

    let location = useLocation()
    let navigate = useNavigate();

    // 数据控制的相关操作
    const [projectId, setProjectId] = useState(-1)
    const [projectName, setProjectName] = useState("")
    const [projectContent, setProjectContent] = useState("")
    const [projectAbstract, setProjectAbstract] = useState("")
    const [projectImgSrc, setProjectImgSrc] = useState("")
    const [publishTime, setPublishTime] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    //  <"write" | "preview">
    const [selectedTab, setSelectedTab] = useState("preview");


    useEffect(()=>{

        // console.log(location.state.id)

        if (location.state.id <= 0 || location.state.id === undefined) {
            setProjectId(-1)
        }else {
            getCvProjectById(location.state.id).then(res => {
                console.log(res)
                setProjectName(res.data.project_name)
                setProjectContent(res.data.project_content)
                setProjectImgSrc(res.data.project_img_src)
                setProjectAbstract(res.data.abstract)
                setIsOpen(res.data.is_open)
                setPublishTime(res.data.publish_time)

                setProjectId(location.state.id)
            })

        }
    },[])

    const handleOk = () => {

        let data = {
            project_name: projectName,
            project_content: projectContent,
            project_img_src: projectImgSrc,
            abstract: projectAbstract,
            is_open: isOpen
        }

        if (projectId <= 0) {
            setProjectId(projectId - 1)
            addCvProject(data).then((res) => {
                // console.log(res)

                if (res.error_code === 0){
                    navigate("/backstage/cv/project")
                }

            }).catch((error) => {
                console.log(error)
            })
        } else {
             data.id = projectId
             data.publish_time = publishTime
            modifyCvProject(data).then((res) => {
                // console.log(res)
                if (res.error_code === 0){
                    navigate("/backstage/cv/project")
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }


    return (
        <>
            <div className={"project-add-cv"}>
                <div className={"project-title"}>
                    <Input key={projectId} placeholder="输入标题" defaultValue={projectName} bordered={false} size={"large"}
                           onChange={(data) => (setProjectName(data.target.value))}
                    />
                </div>

                <div className={"project-content"}>
                    <ReactMde
                         value={projectContent}
                         onChange={setProjectContent}
                         selectedTab={selectedTab}
                         onTabChange={setSelectedTab}
                         generateMarkdownPreview={markdown =>
                           Promise.resolve(converter.makeHtml(markdown))
                         }
                    />
                </div>

                <div className={"add-content-title"}>封面图片：
                    <div className={"add-content-degree-right add-content-degree-right2"}>
                        <Input key={projectId} defaultValue={projectImgSrc}
                               onChange={(data) => (setProjectImgSrc(data.target.value))}
                        />
                    </div>
                </div>
                <div className={"add-content-title need-height-100"}>摘要：
                    <div className={"add-content-degree-right add-content-degree-right2"}>
                        <TextArea rows={4} defaultValue={projectAbstract} key={projectId}
                                  onChange={(data) => (setProjectAbstract(data.target.value))}
                        />
                    </div>
                </div>
                <div className={"add-content-title"}>是否开放：
                    <div className={"add-content-degree-right add-content-degree-right2"}>
                        <Switch key={projectId} checkedChildren="开放" unCheckedChildren="关闭" defaultChecked={isOpen}
                                onChange={(data) => (setIsOpen(data))}
                        />
                    </div>
                </div>
            </div>

            <div className={"my-button-container"}>
                <Button>取消</Button>
                <Button onClick={handleOk}>确定</Button>
            </div>
        </>
    )
}