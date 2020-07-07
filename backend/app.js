const express = require('express');
const bodyParser = require('body-parser');
const {Sequelize, DataTypes} = require('sequelize');

const app = express();
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use(bodyParser.json());

///Connexion base de données
const lien = "Server=HP-ENVY-DODI;Database=TaskManagerJS;Trusted_Connection=True; MultipleActiveResultSets=true"
const sequelize = new Sequelize('TaskManagerJS', 'jonathan', 'sqlraz', {
    host: 'Localhost',
    dialect: 'mssql',
    operatorsAliases: false,
    pool: {
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
})

/////////////////////////////User///////////////////////////////////::
const Account = sequelize.define('Account',{
    UserId: {type: DataTypes.INTEGER,allowNull: false, primaryKey: true, autoIncrement: true},
    UserName: {type: DataTypes.STRING},
    UserEmail: {type: DataTypes.STRING,allowNull: false},
    UserPwd: {type: DataTypes.STRING,allowNull: false},
},
{freezeTableName: true, 
    timestamps: false,}
)

app.get('/api/User', function (req,res)
{  
    Account.findAll().then((x)=>{res.send(x)}).catch(err => {
        console.error('Unable to connect to the database:', err);
      })
})

app.post('/api/Users', function (req)
{  
    Account.create({Category: String(req.body.Category), Title: "" + req.body.Title, Startdate: req.body.Startdate, Deadline: req.body.Deadline, Progress: req.body.Progress, Status: 'In time', Daysleft: 0})
})

app.put('/api/User/:id', function (req,res)
{  
    Account.update(
        {Category: String(req.body.Category), Title: "" + req.body.Title, Startdate: req.body.Startdate, Deadline: req.body.Deadline, Progress: req.body.Progress},
        {where: {Taskid: req.params.id}}
    )
})

app.delete('/api/User/:id', function (req,res)
{  
    Account.destroy({where: {Taskid: req.params.id}})
})

////////////////////////////Task///////////////////////////////////////
const Task = sequelize.define('Task',{
    TaskId: {type: DataTypes.INTEGER,allowNull: false, primaryKey: true, autoIncrement: true},
    Title: {type: DataTypes.STRING,allowNull: false},
    Startdate: {type: DataTypes.DATE},
    Creationdate: {type: DataTypes.DATE},
    Startdate: {type: DataTypes.DATE},
    Deadline: {type: DataTypes.DATE},
    Progress: {type: DataTypes.INTEGER},
    Status: {type: DataTypes.STRING},
    Daysleft: {type: DataTypes.INTEGER},
    Category: {type: DataTypes.STRING},
    UserId: {type: DataTypes.INTEGER},
},
{freezeTableName: true, 
    timestamps: false,}
)

app.get('/api/User', function (req,res)
{  
    Task.findAll().then((x)=>{res.send(x)}).catch(err => {
        console.error('Unable to connect to the database:', err);
      })//.finally(() => {sequelize.close()})
})

app.post('/api/Users', function (req)
{  
    Task.create({Category: String(req.body.Category), Title: "" + req.body.Title, Startdate: req.body.Startdate, Deadline: req.body.Deadline, Progress: req.body.Progress, Status: 'In time', Daysleft: 0})
})

app.put('/api/User/:id', function (req,res)
{  
    Task.update(
        {Category: String(req.body.Category), Title: "" + req.body.Title, Startdate: req.body.Startdate, Deadline: req.body.Deadline, Progress: req.body.Progress},
        {where: {Taskid: req.params.id}}
    )
})

app.delete('/api/User/:id', function (req,res)
{  
    Task.destroy({where: {Taskid: req.params.id}})
})

/////////////Category////////////
const Category = sequelize.define('Category',{
    TaskId: {type: DataTypes.INTEGER,allowNull: false, primaryKey: true, autoIncrement: true},
    Title: {type: DataTypes.STRING},
},
{freezeTableName: true, 
    timestamps: false,}
)

app.get('/api/User', function (req,res)
{  
    Category.findAll().then((x)=>{res.send(x)}).catch(err => {
        console.error('Unable to connect to the database:', err);
      })//.finally(() => {sequelize.close()})
})

app.post('/api/Users', function (req)
{  
    Category.create({Category: String(req.body.Category), Title: "" + req.body.Title, Startdate: req.body.Startdate, Deadline: req.body.Deadline, Progress: req.body.Progress, Status: 'In time', Daysleft: 0})
})

app.put('/api/User/:id', function (req,res)
{  
    Category.update(
        {Category: String(req.body.Category), Title: "" + req.body.Title, Startdate: req.body.Startdate, Deadline: req.body.Deadline, Progress: req.body.Progress},
        {where: {Taskid: req.params.id}}
    )
})

app.delete('/api/User/:id', function (req,res)
{  
    Category.destroy({where: {Taskid: req.params.id}})
})



//////////////////////////////Exportation////////////////////////
module.exports = app;