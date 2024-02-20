import '@testing-library/jest-dom';
import VideoItem from ".."
import { videoMock } from "../../../../__mocks__/getVideos.mock"
import { fireEvent, render, screen } from "../../../../__mocks__/mockProvider"

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(() => ({
        get: jest.fn(() => '10')
    })),
    usePathname: jest.fn(() => 'path'),
    useRouter: jest.fn(() => ({replace: jest.fn()}))
}))

describe('VideoItem', () => {
    it('Should be in document', () => {
        render(<VideoItem video={videoMock} />)
        const videoItem = screen.getByTestId('videoItem')
        expect(videoItem).toBeInTheDocument();
    })
    it('Should be clickable', () => {
        const select = jest.fn();
        render(<VideoItem video={videoMock} onSelected={select}/>)
        const videoItem = screen.getByTestId('videoItem');
        fireEvent.click(videoItem)
        expect(select).toHaveBeenCalled();
    })
})