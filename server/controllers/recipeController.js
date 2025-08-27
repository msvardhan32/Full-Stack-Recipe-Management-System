require('../models/dataBase');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const { search } = require('../routes/recipeRoutes');
/***
 * GET/
 * Homepage
 */
exports.homepage = async (req,res)=>{
    try{

        const limitNumber=5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id:-1}).limit(limitNumber);
        const indian = await Recipe.find({'category':'indian'}).limit(limitNumber);
        const thai = await Recipe.find({'category':'thai'}).limit(limitNumber);
        const american = await Recipe.find({'category':'american'}).limit(limitNumber);

        const food = {latest,thai,indian,american}

        res.render('index',{title:'Home',categories,food});
    }catch(err){
        res.status(500).send({message:err.message || "Error Occured"})
    }
}


exports.exploreCategories = async (req,res)=>{
    try{

        const limitNumber=20;
        const categories = await Category.find({}).limit(limitNumber);

        res.render('categories',{title:'Categories',categories});
    }catch(err){
        res.status(500).send({message:error.message || "Error Occured"})
    }
}

exports.exploreRecipe = async (req,res)=>{
    try{
        let recipeId = req.params.id;
        const recipe =await Recipe.findById(recipeId);
        

        res.render('recipe',{title:'Recipe',recipe});
    }catch(err){
        res.status(500).send({message:err.message || "Error Occured"})
    }
}

exports.exploreCategoriesbyId = async (req,res)=>{
    try{
        const categoryId = (req.params.id).toLowerCase();
        console.log(categoryId);
        const limitNumber=20;
        const categoriebyid = await Recipe.find({"category":categoryId}).limit(limitNumber);
        console.log(categoriebyid);
        res.render('categories',{title:'Categories',categoriebyid});
    }catch(err){
        res.status(500).send({message:err.message || "Error Occured"})
    }
}
exports.searchRecipe = async(req,res)=>{
    try{
        let searchterm = req.body.searchTerm;
        let recipe = await Recipe.find({$text:{$search: searchterm,$diacriticSensitive:true}});
        res.render('search',{title:'Search',recipe});
    }catch(err){
        res.status(500).send({message:err.message || "Error Occured"})
    }
}
exports.explorelatest = async(req,res)=>{
    try{
        limitNumber=20;
        const recipe = await Recipe.find().sort({_id:-1}).limit(limitNumber);
        res.render('explore-latest',{title:'explore',recipe});
    }catch(err){
        res.status(500).send({message:err.message || "Error Occured"})
    }
}
exports.explorerandom = async(req,res)=>{
    try{
        let count = await Recipe.find().countDocuments();
        count = Math.floor(Math.random()*count);
        const recipe = await Recipe.findOne().skip(count).exec();
        res.render('explore-random',{title:'explore',recipe});
    }catch(err){
        res.status(500).send({message:err.message || "Error Occured"})
    }
}


exports.submitRecipe = async(req,res)=>{

    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infosubmit');

    res.render('submit',{title:'Submit-Recipe',infoErrorsObj,infoSubmitObj});
}

exports.submitRecipeOnPost = async(req,res)=>{
    try{
        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files|| Object.keys(req.files).lenght ===0){
            console.log('No Files where uploaded');
        }else{
            imageUploadFile = req.files.image;
            newImageName = Date.now()+imageUploadFile.name;

            uploadPath = require('path').resolve('/')+'/public/uploads/'+newImageName;

            imageUploadFile.mv(uploadPath,function(err){
                if(err) return res.status(500).send(err);
            })

        }


        console.log(req.body.description);
        const newRecipe = new Recipe({
            name:req.body.name,
            description: req.body.description,
            email:req.body.email,
            ingredients:req.body.ingredients,
            category:req.body.category,
            image:newImageName
        })

        await newRecipe.save();

        req.flash('infosubmit','Recipe has been added.');
        res.redirect('/submit-recipe');
    }catch(err){
        req.flash('infoErrors',err);
        res.redirect('/submit-recipe');
    }
}




// async function insertDymayCategoryData(){
//     try{
//         await Category.insertMany([
//             {
//                 "name":"Thai",
//                 "image":"thai-food.jpg"
//             },
//             {
//                 "name":"American",
//                 "image":"American-food.jpg"
//             },
//             {
//                 "name":"Mexican",
//                 "image":"Mexican-food.jpg"
//             },
//             {
//                 "name":"Indian",
//                 "image":"indian-food.jpg"
//             },
//             {
//                 "name":"Spanish",
//                 "image":"spanish-food.jpg"
//             }
//         ]);
//     }catch(error){
//         console.log('err',+error);
//     }
// }

// insertDymayCategoryData();
// insertDymayRecipeData();