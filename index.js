const Employee =require("./Develop/lib/Employee");
const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const generateHtml =require("./Develop/util/generateHtml");
const generateCSS =require("./Develop/util/generateCSS");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFilePromise = util.promisify(fs.writeFile);
const team = [];

//initialize the prompts to user
const Init = async ()=>{
    try{
        const info = await inquirer.prompt([
           
            {
                type:"Input",
                name:"name",
                message:"Enter Manager's Name:"
            },
            {
                type:"Input",
                name:"id",
                message:"Enter Manager's Id:"
            },
            {
                text:"Input",
                name:"email",
                message:"Enter Manager's Email:"
            },
            {
                type:"Input",
                name:"officeNumber",
                message:"Enter Manager's Office Number:"
            }
        ]);
// creating instance of Manager class, saving it to team list  and calling recursive function 
        const newManager = new Manager(info.name,info.id,info.email,info.officeNumber);
        team.push(newManager);
       
        teamInputs();

    }catch(err){
        console.log(err)
    }
}

//recursive async prompt function to add members to team list
const teamInputs = async()=>{
    try{
        const options = await inquirer.prompt([
            {
            type:"list",
            name:"choice",
            message:"Select from the following: ",
            choices:["add engineer","add intern", "finish building team"],
            }  
        ]);
// Adding engineer
        if(options.choice === "add engineer"){
            const info = await inquirer.prompt([
                {
                    type:"Input",
                    name:"name",
                    message:"Enter Engineer's Name:"
                },
                {
                    type:"Input",
                    name:"id",
                    message:"Enter Engineer's Id:"
                },
                {
                    type:"Input",
                    name:"email",
                    message:"Enter Engineer's Email:"
                },
                {
                    type:"Input",
                    name:"github",
                    message:"Enter Engineer's Github Username:"
                }

            ]);
            //creating instance of Engineer Class and saving it to team list
            const newEngineer = new Engineer(info.name,info.id,info.email,info.github);
            team.push(newEngineer);

            teamInputs();

        
        }else if(options.choice === "add intern"){
            const info = await inquirer.prompt([
                {
                    type:"Input",
                    name:"name",
                    message:"Enter Intern's Name:"
                },
                {
                    type:"Input",
                    name:"id",
                    message:"Enter Intern's Id:"
                },
                {
                    type:"Input",
                    name:"email",
                    message:"Enter Intern's Email:"
                },
                {
                    type:"Input",
                    name:"school",
                    message:"Enter Intern's School:"
                }

            ]);
    //creating instance of Intern Class and saving it to team list
            const newIntern = new Intern(info.name,info.id,info.email,info.school);
            team.push(newIntern);

            teamInputs();

        }else if(options.choice === "finish building team"){
            //call generateHtml class
            const templateHTML = generateHtml(team);
            const templateCSS = generateCSS();
            await writeFilePromise("./Develop/dist/team.html",templateHTML);
            await writeFilePromise("./Develop/dist/style.css", templateCSS);

            console.log("Your Team has been created");
        }


    }catch(err){
        console.log(err)
    }
}

Init();