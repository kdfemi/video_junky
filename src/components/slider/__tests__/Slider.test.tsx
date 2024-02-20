import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '../../../../__mocks__/mockProvider';
import Slider from '..';

describe('Slider', () => {
    it('Should be in document', () => {
        const onChange = jest.fn();
        render(<Slider onChange={onChange}/>);
        const slider = screen.getByRole('slider');
        expect(slider).toBeInTheDocument();
    })

    it('Should call onChange on slide', () => {
        const onChange = jest.fn();
        render(<Slider onChange={onChange}/>);
        const slider = screen.getAllByRole('button');
        fireEvent.input(slider[0], {target: {value: 1}})
        expect(onChange).toHaveBeenCalled();
    })
},)