import React, { FC, FormEvent, useEffect, useRef, useState } from 'react'
import { classes } from 'src/common/helper';

const rangeClassName = 'absolute left-0 right-0  -top-1'

export type TrimValue = {min: number; max: number};

type SliderProps = {
    min?: number;
    max?: number;
    onChange: (props: TrimValue) => void
};

export const Slider: FC<SliderProps> = ({onChange, max = 100, min = 0, }) => {

    const LIMIT = 5;
    const rangeOne = useRef<HTMLInputElement>(null);
    const rangeTwo = useRef<HTMLInputElement>(null);
    const [valueOne, setValueOne] = useState(min)
    const [valueTwo, setValueTwo] = useState(max)

    useEffect(() => {
        setValueOne(min)
    }, [min])

    useEffect(() => {
        setValueTwo(max)
    }, [max])

    const onMinSlide = (e: FormEvent<HTMLInputElement>) => {
        const minValue = Number(e.currentTarget.value);
        const maxValue = Number(rangeTwo.current?.value);
        let value = minValue;
        if(maxValue - minValue <= LIMIT) {
            value = Math.max(maxValue - LIMIT, 0);
        } else {
            value = Math.max(minValue, 0);
        }
        setValueOne(value);
        onChange({min: value, max: valueTwo});

    }

    const onMaxSlide = (e: FormEvent<HTMLInputElement>) => {
        const maxValue = Number(e.currentTarget.value);
        const minValue = Number(rangeOne.current?.value);
        let value = maxValue;
        if(maxValue - minValue <= LIMIT) {
            value = Math.min(minValue + LIMIT, 100);
        } else {
            value = Math.min(maxValue, 100);
        }
        setValueTwo(value);
        onChange({max: value, min: valueOne});
    }
  return (
    <div className='py-1 rounded-md overflow-hidden'>
        <div className='relative h-2'>
            <input ref={rangeOne} type='range' min="0" max="100" value={valueOne} className={classes(rangeClassName, 'z-10 range')} onInput={onMinSlide}/>
            <input ref={rangeTwo} type='range' min="0" max="100"  value={valueTwo} className={classes(rangeClassName, 'z-10 range')} onInput={onMaxSlide}/>
            <div className='absolute left-0 right-0 top-0 bottom-0 bg-junky-yellow/25 rounded-md'/>
            {/* left-0 right-0 */}
            <div className='absolute  top-0 bottom-0 bg-junky-yellow rounded-md' style={{left: `${valueOne}%`, right: `${100 - valueTwo}%`}}/>
        </div>
    </div>
  )
}

export default Slider;