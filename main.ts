let groupChannelShow_Countdown_Max = 0
let groupChannel_Int_Min = 0
let ledGridValueMax = 0
let groupChannelShow_Countdown = 0
let mode_Config_On = false
let receivedNumberIn = 0
let mode_Run_On = false
let groupChannel_Int_Max = 0
let _commentUseOnly = ""
let groupChannel_Int = 0
/**
 * Version History
 * 
 * 2019-0101-0030
 * 
 * * for 'tr' and 'tl', faster feedback signal
 * 
 * 2019-0112-1900
 * 
 * * Add new 'GroupChannel_UserCustomize_Before_RadioNetworkSetup'
 */
/**
 * Important Notes
 * 
 * 2018-1227-1630 
 * 
 * * DfRobot Gamepad Controller: Acrylic case can accidentally press 'x' or 'y' buttons, so use Config-Mode layer
 */
function Before_RadioNetworkSetup__GroupChannel_UserCustomize_Setup2() {
    // User Can Change/Customize as Needed for Both RcTx
    // and BotRx
    groupChannel_Int = groupChannel_Int_Max
}
function Before_EverythingElse__General_Setup2() {
    _commentUseOnly = "1/4 seems less reliable vs 1/2 due to system cycle"
    _commentUseOnly = "Actually, 1beat most realiable with Bot-Rx, esp during ConfigMode"
    mode_Config_On = false
    mode_Run_On = true
    ledGridValueMax = 4
    _commentUseOnly = "Assuming each cycle is 20ms, then 20ms * 150 = 3000 ms = 3s"
    // * Was 150
    groupChannelShow_Countdown_Max = 5
    groupChannelShow_Countdown = groupChannelShow_Countdown_Max
    groupChannel_Int_Min = 1
    groupChannel_Int_Max = 25
}
radio.onReceivedNumber(function (receivedNumber) {
    _commentUseOnly = "No longer do this auto-check, since will interfere with other bots with same default."
})
input.onGesture(Gesture.TiltRight, function () {
    radio.sendString("tr")
    basic.showLeds(`
        . . # . .
        . . # # .
        . . # # #
        . . # # .
        . . # . .
        `)
    music.playTone(262, music.beat(BeatFraction.Half))
    music.playTone(392, music.beat(BeatFraction.Half))
})
function RadioNetwork_Setup() {
    radio.setTransmitPower(7)
    radio.setGroup(groupChannel_Int)
}
input.onGesture(Gesture.TiltLeft, function () {
    radio.sendString("tl")
    basic.showLeds(`
        . . # . .
        . # # . .
        # # # . .
        . # # . .
        . . # . .
        `)
    music.playTone(392, music.beat(BeatFraction.Half))
    music.playTone(262, music.beat(BeatFraction.Half))
})
input.onGesture(Gesture.Shake, function () {
    radio.sendString("s")
    basic.showIcon(IconNames.No)
    basic.pause(1000)
    music.playTone(392, music.beat(BeatFraction.Half))
    music.playTone(330, music.beat(BeatFraction.Half))
    music.playTone(262, music.beat(BeatFraction.Half))
})
input.onGesture(Gesture.LogoDown, function () {
    radio.sendString("sd")
    basic.showLeds(`
        . . # . .
        . # # # .
        # # # # #
        . . . . .
        . . . . .
        `)
    music.playTone(262, music.beat(BeatFraction.Half))
    music.playTone(523, music.beat(BeatFraction.Half))
})
function GroupChannel_Show2() {
    basic.clearScreen()
    _commentUseOnly = "'groupChannel_Int' is Base-1 while 'index' and 'plot' is Base-0"
    for (let index = 0; index <= groupChannel_Int - 1; index++) {
        led.plot(index % 5, Math.idiv(index, 5))
    }
    basic.pause(1000)
}
Before_RadioNetworkSetup__GroupChannel_UserCustomize_Setup2()
RadioNetwork_Setup()
basic.showIcon(IconNames.Happy)
basic.pause(3000)
basic.forever(function () {
    // Toggle between 'mode_Config_On' or 'mode_RUn
    if (gamePad.keyState(GamerBitPin.P1) && gamePad.keyState(GamerBitPin.P2)) {
        if (mode_Config_On) {
            mode_Config_On = false
            music.playTone(784, music.beat(BeatFraction.Whole))
            music.playTone(659, music.beat(BeatFraction.Whole))
            music.playTone(523, music.beat(BeatFraction.Whole))
            _commentUseOnly = "Switch to state only when stabilized to prevent premature trigger of other 'forever' stacks that use similar user inputs"
            mode_Run_On = true
        } else {
            mode_Run_On = false
            music.playTone(523, music.beat(BeatFraction.Whole))
            music.playTone(659, music.beat(BeatFraction.Whole))
            music.playTone(784, music.beat(BeatFraction.Whole))
            _commentUseOnly = "Switch to state only when stabilized to prevent premature trigger of other 'forever' stacks that use similar user inputs"
            mode_Config_On = true
        }
    }
})
basic.forever(function () {
    // For 'mode_Run_On'
    if (mode_Run_On) {
        if (gamePad.keyState(GamerBitPin.P8) && gamePad.keyState(GamerBitPin.P14) && gamePad.keyState(GamerBitPin.P13)) {
            radio.sendString("fld")
            basic.showLeds(`
                . . # . .
                . # # . #
                # # # # #
                . # # . #
                . . # . .
                `)
        } else if (gamePad.keyState(GamerBitPin.P8) && gamePad.keyState(GamerBitPin.P15) && gamePad.keyState(GamerBitPin.P13)) {
            radio.sendString("frd")
            basic.showLeds(`
                . . # . .
                # . # # .
                # # # # #
                # . # # .
                . . # . .
                `)
        } else if (gamePad.keyState(GamerBitPin.P8) && gamePad.keyState(GamerBitPin.P14)) {
            radio.sendString("fl")
            basic.showLeds(`
                # # # . .
                # # . . .
                # . # . .
                . . . # .
                . . . . .
                `)
        } else if (gamePad.keyState(GamerBitPin.P8) && gamePad.keyState(GamerBitPin.P15)) {
            radio.sendString("fr")
            basic.showLeds(`
                . . # # #
                . . . # #
                . . # . #
                . # . . .
                . . . . .
                `)
        } else if (gamePad.keyState(GamerBitPin.P8)) {
            radio.sendString("f")
            basic.showLeds(`
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                `)
        } else if (gamePad.keyState(GamerBitPin.P13) && gamePad.keyState(GamerBitPin.P14)) {
            radio.sendString("bl")
            basic.showLeds(`
                . . . . .
                . . . # .
                # . # . .
                # # . . .
                # # # . .
                `)
        } else if (gamePad.keyState(GamerBitPin.P13) && gamePad.keyState(GamerBitPin.P15)) {
            radio.sendString("br")
            basic.showLeds(`
                . . . . .
                . # . . .
                . . # . #
                . . . # #
                . . # # #
                `)
        } else if (gamePad.keyState(GamerBitPin.P13)) {
            radio.sendString("b")
            basic.showLeds(`
                . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
                `)
        } else if (gamePad.keyState(GamerBitPin.P14)) {
            radio.sendString("l")
            basic.showLeds(`
                . . # . .
                . # . . .
                # # # # #
                . # . . .
                . . # . .
                `)
        } else if (gamePad.keyState(GamerBitPin.P15)) {
            radio.sendString("r")
            basic.showLeds(`
                . . # . .
                . . . # .
                # # # # #
                . . . # .
                . . # . .
                `)
        } else if (gamePad.keyState(GamerBitPin.P1)) {
            radio.sendString("u")
            basic.showLeds(`
                . . # # .
                . . . # .
                . . . # .
                . . . # .
                . . . . .
                `)
        } else if (gamePad.keyState(GamerBitPin.P2)) {
            radio.sendString("d")
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                # # # # .
                # . . . .
                `)
        } else {
            _commentUseOnly = "Default Condition if all the above fails"
            _commentUseOnly = "Default to 'Stop'"
            _commentUseOnly = "Stop periodic send of 's' since overload bot-reciever"
            for (let i = 0; i < 1; i++) {
                groupChannelShow_Countdown += -1
                for (let i = 0; i < 0; i++) {
                    serial.writeValue("groupChannel", groupChannelShow_Countdown)
                }
                if (groupChannelShow_Countdown <= 0) {
                    _commentUseOnly = "Only Call this Function once-in-a-while to prevent clobbering other graphics, thus this countdown used"
                    GroupChannel_Show2()
                    groupChannelShow_Countdown = groupChannelShow_Countdown_Max
                } else {
                    basic.showLeds(`
                        . . . . .
                        . . # . .
                        . # . # .
                        . . # . .
                        . . . . .
                        `)
                }
            }
        }
    }
})
basic.forever(function () {
    // For 'mode_Config_On'
    if (mode_Config_On) {
        // Placed under 'mode_Config' since DfRobotGamePad
        // case can accidentally press Button-A while in
        // 'mode_Run'
        //
        // Placed under 'mode_Config' since DfRobotGamePad
        // case can accidentally press Button-A while in
        // 'mode_Run'
        if (gamePad.keyState(GamerBitPin.P14)) {
            if (gamePad.keyState(GamerBitPin.P8)) {
                radio.sendString("clu")
                basic.showLeds(`
                    . # . . .
                    . # . . .
                    . # . . .
                    . . . . .
                    . . . . .
                    `)
                music.playTone(659, music.beat(BeatFraction.Whole))
                music.playTone(784, music.beat(BeatFraction.Whole))
            } else if (gamePad.keyState(GamerBitPin.P13)) {
                radio.sendString("cld")
                basic.showLeds(`
                    . . . . .
                    . . . . .
                    . # . . .
                    . # . . .
                    . # . . .
                    `)
                music.playTone(784, music.beat(BeatFraction.Whole))
                music.playTone(659, music.beat(BeatFraction.Whole))
            } else {
                radio.sendString("cl")
                basic.showLeds(`
                    . . . . .
                    . . . . .
                    . # . . .
                    . . . . .
                    . . . . .
                    `)
            }
        } else if (gamePad.keyState(GamerBitPin.P15)) {
            if (gamePad.keyState(GamerBitPin.P8)) {
                radio.sendString("cru")
                basic.showLeds(`
                    . . . # .
                    . . . # .
                    . . . # .
                    . . . . .
                    . . . . .
                    `)
                music.playTone(659, music.beat(BeatFraction.Whole))
                music.playTone(784, music.beat(BeatFraction.Whole))
            } else if (gamePad.keyState(GamerBitPin.P13)) {
                radio.sendString("crd")
                basic.showLeds(`
                    . . . . .
                    . . . . .
                    . . . # .
                    . . . # .
                    . . . # .
                    `)
                music.playTone(784, music.beat(BeatFraction.Whole))
                music.playTone(659, music.beat(BeatFraction.Whole))
            } else {
                radio.sendString("cr")
                basic.showLeds(`
                    . . . . .
                    . . . . .
                    . . . # .
                    . . . . .
                    . . . . .
                    `)
            }
        } else if (gamePad.keyState(GamerBitPin.P8)) {
            radio.sendString("cu")
            basic.showLeds(`
                . . . . .
                . . # . .
                . # # # .
                . . # . .
                . . # . .
                `)
        } else if (gamePad.keyState(GamerBitPin.P13)) {
            radio.sendString("cd")
            basic.showLeds(`
                . . # . .
                . . # . .
                . # # # .
                . . # . .
                . . . . .
                `)
        } else if (input.buttonIsPressed(Button.AB)) {
            _commentUseOnly = "Request Bot to Show Power for Both Wheel Motors"
            radio.sendString("cab")
            basic.showLeds(`
                . . . . .
                . # . # .
                . # . # .
                . # . # .
                . . . . .
                `)
            _commentUseOnly = "Pause 3000ms(min) to prevent multiple send of this message due to scroll-text on bot-side"
            basic.pause(3000)
        } else if (input.buttonIsPressed(Button.A)) {
            groupChannel_Int += -1
            if (groupChannel_Int < groupChannel_Int_Min) {
                groupChannel_Int = groupChannel_Int_Max
            }
            radio.setGroup(groupChannel_Int)
            _commentUseOnly = "To Force Display Show"
            groupChannelShow_Countdown = 0
            music.playTone(196, music.beat(BeatFraction.Whole))
            music.playTone(165, music.beat(BeatFraction.Whole))
        } else if (input.buttonIsPressed(Button.B)) {
            groupChannel_Int += 1
            if (groupChannel_Int > groupChannel_Int_Max) {
                groupChannel_Int = groupChannel_Int_Min
            }
            radio.setGroup(groupChannel_Int)
            _commentUseOnly = "To Force Display Show"
            groupChannelShow_Countdown = 0
            music.playTone(165, music.beat(BeatFraction.Whole))
            music.playTone(196, music.beat(BeatFraction.Whole))
        } else if (gamePad.keyState(GamerBitPin.P1)) {
            _commentUseOnly = "To decrease 'IdleDelay' with more Dropped-Packets Sensitivty"
            radio.sendString("cx")
            basic.showLeds(`
                . . . . .
                . # . # .
                . . # . .
                . . # . .
                . . . . .
                `)
            music.playTone(196, music.beat(BeatFraction.Whole))
            music.playTone(165, music.beat(BeatFraction.Whole))
        } else if (gamePad.keyState(GamerBitPin.P2)) {
            _commentUseOnly = "To increase 'IdleDelay' with less Dropped-Packets Sensitivty"
            radio.sendString("cy")
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . . # . .
                . . # . .
                `)
            music.playTone(165, music.beat(BeatFraction.Whole))
            music.playTone(196, music.beat(BeatFraction.Whole))
        } else {
            _commentUseOnly = "Default Condition if all the above fails"
            for (let i = 0; i < 1; i++) {
                groupChannelShow_Countdown += -1
                for (let i = 0; i < 0; i++) {
                    serial.writeValue("groupChannel", groupChannelShow_Countdown)
                }
                if (groupChannelShow_Countdown <= 0) {
                    _commentUseOnly = "Only Call this Function once-in-a-while to prevent clobbering other graphics, thus this countdown used"
                    GroupChannel_Show2()
                    groupChannelShow_Countdown = groupChannelShow_Countdown_Max
                } else {
                    basic.showLeds(`
                        # . . . #
                        . . . . .
                        . . . . .
                        . . . . .
                        # . . . #
                        `)
                }
            }
        }
    }
})
