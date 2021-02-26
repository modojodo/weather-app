<template>
  <div id="app" class="section">

    <div class="container">
      <div class="columns" v-if="invalidZipCode">
        <div class="column">
          <Message @dismiss="clearError"
                   msg="Invalid zipcode, please try again!"
                   type="danger">
          </Message>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <span class="tags has-addons" v-show="showCity" @click="onCityClick">
          <span class="tag is-medium"><img class='icon is-medium' src="./assets/icons/pin.svg" alt=""></span>
          <span class="tag is-dark is-medium">{{ weather.name }}</span>
      </span>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <input class="input"
                 v-show="showZipcodeInput"
                 type="text"
                 :class="{'is-danger': invalidZipCode}"
                 v-model="zipcode"
                 @keyup="getWeather"
                 @focusout="getWeather">
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <img id="weather-icon" :src="weatherIcon" alt="weather icon" v-if="weatherIcon">
        </div>
      </div>
      <div class="condition">{{ weather.condition }}</div>
      <div class="temp" v-show="weather.temp">{{ weather.temp }}</div>
      <div class="columns">
        <div class="column" v-if="wind">
          <WeatherIcon img="wind"
                       v-if="wind"
                       text="wind">
          </WeatherIcon>
        </div>
        <div class="column" v-if="humidity">
          <WeatherIcon img="humidity"
                       v-if="humidity"
                       text="humidity">
          </WeatherIcon>
        </div>
      </div>
      <div class="columns">
        <div class="column" v-if="maxTemp">
          <WeatherIcon img="weather-high"
                       v-if="maxTemp"
                       size="medium"
                       className="points">
          </WeatherIcon>
        </div>
        <div class="column" v-if="minTemp">
          <WeatherIcon img="weather-low"
                       v-if="minTemp"
                       size="medium"
                       className="points">
          </WeatherIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from './components/Message';
import WeatherIcon from './components/WeatherIcon';

export default {
  data() {
    return {
      zipcode: null,
      invalidZipCode: false,
      showZipcodeInput: true,
      weather: {},
    }
  },
  name: 'App',
  components: {
    Message,
    WeatherIcon
  },
  computed: {
    wind() {
      const { weather } = this;
      return weather.wind ? `${weather.wind} mph` : null;
    },
    humidity() {
      const { weather } = this;
      return weather.humidity ? `${weather.humidity} %` : null;
    },
    maxTemp() {
      const { weather } = this;
      return weather.max ? `${weather.max} %` : null;
    },
    minTemp() {
      const { weather } = this;
      return weather.min ? `${weather.min} %` : null;
    },
    weatherIcon() {
      return this.weather.icon ? ` http://openweathermap.org/img/wn/${this.weather.icon}@2x.png` : null;
    },
    showCity() {
      return this.weather.name && !this.showZipcodeInput;
    },
    isValidZip() {
      return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.zipcode);
    },
  },
  methods: {
    clearError() {
      this.invalidZipCode = false;
    },
    onCityClick() {
      this.showZipcodeInput = true;
    },
    hasInput(event = {}) {
      const isEnterKeyPressed = event.keyCode === 13;
      const isFocusOut = event.type === 'focusout';
      return (isEnterKeyPressed || isFocusOut)
    },
    getWeather(event) {
      const { hasInput, isValidZip, clearError } = this;
      // If user has entered the value
      if (hasInput(event)) {
        clearError();
        if (isValidZip) {

          fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.zipcode}&appid=${process.env.VUE_APP_API_KEY}&units=imperial`)
              .then(response => response.json())
              .then(data => {
                const { name, main: { temp, temp_max, temp_min, humidity }, weather, wind: { speed: wind } } = data;

                this.weather = {
                  name,
                  temp,
                  wind,
                  humidity,
                  max: temp_max,
                  min: temp_min,
                  icon: weather[0].icon,
                  condition: weather[0].main
                };
                this.showZipcodeInput = false;
              });
        } else if (!isValidZip) {
          this.invalidZipCode = true;
        }
      }
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background: linear-gradient(90deg, rgba(109, 250, 228, 1) 0%, rgba(112, 242, 235, 1) 35%, rgba(114, 239, 237, 1) 100%);

}

#weather-icon {
  width: 10rem;
  height: 10rem;
  -webkit-filter: drop-shadow(5px 5px 5px #222222);
  filter: drop-shadow(5px 5px 5px #222222);
}

.temp {
  color: #312F5D;
  font-size: 3rem;

  &:after {
    content: "\00B0";
  }
}

.points:after {
  content: "\00B0";
}
</style>
