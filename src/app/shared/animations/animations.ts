
import { trigger, style, animate, transition, state } from '@angular/animations';

export const fadeInTop = trigger('fadeInTop', [
  transition(':enter', [
    style({
      transform: 'translateY(-100%)',
      opacity: 0,
    }),
    animate('1s')
  ]),
]);

export const fadeInBottom = trigger('fadeInBottom', [
  transition(':enter', [
    style({
      transform: 'translateY(3rem)',
      opacity: 0,
    }),
    animate('.5s ease-in')
  ]),
]);
