const router = require('express').Router();
const { Tool, User, ToolType, ToolMake, ToolCategories } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async(req,res)=>{
  try {
    res.render('homepage', { 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/Distance',async(req,res)=>{
   try {
   
   }catch(err){}
  })

router.get ('/NoFilter',async(req, res)=>{
    try{
        const toolsData = await Tool.findAll({
            include: [
              {
                model: User,
                attributes: {
                  exclude: ['password'],
                }
              },
              {
                model: ToolType
              },
              {
                model: ToolMake
              },
              {
                model: ToolCategories
              }
            ],
          });
          const tools = toolsData.map((tool) => tool.get({ plain: true }));
          res.render('tools', { 
            tools,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
          });
    }
    catch(err){

    }
})

router.post('/BothFilters', async(req,res)=>{
    try{
      
       
     const toolData = await Tool.findAll(
        {where:{tool_categories_id: req.body.cat}},
        {
         include: [
             {
               model: User,
               attributes: {
                 exclude: ['password'],
               }
             },
             {
               model: ToolType
             },
             {
               model: ToolMake
             },
             {
               model: ToolCategories
             }
           ],
     },)
     const tools = toolData.map((tool) => tool.get({ plain: true }));
     console.log(tools)
   
  
    res.render('tools',{
      tools
    })
    
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
    
})


  module.exports= router