# Olivia-Communicate

This project was created to assist a disabled non-verbal child with cerebral palsy to communicate via a tablet.

The app presents the user with a 2x1 or 2x2 icon button layout. The user clicks an icon button to play a sound file via the JS Web Audio API, or speak a word or short phrase via the SpeechSynthesis text-to-speech API.

![User Interface](https://github.com/firxworx/olivia-comm-react/blob/master/screenshot.png?raw=true)

## Purpose

This project is a proof-of-concept produced as a side project during the COVID-19 lockdown.

It was made with a specific individual in mind: she had difficulty grasping the complex user-interface offered by her eye-motion tracking software. This project helped assess her physical and cognitive capabilities to use a tablet as an assistive device to communicate with caregivers.

The user interface can be quickly and easily tailored to reflect the physical range of motion and general capabilities of the target user. It is designed to be relatively easy to add/edit/remove screens of buttons that play sound clips or speak via text-to-speech.

## Customizing the App

The app sources its data from JS arrays found in the `src/data/` folder. A given entry corresponds to an icon button. Each entry specifies a unique `name`, a short `caption` (generally an emoji character), and the name of a `sound` clip (as recognized and played by the SoundButton component) _or_ a word/phrase to speak as defined via the `say` property (as processed by the `SpeechButton` component).

The user can switch between "screens" of 2x1 or 2x2 buttons using back/next navigation buttons that are duplicated at the top and bottom of the screen.

Example data for 2x1 layout:

```js
export default [
  [
    { name: 'food', caption: '🍔', sound: 'bite' },
    { name: 'mom', caption: '👩', sound: 'mom' },
  ],[
    { name: 'yes', caption: '😊', say: 'yes' },
    { name: 'no', caption: '🙁', say: 'no' },
  ],
]
```

## Hardware Compatibility

This project is designed for tablets in landscape orientation.

It works in the Chrome app on iPads and Android devices.

You may need to tweak styles (SCSS) to suit your device and desired layout.

On current versions of iOS + Chrome, the `SpeechButton` component must be triggered via an `onClick` event. No speech will be produced for `onTouchStart`, `onPointerDown`, etc events that might otherwise provide better usability. This restriction was introduced by browsers to discourage advertisers from auto-playing annoying content. The app's initial "Get Started" button is an intentional addition to reinforce to modern browsers that the user is interacting with the page.

The app implements a number of strategies to avoid presenting the long-press context menu, various swipe/pinch gestures, etc. that may be unintentionally triggered by a disabled user with limited physical abilities.

## Setup/Deployment

### Project Setup

Run your favourite package manager such as `yarn` or `npm` in the project folder to install dependencies.

This project was created with [Create React App](https://github.com/facebook/create-react-app) so standard scripts such as `yarn start` and `yarn build` are in-place to facilitate development and deployment.

* Refer to the `src/data` folder for input data
* Refer to `App.js` and set the `SIZE` constant as appropriate for the data shape (`2` or `4`)
* Refer to the `SoundButton` component if you wish to support additional sound clips
* Depending on target platform, you may wish to change `SpeechButton` to be triggered by `onPointerDown` vs. `onClick`

### Project Deployment

* See the `homepage` property in `package.json` that overrides the deploy URL from CRA's default path of `/`. Edit this to reflect your web host settings.
* Revise the `deploy` script defined in `package.json` and the associated `dev/deploy.sh` bash script to suit your needs.
* Revise the `public/manifest.json` file to suit your needs

## Future Development Considerations

* https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
* https://facebook.github.io/create-react-app/docs/advanced-configuration
* https://facebook.github.io/create-react-app/docs/deployment

## License

MIT (Project Source Code)

## Copyrights

Any audio clips in `wav` or `mp3` format found in this repo were sourced for free via Google Search. The copyrights to these audio files are held by their respective copyright owners.
