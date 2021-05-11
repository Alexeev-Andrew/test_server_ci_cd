var API_URL = "https://npiregistry.cms.hhs.gov/api/?version=2.1";

const request = require('request');
const $ = require('jquery');
const fetch = require("node-fetch");

exports.get_doctors_by_last_name = function(req, res) {
    request.get({url:API_URL + '&last_name=' + req.query.last_name}, function(err,httpResponse,body){
        console.log(body);
        res.send({
            success: true,
            data: body
        });
    });
}