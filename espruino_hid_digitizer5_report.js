/*
  R: heavily inspired from the report descriptors & input report at following address:
  https://discussions.apple.com/thread/251720560

  by StephaneAG - 10/10/2020
*/

/*
  Usage:
  var digitizer = require("https://github.com/stephaneAG/usbHidDescriptors/raw/master/espruino_hid_digitizer5_report.js");

  setWatch(function() {
    //sendState = function(tipSwitch, inRange, x, y);
  }, BTN, {debounce:100,repeat:true, edge:"rising"});

*/

// define report descriptor ( R: from 'usb_desc.h' -> TOUCH_DEVICE == 2 )
E.setUSBHID({
  reportDescriptor : [
    0x05, 0x0d,        // USAGE_PAGE (Digitizers)
   0x09, 0x01,            // USAGE (Digitizer)
   0xa1, 0x01,            // COLLECTION (Application)
   0x85, 0x01,         // REPORT_ID (Touch)
   0x05, 0x0d,         // USAGE_PAGE (Digitizers)
   0x09, 0x20,         // USAGE (stylus)
   0xa1, 0x02,         // COLLECTION (Logical)
   0x09, 0x42,         // USAGE (Tip Switch)
   0x15, 0x00,         // LOGICAL_MINIMUM (0)
   0x25, 0x01,         // LOGICAL_MAXIMUM (1)
   0x75, 0x01,         // REPORT_SIZE (1)
   0x95, 0x01,         // REPORT_COUNT (1)
   0x81, 0x02,         // INPUT (Data,Var,Abs)
   0x09, 0x32,            // USAGE (In Range)
   0x81, 0x02,         // INPUT (Data,Var,Abs)
   0x95, 0x02,         // REPORT_COUNT (2)
   0x81, 0x01,         // INPUT (Cnst,Ary,Abs)
   0x75, 0x04,         // REPORT_SIZE (4)
   0x09, 0x51,         // USAGE ( Contact Identifier)
   0x25, 0x0f,         //  LOGICAL_MAXIMUM (255)
   0x95, 0x01,         // REPORT_COUNT (1)
   0x81, 0x02,         // INPUT (Data,Var,Abs)
   0x05, 0x01,         // USAGE_PAGE (Generic Desk)
   0x16, 0x00,0x00,    //HID_LogicalMinS (0)
   0x26, (0xcA8&0xff), (0xcA8>>8),    // LOGICAL_MAXIMUM
   0x75, 16,           // REPORT_SIZE (16)
   0x55, 0x00,            // UNIT_EXPONENT (0)
   0x65, 0x00,         // UNIT (00)
   0x09, 0x30,         // USAGE (X)
   0x36, 0x00,0x00,    // PHYSICAL_MINIMUM (0)
   0x46, (0xcA8&0xff), (0xcA8>>8),        // PHYSICAL_MAXIMUM
   0x95, 0x01,            // REPORT_COUNT (1)
   0x81, 0x02,         // INPUT (Data,Var,Abs)
   0x26, (0x1680&0xff), (0x1680>>8),   // LOGICAL_MAXIMUM
   0x46, (0x1680&0xff), (0x1680>>8),   // PHYSICAL_MAXIMUM
   0x09, 0x31,         // USAGE (Y)
   0x81, 0x02,            // INPUT (Data,Var,Abs)
   0xc0,               // END_COLLECTION
   0x85, 0x02,         // REPORT_ID (Feature)
   0x75, 0x08,            // REPORT_SIZE (8)
   0x95, 0x01,         // REPORT_COUNT (1)
   0x15, 0x01,         // LOGICAL_MINIMUM (1)
   0x25, 0x08,           // LOGICAL_MAXIMUM (8)
   0x09, 0x55,         // USAGE(Maximum Count)
   0xB1, 0x02,         // FEATURE (Data,Var,Abs)
   0xc0               // END_COLLECTION
  ]
});
//Based on the above report descriptor, HID input packets
//sent to the host on EP1 IN should be formatted as follows:
// ..

// export needed stuff to be made available outside of module
/*
exports.BUTTONS = {
  // ..
};
*/

/*
R: quick poc on setting the bit fields for byte 1:
var num = 0b00000000;
var tipSwitch = 1;
var barrelSwith = 0;
var erasureSwitch = 0;
var inverting = 0;
var inRange = 1;
console.log( '0b' + (num | tipSwitch | (barrelSwith << 1) | (erasureSwitch << 2) | (inverting << 3) | (inRange << 4) ).toString(2) );
// condensed version: num|tipSwitch|barrelSwith<<1|erasureSwitch<<2|inverting<<3|inRange<<4
*/

exports.sendState = function(tipSwitch, inRange, x, y){
  E.sendUSBHID([
    // ..
    //(x>>8) & 0xFF, // hight byte
    //x & 0xFF, // low byte
  ]);
};
