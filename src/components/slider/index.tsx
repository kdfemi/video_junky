import React, { FC, FormEvent, useEffect, useRef, useState } from 'react'
import { classes } from 'src/common/helper';

// common range input classes
const rangeClassName = 'absolute left-0 right-0  -top-1';

export type TrimValue = {
    /**
     * Minimum value in percentage 
     */
    min: number; 
    /**
     * Mav value in percentage
     */
    max: number
};

type SliderProps = {
    /**
     * Minimum range value in percentage
     * @default 0
     */
    min?: number;
    /**
     * Maximum range value percentage
     * @default 100
     */
    max?: number;
    /**
     * Triggers when minimum or maximum thumb is dragged
     * @param props New minimum and maximum value
     * @returns 
     */
    onChange: (props: TrimValue) => void
};

export const Slider: FC<SliderProps> = ({onChange, max = 100, min = 0, }) => {

    // create space between minimum and maximum thumb, to make thumb overlap we can set it to zero
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
            // prevent min thumb from going beyond max thumb
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
            // prevent max thumb from going beyond minimum thumb
            value = Math.min(minValue + LIMIT, 100);
        } else {
            value = Math.min(maxValue, 100);
        }
        setValueTwo(value);
        onChange({max: value, min: valueOne});
    }
  return (
    <div className='py-1 rounded-md overflow-hidden' role="slider" aria-valuenow={valueTwo - valueOne} aria-valuemax={100} aria-valuemin={0}>
        <div className='relative h-2'>
            {/* Minimum thumb */}
            <input role='button' aria-label='min knob' ref={rangeOne} type='range' title='Start' min="0" max="100" value={valueOne} className={classes(rangeClassName, 'z-10 range')} onInput={onMinSlide}/>
            {/* Maximum thumb */}
            <input role='button' aria-label='max knob' ref={rangeTwo} type='range' title='End' min="0" max="100"  value={valueTwo} className={classes(rangeClassName, 'z-10 range')} onInput={onMaxSlide}/>
            {/* Slider unfilled indicator */}
            <div aria-hidden className='absolute left-0 right-0 top-0 bottom-0 bg-junky-yellow/25 rounded-md'/>
            {/* left-0 right-0 */}
            {/* Slider filled indicator */}
            <div role='progressbar' className='absolute  top-0 bottom-0 bg-junky-yellow rounded-md' style={{left: `${valueOne}%`, right: `${100 - valueTwo}%`}}/>
        </div>
    </div>
  )
}

export default Slider;