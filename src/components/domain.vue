<template>
  <div class="">
    <label class="mr-2">write your domain or local</label>
    <input
      class="mr-2"
      type="text"
      placeholder="http://skeleton.e-dalely.com/backend/public || http://127.0.0.1:8000"
      v-model="server_change"
    />
    <button class="btn btn-dark" @click="handleChange()">change</button>
  </div>
</template>

<script>
export default {
  data() {
    const server = localStorage.getItem("server") || "http://127.0.0.1:8000";
    return {
      server: server,
      server_change: null,
    };
  },
  methods: {
    handleChange() {
      this.server = this.server_change;
      localStorage.setItem("server", this.server);
      alert("succed change youe new domain is :" + this.server);
      window.location.reload();
    },
  },
};
</script>

<style scoped>
input {
  width: 40%;
}
button {
  border: none;
  height: 30px;
  color: #f1f1f1;
  border-radius: 4px;
}
</style>
