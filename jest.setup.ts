Object.defineProperty(globalThis, 'matchMedia', {
    value: jest.fn(() => ({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
    }))
});