<template>
  <!-- <p id="test"><button :class="{red:theColor}" v-on:click="theClick">Text</button></p> -->
  <div id='root'>
    <div id="logged-out" v-if="!token">
      <h1 class='heading'>Résumption</h1>
      <h2 class="heading">a job application tracker</h2>
      <div class="login">
        <input v-model="username" placeholder="username" id="username"/>
        <input v-model="password" type="password" placeholder="password" id="password"/>
        <button v-on:click="login">Login</button>
      </div>

      <div class=login>
        <input v-model="registerEmail" placeholder="email" id="registeremail"/>
        <input v-model="registerUsername" placeholder="username" id="registerusername"/>
        <input v-model="registerPassword1" type="password" placeholder="password" id="registerpassword1"/>
        <input v-model="registerPassword2" type="password" placeholder="password again" id="registerpassword2"/>
        <button v-on:click="register">Register</button>
      </div>
    </div>

    <div id="logged-in" v-if="token">
      <nav id='resumption'>
        <div id='left'>
          <p>Résumption</p>
        </div>
        <div id='right'>
          <p id='hamburger' v-on:click="hamburgerClick">☰</p>
          <p class="non-ham"><router-link to="/about">About</router-link></p>
          <p class="non-ham" v-on:click='logout'>Logout</p>
          <p class="hideable"> <a href="https://www.linkedin.com/in/donovan-richardson/">LinkedIn</a> </p>
          <div :class="hamburgerDetails ? 'behind-ham-show' : 'behind-ham' ">
             <p class="hideable"><router-link to="/about">About</router-link></p>
             <p class="hideable" v-on:click='logout'>Logout</p>
             <p class="hideable"> <a href="https://www.linkedin.com/in/donovan-richardson/">LinkedIn</a> </p>
          </div>
        </div>
      </nav>

      <div id='table-radio'>

        <div class="flexbutton">
          <input type="radio" id="job-radio"
        name="table-radio" value="jobs" v-on:click="jobsTable = true">
          <label for="contactChoice1">Jobs</label>
        </div>

        <div class="flexbutton">
          <input type="radio" id="loc-radio"
        name="table-radio" value="locs" v-on:click="jobsTable = false">
          <label for="contactChoice2">Locations</label>
        </div>

      </div>
      <div v-if="jobsTable">
        <div class='form-inputs'>
        <!-- <Stars id="input-rating" :stars="title"/> -->
        <div id="manual">
          <input v-model="title" placeholder="title" id="title"/>
          <input v-model="company" placeholder="company" id="company"/>
          <input v-model="description" placeholder="description" id="description"/>
          <input v-model="url" placeholder="url" id="url"/>
          <input v-model="location" placeholder="location" id="location"/>
          <button v-on:click="postJob">Add Job</button>
        </div>
        <!-- <div id="auto">
          <input v-model="autoUrl" placeholder="autoUrl" id="autoUrl"/>
          <button v-on:click="autopopulate">Add from URL</button>
        </div> -->
      </div>
      <div id='job-table-wrapper'>
        <table>
          <thead>
            <tr>
              <th class="desktop-table">Job Title</th>
              <th class="desktop-table">Company</th>
              <th class="mobile-table">Job</th>
              <th>Location</th>
              <th class='keywords'>Keywords</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="job in jobs" :key="job.id" :job="job.id">
              <td class="desktop-table">{{job.title}}</td>
              <td class="desktop-table">{{job.company}}</td>
              <td class="mobile-table">{{`${job.title} at ${job.company}`}}</td>
              <td>{{job.location}}</td>
              <td class='keywords'>{{job.keywords}}</td>
              <td class='rating'><Stars :stars="job.rating" v-on:rate="changeRating($event, job.id, 'job')"/></td>
              <td class='delete'> <font-awesome-icon class='trash' v-on:click="delJob" :icon="['far', 'trash-alt']">Add Job</font-awesome-icon></td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      <div v-else>
        <div id='location-table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="loc in locations" :key="loc.id" :loc-id="loc.id">
              <td>{{loc.name}}</td>
              <td class='rating'><Stars :stars="loc.rating" v-on:rate="changeRating($event, loc.name, 'location')"/></td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  </div>

