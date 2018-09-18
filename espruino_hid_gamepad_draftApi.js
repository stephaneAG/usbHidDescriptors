/*

    == Draf API ==                                                              == current API ==
    gamepad.press(<btnConst>); // press one                                     --> gamepad.press([BUTTONS.A]);
    gamepad.press([<btnConst>, <joyConst>, ..]); // press many                  --> gamepad.press([BUTTONS.A, BUTTONS.SELECT, BUTTONS.START]);
    gamepad.<btnConst>.press(); // press one                                    --> gamepad.A.press();
    gamepad.<joyConst>.press(); // same for joysticks buttons
    gamepad.<btnConst>.release // release one                                   --> gamepad.A.release();
    gamepad.release(<btnConst>, <joyConst>, ..]); // release many               --> gamepad.release([BUTTONS.A, BUTTONS.SELECT, BUTTONS.START]);
    // joysticks only: range [-127..127]
    gamepad.<joyConst>.move(<xValue>, <yValue>);                                --> gamepad.LJOY_X.move(45);
    gamepad.<joyConst>.moveX(<value>);
    gamepad.<joyConst>.moveY(<value>);
    // triggers only: range [0..255]
    gamepad.<trigConst>.press(<value>); // if analog, 'll range [0..255]
    // global
    gamepad.set({ <const>:<value>, .. });                                       --> gamepad.set({START:1, SELECT: 1, LJOY_X: 120})
    gamepad.unset();                                                            --> gamepad.unset();
    // update
    gamepad.sendState(); // or '.update()' ?                                    --> gamepad.sendState();
*/

/*
    TODO: thnk of the following when rewriting the below stuff ;

    '0b' + (btnState | BUTTONS.SELECT | BUTTONS.START | BUTTONS.R3).toString(2) // setting stuff
    '0b' + (btnState | BUTTONS.SELECT | BUTTONS.START | BUTTONS.R3 &~ BUTTONS.R3 ).toString(2) // AND-NOT-ing stuff to unset

    the above fixed it ;)
    gamepad.release( Object.values(BUTTONS) );
    gamepad state: 0b1111111111111110 debugger eval code:118:5
    gamepad state: 0b1111111111111100 debugger eval code:118:5
    gamepad state: 0b1111111111111000 debugger eval code:118:5
    gamepad state: 0b1111111111110000 debugger eval code:118:5
    gamepad state: 0b1111111111100000 debugger eval code:118:5
    gamepad state: 0b1111111111000000 debugger eval code:118:5
    gamepad state: 0b1111111110000000
    debugger eval code:118:5
    gamepad state: 0b1111111100000000
    debugger eval code:118:5
    gamepad state: 0b1111111000000000
    debugger eval code:118:5
    gamepad state: 0b1111110000000000
    debugger eval code:118:5
    gamepad state: 0b1111100000000000 debugger eval code:118:5
    gamepad state: 0b1111000000000000 debugger eval code:118:5
    gamepad state: 0b1110000000000000 debugger eval code:118:5
    gamepad state: 0b1100000000000000 debugger eval code:118:5
    gamepad state: 0b1000000000000000 debugger eval code:118:5
    gamepad state: 0b0 debugger eval code:118:5
*/

var BUTTONS = {
  START:      0x0001, //
  SELECT:     0x0002, //

  PAD_UP:     0x0004, //
  PAD_DOWN:   0x0008, // works gamepad.btnState = ( gamepad.btnState | (1<<0x0008) )
  PAD_LEFT:   0x0010, // stop working from here ? :| but gamepad.btnState = ( gamepad.btnState | (1<<0x0010) ) works ??!
  PAD_RIGHT:  0x0020, //

  Y:          0x0040, //
  YELLOW:     0x0040, //
  A:          0x0080, //
  GREEN:      0x0080, //
  X:          0x0100, //
  BLUE:       0x0100, //
  B:          0x0200, //
  RED:        0x0200, //

  L1:         0x0400, //
  R1:         0x0800, //

  L2:         0x1000, //
  R2:         0x2000, //

  L3:         0x4000, //
  R3:         0x8000, //
};

var button = function(bLabel, bValue){ this.bLabel = bLabel; this.bValue = bValue & 0xFFFF; };
button.prototype.bLabel = '';
button.prototype.bValue = 0;
// set corresponding bit in gamepad obj
button.prototype.press = function(){
  //gamepad.btnState = ( gamepad.btnState | (1<<this.bValue) ) & 0xFFFF;
  //console.log('WTF: gamepad.btnState | ( (1<<this.bValue) & 0xFFFF) & 0xFFFF -->' + ( gamepad.btnState | ( (1<<this.bValue) & 0xFFFF) & 0xFFFF) );
  //console.log('WTF: gamepad.btnState | ( (1<<this.bValue) & 0xFFFF) & 0xFFFF -->' + ( gamepad.btnState | 1<<this.bValue) ); // I AM SILLY ?
  console.log('WTF: gamepad.btnState | ( (1<<this.bValue) & 0xFFFF) & 0xFFFF -->' + ( gamepad.btnState | this.bValue) ); // NOT SILLY FIX ?
  //gamepad.btnState = gamepad.btnState | ( (1<<this.bValue) & 0xFFFF) & 0xFFFF;
  //gamepad.btnState = gamepad.btnState | (1<<this.bValue) & 0xFFFFFFFF;  // I AM SILLY ?
  gamepad.btnState |= this.bValue; // NOT SILLY FIX ?
  console.log('button const value: 0b' + this.bValue.toString(2));
  console.log('gamepad state: 0b' + gamepad.btnState.toString(2) );
}
// unset corresponding bit in gamepad obj
button.prototype.release = function(){
  //gamepad.btnState = ( gamepad.btnState & ~(1<<this.bValue)) & 0xFFFF; // I AM SILLY ?
  gamepad.btnState &=~ this.bValue; // NOT SILLY FIX ?
  console.log('button const value: ' + this.bValue);
  console.log('gamepad state: 0b' + gamepad.btnState.toString(2) );
}


