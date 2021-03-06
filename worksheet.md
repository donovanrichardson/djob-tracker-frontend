# Project Overview

Backend:https://github.com/donovanrichardson/djob-tracker

Frontend:https://github.com/donovanrichardson/djob-tracker-frontend

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|Monday 14| Start basic CRUD on front end | Complete
|Tuesday 15| add Login to front end | Complete
|Tuesday 15| do Front End tables | Complete
|Wednesday 16| finish MVP CRUD to front end | Complete
|Wednesday 16| Css on front end | Complete
|Thursday 17| Add location filter| Incomplete
|Thursday 17| Add location rating | Complete
|Friday 18| *Debugging* finish MVP | Complete
|Weekend (19,20)| Add Indeed and Linkedin integration| Incomplete
|Monday 21| Add Sublocations to front end| Incomplete

## Project Description

A Job Tracker app that allows users to login, add jobs listings (including job title, description, URL, and location), and filter by location.

## Wireframes

[Mobile Wireframe(Figma)](https://www.figma.com/file/JP4h3Cicc3FhcUjmIFm7h5/R%C3%A9sumption?node-id=0%3A1)


## Time/Priority Matrix 

[Google Doc](https://docs.google.com/presentation/d/1XqKOAY34FzvfZdhBOpUVveqaAXCVjm9AFWnWn6pj6k8/edit?usp=sharing)

## MVP/PostMVP - 5min


### Functional Components

Based on the initial logic defined in the previous sections try and breakdown the logic further into functional components, and by that we mean functions.  Try and capture what logic would need to be defined if the game was broken down into the following categories.

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe.

#### MVP
| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
|Job Create Read Delete|H|2hr| 4hr | 4hr|
|Update Job|H|1hr| 1hr | -hr|
|Filter Jobs by Location(Frontend)|M|2hr| -hr | -hr|
|Rate Locations|M|1hr| 4hr | -hr|
|Locations and Jobs tied to user|H|4hr| 2hr | -hr|
| Front end Login | H | 2hr | 3hr | -hr|
| Front end Table | H | 3hr | 1hr | -hr|
| Front end CSS | H | 6hr | 8hr | -hr|

#### PostMVP
| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
|Indeed and Linkedin Integration(frontend)|M|6hr| -hr | -hr|
|Sublocations(front end CRUD)|L|2hr| -hr | -hr|
|Keyword generation based on documents|L|4hr| -hr | -hr|

## Additional Libraries
If I do the LinkedIn and Indeed integration, I plan on using the Cheerio npm package on the front end to grab text from job listing webpages.
Vue
Cheerio

## Code Snippet

Below is a method I use in `Stars.vue` to send a custom "rate" event to the parent component. It highlights all the clicked stars up to that star (i.e. if you click star 5, stars 1-5 will be highlighted), and sends the rate event which tells the parent component to make a patch request that changes the rating of a job or location.
```js
      setRating:function(event){
          this.rating = Number(event.target.getAttribute("star")) + 1
          this.setHighlight()
          this.$emit("rate", this.rating)
      }
```

## Issues and Resolutions
 Use this section to list of all major issues encountered and their resolution.

## Previous Project Worksheet
 - [Readme's](https://github.com/jkeohan/fewd-class-repo/tree/master/final-project-worksheet/project-worksheet-examples)
 - [Best of class readme](https://github.com/jkeohan/fewd-class-repo/blob/master/final-project-worksheet/project-worksheet-examples/portfolio-gracie.md)
