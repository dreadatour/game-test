import * as me from 'melonjs/dist/melonjs.module.js';

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
      // load a level
      me.level.load("area01");

      // start the game
      me.state.change(me.state.PLAY);
    }
};

export default PlayScreen;
