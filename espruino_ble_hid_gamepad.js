/* Copyright (c) 2018 Stephane Adam Garnier, SeedsDesign. See the file LICENSE for copying permission.
    == Espruino GamePad v0.1a ==
    R: this module is in huge wip ( it 'll soon include a wrapper to ease pressing/releasing btns & moving joysticks .. )
*/
/*
Usage:
  var gamepad = require("ble_hid_gamepad");
  NRF.setServices(undefined, { hid : gamepad.report });
  gamepad.sendGamepadState(0b1111111111111111, 127, -127, 127, -127);
*/
// http://www.usb.org/developers/hidpage/Hut1_12v2.pdf
exports.report = new Uint8Array([
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
);

exports.sendGamepadState = function(btnState, x1, y1, x2, y2, cb){
  NRF.sendHIDReport([
    //0x06,                 // bLength
    //0x01,                 // bDescriptorType - constant ( String assigned by USB )
    btnState & 0xFF,      // Byte0
    (btnState>>8) & 0xFF, // Byte1
    x1,                   // Byte2
    y1,                   // Byte3
    x2,                   // Byte4
    y2,                   // Byte5
  ]);
  if (cb) cb();
};
