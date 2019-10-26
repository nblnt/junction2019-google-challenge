const {BigQuery} = require('@google-cloud/bigquery');
const mysql = require('mysql');
const async = require('async');

const bigquery = new BigQuery({
	projectId: "juctionxbp2019-loremipsum",
	keyFilename: "./keys/JuctionXBP2019-LoremIpsum-ac684918aab9.json"
});

const listPositions = (params, callback) => {
    const table = "juctionxbp2019-loremipsum.animals.animals_stringid";
    let query = 'SELECT id, lat, lon, timestamp FROM `'+table+'` WHERE ';
    let sep = "";
    let skip = false;
    if(params.from){
        query += sep + "timestamp >= "+parseInt(params.from);
        sep = " AND ";
    }
    if(params.to){
        query += sep + "timestamp <= "+parseInt(params.to);
        sep = " AND ";
    }
    if(params.id){
        if(Array.isArray(params.id)){
            if(params.id.length > 0){
                query += sep+ "id IN (";
                let lSep = "";
                for(let id in params.id){
                    query+= lSep + mysql.escape(id.toString());
                    lSep = ", ";
                }
                query +=")";
            }
            else{
                skip = true;
            }
        }
        else{
            query += sep + "id = "+mysql.escape(params.id.toString());
        }
        sep = " AND ";
    }
    if(sep !== "" || skip){
        bigquery.query(query, callback);
    }
    else{
        async.setImmediate(callback,null,[]);
    }
};

const listGroups = (params, callback) => {
    const table = "juctionxbp2019-loremipsum.animals.groups";
    let query = 'SELECT name, species FROM `'+table+'` WHERE ';
    let sep = "";
    if(params.name){
        query += sep + "name = "+mysql.escape(params.name);
        sep = " AND ";
    }
    else if(params.namelike){
        query += sep + 'name LIKE'+mysql.escape("%"+params.namelike+"%");
        sep = " AND ";
    }

    if(params.species){
        query += sep + "species = "+mysql.escape(params.species);
        sep = " AND ";
    }
    else if(params.specieslike){
        query += sep + "species LIKE "+mysql.escape("%"+ params.specieslike+"%");
        sep = " AND ";
    }

    if(sep === ""){
        query += " 1 = 1";
    }

    bigquery.query(query, callback);
}

const listDeviceInfos = (params, callback) => {
    const table = "juctionxbp2019-loremipsum.animals.animalgroup";
    let query = 'SELECT id, name FROM `'+table+'` WHERE '
    let skip = false;
    let andSep = "";
    if(params.groupname){
        query+= andSep;
        andSep = " AND ";
        if(Array.isArray(params.groupname)){
            if(params.groupname.length > 0){
                query += " IN (";
                let sep = "";
                for(let name of params.groupname){
                    query += sep+mysql.escape(name);
                    sep= ", ";
                }
                query += ")";
            }
            else{
                skip = true;
            }
        }
        else{
            query += " = "+ mysql.escape(params.groupname);
        }
    }
    if(params.id){
        query+= andSep;
        andSep = " AND ";
        if(Array.isArray(params.id)){
            if(params.id.length > 0){
                query += " IN (";
                let sep = "";
                for(let idS of params.id){
                    query += sep+mysql.escape(idS);
                    sep= ", ";
                }
                query += ")";
            }
            else{
                skip = true;
            }
        }
        else{
            query += " = "+ mysql.escape(params.id);
        }
    }

    if(andSep === "" || skip){
        async.setImmediate(callback, null, []);
    }
    else{
        bigquery.query(query, callback);
    }
}

let countDevices = (params, callback) => {
    const table = "juctionxbp2019-loremipsum.animals.animals_stringid";
    let query = 'SELECT id, MAX(timestamp) AS timestamp FROM `'+table+'` WHERE ';
    if(params.from){
        query += 'timestamp >= '+ parseInt(params.from);
    }
    else{
        query += "1=1";
    }
    query += " GROUP BY id"
    bigquery.query(query, callback);
}


module.exports = {
    listPositions: listPositions,
    listGroups: listGroups,
    listDeviceInfos: listDeviceInfos,
    countDevices: countDevices
}
