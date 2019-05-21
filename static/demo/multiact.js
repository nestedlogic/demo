
let agroup = ( target, hdata )=>{

	if( target == "9e0ebb70-6a59-11e9-bf61-3305b894069b" ){ // after post 
		
		newrow = ""

		return [ [ "modact", "81d228f0-6943-11e9-bf61-3305b894069b",  null  ], [ "modact", "86619c20-6943-11e9-bf61-3305b894069b",  null  ], [ "modact", "8eada220-6943-11e9-bf61-3305b894069b",  null  ] ]


	}
	else if( target == "3dfef3d0-69fa-11e9-bf61-3305b894069b" ){ // initload 

		return [ [ "sendtoserver", "demo",  { "action":"stkload" } , "2750ca10-69f9-11e9-bf61-3305b894069b" ], [ "modact", "81d228f0-6943-11e9-bf61-3305b894069b",  null  ], [ "modact", "8eada220-6943-11e9-bf61-3305b894069b",  null  ] ]


	}
	else if( target == "6b4728d0-6a59-11e9-bf61-3305b894069b" ){ // new line 

		return [ [ "sendtoserver", "demo",  { "action":"post","postxt":newrow } , "9e0ebb70-6a59-11e9-bf61-3305b894069b" ] ]


	}
	else if( target == "2750ca10-69f9-11e9-bf61-3305b894069b" ){ // Reload 

		mstk = hdata
		
		return [ [ "modact", "81d228f0-6943-11e9-bf61-3305b894069b",  null  ], [ "modact", "86619c20-6943-11e9-bf61-3305b894069b",  null  ], [ "modact", "8eada220-6943-11e9-bf61-3305b894069b",  null  ] ]


	}

}
