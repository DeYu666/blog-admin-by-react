import React, {useEffect, useState} from "react";
import {Breadcrumb, Button} from "antd";
import {useNavigate, useLocation} from "react-router-dom";


export default function MyHeader(){
    let navigate = useNavigate();
    let location = useLocation();
    const [pathData, setPathData] = useState([]);

    useEffect(()=>{
        setPathData(location.pathname.split("/"))
    }, [location.pathname])

    const logout = () => {
        navigate("/login")
    }
    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0', display: "inline-block" }}>
                {pathData.map((path, index)=>(
                    <Breadcrumb.Item key={index}>{path}</Breadcrumb.Item>
                ))}
            </Breadcrumb>

            <Button onClick={logout} style={{display:"inline-block", float:"right", marginTop:16}}>退出登陆</Button>
        </div>
    )
}

