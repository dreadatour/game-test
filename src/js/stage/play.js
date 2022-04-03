import * as me from 'melonjs/dist/melonjs.module.js';

export class PlayScreen extends me.Stage {
  /**
  *  action to perform on state change
  */
  onResetEvent() {
    // load a level
    me.level.load("labyrinth");

    console.log(me.level.getCurrentLevel().getLayers()[0]);
  }
}
