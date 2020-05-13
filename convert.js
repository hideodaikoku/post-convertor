const mediumToMarkdown = require('medium-to-markdown');
const fs = require('fs'); 
const path = "./output/";
const data = require("./data/quarantine.json");

const convert_page =(_url, slug)=>{
    console.log(`converting ${slug}`)
    mediumToMarkdown.convertFromUrl(_url)
    .then( markdown => {
        fs.writeFile(path+slug+".md", markdown, (err) => {
            if (err) throw err;
            console.log(`file ${slug} saved!`);
        });
    });
}

data.forEach(element => {
    if(!element.converted){
        try {  
            convert_page(element.medium, element.slug)
        } catch (err){
            return
        }
        element.converted = true
    }
})