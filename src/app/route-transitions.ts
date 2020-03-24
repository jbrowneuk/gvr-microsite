import {
  trigger,
  transition,
  query,
  style,
  animate,
  animateChild
} from '@angular/animations';

export const RouteTransitions = [
  trigger('routeTransition', [
    transition('* => *', [
      query(':enter .backdrop', [
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 }))
      ], { optional: true }),
      query(':leave .backdrop', [
        style({ opacity: 1 }),
        animate(200, style({ opacity: 0 }))
      ], { optional: true })
    ])
  ])
];
