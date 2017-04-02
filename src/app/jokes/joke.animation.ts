import {trigger, state, style, transition, animate} from "@angular/core";

export const deleteJoke = trigger('del', [
  state('active', style({backgroundColor: 'green', opacity: '1'})),
  transition('active => void', [animate(400, style({opacity: '0'}))])
]);
