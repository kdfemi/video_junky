import '@testing-library/jest-dom';
import Toolbar from ".."
import { render, screen } from "../../../../__mocks__/mockProvider"

describe('Toolbar', () => {
    it('Should be in document', () => {
        render(<Toolbar />)
        const toolbar = screen.getByTestId('toolbar');
        expect(toolbar).toBeInTheDocument()
    })
    it('Should match snap shot', () => {
        render(<Toolbar />)
        const toolbar = screen.getByTestId('toolbar');
        expect(toolbar).toMatchSnapshot()
    })
})