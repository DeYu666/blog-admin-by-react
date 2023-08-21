import React, {useState, useEffect} from "react";
import { Layout } from 'antd';
import MySide from "../my-side/my-side";
import MyHeader from "../my-header/my-header";
import MyContent from "../my-content/my-content";
import MyFooter from "../my-footer/my-footer";
import {useNavigate} from "react-router-dom";
import cookie from 'react-cookies'
import "./index.less"

const { Header, Footer, Sider, Content } = Layout;


export default function Home() {
    let navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false)
    

    useEffect(() => {

        console.log(cookie.load('token'))


        if (cookie.load('token') === undefined) {
            navigate("/login")
        }



    }, [])


    function onCollapse(collapsed) {
        setCollapsed(collapsed)
    }
    
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <MySide />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background">
                    <MyHeader />
                </Header>
                <Content style={{ margin: '24px 16px' }}>
                    <MyContent />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    <MyFooter />
                </Footer>
            </Layout>
        </Layout>
    );
}



