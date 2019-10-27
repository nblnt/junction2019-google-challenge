const {BigQuery} = require('@google-cloud/bigquery');
const mysql = require('mysql');
const async = require('async');

const escape = (data) => {
    if(typeof data === "string"){
        return '"'+data+'"';
        //return mysql.escape(data);
    }
    else{
        return data;
    }
}

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
                for(let i in params.id){
                    query+= lSep + escape(params.id[i].toString());
                    lSep = ", ";
                }
                query +=")";
            }
            else{
                skip = true;
            }
        }
        else{
            query += sep + "id = "+escape(params.id.toString());
        }
        sep = " AND ";
    }
    if(sep === "" || skip){    
        async.setImmediate(callback,null,[]);
    }
    else{
        //console.log(query)
        bigquery.query(query, callback);
       
    }
};

const listGroups = (params, callback) => {
    const table = "juctionxbp2019-loremipsum.animals.groups";
    let query = 'SELECT name, species FROM `'+table+'` WHERE ';
    let sep = "";
    let skip = false;
    if(params.name){
        if(Array.isArray(params.name)){
            if(params.name.length > 0){
                query += sep + 'name IN (';
                let inSep ="";
                for(let name of params.name){
                    query += inSep + escape(name);
                    inSep = ", ";
                }
                query += ")";
                sep = " AND ";
            }
            else{
                skip = true;
            }
        }
        else{
            query += sep + "name = "+escape(params.name);
            sep = " AND ";
        }
    }
    else if(params.namelike){
        query += sep + 'name LIKE'+escape("%"+params.namelike+"%");
        sep = " AND ";
    }

    if(params.species){
        if(Array.isArray(params.species)){
            if(params.species.length > 0){
                query += sep + 'species IN (';
                let inSep ="";
                for(let species of params.species){
                    query += inSep + escape(species);
                    inSep = ", ";
                }
                query += ")";
                sep = " AND ";
            }
            else {
                skip = true;
            }
        }
        else{
            query += sep + "species = "+escape(params.species);
            sep = " AND ";
        }
    }
    else if(params.specieslike){
        query += sep + "species LIKE "+escape("%"+ params.specieslike+"%");
        sep = " AND ";
    }

    if(sep === ""){
        query += " 1 = 1";
    }
    
    if(skip){
        async.setImmediate(callback, null, []);
    }
    else{
        bigquery.query(query, callback);
    }
    
}

const listDeviceInfos = (params, callback) => {
    const table = "juctionxbp2019-loremipsum.animals.animalgroup";
    let query = 'SELECT id, groupname FROM `'+table+'` WHERE '
    let skip = false;
    let andSep = "";
    if(params.groupname){
        query+= andSep;
        andSep = " AND ";
        if(Array.isArray(params.groupname)){
            if(params.groupname.length > 0){
                query += "groupname IN (";
                let sep = "";
                for(let name of params.groupname){
                    query += sep+escape(name);
                    sep= ", ";
                }
                query += ")";
            }
            else{
                skip = true;
            }
        }
        else{
            query += "groupname = "+ escape(params.groupname);
        }
    }
    if(params.id){
        query+= andSep;
        andSep = " AND ";
        if(Array.isArray(params.id)){
            if(params.id.length > 0){
                query += "id IN (";
                let sep = "";
                for(let id of params.id){
                    query += sep+escape(id);
                    sep= ", ";
                }
                query += ")";
            }
            else{
                skip = true;
            }
        }
        else{
            query += "id = "+ escape(params.id);
        }
    }

    if(andSep === "" || skip){
        async.setImmediate(callback, null, []);
    }
    else{
        //console.log(query)
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
    query += " GROUP BY id";

    //console.log(query);
    bigquery.query(query, callback);
}


module.exports = {
    listPositions: listPositions,
    listGroups: listGroups,
    listDeviceInfos: listDeviceInfos,
    countDevices: countDevices
}
