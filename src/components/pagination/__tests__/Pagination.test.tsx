import '@testing-library/jest-dom';
import { render, screen, within } from '../../../../__mocks__/mockProvider';
import Pagination from '..';

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(() => ({
        get: jest.fn(() => '10')
    })),
    usePathname: jest.fn(() => 'path')
}))

describe('Pagination', () => {
    it('Should be in document', () => {
        render(<Pagination size={10} />);
        const pages = screen.getByTestId('pagination');
        expect(pages).toBeInTheDocument();
    });

    it('Should have ten buttons', () => {
      render(<Pagination size={10} />)
      const pages = screen.queryAllByTestId(/page-[0-9]{1,}/)
      expect(pages).toHaveLength(10)
    });

    it('Should not be visible', async () => {
        render(<Pagination size={0} />);
        const pages = screen.queryByTestId('pagination');
        expect(pages).not.toBeInTheDocument();
    });

    it('Should have one active button', async () => {
        render(<Pagination size={10} />);
        const page = screen.queryByTestId(/page-9/);
        const pageParagraph = within(page!).getByText(10);
        expect(pageParagraph).toHaveClass('text-white !bg-junky-green border-junky-green');
    });
})