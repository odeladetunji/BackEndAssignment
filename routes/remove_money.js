const express = require('express');
const router = express.Router();
require('body-parser');
const mongo = require('mongodb');

router.post('/', function(req, res){
    let amountToWidthraw = req.body.amountToWidthraw;
    let lastRecord = null;
    // console.log(amountToWidthraw);
    let mongooseUrl = 'mongodb://127.0.0.1:27017/wallet';
    mongo.connect(mongooseUrl, function(err, db){
        if(err) throw err;
        lastRecord = db.collection('wallet').find({title: 'wallet'}).sort({_id: -1}).limit(1);
        lastRecord.forEach(function(doc, err){
            if(err) throw err;
            console.log(doc);
            // console.log(parseInt(amountToWidthraw))
            let newAmount = parseInt(doc.amount) - parseInt(amountToWidthraw);
            // console.log(newAmount);
            if(parseInt(doc.amount) > parseInt(amountToWidthraw)
                || parseInt(doc.amount) == parseInt(amountToWidthraw)){
                    let newTrantion = { 
                        title: 'wallet',
                        amount: newAmount,
                        type: 'withdrawal'
                    }
                    
                    // db.collection('wallet').update({title: 'wallet'},{$set:{'amount': 50}});
                    db.collection('wallet').insert(newTrantion);
                    res.json({
                        message: " " + "withdrawn"
                    });
            }else{
                res.json({
                   message: 'You dont have up to this amount'
                });
            }
            db.close();
        });
    });
});

module.exports = router;