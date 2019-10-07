const express = require('express');
const router = express.Router();
require('body-parser');
const mongo = require('mongodb');

router.post('/', function(req, res){
    let amountToAdd = req.body.amountToAdd;
    let lastRecord = null;
    // console.log(amountToAdd);
    let mongooseUrl = 'mongodb://127.0.0.1:27017/wallet';
    mongo.connect(mongooseUrl, function(err, db){
        if(err) throw err;
        let newAmount = null;
        lastRecord = db.collection('wallet').find({title: 'wallet'}).sort({_id: -1}).limit(1);
        lastRecord.forEach(function(doc, err){
            if(err) throw err;
            newAmount = parseInt(amountToAdd) + parseInt(doc.amount);
            
            let newTransaction = { 
                title: 'wallet',
                amount: newAmount,
                type: 'Deposit'
            }

            console.log(newAmount)
            db.collection('wallet').insert(newTransaction);
            db.close();
        });
    });

    res.json({
        'Amount Added': amountToAdd
    })
});

module.exports = router;