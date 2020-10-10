/*
  R: heavily inspired from the report descriptors & input report at following address:
  https://github.com/mentatpsi/Microchip/blob/master/USB/Device%20-%20HID%20-%20Digitizers/Single%20Touch%20-%20Firmware/usb_descriptors.c
  ( Microchip/USB/Device - HID - Digitizers/Single Touch - Firmware/usb_descriptors.c )

  by StephaneAG - 10/10/2020
*/

/*
  Usage:
  var digitizer = require("https://github.com/stephaneAG/usbHidDescriptors/raw/master/espruino_hid_digitizer2_report.js");

  var penData = {
    tipSwitch: 0,
    barrelSwitch: 0,
    erasureSwitch: 0,
    invert: 0,
    inRange: 1,
    x: 0,
    y: 0,
    tipPressure: 1,
    xTilt: 0,
    yTilt: 0
  };

  setWatch(function() {
    //digitizer.sendState(penData.tipSwitch, penData.barrelSwitch, penData.erasureSwitch, penData.invert, penData.inRange, penData.x, penData.y, penData.tipPressure, penData.xTilt, penData.yTilt);

    // do a 'swipe to left springboard pane' gesture uing one finger from (x:50,y:50) to (x:450,y:50)
    //digitizer.sendState(penData.tipSwitch, penData.barrelSwitch, penData.erasureSwitch, penData.invert, penData.inRange, penData.x, penData.y, penData.tipPressure, penData.xTilt, penData.yTilt);
    for(var x=50; x < 450; x++){
      digitizer.sendState(1, penData.barrelSwitch, penData.erasureSwitch, penData.invert, penData.inRange, x, 50, penData.tipPressure, penData.xTilt, penData.yTilt);
    }
    // send 'release' report
    digitizer.sendState(penData.tipSwitch, penData.barrelSwitch, penData.erasureSwitch, penData.invert, penData.inRange, x, 50, penData.tipPressure, penData.xTilt, penData.yTilt);

    // do the same to the right
    setTimeout(function(){
      for(var x=450; x > 50; x--){
        digitizer.sendState(1, penData.barrelSwitch, penData.erasureSwitch, penData.invert, penData.inRange, x, 50, penData.tipPressure, penData.xTilt, penData.yTilt);
      }
      // send 'release' report
      digitizer.sendState(penData.tipSwitch, penData.barrelSwitch, penData.erasureSwitch, penData.invert, penData.inRange, x, 50, penData.tipPressure, penData.xTilt, penData.yTilt);
    }, 1000);

  }, BTN, {debounce:100,repeat:true, edge:"rising"});

*/

// define report descriptor
E.setUSBHID({
  reportDescriptor : [
    0x05, 0x0d,             // USAGE_PAGE (Digitizers)
    0x09, 0x02,             // USAGE (Pen)
    0xa1, 0x01,             // COLLECTION (Application)
    0x85, 0x01, 			//   REPORT_ID (Pen)                	//To match this descriptor, byte[0] of IN packet should be = 0x01 always for this demo
    0x09, 0x20,             //   USAGE (Stylus)
    0xa1, 0x00,             //   COLLECTION (Physical)
    0x09, 0x42, 			//     USAGE (Tip Switch)           	//(byte[1] bit 0)
    0x09, 0x44, 			//     USAGE (Barrel Switch)        	//(byte[1] bit 1)
    0x09, 0x45, 			//     USAGE (Eraser Switch)        	//(byte[1] bit 2)
    0x09, 0x3c, 			//     USAGE (Invert)               	//(byte[1] bit 3)
    0x09, 0x32, 			//     USAGE (In Range)             	//(byte[1] bit 4)
    0x15, 0x00,             //     LOGICAL_MINIMUM (0)
    0x25, 0x01,             //     LOGICAL_MAXIMUM (1)
    0x75, 0x01,             //     REPORT_SIZE (1)
    0x95, 0x05,             //     REPORT_COUNT (5)
    0x81, 0x02, 			//     INPUT (Data,Var,Abs)         	//Makes five, 1-bit IN packet fields (byte[1] bits 0-4)) for (USAGE) tip sw, barrel sw, invert sw, in range sw.  Send '1' here when switch is active.  Send '0' when switch not active.
    0x95, 0x0b, 			//     REPORT_COUNT (11)
    0x81, 0x03, 			//     INPUT (Cnst,Var,Abs)         	//Makes eleven, 1-bit IN packet fields (byte[1] bits 5-7, and byte[2] all bits) with no usage.  These are pad bits that don't contain useful data.
    0x05, 0x01,             //     USAGE_PAGE (Generic Desktop)
    0x26, 0xff, 0x7f,       //     LOGICAL_MAXIMUM (32767)
    0x75, 0x10,             //     REPORT_SIZE (16)
    0x95, 0x01,             //     REPORT_COUNT (1)
    0xa4,                   //     PUSH
    0x55, 0x0d,             //     UNIT_EXPONENT (-3)
    0x65, 0x33,             //     UNIT (Inch,EngLinear)        	//(10^-3 inches = 1/1000 of an inch = 1 mil)
    0x09, 0x30,  			//     USAGE (X)                    	//(byte[3] and byte[4])
    0x35, 0x00,             //     PHYSICAL_MINIMUM (0)
    0x46, 0x00, 0x00,       //     PHYSICAL_MAXIMUM (0)
    0x81, 0x02,  			//     INPUT (Data,Var,Abs)         	//Makes one, 16-bit IN packet field used for (USAGE) X-coordinate input info.  Valid values 0 to 32767.
    0x09, 0x31,  			//     USAGE (Y)                    	//(byte[5] and byte[6])
    0x46, 0x00, 0x00,  		//     PHYSICAL_MAXIMUM (0)
    0x81, 0x02,  			//     INPUT (Data,Var,Abs)         	//Makes one, 16-bit IN packet field used for (USAGE) Y-coordinate input info.  Valid values 0 to 32767.
    0xb4,                   //     POP
    0x05, 0x0d,             //     USAGE_PAGE (Digitizers)
    0x09, 0x30,  			//     USAGE (Tip Pressure)         	//(byte[7] and byte[8])
    0x81, 0x02,  			//     INPUT (Data,Var,Abs)         	//Makes one, 16-bit IN packet field used for (USAGE) tip pressure input info.  Valid values 0 to 32767
    0x09, 0x3d,  			//     USAGE (X Tilt)               	//(byte[9] and byte[10])
    0x09, 0x3e,  			//     USAGE (Y Tilt)               	//(byte[11] and byte[12])
    0x16, 0x01, 0x80,       //     LOGICAL_MINIMUM (-32767)
    0x95, 0x02,             //     REPORT_COUNT (2)
    0x81, 0x02,   			//     INPUT (Data,Var,Abs)         	//Makes two, 16-bit IN packet fields, used for (USAGE) X-Tilt and Y-Tilt. Valid values -32767 to 32767
    0xc0,                   //   END_COLLECTION
    0xc0                    // END_COLLECTION
  ]
});
//Based on the above report descriptor, HID input packets
//sent to the host on EP1 IN should be formatted as follows:

