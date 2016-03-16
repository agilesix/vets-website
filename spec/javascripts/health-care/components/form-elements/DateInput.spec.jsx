import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import SkinDeep from 'skin-deep';

import DateInput from '../../../../../_health-care/_js/components/form-elements/DateInput';

describe('<DateInput>', () => {
  describe('propTypes', () => {
    let consoleStub;
    beforeEach(() => {
      consoleStub = sinon.stub(console, 'error');
    });

    afterEach(() => {
      consoleStub.restore();
    });

    xit('value is required', () => {
      SkinDeep.shallowRender(<DateInput/>);
      sinon.assert.calledWithMatch(consoleStub, /Required prop `value` was not specified in `DateInput`/);
    });

    it('value must be an object', () => {
      SkinDeep.shallowRender(<DateInput value/>);
      sinon.assert.calledWithMatch(consoleStub, /Invalid prop `value` of type `boolean` supplied to `DateInput`, expected `object`/);
    });

    xit('onValueChange is required', () => {
      SkinDeep.shallowRender(
        <DateInput value={{ day: 1, month: 12, year: 2010 }}/>);
      sinon.assert.calledWithMatch(consoleStub, /Required prop `onValueChange` was not specified in `DateInput`/);
    });

    it('onValueChange must be a func', () => {
      SkinDeep.shallowRender(
        <DateInput value={{ day: 1, month: 12, year: 2010 }} onValueChange/>);
      sinon.assert.calledWithMatch(consoleStub, /Invalid prop `onValueChange` of type `boolean` supplied to `DateInput`, expected `function`/);
    });
  });

  describe('error css', () => {
    it('no error styles when date is valid', () => {
      // Smarch is not a real month.
      const tree = SkinDeep.shallowRender(
        <DateInput value={{ day: 1, month: 12, year: 2010 }} onValueChange={(_update) => {}}/>);
      expect(tree.everySubTree('.usa-input-error')).to.have.lengthOf(0);
      expect(tree.everySubTree('.usa-input-error-label')).to.have.lengthOf(0);
    });

    it('has error styles when date is invalid', () => {
      const tree = SkinDeep.shallowRender(
        <DateInput value={{ day: 1, month: 12, year: '' }} onValueChange={(_update) => {}}/>);
      expect(tree.everySubTree('.usa-input-error')).to.have.lengthOf(1);
      expect(tree.everySubTree('.usa-input-error-label')).to.have.lengthOf(3);
    });
  });

  describe('ensure value changes propagate', () => {
    it('day changes', () => {
      let dateInput;

      const updatePromise = new Promise((resolve, _reject) => {
        dateInput = ReactTestUtils.renderIntoDocument(
          <DateInput
              value={{ day: 1, month: 2, year: 2010 }}
              onValueChange={(update) => { resolve(update); }}/>
        );
      });

      dateInput._day.value = 3;
      ReactTestUtils.Simulate.change(dateInput._day);

      return expect(updatePromise).to.eventually.eql({ day: 3, month: 2, year: 2010 });
    });

    it('month changes', () => {
      let dateInput;

      const updatePromise = new Promise((resolve, _reject) => {
        dateInput = ReactTestUtils.renderIntoDocument(
          <DateInput
              value={{ day: 1, month: 2, year: 2010 }}
              onValueChange={(update) => { resolve(update); }}/>
        );
      });

      dateInput._month.value = 3;
      ReactTestUtils.Simulate.change(dateInput._month);

      return expect(updatePromise).to.eventually.eql({ day: 1, month: 3, year: 2010 });
    });

    it('year changes', () => {
      let dateInput;

      const updatePromise = new Promise((resolve, _reject) => {
        dateInput = ReactTestUtils.renderIntoDocument(
          <DateInput
              value={{ day: 1, month: 2, year: 2010 }}
              onValueChange={(update) => { resolve(update); }}/>
        );
      });

      dateInput._year.value = 1900;
      ReactTestUtils.Simulate.change(dateInput._year);

      return expect(updatePromise).to.eventually.eql({ day: 1, month: 2, year: 1900 });
    });
  });

  it('has sane looking features', () => {
    const tree = SkinDeep.shallowRender(
      <DateInput value={{ day: 1, month: 12, year: 2010 }} onValueChange={(_update) => {}}/>);
    expect(tree.everySubTree('input')).to.have.lengthOf(3);
  });
});
