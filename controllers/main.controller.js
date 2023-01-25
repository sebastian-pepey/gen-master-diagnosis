const mainController={
    informes:(req,res)=>{
        res.render('informes');
    },

    informacion:(req,res)=>{
        res.render('informacion');
    },

    nuevo:(req,res)=>{
        res.render('nuevo');
    },

    editar:(req,res)=>{
        res.render('editar');
    },

    main:(req,res)=>{
        res.render('main');
    },

    registro:(req,res)=>{
        res.render('registro');
    },

    ingreso:(req,res)=>{
        res.render('ingreso');
    }
}

module.exports=mainController;