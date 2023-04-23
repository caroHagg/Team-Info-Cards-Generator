const generateCSS = () =>{
    return `
    .team-heading{
        background:lightcoral; 
        color:white;
    }
    .employee-card{
        margin:15px;
        box-shadow: 6px 6px #ccc;
    }
    .card-header{
        background:blue;
        color:white;
    }
    .card-body{
        background: #f9f5f5;
    }
    .team-area{
        flex-wrap: wrap;
    }
    
    `
}

module.exports = generateCSS;