import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { decrement, incrementByAmount } from '../../../redux/features/counter/counterSlice'
import Memo from "../../../component-library/memo/memo";

export default function IndexContent(){
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div className={"admin-index"}>
            欢迎进入后台管理界面
            {/*<div>*/}
            {/*    <button*/}
            {/*        aria-label="Increment value"*/}
            {/*        onClick={() => dispatch(incrementByAmount(10))}*/}
            {/*    >*/}
            {/*        Increment*/}
            {/*    </button>*/}
            {/*    <span>{count}</span>*/}
            {/*    <button*/}
            {/*        aria-label="Decrement value"*/}
            {/*        onClick={() => dispatch(decrement())}*/}
            {/*    >*/}
            {/*        Decrement*/}
            {/*    </button>*/}
            {/*</div>*/}

            <div>
                <Memo/>
            </div>
        </div>
    )
}