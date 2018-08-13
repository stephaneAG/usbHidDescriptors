/* Copyright (c) 2015 Gordon Williams, Pur3 Ltd. See the file LICENSE for copying permission. */
/* 

```
var mouse = require("USBMouse");

setWatch(function() {
  mouse.send(20,20,mouse.BUTTONS.NONE); // X movement, Y movement, buttons pressed
}, BTN, {debounce:100,repeat:true, edge:"rising"});
```

*/

E.setUSBHID({
  reportDescriptor : [
  0x05,   0x01,                    // USAGE_PAGE (Generic Desktop)
  0x09,   0x02,                    // USAGE (Mouse)
  0xA1,   0x01,                    // COLLECTION (Application)
  0x09,   0x01,                    //   USAGE (Pointer)

  0xA1,   0x00,                    //   COLLECTION (Physical)
  0x05,   0x09,                    //     USAGE_PAGE (Button)
  0x19,   0x01,                    //     USAGE_MINIMUM (Button 1)
  0x29,   0x03,                    //     USAGE_MAXIMUM (Button 3)

  0x15,   0x00,                    //     LOGICAL_MINIMUM (0)
  0x25,   0x01,                    //     LOGICAL_MAXIMUM (1)
  0x95,   0x03,                    //     REPORT_COUNT (3)
  0x75,   0x01,                    //     REPORT_SIZE (1)

  0x81,   0x02,                    //     INPUT (Data,Var,Abs)
  0x95,   0x01,                    //     REPORT_COUNT (1)
  0x75,   0x05,                    //     REPORT_SIZE (5)
  0x81,   0x01,             // DIF //     INPUT (Data)

  0x05,   0x01,                    //     USAGE_PAGE (Generic Desktop)
  0x09,   0x30,                    //     USAGE (X)
  0x09,   0x31,                    //     USAGE (Y)
  0x09,   0x38,             // NEW //     USAGE (Wheel)

  0x15,   0x81,                    //     LOGICAL_MINIMUM (-127)
  0x25,   0x7F,                    //     LOGICAL_MAXIMUM (127)
  0x75,   0x08,                    //     REPORT_SIZE (8)
  0x95,   0x03,             // DIF //     REPORT_COUNT (3)

  0x81,   0x06,                    //     INPUT (Data,Var,Rel)
  0xC0,                            //   END_COLLECTION
  
  0x09,   0x3c,             // NEW //   USAGE (Motion Wakeup)
  0x05,   0xff,             // NEW //   USAGE_PAGE (Reserved 0xFF)
  0x09,   0x01,             // NEW //   USAGE (0x01)
  0x15,   0x00,             // NEW //   LOGICAL_MINIMUM (0)
  
  0x25,   0x01,             // NEW //   LOGICAL_MAXIMUM (1)
  0x75,   0x01,             // NEW //   REPORT_SIZE (1)
  0x95,   0x02,             // NEW //   REPORT_COUNT(2)
  
  0xb1,   0x22,             // NEW //   FEATURE (Data,Var,Abs,No Wrap,Linear,No Preferred State,No Null Position,Non-volatile)
  0x75,   0x06,             // NEW //   REPORT_SIZE (6)
  0x95,   0x01,             // NEW //   REPORT_COUNT(1)
  0xb1,   0x01,             // NEW //   FEATURE (Const,Array,Abs,No Wrap,Linear,Preferred State,No Null Position,Non-volatile)
  
  0xc0 ]                           // END_COLLECTION
});

exports.BUTTONS = {
  NONE : 0,  // 0b000
  LEFT : 1,  // 0b001
  RIGHT : 2, // 0b010
  MIDDLE : 4 // 0b100
};

exports.send = function(x,y,b) {
  E.sendUSBHID([b&7,x,y,0]);
  // Q1: why ensure b is only 3 bits since middle button "biggest" value is 0b100 ?
  // Q2: why the last byte ? wheel ?
};
