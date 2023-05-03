const express=require('express');
const mysql=require('mysql2');
const app=express();
const cors = require("cors");


app.use(cors(), express.json());

port=4080;

app.listen(port, () => {
  console.log(`Port::${port}`);
});



//connexio a BBDD
const connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'Admin1234',
  database:'unidanigelabert'
})

//connectar-se
connection.connect((err)=>{
  if(err)throw err;
  console.log("Connectat a MySQL")
})



//CONNECTORS------------------------------------------------------------

//SELECT
app.get('/ex1',(req, res)=>{
  connection.query('SELECT assig_codi, assig_nom\n' +
    'FROM professor, departament, assignatures_professor, assignatures\n' +
    'WHERE assig_codi=assigprof_assig_codi\n' +
    'AND prof_dni=assigprof_prof_dni\n' +
    'AND prof_dept_codi=dept_codi\n' +
    'AND dept_nom=\'INFORMATICA I MATEMATICA APLICADA\'\n' +
    'GROUP BY assig_codi, assig_nom', (err, rows)=>{
    if(err) throw err;
    console.log("info: ", rows);
    connection.end();
    res.json(rows);
  })
})


//ALTER TABLE
app.post('/ex2', async(req, res)=>{
  connection.execute('ALTER TABLE alumnes ADD alumn_zodiac VARCHAR(50)',
    (err, rows)=>{
      if(err) console.log("Noi vas tard, ja està creat.");
    });
})


//ORM------------------------------------------------------------
const SequelizeAuto = require('sequelize-auto');
const Sequelize=require('sequelize');
const {initModels} = require("./models/init-models");



//CREAR ORM AUTOMÀTIC  (només ho utlitzo per crear els models)
// const auto = new SequelizeAuto('unidanigelabert', 'root',
//   'Admin1234', {
//     host: 'localhost',
//     dialect: 'mysql'
//   });
//
//
// auto.run((err) => {
//   if (err) throw err;
//   console.log(auto.tables);
//   console.log(auto.foreignKeys);
//   console.log(auto.getForeignKeys());
//   console.log(auto.schema);
//   console.log(auto.options);
// });


//CONNEXIO POSTERIOR (connexio un cop els models ja estan creats)
const auto = new Sequelize('unidanigelabert', 'root',
  'Admin1234', {
    host: 'localhost',
    dialect: 'mysql'
  });

const models = initModels(auto);


//el console.log del server surt bé però al frontend apareix undefined i diria que està tot bé
app.get('/ex3', async (req, res)=>{
  const matr_alum_dnii=await models.matricula.findOne({attributes:
      ['MATR_ALUM_DNI'], where:{MATR_NOTA:10}}).then((h)=>
  {
    return h.MATR_ALUM_DNI;
  })
  const p= await models.alumnes.findAll({where:
      {ALUMN_DNI: matr_alum_dnii}});
  res.send(p)
  console.log(p)
})



app.post('/ex4', async (req, res)=>{
  const attr={
    DEPT_CODI: req.body.codi,
    DEPT_NOM: req.body.nom,
    DEPT_UBICACIO: req.body.ubi,
    DEPT_TELEFON: req.body.telf,
    DEPT_PROF_DNI: req.body.dni
  }
  const nouDept = models.departament.create(attr)
});

