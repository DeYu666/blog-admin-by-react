import React, {Component} from "react";
import PropTypes from "prop-types"

import "./title-user.less"

export default class TitleUser extends Component{

    static propTypes = {
        title:PropTypes.string.isRequired
    }

    render() {
        const {title} = this.props
        return (
            <div className="ant-list-item-meta">
                <div className="ant-list-item-meta-content"><h4 className="ant-list-item-meta-title">{title}</h4></div>
            </div>
        )
    }
}