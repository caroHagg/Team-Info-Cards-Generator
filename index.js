const Employee =require("./Develop/lib/Employee");
const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const generateHtml =require("./Develop/util/generateHtml")
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const team = [];

const Init = async ()=>{
    try{
        const infoM = await inquirer.prompt([
           
            {
                text:"Input",
                name:"name",
                message:"Enter Manager's Name:"
            },
            {
                text:"Input",
                name:"id",
                message:"Enter Manager's Id:"
            },
            {
                text:"Input",
                name:"email",
                message:"Enter Manager's Email:"
            },
            {
                text:"Input",
                name:"officeNumber",
                message:"Enter Manager's Office Number:"
            }
        ]);

        const newManager = new Manager(infoM.name,infoM.id,infoM.email,infoM.officeNumber);
        team.push(newManager);
        console.log(newManager);
        teamInputs();

    }catch(err){
        console.log(err)
    }
}

const teamInputs = async()=>{
    try{
        const options = await inquirer.prompt([
            {
            text:"list",
            message:"Please choose an option: ",
            name:"choice",
            choice:["add engineer,add intern, finish building team"],
            }  
        ]);

        if(options === "add engineer"){
            const infoEng = await inquirer.prompt([
                {
                    text:"Input",
                    name:"name",
                    message:"Enter Engineer's Name:"
                },
                {
                    text:"Input",
                    name:"id",
                    message:"Enter Engineer's Id:"
                },
                {
                    text:"Input",
                    name:"email",
                    message:"Enter Engineer's Email:"
                },
                {
                    text:"Input",
                    name:"github",
                    message:"Enter Engineer's Github Username:"
                }

            ]);
            
            const newEngineer = new Engineer(infoEng.name,infoEng.id,infoEng.email,infoEng.github);
            team.push(newEngineer);
            teamInputs();


        }else if(options === "add intern"){
            const infoInt = await inquirer.prompt([
                {
                    text:"Input",
                    name:"name",
                    message:"Enter Intern's Name:"
                },
                {
                    text:"Input",
                    name:"id",
                    message:"Enter Intern's Id:"
                },
                {
                    text:"Input",
                    name:"email",
                    message:"Enter Intern's Email:"
                },
                {
                    text:"Input",
                    name:"school",
                    message:"Enter Intern's School:"
                }

            ])

            teamInputs();

        }else if(options === "finish building team"){
            //call 

            console.log("Your Team has been created");
        }


    }catch(err){
        console.log(err)
    }
}

Init();