</template>

<script>
// import Header from './components/Header'
// import Footer from './components/Footer'
import Stars from '../components/Stars'
const axios = require('axios').default
const {autofill} = require('../autofill')
require('dotenv').config()
const API = "https://djob-tracker.herokuapp.com/"
// console.log(API, "this is the url");
const getJobs = async (jwt)=>{
  try{
      const theResponse = await axios.get(`${API}api/job/`,{
      headers:{
        Authorization:`JWT ${jwt}`
      }
    })
    // console.log(theResponse);

    return theResponse.data
  }catch(e){
    // console.log(e.isAxiosError,e.config,e.request,e.response);
  }

} 

const getLocs = async (jwt)=>{
  try{
      const theResponse = await axios.get(`${API}api/location/`,{
      headers:{
        Authorization:`JWT ${jwt}`
      }
    })
    return theResponse.data
  }catch(e){
    // console.log("error",Object.keys(e));
  }
} 

export default {
  name: 'Home',
  components: {
    Stars,
  },
  async created(){
    this.token = window.sessionStorage.getItem('token')
    this.refresh()

  },
  data:function(){
    return {
      theColor: false,
      title: null,
      company: null,
      description: null,
      url: null,
      autoUrl: null,
      jobs:null,
      locations:null,
      location:null,
      username:'',
      password:'',
      token:'',
      jobsTable:true,
      hamburgerDetails:false,
      registerEmail:null,
      registerUsername:null,
      registerPassword1:null,
      registerPassword2:null,
    }
  },
  methods:{
    logout: function(){
      this.token = null;
    },
    register: async function(){
      if (this.registerPassword1.length < 8){
        alert("password must be at least 8 characters")
      } else if (this.registerPassword1 === this.registerPassword2){
        try{
          await axios.post(`${API}auth/users/register/`,{
          username:this.registerUsername,
          email:this.registerEmail,
          password:this.registerPassword1
          }
      )
        }catch(e){
          alert('error')
        }finally{
          this.registerUsername = null;
          this.registerEmail = null;
          this.registerPassword1 = null;
          this.registerPassword2 = null;
        }
      alert('user created')
      }else{
        alert("passwords must match")
      }

    },
    autopopulate: async function(){
      const fields = await autofill(this.autoUrl)
      this.title = fields.name
      this.company = fields.company
      this.description = fields.desc
      this.url = fields.url
      this.location = fields.location
    },
    hamburgerClick: function(){
      this.hamburgerDetails = !this.hamburgerDetails
    },
    changeRating: async function(theRating, job, model){
      // console.log(theRating, job);
      try{
                await axios.patch(`${API}api/${model}/${job}/`,{rating:theRating},
        {headers:{
          Authorization:`JWT ${this.token}`
        }
      })
      await this.refresh()
      }catch(e){
        if(e.response.status == 401){
          this.token = null;
          alert("session expired. log back in")
        }
      }

    },
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


          try{
                      await axios.post(`${API}api/job/`,params,
        {headers:{
          Authorization:`JWT ${this.token}`
        }
      })
    this.refresh() //this doesn't get called i think
      }catch(e){
        if(e.response.status == 401){
          this.token = null;
                    alert("session expired. log back in")
        }
      }
    // console.log('change the jobs')
    },
    async login(){
      const response = await axios.post(`${API}auth/users/login/`,{username:this.username, password:this.password}
    )
    // console.log(response);
    this.token = response.data.token
    window.sessionStorage.setItem('token', this.token)
    this.username = null;
    this.password = null;
    this.refresh()

    },
    async delJob(event){
      // console.log(event);
      const jobId = event.target.parentElement.parentElement.getAttribute('job')
      try{const response = await axios.delete(`${API}api/job/${jobId}/`,
      {headers:{
        Authorization:`JWT ${this.token}`
      }})
      // console.log(response.data);
      this.refresh()}catch(e){
        if(e.response.status == 401){
          this.token = null;
                    alert("session expired. log back in")
        }
      }

    },
    async refresh(){
      if(this.token){
        try{
                  this.jobs = await getJobs(this.token)
        this.locations = await getLocs(this.token)
        }catch(e){
          if(e.response.status == 401){
            this.token=null;
          }
        }
      // console.log(this.locations)
      }
    },
  }
  
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  font-family: "Varela Round";
  background: #19401F;
}


