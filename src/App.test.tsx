import renderer from 'react-test-renderer';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('App Component', () => {
  test('should match the snapshot', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
