import { renderComponent, expect } from '../test_helper';
import StopwatchContainer from '../../src/components/stopwatch_container';

describe("Main container", () => {
    
    let component;
    beforeEach(() => {
        component = renderComponent(StopwatchContainer);
    });

    it("should render something", () => {
        expect(component).to.exist;
    });

    it("should have a class name of stopwatch-container", () => {
        expect(component).to.have.class('stopwatch-container');
    });

});

