///////////////////////////////////////////////////
//                                               //
//                   NeatRepeat                  //
//          Logic Pro X Scripter script          //
//                                               //
//             Made for: Vince Webb              //
//          https://www.vincewebb.com/           //
//                                               //
//  Author: Adam Adams (adam@adam-adams.com)     //
//  Version: v1.0.0 (2023-11-07)                 //
//                                               //
///////////////////////////////////////////////////

var midiNotes = [
  "C-2",
  "C#-2",
  "D-2",
  "D#-2",
  "E-2",
  "F-2",
  "F#-2",
  "G-2",
  "G#-2",
  "A-2",
  "A#-2",
  "B-2",
  "C-1",
  "C#-1",
  "D-1",
  "D#-1",
  "E-1",
  "F-1",
  "F#-1",
  "G-1",
  "G#-1",
  "A-1",
  "A#-1",
  "B-1",
  "C0",
  "C#0",
  "D0",
  "D#0",
  "E0",
  "F0",
  "F#0",
  "G0",
  "G#0",
  "A0",
  "A#0",
  "B0",
  "C1",
  "C#1",
  "D1",
  "D#1",
  "E1",
  "F1",
  "F#1",
  "G1",
  "G#1",
  "A1",
  "A#1",
  "B1",
  "C2",
  "C#2",
  "D2",
  "D#2",
  "E2",
  "F2",
  "F#2",
  "G2",
  "G#2",
  "A2",
  "A#2",
  "B2",
  "C3",
  "C#3",
  "D3",
  "D#3",
  "E3",
  "F3",
  "F#3",
  "G3",
  "G#3",
  "A3",
  "A#3",
  "B3",
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4",
  "C5",
  "C#5",
  "D5",
  "D#5",
  "E5",
  "F5",
  "F#5",
  "G5",
  "G#5",
  "A5",
  "A#5",
  "B5",
  "C6",
  "C#6",
  "D6",
  "D#6",
  "E6",
  "F6",
  "F#6",
  "G6",
  "G#6",
  "A6",
  "A#6",
  "B6",
  "C7",
  "C#7",
  "D7",
  "D#7",
  "E7",
  "F7",
  "F#7",
  "G7",
  "G#7",
  "A7",
  "A#7",
  "B7",
  "C8",
  "C#8",
  "D8",
  "D#8",
  "E8",
  "F8",
  "F#8",
  "G8",
];

var PluginParameters = [
  {
    name: "Trigger Note",
    type: "menu",
    valueStrings: midiNotes,
    defaultValue: 48,
  },
  { name: "Learn", type: "momentary", defaultValue: 0 },
  { name: "Use original velocity", type: "checkbox", defaultValue: 0 },
  { name: "Different Ch. for retriggers", type: "checkbox", defaultValue: 0 },
];

var lastNote;
var channelOffset = 1;
var multiChannel = false;
var triggerNote = GetParameter("Trigger Note");
var learning = false;

function createEvent(type, pitch, velocity, channel) {
  var event = new type();
  event.pitch = MIDI.normalizeData(pitch);
  event.velocity = MIDI.normalizeData(velocity);
  event.channel = MIDI.normalizeData(channel);
  return event;
}

function sendEvent(event) {
  event.send();
  event.trace();
}

function HandleMIDI(event) {
  if (event.channel == 16) {
    -channelOffset;
  }
  if (event instanceof NoteOn || event instanceof NoteOff) {
    var currentTriggerNote = GetParameter("Trigger Note");
    if (triggerNote !== currentTriggerNote) {
      triggerNote = currentTriggerNote;
      SetParameter("Trigger Note", triggerNote);
    }
    if (event instanceof NoteOn) {
      if (learning) {
        triggerNote = event.pitch;
        learning = false;
        SetParameter("Trigger Note", triggerNote);
      } else if (event.pitch == triggerNote && lastNote != null) {
        var newEvent = createEvent(NoteOff, lastNote.pitch, 0, lastNote.channel);
        sendEvent(newEvent);
        newEvent = createEvent(NoteOn, lastNote.pitch, GetParameter("Use original velocity") ? lastNote.velocity : event.velocity, GetParameter("Different Ch. for retriggers") ? lastNote.channel + channelOffset : lastNote.channel);
        sendEvent(newEvent);
      } else {
        lastNote = event;
        sendEvent(event);
      }
    } else if (event instanceof NoteOff) {
      if (event.pitch == triggerNote) {
        var newEvent = createEvent(NoteOff, lastNote.pitch, 0, GetParameter("Different Ch. for retriggers") ? lastNote.channel + channelOffset : lastNote.channel);
        sendEvent(newEvent);
      } else {
        sendEvent(event);
      }
    }
  } else {
    sendEvent(event);
  }
}

function ParameterChanged(param, value) {
  if (param == 1) {
    learning = true;
  }
}
