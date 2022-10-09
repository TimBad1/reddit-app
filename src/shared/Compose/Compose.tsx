import React from 'react';
import styles from './compose.css';
import { getValue } from '../../utils/react/pickFromSyntheticEvent';
import { preventDefault, stopPropagation } from '../../utils/react/preventAll';

function InputExemple({ value, onChange}: any) {
  return (
    <input 
    value={value}
    onChange={preventDefault(stopPropagation(getValue(onChange)))} //далее 2 аналогичные записи через функции
    // onChange={compose(onChange, getValue, stopPropagation, preventDefault)}
    // onChange={pipe(preventDefault, stopPropagation, getValue, onChange)}
    />
  )
}

//выполняется справа налево
function compose<U>( ...fns: Function[]) {
  return <E,>(initialValue: any): U =>
    fns.reduceRight((previousValue, fn) => fn(previousValue), initialValue);
}

//тоже самое только слева направо
function pipe<U>( ...fns: Function[]) {
  return <E,>(initialValue: any): U =>
    fns.reduce((previousValue, fn) => fn(previousValue), initialValue);
}

// const (onchange) => pipe(preventDefault, stopPropagation, getValue, onChange)


// вспомогательные функции

// забиарет из объекта свойство
function pick<K extends string>(prop: K) {
  return <O extends Record<K, any>>(obj: O) => obj[prop]
}

const some = pick('value')({value: 1})// -> 1

// проверяет на равенство
function isEqual<T>(left: T) {
  return <E extends T>(right: E) => left === right;
}

// допустим у нас есть массив комментариев
const comments = [{ id: 22, text: 'text one'}, { id: 42, text: 'text two'}, { id: 24, text: 'text three'}, ]

// Допустм из этого массива нам нужно удалить элемент
// const filtredComments = comments.filter(({ id }) => id !== 22);
// можно записать это композицией
// const filtredComments = comments.filter(pipe(pick('id'), isEqual(22), cond));
//композии удобно расширять вместо переписывания кода

const createFilterBy = (prop: string) => (id: number) => pipe(pick(prop), isEqual(id), cond);
const filterWithId = createFilterBy('id');
const filterWithId22 = createFilterBy('id')(22);
const filterByValue = createFilterBy('value');
const filtredComments = comments.filter(filterWithId(22));
// const filtredComments = comments.filter(filterByValue(22));
// const filtredComments = comments.filter(filterWithId22);

function cond(b: boolean) {
  return !b;
}

const getValueNumber = pipe<number>(
  pick('currentTarget'),
  pick('value'),
  parseInt
);