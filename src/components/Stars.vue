<template>

<div class="starsdiv">
    <p>{{this.rating}}</p>
    <font-awesome-icon star=0 v-on:click='setRating' :class='{highlighted:highlight[0]}' :icon="highlight[0] ? ['fas', 'star']:['far', 'star']" />
    <font-awesome-icon star=1 v-on:click='setRating' :class='{highlighted:highlight[1]}' :icon="highlight[1] ? ['fas', 'star']:['far', 'star']" />
    <font-awesome-icon star=2 v-on:click='setRating' :class='{highlighted:highlight[2]}' :icon="highlight[2] ? ['fas', 'star']:['far', 'star']" />
    <font-awesome-icon star=3 v-on:click='setRating' :class='{highlighted:highlight[3]}' :icon="highlight[3] ? ['fas', 'star']:['far', 'star']" />
    <font-awesome-icon star=4 v-on:click='setRating' :class='{highlighted:highlight[4]}' :icon="highlight[4] ? ['fas', 'star']:['far', 'star']" />
</div>
</template>

<script>
export default {
  name: "Stars",
  props:["stars"],
  created(){
    //   this.highlight = this.setHighlight()
            console.log(this.highlight);
      console.log(this.setHighlight);
      this.setHighlight()
      console.log(this.highlight);
  },
  data:function(){
      return{
          rating:Number(this.stars),
          highlight:[false,false,false,false,false]
      }
  },
  methods:{
      sample:function(){
          console.log("sample method");
      },
      setRating:function(event){
        //   console.log(event);
          this.rating = Number(event.target.getAttribute("star")) + 1
          this.setHighlight()
          this.$emit("rate", this.rating)
        //   console.log(this.rating);
      },
      setHighlight:function(){
          let i = 0
          let newHL = [false,false,false,false,false]
          while(i < 5 && i < this.rating){
            //   console.log(i);
              newHL[i] = true
              i++
          }
        //   console.log(newHL);
          this.highlight = newHL
      }
  }
};
</script>

<style>
.highlighted{
    color:gold;
    font-weight: bold;
}

.starsdiv{
  min-width: 6em;
  text-align: center;
  padding:1em;
}
</style>