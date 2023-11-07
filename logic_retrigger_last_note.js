///////////////////////////////////////////////////
//                                               //
//           logic_retrigger_last_note           //
//          Logic Pro X Scripter script          //
//                                               //
//             Made for: Vince Webb              //
//          https://www.vincewebb.com/           //
//                                               //
//  Author: Adam Adams (adam@adam-adams.com)     //
//  Version: v1.01 (2023-11-07)                  //
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
  {
    name: "NoteOff delay",
    type: "lin",
    numberOfSteps: 384,
    minValue: 80,
    maxValue: 2000,
    defaultValue: 100,
  },
  { name: "Use original velocity", type: "checkbox", defaultValue: 0 },
];

var lastNote;
var noteOnTime;
var delay;
var triggerNote = GetParameter("Trigger Note");
var learning = false;

function HandleMIDI(event) {
  var currentTriggerNote = GetParameter("Trigger Note");
  if (triggerNote === null || triggerNote !== currentTriggerNote) {
    triggerNote = currentTriggerNote;
    SetParameter("Trigger Note", triggerNote);
  }
  if (event instanceof NoteOn) {
    noteOnTime = new Date().getTime();
    if (learning) {
      triggerNote = event.pitch;
      learning = false;
      SetParameter("Trigger Note", triggerNote);
    } else if (event.pitch == triggerNote) {
      if (lastNote != null) {
        // Preparing new event
        var newEvent = new NoteOn();
        // Setting up all the properties as the lastNote
        newEvent.pitch = MIDI.normalizeData(lastNote.pitch);
        if (GetParameter("Use original velocity")) {
          newEvent.velocity = MIDI.normalizeData(lastNote.velocity);
        } else {
          newEvent.velocity = MIDI.normalizeData(event.velocity);
        }
        newEvent.channel = MIDI.normalizeData(lastNote.channel);
        // Send it
        newEvent.send();
        newEvent.trace();
        // Have to send noteOff too...
        newEvent = new NoteOff();
        newEvent.pitch = MIDI.normalizeData(lastNote.pitch);
        newEvent.velocity = MIDI.normalizeData(0);
        newEvent.channel = MIDI.normalizeData(lastNote.channel);
        // We'll give it customizable delay
        Trace("Measured delay: " + delay);
        newEvent.sendAfterMilliseconds(delay);
        newEvent.trace();
      }
    } else {
      // Store the last played note
      lastNote = event;
      event.send();
      event.trace();
    }
  } else if (
    event instanceof NoteOff &&
    lastNote != null &&
    event.pitch == lastNote.pitch
  ) {
    // NoteOff event for the last played note, update lastNote to null
    delay = new Date().getTime() - noteOnTime;
    event.send();
    event.trace();
  } else {
    event.send();
  }
}

function ParameterChanged(param, value) {
  if (param == 1) {
    learning = true;
  }
}
