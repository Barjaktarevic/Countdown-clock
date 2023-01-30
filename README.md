# Countdown-clock
Project made following a ZTM tutorial with some additions of my own and using postCSS instead. Hosted on Netlify: [Countdown Clock](https://barjaktarevic-countdown.netlify.app/ 'Click to visit the site')

## Useful things I've learned working on this mini-project
+ How to set up a postCSS environment using vite and how to set up the postCSS config file:
```javascript
import cssnano from 'cssnano'
import postcssPresetEnv from 'postcss-preset-env'
import autoprefixer from 'autoprefixer'

export default {
    plugins: [
        cssnano({
            preset: 'default',
        }),
        postcssPresetEnv({
            stage: 1
        }),
        autoprefixer()
    ],
}
```
+ How to embed videos on a website:
```html
<video class="video-background" loop muted autoplay>
      <source src="/public/time.mp4"></source>
    </video>
    <div class="video-overlay"></div>
```
+ How to enable date pickers to only select dates greater than today:
```javascript
const today = new Date().toISOString().split('T')[0]
dateEl.setAttribute('min', today)
```
+ How to calculate the distance in milliseconds between now and a specified date in the future:
```javascript
countdownValue = new Date(countdownDate).getTime()
...
const now = new Date().getTime()
const distance = countdownValue - now;
```
+ Got a refresher on how to use Local Storage:
```javascript
localStorage.setItem('countdown', JSON.stringify(savedCountdown))

...

if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'))
    countdownTitle = savedCountdown.title
    countdownDate = savedCountdown.date
```
