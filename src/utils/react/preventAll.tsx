import React from "react";
import { getValue } from "./pickFromSyntheticEvent";

function NotStandartLink(props: any) {
    return (
        <a onClick={preventDefault(stopPropagation(props.onClick))}>HI</a>
    )
}


export function preventDefault<T extends (e: any) => void>(fn: T) {
    return <E extends React.SyntheticEvent<any>>(e: E) => {
        e.preventDefault();
        fn(e);
    }
}

export function stopPropagation<T extends (e: any) => void>(fn: T) {
    return <E extends React.SyntheticEvent<any>>(e: E) => {
        e.stopPropagation();
        fn(e);
    }
}


// function Input(props: {onChange: (value: string) => void, value: string}) 
// правильнее писать через интерфейс -->

interface InputProps {
    onChange: (value: string) => void;
    value: string;
}

function Input({onChange, value}: InputProps) {
    return (
        <input value={value} onChange={preventDefault(stopPropagation(getValue(onChange)))} />
    )
}


