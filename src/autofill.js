const cheerio = require('cheerio');
const axios = require('axios').default;
const htt = require('html-to-text')

const grab = (html, css) =>{
    let res = cheerio.load(html)(css).text()
    return res;
    
}

const grabDesc = (html, css) =>{
    let elements = cheerio.load(html)(css)
    let res = elements.html()
    return htt.fromString(res);
}

const grabIndeed = (html, url) =>{
    return {
        name: grab(html, ".icl-u-xs-mb--xs"),
        location: grab(html, ".jobsearch-InlineCompanyRating > div:last-child"),
        url: url,
        desc: grabDesc(html, "#jobDescriptionText"),
        company: grab(html, "div.icl-u-lg-mr--sm:nth-child(1)")
    };

}

const grabLinkedIn = (html, url) =>{
    // console.log(html);
    return {
        name: grab(html, ".topcard__title"),
        location: grab(html, "span.topcard__flavor:last-child"),
        url: url,
        desc: grabDesc(html, ".show-more-less-html__markup"),
        company: grab(html, ".topcard__org-name-link")
    };

}

const grabJob = (html, url) =>{
    if (url.match(/linkedin\.com/)){
        return grabLinkedIn(html, url)
    } else if(url.match(/indeed\.com/)){
        return grabIndeed(html,url)
    }
}

const autofill = async (url)=>{
    const page = await axios.get(url)
    // console.log(page.data);
    return await grabJob(page.data, url)

}

// console.log(object);

// async function test(){
// //    af = await autofill("https://www.linkedin.com/jobs/view/2148320362")
//    af = await autofill("https://www.indeed.com/viewjob?jk=59b800ae9161aa0a")
//    console.log(af);
// }

// test()

module.exports = {autofill}