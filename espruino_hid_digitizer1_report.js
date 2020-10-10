/*
  R: heavily inspired from the report descriptors & input report at following address ( is currently more a quick port than anything else, big thx to the author(s) )
  https://gist.github.com/mbt28/406bdf15a248029c774085832c7c0c0c

  by StephaneAG - 10/10/2020
*/

/*
  Usage:
  var digitizer = require("https://github.com/stephaneAG/usbHidDescriptors/raw/master/espruino_hid_digitizer1_report.js");

  //tmp vars
  //contactCount=1;
  //contactID=1;
  //tipSW=96;
  var square_completed = false; // bool
  var x = 5000; // int16_t
  var y = 5000; // int16_t

  setWatch(function() {
    if (square_completed = false){ // here we try to draw a square on the screen.
      y = 4000;
      for( x = 4000; x <= 6000; x++ ){
        digitizer.sendState(x, y);
      }
      for( y = 4000; y <= 6000; y++ ){
        digitizer.sendState(x, y);
      }
      for( x = 6000; x >= 4000; x-- ){
        digitizer.sendState(x, y);
      }
      for( y = 6000; y >= 4000; y-- ){
        digitizer.sendState(x, y);
      }
      square_completed = true;
    }
  }, BTN, {debounce:100,repeat:true, edge:"rising"});

*/

// define report descriptor
E.setUSBHID({
  reportDescriptor : [
    // Multi Touch Panel
    0x05, 0x0D,                    // USAGE_PAGE(Digitizers)
    0x09, 0x04,                    // USAGE     (Touch Screen)
    0xA1, 0x01,                    // COLLECTION(Application)

    // define the maximum amount of fingers that the device supports
    0x09, 0x55,                    //   USAGE(Contact Count Maximum)
    0x25, 0x01,                    //   LOGICAL_MAXIMUM (1)
    0xB1, 0x02,                    //   FEATURE (Data,Var,Abs)

    // define the actual amount of fingers that are concurrently touching the screen
    0x09, 0x54,                    //   USAGE (Contact count)
    0x95, 0x01,                    //   REPORT_COUNT(1)
    0x75, 0x08,                    //   REPORT_SIZE (8)
    0x81, 0x02,                    //   INPUT (Data,Var,Abs)

    // declare a finger collection
    0x09, 0x22,                    //   USAGE (Finger)
    0xA1, 0x02,                    //   COLLECTION (Logical)

    // declare an identifier for the finger
    0x09, 0x51,                    //     USAGE (Contact Identifier)
    0x75, 0x08,                    //     REPORT_SIZE (8)
    0x95, 0x01,                    //     REPORT_COUNT (1)
    0x81, 0x02,                    //     INPUT (Data,Var,Abs)

    // declare Tip Switch and In Range
    0x09, 0x42,                    //     USAGE (Tip Switch)
    0x09, 0x32,                    //     USAGE (In Range)
    0x15, 0x00,                    //     LOGICAL_MINIMUM (0)
    0x25, 0x01,                    //     LOGICAL_MAXIMUM (1)
    0x75, 0x01,                    //     REPORT_SIZE (1)
    0x95, 0x02,                    //     REPORT_COUNT(2)
    0x81, 0x02,                    //     INPUT (Data,Var,Abs)

    // declare the remaining 6 bits of the first data byte as constant -> the driver will ignore them
    0x95, 0x06,                    //     REPORT_COUNT (6)
    0x81, 0x03,                    //     INPUT (Cnst,Ary,Abs)

    // define absolute X and Y coordinates of 16 bit each (percent values multiplied with 100)
    0x05, 0x01,                    //     USAGE_PAGE (Generic Desktop)
    0x09, 0x30,                    //     Usage (X)
    0x09, 0x31,                    //     Usage (Y)
    0x16, 0x00, 0x00,              //     Logical Minimum (0)
    0x26, 0x10, 0x27,              //     Logical Maximum (10000)
    0x36, 0x00, 0x00,              //     Physical Minimum (0)
    0x46, 0x10, 0x27,              //     Physical Maximum (10000)
    0x66, 0x00, 0x00,              //     UNIT (None)
    0x75, 0x10,                    //     Report Size (16),
    0x95, 0x02,                    //     Report Count (2),
    0x81, 0x02,                    //     Input (Data,Var,Abs)
    0xC0,                          //   END_COLLECTION
    0xC0                           // END_COLLECTION
  ]
});
// With this declaration a data packet must be sent as:
// byte 1   -> "contact count"        (always == 1)
// byte 2   -> "contact identifier"   (any value)
// byte 3   -> "Tip Switch" state     (bit 0 = Tip Switch up/down, bit 1 = In Range)
// byte 4,5 -> absolute X coordinate  (0...10000)
// byte 6,7 -> absolute Y coordinate  (0...10000)

// export needed stuff to be made available outside of module
/*
exports.BUTTONS = {
  // ..
};
*/

exports.sendState = function(x, y){
  E.sendUSBHID([
    1,
    1,
    67,
    (x>>8) & 0xFF, // hight byte
    x & 0xFF, // low byte
    (y>>8) & 0xFF,
    y & 0xFF,
  ]);
};
