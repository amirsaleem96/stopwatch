import { renderComponent , expect } from '../test_helper';
import App from '../../src/components/app';

describe('App' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('should have a child with class stopwatch-container', () => {
    expect(component.find('.stopwatch-container')).to.exist;
  });
});
