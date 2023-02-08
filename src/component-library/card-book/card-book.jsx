import React from "react";
import "./index.css"

export default function CardBook(prop){
    return (
        <div className={prop.active === true ? "card-book card-book-active" : "card-book"} onClick={prop.onClick}>
            <div className={"card-title"}>
                {prop.title}
            </div>
            <div className={"card-abstract"}>
                {prop.abstract}
            </div>
        </div>
    )
}