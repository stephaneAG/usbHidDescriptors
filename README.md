# usbHidDescriptors
Repo focusing on making USB HID Report Descriptors make sense

## Kinda useful links
- http://www.usb.org/developers/hidpage/HID1_11.pdf Device Class Definition for HID
- http://www.usb.org/developers/hidpage/Hut1_12v2.pdf HID Usage Tables
- https://eleccelerator.com/tutorial-about-usb-hid-report-descriptors/ very neat tut' !
- https://eleccelerator.com/usbdescreqparser/ unvaluable tool => parses HID report descriptors !!

## wip custom tool to ease the generation
- https://jsbin.com/riligusece/1/edit?js,console -> old version mess ..
- https://jsbin.com/vezimibano/1/edit?js,console -> updated version
- https://jsbin.com/nuzifawogu/1/edit?js,console -> updated version with wip "0x81 / INPUT" flags parser that generates stuff
- https://jsbin.com/nonarotoji/1/edit?js,console -> latest version ;)

Usage:
```javascript
// define our usb hid report descriptor using consts or specifying custom values for fields supporing those
var reportDescriptorProto = [
  { USAGE_PAGE: 'Generic Desktop' },
  { USAGE: 'Mouse' },
  { COLLECTION: 'Application' },
    { USAGE: 'Pointer' },
    { COLLECTION: 'Physical' },
      { USAGE_PAGE: 'Button' },
      { USAGE_MINIMUM: 1 },
      { USAGE_MAXIMUM: 3 },
      { LOGICAL_MINIMUM: 0 },
      { LOGICAL_MAXIMUM: 1 },
      { REPORT_COUNT: 3 },
      { REPORT_SIZE: 1 },
      { INPUT: 'Data,Variable,Absolute' },
      { REPORT_COUNT: 1 },
      { REPORT_SIZE: 5 },
      { INPUT: 'Constant,Variable,Absolute', },
      { USAGE_PAGE: 'Generic Desktop' },
      { USAGE: 'X' },
      { USAGE: 'Y' },
      { LOGICAL_MINIMUM: -127 },
      { LOGICAL_MAXIMUM: 127 },
      { REPORT_SIZE: 8 },
      { REPORT_COUNT: 2 },
      { INPUT: 'Data,Variable,Relative' },
    { END_COLLECTION: null },
  { END_COLLECTION: null },
];

// generate the hexs from the above
var generatedDescriptor = genReportDescriptor(reportDescriptorProto);
console.log(generatedDescriptor);

// result ( make sure it's ok by drag& dropping in https://eleccelerator.com/usbdescreqparser/ ;p )
/*
["0x05", "0x01", "0x09", "0x02", "0xa1", "0x01", "0x09", "0x01", "0xa1", "0x00", "0x05", "0x09", "0x19", "0x01", "0x29", "0x03", "0x15", "0x00", "0x25", "0x01", "0x95", "0x03", "0x75", "0x01", "0x81", "0x2", "0x95", "0x01", "0x75", "0x05", "0x81", "0x3", "0x05", "0x01", "0x09", "0x30", "0x09", "0x31", "0x15", "0x81", "0x25", "0x7f", "0x75", "0x08", "0x95", "0x02", "0x81", "0x6", "0xc0", "0xc0"]
*/
```

## quick reminder of some of the constants used as "keys"
```
0x05 // USAGE_PAGE
0x09 // USAGE

0xa1 // COLLECTION
0xc0 // END_COLLECTION

0x19 // USAGE_MINIMUM
0x29 // USAGE_MAXIMUM

0x15 // LOGICAL_MINIMUM
0x25 // LOGICAL_MAXIMUM

0x75 // REPORT_SIZE
0x95 // REPORT_COUNT

0x81 // INPUT
```

### 0x05 / USAGE_PAGE
some of the available "values" constants
```
0x01 // GENERIC DESKTOP page
0x02 // SIMULATION CONTROLS page
0x03 // VR CONTROLS page
0x04 // SPORTS CONTROLS page
0x05 // GAMES CONTROLS page - Hut1_12v2 p48
0x06 // GENERIC DEVICE CONTROLS page
0x07 // KEYBOARD/KEYPAD CONTROLS page
0x08 // LED page
0x09 // BUTTON page
0x0a // ORDINAL page
0x0b // TELEPHONY DEVICE page
0x0c // CONSUMER page
0x0d // DIGITIZERS
0x10 // UNICODE page
0x14 // ALPHANUMERIC DISPLAY page
0x40 // MEDICAL INSTRUMENT page
```

