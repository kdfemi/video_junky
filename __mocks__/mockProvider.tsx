/// Mock Provider is a wrapper around @testing-library/react render method
/// This provides us away to mock Provider used app wide

import React, { PropsWithChildren } from 'react';
import { RenderOptions, render as rtlRender } from '@testing-library/react';

type CustomRenderOptions =  RenderOptions;

function render(
    ui: React.ReactElement,
    {
      ...renderOptions
    } = {} as CustomRenderOptions,
  ) {
    function Wrapper({ children }: PropsWithChildren) {
      return <>{children}</>;
    }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}


export * from '@testing-library/react';

export { render };