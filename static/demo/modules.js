
let newrow = null

let mstk = []

let mods = ( target, hdata )=>{

	if( target == "81d228f0-6943-11e9-bf61-3305b894069b" ){ // input 

		let inhtml = "<input id=\"c595b980-6943-11e9-bf61-3305b894069b\" type=\"text\" placeholder=\"text\"  value=\"\" onchange=\"bindTo('fb53c0d0-69e8-11e9-bf61-3305b894069b',this.value,null,null)\" />" 
		
		           + "<input id=\"1ba6b4b0-69e8-11e9-bf61-3305b894069b\" type=\"button\" value=\"Post\" onclick=\"bindTo('e6e90b80-69f4-11e9-bf61-3305b894069b',null,null,null)\" />"
		
		return [ ["hwrite",true,"24463650-6942-11e9-bf61-3305b894069b", inhtml ] ]	


	}
	else if( target == "86619c20-6943-11e9-bf61-3305b894069b" ){ // stack 

		let stkhtml = mstk.map( (srow)=>{ 
		
		   return "<div style=\"padding:5px;\">" + srow + "</div>"
		
		} ).join('')
		
		return [ ["hwrite",true,"29c22c60-6942-11e9-bf61-3305b894069b", stkhtml ] ]


	}
	else if( target == "8eada220-6943-11e9-bf61-3305b894069b" ){ // all 

		return [ ["htrefresh","c0379df0-693e-11e9-bf61-3305b894069b"] ]	


	}

}
