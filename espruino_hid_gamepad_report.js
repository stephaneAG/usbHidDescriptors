/* Copyright (c) 2018 Stephane Adam Garnier, SeedsDesign. See the file LICENSE for copying permission. 

    R: this module is in huge wip ( it 'll soon include a wrapper to ease pressing/releasing btns & moving joysticks .. )

*/
/* 
```
var gamepad = require("USBGamepad");

setWatch(function() {
  gamepad.sendGamepadState({buttonsByte: , ljoyX: [, ..]}, function(){
    // ..
  });
}, BTN, {debounce:100,repeat:true, edge:"rising"});
// or
setInterval(function(){
  if(btnState != lastBtnState || lastX1 != x1 || lastY1 != y1 || lastX2 != x2 || lastY2 != y2){
    gamepad.sendGamepadState(btnState, );
  }
}, 200);

```
*/
/*

R: default for 'USAGE(Gamepad)' is one joystick & 3 buttons
   instead, we want 2 joysticks & 16 buttons

      | Bit7   | Bit6   | Bit5   | Bit4   | Bit3   | Bit2   | Bit1   | Bit0   |
Byte0 | Button | Button | Button | Button | Button | Button | Button | Button |
Byte1 | Button | Button | Button | Button | Button | Button | Button | Button |
Byte2 | L X-axis ( signed int )                                               |
Byte3 | L Y-axis ( signed int )                                               |
Byte4 | R X-axis ( signed int )                                               |
Byte5 | L Y-axis ( signed int )                                               |

// gamepad_report_t
var buttons = 0b00000000 00000000; // uint16_t
var lx = 0b00000000;              // int8_t
var ly = 0b00000000;              // int8_t
var rx = 0b00000000;              // int8_t
var ry = 0b00000000;              // int8_t

*/

E.setUSBHID({
  reportDescriptor : [
  0x05,   0x01,                    // USAGE_PAGE (Generic Desktop)
  0x09,   0x05,                    // USAGE (Game Pad) - Hut1_12v2.pdf p28 of 128
  0xA1,   0x01,                    // COLLECTION (Application)

  0xA1,   0x00,                    //   COLLECTION (Physical)
  0x05,   0x09,                    //     USAGE_PAGE (Button)
  0x19,   0x01,                    //     USAGE_MINIMUM (Button 1)
  0x29,   0x10,                    //     USAGE_MAXIMUM (Button 16)

  0x15,   0x00,                    //     LOGICAL_MINIMUM (0)
  0x25,   0x01,                    //     LOGICAL_MAXIMUM (1)
  0x95,   0x10,                    //     REPORT_COUNT (16)
  0x75,   0x01,                    //     REPORT_SIZE (1)

  0x81,   0x02,                    //     INPUT (Data,Var,Abs)

  0x05,   0x01,                    //     USAGE_PAGE (Generic Desktop)
  0x09,   0x30,                    //     USAGE (X)
  0x09,   0x31,                    //     USAGE (Y)
  0x09,   0x32,                    //     USAGE (Z) - Hut1_12v2.pdf p26 = represents R X-axis
  0x09,   0x33,                    //     USAGE (Rx) - Hut1_12v2.pdf p26 = represents R Y-axis
    
  0x15,   0x81,                    //     LOGICAL_MINIMUM (-127)
  0x25,   0x7F,                    //     LOGICAL_MAXIMUM (127)
  0x75,   0x08,                    //     REPORT_SIZE (8)
  0x95,   0x04,                    //     REPORT_COUNT (4)

  0x81,   0x06,                    //     INPUT (Data,Var,Abs) - absolute for joysticks ( != rel for mouse )
  0xC0,                            //   END_COLLECTION
  
  0xc0 ]                           // END_COLLECTION
});


exports.BUTTONS = {
  START:      0x0001, // 
  SELECT:     0x0002, // 
  
  PAD_UP:     0x0004, // 
  PAD_DOWN:   0x0008, //
  PAD_LEFT:   0x0010, //
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

/*
var lastBtnState = 0;
var lastX1 = 0;
var lastY1 = 0;
var lastX2 = 0;
var lastY2 = 0;

var btnState = 0;
var x1 = 0;
var y1 = 0;
var x2 = 0;
var y2 = 0;
*/

exports.sendGamepadState = function(btnState, x1, y1, x2, y2){
  E.sendUSBHID([
    //0x06,                 // bLength
    //0x01,                 // bDescriptorType - constant ( String assigned by USB )
    btnState & 0xFF,      // Byte0
    (btnState>>8) & 0xFF, // Byte1   
    x1,                   // Byte2
    y1,                   // Byte3
    x2,                   // Byte4
    y2,                   // Byte5
  ]);
};
