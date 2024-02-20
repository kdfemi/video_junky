import '@testing-library/jest-dom';
import SideMenu from ".."
import { render, screen } from "../../../../__mocks__/mockProvider"
jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(() => ({
        get: jest.fn(() => '10')
    })),
    usePathname: jest.fn(() => 'path'),
    useRouter: jest.fn(() => ({replace: jest.fn()}))
}))

describe('SideMenu', () => {
    it('Should be in document', () => {
        render(<SideMenu/>);
        const sideMenu = screen.getByTestId('sideMenu');
        expect(sideMenu).toBeInTheDocument();
    })
    it('Should match snapshot', () => {
        render(<SideMenu/>);
        const sideMenu = screen.getByTestId('sideMenu');
        expect(sideMenu).toMatchSnapshot();
    })
})