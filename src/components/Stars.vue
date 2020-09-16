<template>

<div>
    <p>{{this.rating}}</p>
    <button star=0 v-on:click='setRating' :class='{highlighted:highlight[0]}'>S</button>
    <button star=1 v-on:click='setRating' :class='{highlighted:highlight[1]}'>S</button>
    <button star=2 v-on:click='setRating' :class='{highlighted:highlight[2]}'>S</button>
    <button star=3 v-on:click='setRating' :class='{highlighted:highlight[3]}'>S</button>
    <button star=4 v-on:click='setRating' :class='{highlighted:highlight[4]}'>S</button>
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
</style>