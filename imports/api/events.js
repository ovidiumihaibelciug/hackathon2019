import EventEmitter from 'event-emitter';

const Events = {
  CASE_CREATED: 'case.created',
};

const Emitter = new EventEmitter();

export { Events, Emitter };
