import React from "react";

// function Input(props: { onChange: (value: string) => void, value: string}) {
//     return (
//         <input value={props.value} onChange={(e) => props.onChange(e.currentTarget.value)} />
//     )
// }


// function Checkbox(props: { onChange: (value: boolean) => void, value: boolean}) {
//     return (
//         <input type='checkbox' checked={props.value} onChange={(e) => props.onChange(e.currentTarget.checked)} />
//     )
// }


// упрощаем -->

function Input( { onChange, value} : { onChange: (value: string) => void, value: string}) {
    return (
        <input value={value} onChange={getValue(onChange)} />
    )
}

function Checkbox(props: { onChange: (value: boolean) => void, value: boolean}) {
    return (
        <input type='checkbox' checked={props.value} onChange={getChecked(props.onChange)} />
    )
}

// Обёртка для тайпскрипта, которая сильно разгрузит типизацию
export function pickFromSyntheticEvent<T extends HTMLElement>() {
    return <K extends keyof T>(key: K) => 
        <E extends ((t: T[K]) => void)>(fn: E) => 
            (e: React.SyntheticEvent<T>) => 
            fn(e.currentTarget[key]);
}

export const getValue = pickFromSyntheticEvent<HTMLInputElement>()('value');
export const getChecked = pickFromSyntheticEvent<HTMLInputElement>()('checked');