var joystick = function(bLabel, objAttr){ this.bLabel = bLabel; this.objAttr = objAttr; };
joystick.prototype.bLabel = '';
joystick.prototype.objAttr = null;
joystick.prototype.move = function(value){
  console.log('joystick ' + this.bLabel + ' value: ' + value);
  console.log('joystick ' + this.objAttr + ' value: ' + value);
  //gamepad[this.bLabel] = value;
  gamepad[this.objAttr] = value;
  //this.objAttr = value;
};

var gamepad = {
  lastBtnState: 0b0000000000000000,
  btnState: 0b0000000000000000,
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0
}

// pass an array of btn to be pressed
// depending on the const(s) passed, we set the bits mapped from the const's value
gamepad.press = function(btnsArr){
  for(var i=0; i< btnsArr.length; i++){
    //this.btnState = ( this.btnState | (1<<btnsArr[i]) ) & 0xFFFF; // I AM SILLY ?
    this.btnState |= btnsArr[i]; // NOT SILLY FIX ?
    console.log('gamepad state: 0b' + this.btnState.toString(2) );
  }
};
// pass an array of btn to be pressed
// depending on the const(s) passed, we unset the bits mapped from the const's value
gamepad.release = function(btnsArr){
  for(var i=0; i< btnsArr.length; i++){
    //this.btnState = ( this.btnState & ~(1<<btnsArr[i]) ) & 0xFFFF; // I AM SILLY ?
    this.btnState &=~ btnsArr[i]; // NOT SILLY FIX ?
    console.log('gamepad state: 0b' + this.btnState.toString(2) );
  }
};
// "populate" the gamepad object with buttons children offering press() & release() methods
Object.keys(BUTTONS).forEach(function(bLabel){
  gamepad[bLabel] = new button(bLabel, BUTTONS[bLabel]);
});
// "populate" the gamepad object with joysticks children offering move(), moveX() & moveY()  methods
var JOYSTICKS = { LJOY_X: 'x1', LJOY_Y: 'y1', RJOY_X: 'x2', RJOY_Y: 'y2' };
Object.keys(JOYSTICKS).forEach(function(bLabel){
  //gamepad[bLabel] = new joystick(bLabel, gamepad[ JOYSTICKS[bLabel] ]);
  gamepad[bLabel] = new joystick(bLabel, JOYSTICKS[bLabel]);
});
// pass an array of elements to be set ( updated )
gamepad.set = function(optsObj){
  var that = this;
  Object.keys(optsObj).forEach(function(opt){
    //that[opt] = optsObj[opt]; // nope: overwrites our objs -> we want to
    // if the label is present in the BUTTONS consts, then we act depending on the value passed to set or unset correspondign bit
    if(typeof BUTTONS[opt] !== 'undefined'){
      if(optsObj[opt] === 1) that.btnState = that.btnState | (1<<BUTTONS[opt]);
      else that.btnState = that.btnState & ~(1<<BUTTONS[opt] ) & 0xFFFF;
    }
    // else, somehow map to the correct joystick & set its value directly
    // Thnk: accept 'LJOY':[x, y] ?
    else {
      (opt === 'LJOY_X') ? that.x1 = optsObj[opt] :
      (opt === 'LJOY_Y') ? that.y1 = optsObj[opt] :
      (opt === 'RJOY_X') ? that.x2 = optsObj[opt] :
      (opt === 'RJOY_Y') ? that.y2 = optsObj[opt] : null ;
    }
  });
};
// resets the gamepad ( unset all pressed stuff & cie - aka release all btns & center joysticks )
gamepad.unset = function(optsObj){
  this.btnState = 0b0000000000000000;
  this.x1 = 0;
  this.y1 = 0;
  this.x2 = 0;
  this.y2 = 0;
};
// send the current state of the gamepad object over usb
gamepad.sendState = function(){
  E.sendUSBHID([
    this.btnState & 0xFF,      // Byte0
    (this.btnState>>8) & 0xFF, // Byte1
    this.x1,                   // Byte2
    this.y1,                   // Byte3
    this.x2,                   // Byte4
    this.y2,                   // Byte5
  ]);
};
