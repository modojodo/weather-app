<template>
  <span :class="className">
    <img :src="require(`@/assets/icons/${img}.svg`)"
         class="icon" :class="{'is-small': size === 'small', 'is-medium': size === 'medium'}"
         alt="weather image">
    {{ text }}
  </span>
</template>

<script>
export default {
  name: "WeatherIcon",
  props: {
    size: {
      type: String,
      required: false,
      default: 'small'
    },
    text: {
      type: String,
      required: false
    },
    img: {
      type: String,
      required: true
    },
    className: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>

</style>