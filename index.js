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
                type:"input",
                name:"name",
                message:"Enter Manager's Name:"
            },
            {
                type:"input",
                name:"id",
                message:"Enter Manager's Id:",
                //validate for numbers
                validate(id){
                    if(!isNaN(id)){
                        return true;
                    }else{
                        console.log(`\n Please enter a valid Id number`);

                        return false;
                    }

                }
            },
            {
                text:"input",
                name:"email",
                message:"Enter Manager's Email:",
                //validation email
                validate(email){
                    const format = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                    if(email.match(format)){
                        return true;
                    }else{
                        console.log(`\nEnter a valid email address`);
                    }
                }
        
            },
            {
                type:"input",
                name:"officeNumber",
                message:"Enter Manager's Office Number:",
                validate(officeNumber){
                    if(!isNaN(officeNumber)){
                        return true;
                    }else{
                        console.log(`\n Please enter a valid office number`);

                        return false;
                    }

                }
            }
        ]);
// creating instance of Manager class, saving it to team list  
        const newManager = new Manager(info.name,info.id,info.email,info.officeNumber);
        team.push(newManager);
       //calling recursive function 
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
            choices:["Add Engineer","Add Intern", "Finish Building Team"],
            }  
        ]);
// Adding engineer
        if(options.choice === "Add Engineer"){
            const info = await inquirer.prompt([
                {
                    type:"input",
                    name:"name",
                    message:"Enter Engineer's Name:"
                },
                {
                    type:"input",
                    name:"id",
                    message:"Enter Engineer's Id:",
                    validate(id){
                        if(!isNaN(id)){
                            return true;
                        }else{
                            console.log(`\n Please enter a valid Id number`);
    
                            return false;
                        }
    
                    }
                   
                },
                {
                    type:"input",
                    name:"email",
                    message:"Enter Engineer's Email:",
                    validate(email){
                        const format = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        if(email.match(format)){
                            return true;
                        }else{
                            console.log(`\nEnter a valid email address`);
                        }
                    }
                },
                {
                    type:"input",
                    name:"github",
                    message:"Enter Engineer's Github Username:"
                }

            ]);
            //creating instance of Engineer Class and saving it to team list
            const newEngineer = new Engineer(info.name,info.id,info.email,info.github);
            team.push(newEngineer);

            teamInputs();

        
        }else if(options.choice === "Add Intern"){
            const info = await inquirer.prompt([
                {
                    type:"input",
                    name:"name",
                    message:"Enter Intern's Name:"
                },
                {
                    type:"input",
                    name:"id",
                    message:"Enter Intern's Id:",
                    validate(id){
                        if(!isNaN(id)){
                            return true;
                        }else{
                            console.log(`\n Please enter a valid Id number`);
    
                            return false;
                        }
    
                    }
                   
                },
                {
                    type:"input",
                    name:"email",
                    message:"Enter Intern's Email:",
                    validate(email){
                        const format = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        if(email.match(format)){
                            return true;
                        }else{
                            console.log(`\nEnter a valid email address`);
                        }
                    }
                },
                {
                    type:"input",
                    name:"school",
                    message:"Enter Intern's School:"
                }

            ]);
    //creating instance of Intern Class and saving it to team list
            const newIntern = new Intern(info.name,info.id,info.email,info.school);
            team.push(newIntern);

            teamInputs();

        }else if(options.choice === "Finish Building Team"){
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