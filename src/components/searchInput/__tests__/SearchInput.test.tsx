import '@testing-library/jest-dom';
import SearchInput from "..";
import { fireEvent, render, screen,  } from "../../../../__mocks__/mockProvider";
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(() => ({
        get: jest.fn(() => '10')
    })),
    usePathname: jest.fn(() => 'path'),
    useRouter: jest.fn(() => ({replace: jest.fn()}))
}))


describe('SearchInput', () => {
    it('Should be in document', () => {
        render(<SearchInput placeholder="test"/>);
        const input = screen.getByPlaceholderText(/test/i);
        expect(input).toBeInTheDocument();
    });
    it('Should call on change', () => {
        const onChange = jest.fn();
        render(<SearchInput onChange={onChange}  placeholder="test"/>);
        const input = screen.getByPlaceholderText(/test/i);
        fireEvent.change(input, {target: {value: 'hello'}})
        expect(onChange).toHaveBeenCalled();
    });
    it('Should focus when click', async () => {
        const user = userEvent.setup()
        render(<SearchInput  placeholder="test"/>);
        const input = screen.getByPlaceholderText(/test/i);
        await user.click(input);
        expect(input).toHaveFocus();
    });
})