import React, {useEffect, useState} from "react";
import {Button, Checkbox, Input, Select,  Switch} from "antd";
import {useLocation, useNavigate} from "react-router-dom";

import "./post-add-blog.css"
import "../index.css"
import {addPost, getPostByPostId, modifyPost} from "../../../../api/blog/post";
import {getCategory} from "../../../../api/blog/category";
import {getTags} from "../../../../api/blog/tag";
import {uploadImageFromPost} from "../../../../api/tuchuang"

import "vditor/dist/index.css";
import Vditor from "vditor";

import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";






const {TextArea} = Input;

const {Option} = Select;


const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}


const CheckboxGroup = Checkbox.Group;

const plainOptions = ['CSDN', '知乎', '。。。'];
const defaultCheckedList = [];


const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });



  


export default function PostAddBlog() {

    let location = useLocation()
    let navigate = useNavigate();

    const [dataSourceCategories, setDataSourceCategories] = useState([])
    const [dataSourceTags, setDataSourceTags] = useState([])

    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);

    const [postId, setPostId] = useState(-1)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [imgSrc, setImgSrc] = useState("")
    const [abstract, setAbstract] = useState("")
    const [tagsId, setTagsId] = useState([])
    const [tags, setTags] = useState([])
    const [category, setCategory] = useState({})
    const [isOpen, setIsOpen] = useState(true)
    const [createTime, setCreateTime] = useState()

    useEffect(()=>{

        console.log(content)

        const vditor = new Vditor("vditor", {
            input: (val) => {
                console.log(val)
                setContent(val)
            },
            blur: (val) => {
                // 失焦后触发, 可以设置自动保存
                console.log(val)
            },
            upload: {
                value: '',
                accept: 'image/*',
                // url: 'http://localhost:8080/blog/uploadImage',
                url: process.env.REACT_APP_BACKEND_URL+'/blog/uploadImage',
                format: (files, responseStr) => {

                    let resp = {
                        "msg": "",
                        "code": 0,
                        "data": {
                        "succMap": {}
                        }
                    }

                    let responseText = JSON.parse(responseStr)

                    if (responseText.error_code == 0) {
                        for (let i in responseText.data){
                            resp.data.succMap[responseText.data[i].file_name] = responseText.data[i].url
                        }
                    }

                    return JSON.stringify(resp)
                }
            },
            cache: {
                enable: false,
            },
            after: () => {
                // 编辑器加载完成后触发
                vditor.setValue(content, true);
            }
        });
        
    },[postId])



    const readData = () => {
        // console.log(location.state.id)

        let id = location.state.id
        if (id >= 0) {
            console.log(id)
            getPostByPostId(id).then(res => {
                console.log(res)
                setTitle(res.data.title)
                setContent(res.data.content)
                setImgSrc(res.data.img_src)
                setAbstract(res.data.abstract)
                setTags(res.data.tags)

                let i;
                let temp = [];
                for (i in res.data.tags){
                    temp.push(res.data.tags[i].id)
                }
                setTagsId(temp)

                setCategory(res.data.category)
                setIsOpen(res.data.is_open)
                setCreateTime(res.data.create_time)
                setPostId(id)

            })
        }else {
            setPostId(id)
        }
    }

    const readCategories = () => {
        getCategory().then(res=>{
            // console.log(res)
            setDataSourceCategories(res.data)
        }).catch(error=>{
            console.log(error)
        })
    }
    const readTags = () => {
        getTags().then(res=>{
            // console.log(res)
            setDataSourceTags(res.data)
        }).catch(error=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        readCategories()
        readTags()
        readData()
    }, [])


    function handleChangeCate(cateId) {
        // console.log(`selected ${cateId}`);
        let i
        for (i in dataSourceCategories) {
            if (dataSourceCategories[i].id === cateId) {
                setCategory(dataSourceCategories[i])
                break
            }
        }
    }

    const handleChange = (tempTagsId) => {
        // console.log(`selected ${tempTagsId}`);
        setTagsId(tempTagsId)

        let res = [];
        let i, j;
        for (i in tempTagsId){
            for (j in dataSourceTags){
                if (tempTagsId[i] === dataSourceTags[j].id){
                    res.push(dataSourceTags[j])
                    break
                }
            }
        }

        setTags(res)
    }

    function onChange(list) {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    }
    function onCheckAllChange(e) {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    }


    const handleOk = () => {
        let data = {
            title: title,
            content: content,
            abstract: abstract,
            category_id: category.id,
            blog_post_tags:[],
            tags:tags,
            img_src:imgSrc,
            is_open: isOpen,
            rePrint:checkedList,
        }


        if (postId <= 0) {
            setPostId(postId - 1)
            addPost(data).then((res) => {
                // console.log(res)

                if (res.error_code === 0){
                    navigate("/backstage/blog/postList")
                }

            }).catch((error) => {
                console.log(error)
            })
        } else {
            data.id = postId
            data.create_time = createTime

                // data.publish_time = publishTime
            modifyPost(data).then((res) => {
                console.log(res)
                if (res.error_code === 0){
                    navigate("/backstage/blog/postList")
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
                    <Input placeholder="输入标题" bordered={false} size={"large"} key={postId} defaultValue={title}
                           onChange={(data) => (setTitle(data.target.value))}
                    />
                </div>

                <div className={"project-content"}>

                    {/* <ReactMde
                         value={content}
                         onChange={setContent}
                         selectedTab={selectedTab}
                         onTabChange={setSelectedTab}
                         generateMarkdownPreview={markdown =>
                           Promise.resolve(converter.makeHtml(markdown))
                         }

                    /> */}

                    <div id="vditor" className={"vditor"}></div>


                    {/* <Editor defaultValue={content} key={postId}
                             uploadImage={async file => {
                                const result = await uploadImageFromPost(file);
                                // console.log(result)
                                return result.data;
                              }}
                            onChange={(data) => (setContent(data()))}
                    /> */}


                </div>

                <div className={"add-content-title"}>
                    封面图片：
                    <div className={"add-content-degree-right add-content-degree-right2"}>
                        <Input key={postId} defaultValue={imgSrc}
                               onChange={(data) => (setImgSrc(data.target.value))}
                        />
                    </div>
                </div>
                <div className={"add-content-title need-height-100"}>
                    摘要：
                    <div className={"add-content-degree-right add-content-degree-right2"}>
                        <TextArea rows={4} key={postId} defaultValue={abstract}
                                  onChange={(data) => (setAbstract(data.target.value))}
                        />
                    </div>
                </div>
                <div className={"add-content-title"}> 标签：
                    <div className={"add-content-degree-right add-content-degree-right2"}>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{width: '100%'}}
                            placeholder="Please select"
                            defaultValue={tagsId}
                            onChange={handleChange}
                            key={postId}
                        >
                            {dataSourceTags.map((tag)=>(
                                <Option key={tag.id} value={tag.id}>{tag.name}</Option>
                            ))}

                        </Select>
                    </div>
                </div>
                <div className={"add-content-title"}> 类别：
                    <div className={"add-content-degree-right add-content-degree-right2"}>
                        <Select key={postId} defaultValue={category.id} style={{width: 120}} onChange={handleChangeCate}>
                            {dataSourceCategories.map((cate)=>(
                                <Option key={cate.id} value={cate.id}>{cate.name}</Option>
                            ))}

                            {/*<Option value="jack">Jack</Option>*/}
                        </Select>
                    </div>
                </div>
                <div className={"add-content-title"}>
                    是否开放：
                    <div className={"add-content-degree-right add-content-degree-right2"}>
                        <Switch key={postId} checkedChildren="开放" unCheckedChildren="关闭" defaultChecked={isOpen}
                                onChange={(data) => (setIsOpen(data))}
                        />
                    </div>
                </div>
                <div className={"add-content-title"}> 转载：
                    <div className={"add-content-degree-right add-content-degree-right2"}>
                        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                            全选
                        </Checkbox>
                        <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange}/>
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