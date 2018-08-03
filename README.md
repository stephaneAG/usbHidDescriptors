# usbHidDescriptors
Repo focusing on making USB HID Report Descriptors make sense

## Kinda useful links
- http://www.usb.org/developers/hidpage/HID1_11.pdf Device Class Definition for HID
- http://www.usb.org/developers/hidpage/Hut1_12v2.pdf HID Usage Tables
- https://eleccelerator.com/tutorial-about-usb-hid-report-descriptors/ very neat tut'


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
0x 31 // Y
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
0x02 // (Data,Variable,Absolute)
0x03 // (Constant,Variable,Absolute)
0x06 // (Data,Variable,Relative)
```
