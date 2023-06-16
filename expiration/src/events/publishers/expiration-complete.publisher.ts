import {
  Subjects,
  Publisher,
  IExpirationCompleteEvent,
} from '@hg-ticketing/common';

export class ExpirationCompletePublisher extends Publisher<IExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
