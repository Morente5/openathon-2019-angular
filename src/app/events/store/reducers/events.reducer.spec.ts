import { eventsReducer, initialEventsState } from './events.reducer';
import * as EventsActions from '../actions/events.actions';

describe('Events Reducer', () => {
  describe('GET_EVENTS_SUCCESS', () => {
    it('should update the events on the state', () => {
      const action = EventsActions.GET_EVENTS_SUCCESS({ events: [] });

      const result = eventsReducer(initialEventsState, action);

      expect(result).toEqual({ ...initialEventsState, events: [] });
    });
  });
});
