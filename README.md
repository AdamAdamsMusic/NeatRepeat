<!-- markdownlint-configure-file {
  "MD013": {
    "code_blocks": false,
    "tables": false
  },
  "MD033": false,
  "MD041": false
} -->
<div align="center">

# NeatRepeat
### for Logic Pro Scripter

*A note so nice, I played it twice.*
<br/>
*With passion. And precision.*


[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=flat-square)](https://github.com/AdamAdamsMusic/NeatRepeat/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
[![Downloads][downloads-badge]][releases]

---

![Demo by Vince Webb](NeatRepeat.gif)

</div>

## Features
- Choose a re-trigger key from the menu, or click **LEARN** to allow script to… well, LEARN, **which key you want to use** for it.
- Play a note, then press the re-trigger key to **play the same note again instantly**.
- **Preserve the same velocity** as the original note, or use the re-trigger key properties to **add more nuance to your performance**.
- Choose whether you want the re-triggered notes to be **played on the same MIDI channel** or rather another one, so that **they can overlap**! (*instrument-dependent*)
- Have fun and get creative with your performances – works especially well on **percussive instruments/one-shots**! (*experimentation encouraged*)

## Getting started
- Download the [latest release][latest]
- Move the .pst file to ~/Music/Audio Music Apps/Plug-In Settings/Scripter
- Add "Scripter" in the MIDI FX plugin section in Logic
- (Optional, but strongly suggested) Click on the MIDI FX slot just below "Scripter" and enable "Record MIDI to Track Here"
- Load up the preset from the list

## See it in action

[![Play fast repeated notes with ease (NeatRepeat) – Vince Webb](http://i3.ytimg.com/vi/kl1RwhATTzA/hqdefault.jpg)](http://www.youtube.com/watch?v=kl1RwhATTzA "Play fast repeated notes with ease (NeatRepeat)")

## About

One day, [Vince Webb](https://www.vincewebb.com/) was looking for a tech helper to realize his idea – he wanted to have a script that he could use just like the "re-trigger" functions in Orange Tree Samples libraries, but for **EVERY** instrument.

That is how *NeatRepeat* started. A script that allows for re-triggering played notes, so that the performances on the MIDI keyboard can be more realistic and – let's admit it – more fun!

MIDI keyboard has a size constraint. It's hard to quickly press one key in rapid succession using both hands. But sometimes, what is needed in the performance is exactly that. This is where this script comes it – allowing you to specify which key you'd want to use for re-triggering the key and letting you comfortably using two hands to ~~HAMMER IN~~ record your performance.

## Known issues
- MIDI protocol specification, more specifically the lack of "note instance". MIDI only allows sending NoteOn/NoteOff messages, without actual note instances. That is understandable – you have one key for every note. This functionality – having many instances of the exact same note on the exact same MIDI channel – was not really envisioned, because… *why would you need it*?! So when lots of identical messages are sent in quick succession, some may get cut off or hang indefinitely.

## Contributing

First off, thanks for taking the time to contribute! Contributions are what makes the open-source community such an amazing place to learn, inspire, and create. Any contributions you make will benefit everybody else and are **greatly appreciated**.

Please try to create bug reports that are:

- _Reproducible._ Include steps to reproduce the problem.
- _Specific._ Include as much detail as possible: which version, what environment, etc.
- _Unique._ Do not duplicate existing opened issues.
- _Scoped to a Single Bug._ One bug per report.

## Support

As much as I like doing this and taking part in an open-source community, I have to underline that **I try to provide support and improvements in my spare time**. You can reach out to me at one of the following places:

- [GitHub discussions](https://github.com/AdamAdamsMusic/NeatRepeat/discussions)
- The email which is located [in my GitHub profile](https://github.com/AdamAdamsMusic)

## License

This project is licensed under the **GNU General Public License v3**.

See [LICENSE](LICENSE) for more information.

# Ackowledgements

Thanks to [Vince Webb](https://vincewebb.com) and the great [TEAMMATES community](https://www.facebook.com/groups/assistthecomposer) for making this happen!

<div align=center>
<img src="https://yt3.googleusercontent.com/gcS_1zgM3cKwHdEJdEvcPWLsBA6rsnnCaKBJscq9T9O8kt5I35mkT9mA3W-6osjxsOk9cNUczaY=s0" style="width: 300px; height: 300px; border-radius: 150px">
</div>


[downloads-badge]: https://img.shields.io/github/downloads/AdamAdamsMusic/NeatRepeat/total?logo=github&logoColor=white&style=flat-square
[latest]: https://github.com/AdamAdamsMusic/NeatRepeat/releases/latest
[releases]: https://github.com/AdamAdamsMusic/NeatRepeat/releases
