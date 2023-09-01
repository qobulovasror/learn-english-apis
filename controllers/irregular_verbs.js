const data = require('../data/irregular_verbs.json');

async function getVerbWithId(req, res){
    try {
        const {id} = req.params;
        if(!id) return res.status(403).send("'id' is required");
        if(id>151 || id <1) return res.status(403).send("'id is invalid");
        res.json({
            id: id,
            [data.cols[0]]: data.values[id-1][0],
            [data.cols[1]]: data.values[id-1][1],
            [data.cols[2]]: data.values[id-1][2],
            [data.cols[3]]: data.values[id-1][3],
        });
    } catch (error) {
        return res.status(500).send('Server error');
    }
}

async function getVerb(req, res){
    try {
        const resData = [];
        data.values.forEach((element)=>{
            if(req.query.infinitive && element[0].split(' ')[0]!==req.query.infinitive) return;
            if(req.query.pastSimple && element[1].split(' ')[0]!==req.query.pastSimple) return;
            if(req.query.pastParticiple && element[2].split(' ')[0]!==req.query.pastParticiple) return;

            resData.push(element);
         })
         res.json(resData)
    } catch (error) {
        return res.status(500).send('Server error');
    }
}

async function getRandVerb(req, res){
    try {
        const id = Math.round(Math.random()*152);
        res.json({
            id: id,
            [data.cols[0]]: data.values[id-1][0],
            [data.cols[1]]: data.values[id-1][1],
            [data.cols[2]]: data.values[id-1][2],
            [data.cols[3]]: data.values[id-1][3],
        });
    } catch (error) {
        return res.status(500).send('Server error');
    }
}

module.exports = {
    getVerbWithId,
    getVerb, 
    getRandVerb
}