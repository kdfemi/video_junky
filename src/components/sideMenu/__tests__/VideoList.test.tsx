import '@testing-library/jest-dom';
import { render, screen } from "../../../../__mocks__/mockProvider"
import VideoList from '../VideoList';
import { getVideosResponseEmptyMock, getVideosResponseMock } from '../../../../__mocks__/getVideos.mock';
import { getVideos } from 'src/app/api/actions';



jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(() => ({
        get: jest.fn(() => '10')
    })),
    usePathname: jest.fn(() => 'path')
}))

jest.mock('src/app/api/actions', () => ({
    getVideos: jest.fn(() => getVideosResponseMock),
}));

describe('VideoList', () => {
    it('Should be in document and have content', () => {
        render(<VideoList params={{page: 1, size: 10}}/>);
        const videoList = screen.getByTestId('videoList');
        expect(videoList).toBeInTheDocument();
        expect(videoList.textContent).toContain("Joh John Florence And Friends At Rocky Point (4K Raw)");
    })


    it('Should show empty state', () => {
        (getVideos as jest.Mock).mockReturnValue(getVideosResponseEmptyMock)
        render(<VideoList params={{page: 1, size: 10}}/>);
        const videoList = screen.getByTestId('videoList');
        expect(videoList.textContent).toContain('No Videos available');
    })


    it('Should render one video item', () => {
        render(<VideoList params={{page: 1, size: 10}}/>);
        const videoList = screen.getAllByTestId(/video-*/i);
        expect(videoList.length).toBe(1);
    })
})