//byte[0] = 0x01 (Report ID, for this application, always = 0x01)
//byte[1] = contains bit fields for various input information typically generated by an input pen. '1' is the active value (ex: pressed), '0' is the non active value
//		bit0 = Tip switch. At the end of a pen input device would normally be a pressure senstive switch.  Asserting this performs an operation analogous to a "left click" on a mouse
//		bit1 = Barrel switch.
//		bit2 = Erasure switch.
//		bit3 = Invert
//		bit4 = In range indicator.
//		bit5 though bit 7 = Pad bits.  Values not used for anything.
//byte[2] = Pad byte.  Value not used for anything.
//byte[3] = X coordinate LSB value of contact point
//byte[4] = X coordinate MSB value of contact point
//byte[5] = Y coordinate LSB value of contact point
//byte[6] = Y coordinate MSB value of contact point
//byte[7] = Tip pressure LSB.  If the tip switch implemented (or finger contact surface) has analog sensing capability to detect relative amount of pressure, this can be used to indicate to the host how hard is the contact.
//byte[8] = Tip pressure MSB.
//byte[9] = X tilt LSB
//byte[10]= X tilt MSB
//byte[11]= Y tilt LSB
//byte[12]= Y tilt MSB

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

exports.sendState = function(tipSwitch, barrelSwitch, erasureSwitch, invert, inRange, x, y, tipPressure, xTilt, yTilt){
  E.sendUSBHID([
    0x01,          // byte 0: report ID
    0b00010001,    // byte 1: contains bit fields: tip sitch active, no barel switch, no erasure switch, not inverting, in range, remaining padding bits --> TODO: set/unset n bytes from args ;)
    tipSwitch|barrelSwith<<1|erasureSwitch<<2|inverting<<3|inRange<<4,
    0x00,          // byte 2: padding byte
    x & 0xFF,      // byte 3: contact point X low byte ( LSB value )
    (x>>8) & 0xFF, // byte 4: contact point X high byte ( MSB value )
    y & 0xFF,      // byte 5: contact point Y low byte ( LSB value )
    (y>>8) & 0xFF, // byte 6: contact point Y high byte ( MSB value )
    // following 2 are only useful if the contact surface has analog sensing capabilities
    tipPressure & 0xFF,      // byte 7: tip pressure low byte ( LSB value )
    (tipPressure>>8) & 0xFF, // byte 8: tip pressure high byte ( MSB value )
    x & 0xFF,      // byte 9: tilt X low byte ( LSB value )
    (x>>8) & 0xFF, // byte 10: tilt X high byte ( MSB value )
    y & 0xFF,      // byte 11: tilt Y low byte ( LSB value )
    (y>>8) & 0xFF, // byte 12: tilt Y high byte ( MSB value )
    //(x>>8) & 0xFF, // hight byte
    //x & 0xFF, // low byte
  ]);
};
