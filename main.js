var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ibmdb = require("ibm_db");  
var conectionstring="DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-lon02-04.services.eu-gb.bluemix.net;PORT=50001;PROTOCOL=TCPIP;UID=tgp46415;PWD=bfbsk@n5s2cc3bw3;Security=SSL;"
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


 app.use(bodyParser.json());      //
var mastid=23;
var suc=false
app.post('/formsubmit', function(req, res) {
    var fn =  req.body.FName;
    var mn =  req.body.MName;
	var ln=req.body.Lname;
	var con=Number(req.body.contact);
	var dob=req.body.dob;
		var email=req.body.email;
		var address=(req.body.address);
  var ccity=req.body.ccity;
  var jdistrict=req.body.jdistrict;
  var cdistrict=req.body.cdistrict;
  var cstate=req.body.cstate;
  var inds=req.body.industry;
  var pskill=req.body.primaryskill;
  var sskill=req.body.secondaryskill;
  var pin=Number(req.body.pincode);
  
	console.log(fn +" "+ mn+" "+ln+" "+con+" "+email+" "+dob);

ibmdb.open(conectionstring, function (err,conn) {
  if (err) return console.log(err);
  
     var sql = "INSERT INTO TGP46415.cand_prof_master  VALUES("+(mastid++)+",'"+fn+"','"+mn+"','"+ln+"','"+dob+"',"+con+",'"+email+"',"+con+",'"+email+"')";
	 var sql1="INSERT INTO TGP46415.cand_addr_det values ("+(mastid++)+",'"+address+"','1 st street','nehru nagar','"+ccity+"','"+cdistrict+"','"+cstate+"','indian',"+pin+")";
	 var sql2 = "INSERT INTO TGP46415.cand_edu_skill_det  VALUES("+(mastid++)+",'diplomo','"+pskill+"','"+sskill+"','"+inds+"',80,'"+jdistrict+"')";
	 console.log(sql);
	 console.log(sql1);
	 console.log(sql2);
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
	suc=true
  });
  conn.query(sql1, function (err, result) {
    if (err) throw err;
    console.log("2 record inserted");
	suc=true
  });
  conn.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("3 record inserted");
	suc=true
  });
  
	 res.send("success");
 });
});
var comp_id=190;
var job_d='19'
app.post('/jobformsubmit', function(req, res) {
	
    var comname =  req.body.comname;
    var regno =  req.body.regno;
	var jobdes=req.body.jobdes;
	var con=Number(req.body.pcon);
  var available =  req.body.available;
	var jobaddress=req.body.jobaddress;
		var email=req.body.primemail;
		var address=(req.body.address);
  var ccity=req.body.ccity;
  var tottalvac=req.body.tottalvac;
  var cdistrict=req.body.cdistrict;
  var cstate=req.body.cstate;
  var inds=req.body.industry;
  var pskill=req.body.primaryskill;
  var sskill=req.body.secondaryskill;
  var pin=Number(req.body.pincode);
  
	console.log(" "+con+" "+email+" ");

ibmdb.open(conectionstring, function (err,conn) {
  if (err) return console.log(err);
  
     var sql = "INSERT INTO TGP46415.comp_master  VALUES("+(comp_id++)+",'"+comname+"','"+regno+"','"+available+"','"+address+"','','"+cdistrict+"','"+cstate+"','india',"+pin+")";
	 var sql1="INSERT INTO TGP46415.comp_job_det values ("+(comp_id++)+",'"+(job_d+comp_id)+"','"+jobdes+"','Technical Diplomo',19,'"+comname+"','"+email+"',"+con+")";
	 var sql2 = "INSERT INTO TGP46415.comp_job_master  VALUES("+(comp_id++)+",'"+(job_d+comp_id)+"','"+inds+"','"+pskill+"','"+sskill+"','"+jobaddress+"','Full','Permanent')";
	 console.log(sql);
	 console.log(sql1);
	 console.log(sql2);
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
	suc=true
  });
  conn.query(sql1, function (err, result) {
    if (err) throw err;
    console.log("2 record inserted");
	suc=true
  });
  conn.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("3 record inserted");
	suc=true
  });
  
	 res.send("success");
 });
});
app.post("/canon",function(req,res){
	var q1,q2=""
ibmdb.open(conectionstring, function (err,conn) {
  if (err) return console.log(err);
   
  conn.query('select loc_taluk_nam,loc_dist_nam,loc_stat_nam from TGP46415.loc_master limit 10 ', function (err, rows) {
    if (err) console.log(err);
    else {
		//console.log(data.ID);
		//console.logJSON.stringify(q1)(rows);
		
		res.writeHead(200, {'Content-Type': 'text/html'});

		res.end(JSON.stringify(rows))
		//console.log(q1)
	}conn.close(function () {
      console.log('done');
    });
     });
     });
});


app.post("/canonJob",function(req,res){
	var q1,q2=""
ibmdb.open(conectionstring, function (err,conn) {
  if (err) return console.log(err);   
  conn.query('select distinct comp_job_industry,comp_job_prim_skill,comp_job_alt_skill from TGP46415.comp_job_master ', function (err, rows1) {
    if (err) console.log(err);
    else {
		
		q2=rows1
res.writeHead(200, {'Content-Type': 'text/html'});		 
		 res.end(JSON.stringify(q2));
			}
    conn.close(function () {
      console.log('done');
    });
  });
  });
});

