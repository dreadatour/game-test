import * as me from 'melonjs/dist/melonjs.module.js';
import 'index.css';

import {TitleScreen} from 'js/stage/title.js';
import {PlayScreen} from 'js/stage/play.js';
import {PlayerEntity} from 'js/renderables/player.js';

import {DataManifest} from 'manifest.js';

me.device.onReady(() => {
    // initialize the display canvas once the device/browser is ready
    if (!me.video.init(640, 480, {parent : "screen", scale : "auto"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // initialize the debug plugin in development mode.
    if (process.env.NODE_ENV === 'development') {
        import('js/plugin/debug/debugPanel.js').then((plugin) => {
            // automatically register the debug panel
            me.utils.function.defer(me.plugin.register, this, plugin.DebugPanelPlugin, "debugPanel");
        });

    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // allow cross-origin for image/texture loading
    me.loader.crossOrigin = "anonymous";

    // set and load all resources.
    me.loader.preload(DataManifest, function() {
        // set the user defined game stages
        me.state.set(me.state.MENU, new TitleScreen());
        me.state.set(me.state.PLAY, new PlayScreen());

        // set a global fading transition for the screen
        me.state.transition("fade", "#FFFFFF", 250);

        // add our player entity in the entity pool
        me.pool.register("player", PlayerEntity);

        // enable the keyboard
        me.input.bindKey(me.input.KEY.UP,    "up");
        me.input.bindKey(me.input.KEY.DOWN,  "down");
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.W,     "up");
        me.input.bindKey(me.input.KEY.S,     "down");
        me.input.bindKey(me.input.KEY.A,     "left");
        me.input.bindKey(me.input.KEY.D,     "right");

        // Start the game.
        me.state.change(me.state.PLAY);
    });
});
