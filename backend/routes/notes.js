const express =  require('express');
const router =  express.Router();

router.get('/',  (req, res)=>{
    obj = {
        a: "notes",
        subject: "Science"
    }
    res.json(obj);
})

module.exports =  router