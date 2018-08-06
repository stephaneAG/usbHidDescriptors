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
0x05 // GAMES CONTROLS page
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

### 0x09 / USAGE
some of the available "values" constants
```
0x01 // Pointer
0x02 // Mouse
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
