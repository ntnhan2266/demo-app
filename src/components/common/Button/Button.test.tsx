import renderer from 'react-test-renderer';
import Button from './';

describe('Snapshot Testing for App Component', () => {

  it('should match the snapshot', () => {
    const tree = renderer
      .create(<Button label='a' />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
