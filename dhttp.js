
const express = require('express')

const bodyParser = require('body-parser')



let htport = 7887		// should be > 1023

//let serverhost = "http://localhost:" + htport	// For use with reverse proxy only

let staticfolder = ""	// For use with reverse proxy only


let app = express()


app.use( bodyParser.json() )

app.use( bodyParser.urlencoded( { extended: true } ) )

app.use( express.static( "static" ) )


let decodeBase64 = ( encstr )=>{
	
	return Buffer.from( encstr, 'base64' ).toString('utf8')
	
}


let jsline = (code)=>{
	
	return code + "\n"
	
}


let jsfunc = (fname,fparams,flines)=>{
	
	let fncode = "let " + fname + " = (" + fparams + ")=>{ \n\n"
	
	for( l=0; l<flines.length; l++ )
	{
		
		fncode += "\t" + jsline( flines[l] )
		
	}
			   
	fncode += "}\n\n"
	
	return fncode
}


let jsxs = (srcrr)=>{
	
	let tags = ""
	
	for( s=0; s<srcrr.length; s++)
	{
		
		tags += "<script src=\"" + srcrr[s] + "\"></script>"
		
	}
	
	return tags
}


let mstk = []

let writeFrame = ( pgtitle, initact, subfolder )=>{
	
	return "<!DOCTYPE html><html>"
	
			   + "<head><meta charset=\"UTF-8\"><title>" + pgtitle + "</title>\n"
			   
			   + "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n"
			   
			   //+ "<link href=\"https://fonts.googleapis.com/css?family=Open Sans\" rel=\"stylesheet\">\n"
			   
			   //+ "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + staticfolder + subfolder + "/style.css\">"
			   
			   + "\n<style>\n"
			   
			   + "input{ padding:8px; } "
			   
			   + "body{ background-color:#FEFEFE; font-size:90%; font-family: Verdana,Geneva,sans-serif; } "
			   
			   + "\n</style>\n\n"
			   
			   + "<script src=\"" + staticfolder + subfolder + "/modules.js\"></script>"
			   
			   + "<script src=\"" + staticfolder + subfolder + "/binder.js\"></script>"
			   
			   + "<script src=\"" + staticfolder + subfolder + "/htree.js\"></script>"
			   
			   + "<script src=\"" + staticfolder + subfolder + "/multiact.js\"></script>"
			   
			   + "\n\n<script>\n\n"
				
				+ jsfunc( "renderGrid", "initcont", [ 
				
							"let htdata = \"\"\n",
		
							"let n = 0\n",
			
							"let nxt = true\n",
			
							"let sliced\n",
			
							"let tobranch\n",
			
							"let hstack = treestk[ contree[ initcont ] ].slice(0)\n",
							
							"do{\n",
				
								"if( hstack[n][0] == \"branch\" ){\n",
					
									"if( brandata[ hstack[n][1] ][0] == true ){\n",
						
										"tobranch = hstack[n][1]\n",
						
										"if( treestk[ contree[ brandata[ tobranch ][1] ] ].length > 0 ){\n",
							
											"hstack.splice( n, 1 )\n",
							
											"for( let s=treestk[ contree[ brandata[ tobranch ][1] ] ].length-1; s>=0; s-- )\n",
											
											"{\n",
								
												"hstack.splice( n, 0, treestk[ contree[ brandata[ tobranch ][1] ] ][s] )\n",
								
											"}\n",
							
										"}\n",
										
										"else{\n",
							
											"hstack.splice( n, 1 )\n",
						
										"}\n",
					
									"}\n",
									
									"else{\n",
						
										"hstack[n] = [ \"html\", brandata[ hstack[n][1] ][2] ]\n",
						
									"}\n",
					
								"}\n",
							
								"else if( hstack[n][0] == \"html\" ){\n",
					
									"n++",
					
								"}",
								
								"if( n == hstack.length ){",
									
									"nxt = false",
									
								"}",
								
								"if( n == 10000 ){",
									
									"console.error(\"renderGrid: Infinite Loop\")",
									
									"nxt = false",
									
									"break",
									
									"return false",
									
								"}",
								
								"console.log( JSON.stringify( hstack ) )",
				
							"}",
							
							"while( nxt === true )",
			
			
							"console.log( hstack )",
							
							"for( r=0; r<hstack.length; r++ )",
							
							"{",
								
								"htdata += hstack[r][1]",
								
							"}",
							
							"document.getElementById( \"htcont\" ).innerHTML = htdata",
							
							"console.log( \"HTML:\" )",
							
							"console.log( htdata )",
							
							"hstack = []",
							
							"return true"
						
				 ] )
				 
				+ "\n" + jsfunc( "setBranchHtml", "brid,bhtml", [ 
				
							"brandata[ brid ][2] = bhtml",
			
							"brandata[ brid ][0] = false",
							
							"let nxbranch = brid",
							
							"let nxtree",
							
							"let nxcont",
							
							
							"let n = 0",
							
							"let nxt = true",
							
							
							"while( nxt === true )",
							
							"{",
							
								"nxtree = brandata[ nxbranch ][3]",
					
								"nxcont = treecont[ brandata[ nxbranch ][3] ]",
								
								"contree[ nxcont ] = nxtree",
								
								
								"if( contbranch.hasOwnProperty( nxcont ) ){",
									
									"if( contbranch[ nxcont ] == null ){",
										
										"nxt = false",
										
									"}",
									
									"else{",
										
										"nxbranch = contbranch[ nxcont ]",
										
										"brandata[ contbranch[ nxcont ] ][0] = true",
										
										"console.log( \"brandata\" )",
										
										"console.log( brandata[ contbranch[ nxcont ] ] )",
										
										"nxt = true",
										
									"}",
									
								"}",
								
								"else{",
									
									"nxt = false",
									
								"}",
								
								"if( n == 2000 ){",
						
									"console.error(\"setBranchHtml: Infinite Loop\")",
									
									"nxt = false",
									
									"break",
									
									"return false",
									
								"}",
								
								"n++",
							
							"}",
						
							"return true"
				
				 ] )
				
				+ "\n" + jsfunc( "modAct", "target,hdata", [
				
							"let mdata = {}",
							
							"let modret = mods( target, hdata )",
							
							"for( ml in modret ){ ",
								
								"if( modret[ml][0] == 'hwrite' ){ ",
								
									"setBranchHtml( modret[ml][2], modret[ml][3] )",
								
								"}else if( modret[ml][0] == 'htrefresh' ){ ",
								
									"renderGrid( modret[ml][1] )",
								
								"}else if( modret[ml][0] == 'updata' ){ ",
								
									"mdata[ modret[ml][1] ] = modret[ml][2]",
								
								"}else if( modret[ml][0] == 'consolelog' ){ ",
								
									"console.log( modret[ml][1] )",
									
								"}else if( modret[ml][0] == 'error' ){ ",
								
									"console.warn( modret[ml][1] )",
									
								"}else{ ",
								
									"console.warn( \"modAct: Unknown action\" )",
									
								"} ",
								
								"console.log( [modret[ml][0], modret[ml][1], modret[ml][2] ] )",
								
							"} ",
									
							"return mdata"	
							
				])
					
				+ jsfunc( "bindTo", "target,adata,edata,xdata", [
				
					"let dorr = binder( target,adata,edata,xdata )",
					
					"if( dorr[0] == \"modact\" ){",
					
						"modAct( dorr[1], dorr[2], dorr[3], dorr[4] )",
						
						"return true",
						
					"}else if( dorr[0] == \"multiact\" ){",
						
						"multiAct( dorr[1], dorr[2] )",
						
						"return true",
						
					"}else if( dorr[0] == \"sendmodata\" ){",
						
						 "sendToServer( dorr[5], modAct( dorr[1], dorr[2], dorr[3], dorr[4] ).sendata )",
						
						"return true",
						
					"}",
					
					"console.warn(\"bounDo: Unknown command\")",
					
					"return false"
					
				])
					
				+ jsfunc("multiAct","ndl,dyd",[
					
					"let reqrr = agroup( ndl, dyd )",
					
					"let mdata",
					
					"for( rl in reqrr ){",
					
						"if( reqrr[rl][0] == 'sendtoserver' ){",
							
							"sendToServer( reqrr[rl][1], reqrr[rl][2], reqrr[rl][3] )",
							
							"console.log('sendToServer: '+reqrr[rl][1])",
						
						"}else if( reqrr[rl][0] == 'sendmodata' ){",
							
							"sendToServer( reqrr[rl][5], modAct( reqrr[rl][1], reqrr[rl][2], reqrr[rl][3], reqrr[rl][4] ).sendata, reqrr[rl][6] )",
							
						"}else if( reqrr[rl][0] == 'modact' ){",
							
							"mdata = modAct( reqrr[rl][1], reqrr[rl][2], reqrr[rl][3], reqrr[rl][4] )",
							
						"}else if( reqrr[rl][0] == 'error' ){",
							
							"console.warn( \"multiAct: \" + reqrr[rl][1] )",
							
						"}else{",
							
							"console.warn( \"multiAct: Unknown command <\" + reqrr[rl][0] + \">\" )",
							
						"}",
						
					"}"
					
					
				])
					
				+ jsfunc( "sendToServer", "needle,dyndata,callback", [
					
					"let xhttp = new XMLHttpRequest()",
					
					"let serverdata",
				
					"xhttp.onreadystatechange = ()=>{",
						
						"if ( xhttp.readyState == 4 && xhttp.status == 200 ) {",
						
						  "try{",
							  
							  "console.log( xhttp.responseText )",
							  
							  "serverdata =  JSON.parse( xhttp.responseText )",
							  
							  "multiAct( serverdata.needle, serverdata.dyndata )",
							  
						  "}",
						  
						  "catch( ajxerr ){",
							  
							  "console.error( ajxerr )",
							  
						  "}",
						  
						"}",
						
						"else{",
							
							"console.log( \"xmlHttpReadyStateChange \" + xhttp.readyState )",
							
						"}",
						
					"}",
					 
					"xhttp.onerror = ()=>{",
						 
						"console.error(\"Ajax Error\")",
						 
					"}",
					  
					"xhttp.open( \"POST\", \"/data\", true )",
					  
					"xhttp.setRequestHeader( \"Content-type\", \"application/x-www-form-urlencoded\" )",
					  
					"xhttp.send( \"clidata=\" + encodeURIComponent( JSON.stringify( { \"needle\":needle, \"dyndata\":dyndata, \"callback\":callback } ) ) )",
					
					])
					
				+ jsfunc( "initLoad", "", initact )
			   
			   + "\n</script>"
		
			   + "</head>"
			   
			   + "<body onload=\"initLoad()\">"
			   
				+ "<div id=\"htcont\">Loading...</div>"
				
				+ "<noscript>Error: You must activate Javascript to use this website</noscript>"
			   
			   + "</body></html>"
			   
	
}
	
		
	app.get( '/', function(req, res) {
		
		console.log( "> Incoming 'get' request: /" )
		
		res.status( 200 ).send( "<!DOCTYPE html><html><head><meta charset=\"UTF-8\">"
		
							  + "<title>NestedLogic Training</title></head><body>"
							  
								+ "<div><p>The server is running!</p>"
							  
								+ "<p>Le serveur fonctionne!</p><p><a href=\"/demo\">Start Demo</a></p></div>"
							  
							  + "</body></html>" )
	})
	
	
	app.get( '/ping', function(req, res) {
		
		console.log( "> Incoming 'get' request: /ping" )
		
		res.status( 200 ).send( writeFrame( "NestedLogic Training | Ping", 
		
										    [ "bindTo('b702ea80-c96d-11e8-883b-cdb19d274f80',null,null,null)" ], // " + decodeBase64(req.query.algo) + "
										  
										    "/ping" ) )
	})
	
	
	app.get( '/demo', function(req, res) {
		
		console.log( "> Incoming 'get' request: /demo" )
		
		res.set({"Access-Control-Allow-Origin":"*" })
		
		res.status( 200 ).send( writeFrame( "NestedLogic Training | Demo", 
		
										    [ "bindTo('5c368c60-6936-11e9-a54f-23fd57c21818',null,null,null)" ], // " + decodeBase64(req.query.algo) + "
										  
										    "/demo" ) )
	})
	
		
	app.post( '/data', function(req, res) {
		
		console.log( "Incoming data request" )
		
		try{
			
			let clidata = JSON.parse( req.body.clidata ) 
		
			console.log( req.body.clidata )
			
			if( clidata.needle == "ping" ){
				
				res.status( 200 ).json( { "dyndata":{ "success":true, "message":"Pong" }, "needle":clidata.callback } )
				
			}
			else if( clidata.needle == "demo" ){
				
				if( clidata.dyndata.action == "stkload" ){
					
					res.status( 200 ).json( { "dyndata":mstk, "needle":clidata.callback } )
					
				}
				else if( clidata.dyndata.action == "post" ){
					
					mstk.push( clidata.dyndata.postxt )
					
					res.status( 200 ).json( { "dyndata":{ "success":true }, "needle":clidata.callback } )
					
				}
				else{
					
					res.sendStatus( 400 )
				}
				
			}
			
		}
		catch( cderr ){
			
			res.sendStatus( 400 )
			
			console.error( cderr )
			
		}
		
	})
		
		
	app.listen( htport )

	console.log( 'Server started! At http://localhost:' + htport )

