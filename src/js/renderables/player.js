import * as me from 'melonjs/dist/melonjs.module.js';

const STAND = "stand";
const UP =    "up";
const DOWN =  "down";
const LEFT =  "left";
const RIGHT = "right";

export class PlayerEntity extends me.Entity {
  constructor(x, y, settings) {
    super(x, y , settings);

    // max walking & jumping speed
    this.body.setMaxVelocity(1, 1);
    this.body.setFriction(0.5, 0.5);

    // no gravity for player
    this.body.ignoreGravity = true;

    // ensure the player is updated even when outside of the viewport
    this.alwaysUpdate = true;

    // define a basic walking animation (using all frames)
    this.renderable.addAnimation(DOWN,  [0, 1, 2, 3]);
    this.renderable.addAnimation(UP,    [4, 5, 6, 7]);
    this.renderable.addAnimation(RIGHT, [8, 9, 10, 11]);
    this.renderable.addAnimation(LEFT,  [12, 13, 14, 15]);

    // define a standing animation (using the first frame)
    this.renderable.addAnimation(STAND,  [0]);

    // set the standing animation as default
    this.renderable.setCurrentAnimation(STAND);
  }

  update(dt) {
    let animation = STAND;

    if (me.input.isKeyPressed("up")) {
      // update the default force
      this.body.force.y = -this.body.maxVel.y;
      // change to the walking animation
      animation = UP;
    } else if (me.input.isKeyPressed("down")) {
      // update the default force
      this.body.force.y = this.body.maxVel.y;
      // change to the walking animation
      animation = DOWN;
    } else {
      this.body.force.y = 0;
    }

    if (me.input.isKeyPressed("left")) {
      // update the default force
      this.body.force.x = -this.body.maxVel.x;
      // change to the walking animation
      animation = LEFT;
    } else if (me.input.isKeyPressed("right")) {
      // update the entity velocity
      this.body.force.x = this.body.maxVel.x;
      // change to the walking animation
      animation = RIGHT;
    } else {
      this.body.force.x = 0;
    }

    if (!this.renderable.isCurrentAnimation(animation)) {
      this.renderable.setCurrentAnimation(animation);
    }

    return (super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  }

  onCollision(response, other) {
    // Make all other objects solid
    return true;
  }
};