app.post("/cansearch",function(req,res){
	var q1,q2=""
ibmdb.open(conectionstring, function (err,conn) {
  if (err) return console.log(err);
   
  conn.query('select distinct comp_city_nam from TGP46415.comp_master limit 10 ', function (err, rows) {
    if (err) console.log(err);
    else {
		//console.log(data.ID);
		//console.logJSON.stringify(q1)(rows);
		
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(JSON.stringify(rows))
		//console.log(q1)
	}conn.close(function () {
      console.log('done');
    });
     });
     });
});


app.post("/canonsearchjob",function(req,res){
	var q1,q2=""
ibmdb.open(conectionstring, function (err,conn) {
  if (err) return console.log(err);   
  conn.query('select distinct CAND_SKILL_INDUSTRY,cand_prim_skill_desc,cand_alt_skill_desc  from TGP46415.cand_edu_skill_det ', function (err, rows1) {
    if (err) console.log(err);
    else {
		
		q2=rows1
		console.log(q2)
res.writeHead(200, {'Content-Type': 'text/html'});		 
		 res.end(JSON.stringify(q2));
			}
    conn.close(function () {
      console.log('done');
    });
  });
  });
});


app.post("/canonsearchcom",function(req,res){
	var q1,q2=""
ibmdb.open(conectionstring, function (err,conn) {
  if (err) return console.log(err);   
  conn.query('select  comp_job_industry,comp_job_prim_skill,comp_job_alt_skill  from TGP46415.comp_job_master ', function (err, rows1) {
    if (err) console.log(err);
    else {
		
		q2=rows1
		console.log(q2)
res.writeHead(200, {'Content-Type': 'text/html'});		 
		 res.end(JSON.stringify(q2));
			}
    conn.close(function () {
      console.log('done');
    });
  });
  });
});


app.post("/formtable",function(req,res){
ibmdb.open(conectionstring, function (err,conn) {
  if (err) return console.log(err);
 
  var pskill=req.body.cpSkill
  var sskill=req.body.csSkill
  var industry=req.body.industry
  var prefloc=req.body.district
  var sqlstring="select cand_master_id from TGP46415.cand_edu_skill_det where cand_prim_skill_desc ='"+pskill+"'and cand_alt_skill_desc='"+sskill+"' and cand_skill_industry='"+industry+"' and cand_prof_job_loc ='"+prefloc+"'"
  console.log(sqlstring)
  conn.query(sqlstring, function (err, rows,fields) {
    if (err) console.log(err);
    else {
		//console.log(data.ID);
		console.log(rows);
		var quer='';
		  for( i = 0 ; i < rows.length ; i++){

     quer+= rows[i].CAND_MASTER_ID;
	 if(i!=(rows.length -1))
		    quer+=',';
     
    }
	console.log(quer)
	
	var fetchstr="select * from TGP46415.cand_prof_master where cand_mast_id in ("+quer+")";
	console.log(fetchstr);
	 conn.query(fetchstr, function (err, data,fields) {
    if (err) console.log(err);
    else {
		
		console.log(data);
			
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(JSON.stringify(data,fields));
		   

		console.log("success")
	}
    conn.close(function () {
      console.log('done');
    });
  });
		
    }
	});
});
});


app.post("/opptable",function(req,res){
ibmdb.open(conectionstring, function (err,conn) {
  if (err) return console.log(err);
 
  var pskill=req.body.cpSkill
  var sskill=req.body.csSkill
  var industry=req.body.industry
  var prefloc=req.body.district

  var sqlstring="select comp_master_id from TGP46415.comp_job_master where comp_job_prim_skill ='"+pskill+"'and comp_job_alt_skill='"+sskill+"' and comp_job_industry='"+industry+"' and comp_job_location ='"+prefloc+"'"
  console.log(sqlstring)
  conn.query(sqlstring, function (err, rows,fields) {
    if (err) console.log(err);
    else {
		//console.log(data.ID);
		console.log(rows);
		var quer='';
		  for( i = 0 ; i < rows.length ; i++){

     quer+= rows[i].COMP_MASTER_ID;
	 if(i!=(rows.length -1))
		    quer+=',';
     
    }
	console.log(quer)
	
	var fetchstr="select a.comp_name,a.comp_incorp_dt,b.comp_job_desc,b.comp_job_cont_mobile,b.com_job_cont_email from TGP46415.comp_master a join  TGP46415.comp_job_det b  on a.comp_master_id=b.comp_master_id where a.comp_master_id in ("+quer+")";
	console.log(fetchstr);
	 conn.query(fetchstr, function (err, data,fields) {
    if (err) console.log(err);
    else {
		
		console.log(data);
			
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(JSON.stringify(data,fields));
		   

		console.log("success")
	}
    conn.close(function () {
      console.log('done');
    });
  });
		
    }
	});
});
});
var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s:%s Port", host, port)
});
