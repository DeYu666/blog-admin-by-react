import React from "react";
import {Menu} from "antd";
import {DesktopOutlined, FileOutlined,  TeamOutlined, UserOutlined, HeartFilled, BookFilled, EditFilled } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import logo from "./logo.svg"
import "./index.css"

const { SubMenu } = Menu;

function MySide() {

    let navigate = useNavigate();

    function handleClick(item){
        // console.log(item, key, keyPath, selectedKeys)
        // console.log(item.keyPath.join("/"))
        navigate(item.keyPath.reverse().join("/"))
    }

    const handleClickLogo = () =>  {
        navigate("/backstage")
    }

    return (
        <div>
            <div className="logo" onClick={handleClickLogo}>
                <img src={logo} alt={"无法加载"}/>
                <span className={"logoName"}>
                    后台管理平台
                </span>
            </div>
            <Menu theme="dark" defaultSelectedKeys={['cv']} mode="inline" onClick={handleClick}>
                <SubMenu key="cv" icon={<UserOutlined />} title="简历管理">
                    <Menu.Item key="skill">技术栈</Menu.Item>
                    <Menu.Item key="experience">工作教育经历</Menu.Item>
                    <Menu.Item key="project">项目经历</Menu.Item>
                </SubMenu>
                <SubMenu key="blog" icon={<TeamOutlined />} title="文章管理">
                    <Menu.Item key="generalCate">总类</Menu.Item>
                    <Menu.Item key="category">分类</Menu.Item>
                    <Menu.Item key="postList">文章列表</Menu.Item>
                    <Menu.Item key="tags">标签</Menu.Item>
                    <Menu.Item key="chickenSoup">鸡汤</Menu.Item>
                </SubMenu>
                <SubMenu key="book" icon={<BookFilled />} title="书籍管理">
                    <Menu.Item key="bookList">书籍列表</Menu.Item>
                    <Menu.Item key="bookContent">内容列表</Menu.Item>
                </SubMenu>
                <Menu.Item key="diary" icon={<EditFilled />}>
                    日记管理
                </Menu.Item>
                <Menu.Item key="user" icon={<TeamOutlined />}>
                    用户管理
                </Menu.Item>
                <Menu.Item key="love" icon={<HeartFilled />}>
                    爱情
                </Menu.Item>
                <Menu.Item key="9" icon={<FileOutlined />}>
                    待开发
                </Menu.Item>
            </Menu>
        </div>
    )
}


export default  MySide