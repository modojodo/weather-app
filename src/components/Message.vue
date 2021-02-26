<template>
  <div class="notification" :class="types[type]">
    <button class="delete" @click="onclick"></button>
    Invalid zipcode, please try again!
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      types: {
        danger: 'is-danger',
        primary: 'is-primary',
      }
    }
  },
  props: {
    msg: {
      required: true,
      type: String
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    onclick() {
      this.$emit('dismiss');
    }
  }
}
</script>

<style scoped>

</style>