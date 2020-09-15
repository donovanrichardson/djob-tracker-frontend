<template>
  <!-- <p id="test"><button :class="{red:theColor}" v-on:click="theClick">Text</button></p> -->
  <div>
    <div class="login">
      <input v-model="username" placeholder="username" id="username"/>
      <input v-model="password" type="password" placeholder="password" id="password"/>
      <button v-on:click="login">Login</button>
    </div>
    <div class='form-inputs'>
      <input v-model="title" placeholder="title" id="title"/>
      <input v-model="company" placeholder="company" id="company"/>
      <input v-model="description" placeholder="description" id="description"/>
      <input v-model="url" placeholder="url" id="url"/>
      <input v-model="location" placeholder="location" id="location"/>
      <button v-on:click="postJob">Add Job</button>
    </div>
  </div>

</template>

<script>
// import Header from './components/Header'
// import Footer from './components/Footer'
const axios = require('axios').default
const getJobs = async (jwt)=>{
  const theResponse = await axios.get("http://127.0.0.1:8000/api/job/",{
      headers:{
        Authorization:`JWT ${jwt}`
      }
    })

    return theResponse.data
} 

export default {
  name: 'App',
  components: {
    // Header,
    // Footer
  },
  async created(){
    const theJobs = await getJobs(this.token)
    this.jobs = theJobs

  },
  data:function(){
    return {
      theColor: false,
      title: null,
      company: null,
      description: null,
      url: null,
      jobs:null,
      location:null,
      username:'',
      password:'',
      token:'',
    }
  },
  methods:{
    theClick: function(){
      this.theColor = ! this.theColor
    },
    async postJob(){
      const params = {
      "title":this.title,
      "company":this.company,
      "description": this.description,
      "location_id":this.location,
      keywords:null,
      "url":this.url
      }
      await axios.post("http://127.0.0.1:8000/api/job/",params,
      {headers:{
        Authorization:`JWT ${this.token}`
      }
    })
    this.jobs = await getJobs(this.token) //this doesn't get called i think
    console.log('change the jobs')
    },
    async login(){
      const response = await axios.post("http://127.0.0.1:8000/auth/users/login/",{username:this.username, password:this.password}
    )
    console.log(response);
    this.token = response.data.token

    }
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.red{
  color:red;
}

#test{
  text-align: center;
}

.form-inputs *{
  display:block;
  margin: 5px auto;
}





</style>
