import {
  selectEventsList,
  selectEvent,
  selectEventsListByUser,
} from './events.state';

const state = {
  events: [{
    title: 'myTitle',
    location: '',
    date: new Date('2001-01-01'),
    description: '',
    addedBy: 'user1',
    imageUrl: '',
    id: '2',
  }, {
    title: 'myTitle',
    location: '',
    date: new Date('2001-01-01'),
    description: '',
    addedBy: '',
    imageUrl: '',
    id: '1',
  }],
};

describe('Events Selectors', () => {
  describe('selectEventsList', () => {
    it('should select the events', () => {
      expect(selectEventsList.projector(state)).toEqual(state.events);
    });
  });
  describe('selectEvent', () => {
    it('should select the event by id', () => {
      expect(selectEvent('1').projector(state)).toEqual(state.events[1]);
    });
  });
  describe('selectEventListByUser', () => {
    it('should select the events by user email (addedBy)', () => {
      expect(selectEventsListByUser('user1').projector(state)).toEqual([state.events[0]]);
    });
  });
});