h1{
  font-size: xxx-large;
}

#hamburger{
  font-size: 1.5em;
  cursor:pointer;
}

#table-radio{
  /* text-align: center; */
  display:flex;
  justify-content: center;
}

.flexbutton{
  display: flex;
  flex-direction: column;
  margin: .5em;
}

#root > div{
  margin: 2em 0;
}

.heading{
  margin:0; 
  text-align: center;
  color:white;
}

button, h1,h2{
  font-family: 'Open Sans';
  font-variant-caps: small-caps; 
  /* change login to regular */
}

.login{
  display: flex;
  flex-direction: column;
  align-items: center;
margin: 3em;

}

.login > input{
  width: 150px;
  margin: 1em;
}

.login > button{
  width: 125px;
  font-size: 1.15em;
  border-radius: 5px;
}

label{
  color:white;
}

#nav {
  padding: 30px;
}

/* a {
  font-weight: bold;
  color: #2c3e50;
} */

#nav a.router-link-exact-active {
  color: #42b983;
}

nav{
  color:white;
  background: #0000007f;
  display:flex;
  justify-content: space-between;
}

#left{
  margin: 0 5px;
}

#right{
  display: flex;
  justify-content: space-between;
}

#right p, #right a, #right a:visited{
  cursor:pointer;
  color:white;
  text-decoration: underline;
}

/* #right{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  right: 0;
  color:black;
  background: rgb(156, 209, 226); 
  border: 3px solid black;
  border-radius:10px;
} */

.behind-ham{
   display: none;
}

.behind-ham-show{
   display: flex;  
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  right: 0;
  color:black;
  background: rgb(156, 209, 226); 
  border: 3px solid black;
  border-radius:10px;
  top: 6em;
  
}

.behind-ham * {
    margin: 5px;
}
#right > *{
  margin: auto 5px;
}

.red{
  color:red;
}

#test{
  text-align: center;
}

.form-inputs{
  /* display:grid;
  grid-template:
    "a a"
    "b c"; */
}

.form-inputs *{
  display:block;
  margin: 5px auto;
}

#input-rating{
  grid-area: a;
}
#manual{
  grid-area: b;
}
#auto{
  grid-area: c;
}

table{
  margin: 0 auto;
  background: #0000007f;
  border-radius: 5px;
  color:white;
}

.desktop-table{
  display: none;
}

.mobile-table{
 display: table-cell;
}

th, td{
  padding: 3px;
}

.delete{
  cursor:pointer;
  margin: 0 1em;
}

.trash{
  /* pointer-events: none; */
  color: red;
  padding: 1em
  
}

.trash *{
  pointer-events: none;
  /* can't believe this was necessary to get the event listener to stop targeting the trash can's choldtren. wow */
}

.keywords{
  display:none;
}

.svg-inline--fa.fa-w-18{
  width:0.75em;
}

.non-ham{
  display:none;
}

@media(min-width: 600px){
  .svg-inline--fa.fa-w-18{
    width:1em;
  }
  .keywords{
    display:table-cell;
  }

  .desktop-table{
    display: table-cell;
  }

  .mobile-table{
  display: none;
  }
  .non-ham{
  display:block;
}
  .behind-ham, .behind-ham-show, #hamburger{
    display:none;
  }

}





</style>