### 0x09 / USAGE ( Hut1_12v2.pdf page 26 )
some of the available "values" constants
```
0x01 // Pointer
0x02 // Mouse
0x04 // Joystick - example descriptor on p74 of HID1_11 
0x05 // Gamepad - Hut1_12v2 p51
0x06 // Keyboard
0x07 // Keypad
0x08 // Multi-axis Controller
0x30 // X
0x31 // Y
0x38 // Wheel
```

### 0xa1 / COLLECTION
some of the available "values" constants
```
0x00 // Physical
0x01 // Application
```

### 0x81 / INPUT
some of the available "values" constants
```
0x01 // (Data) 0b1
0x02 // (Data,Variable,Absolute) 0b10 ( for completeness: (Data,Var,Abs,No Wrap,Linear,Preferred State,No Null Position) )
0x03 // (Constant,Variable,Absolute) 0b11
0x06 // (Data,Variable,Relative) 0b110
```

from HID1_11.pdf

| Bit      | Meaning                                  |
| -------- | ---------------------------------------- |
| Bit 0    | {Data (0) \| Constant (1)}               | 
| Bit 1    | {Array (0) \| Variable (1)}               |
| Bit 2    | {Absolute (0) \| Relative (1)}            |
| Bit 3    | {No Wrap (0) \| Wrap (1)}                 |
| Bit 4    | {Linear (0) \| Non Linear (1)}            |
| Bit 5    | {Preferred State (0) \| No Preferred (1)} |
| Bit 6    | {No Null position (0) \| Null state(1)}   |
| Bit 7    | Reserved (0)                             |
| Bit 8    | {Bit Field (0) \| Buffered Bytes (1)}     |
| Bit 31-9 | Reserved (0)                             |

## using 'HIDDescriptorTool' & 'DTImport'

The main reason for using 'HID Descriptor Tool' is NOT its unfriendly interface but its parser error checking capability
The mail goal is to validate 'manually/externally' written descriptors ( as C struct & via/thx to the author of DTImporter )

If the error parsing step could be implemented in a user-friendlier too, we'd be almost free ;p
R: the error parsing procedure is described at https://usb.org/sites/default/files/hidpar.pdf

Sadly, the 'usage pages' at http://www.freebsddiary.org/APC/usb_hid_usages.php or those present in the .upg files shipped with Dt ( HID Descript Tool ) or found in the 'USB2CV' lib ( available at https://www.usb.org/document-library/usb20cv-x64-bit ) ( as pointed by the author of DTImporter, thx ;) https://github.com/jdunne525/DTImporter ) are not up-to-date :/

Another way to put it, is a dev won't be able to build a .hid descriptor file via the descriptor tool if the device to be described involves 'too recent' constants, that won't be present in the .upg files & hence not available/displayed/clickable in the program's menu ( the left column )

To update those, we have 2 options:
- the 1st is to digg through all proposals & check what has been added ad which date & determine those to 'manually parse'
- the 2nd is to get the latest 'hut' ( as I write these lines, the 1.2 version ) and to copy/paste & reformat correctly 'somehow' the constant that have been added to the correct .upg file

Ex: I'm mainly concerned about the 'digitizers'
- at the folloing link, we can find the proposals: https://www.usb.org/hid
- ex of 2 of these where additional constants are mentionned: https://www.usb.org/sites/default/files/touch_digitizers_2_0.pdf & https://www.usb.org/sites/default/files/hutrr34.pdf
-luckily, at https://usb.org/sites/default/files/hut1_2.pdf, we can scroll to the 'digitizer' page ( 0x0D, p161 ) & get all the constants we need to update the 'digit.upg' file ;p

Once the .upg file(s) have been updated in this way, there should be no more troubles in adding what we want where we want in a descriptor being built via HID Descriptor tool, and we may also correctly parse descriptors imported via DTImport to benefit from the error parsing capability: nice ;)

Good luck

ALso: if running into errors when trying to run the tool ( ex: comdlg32.ocx missing & cie ), do the following ( I did this with success on a x64 Windaube 7 laptop ):
- copy http://dechily.org/downloads/System.zip file content within C:\Windows\SysWOW64 ( or C:\Windows\system32 if on a 32 bit OS )
- then cd to either dir & issue ' regsvr32 comctl32.ocx' from the dir

Possibly useful too(s)
- https://github.com/beantowel/HID_Descriptor_tool ?
- <some tool that provided inout report will build an entire descriptor from that> ?
