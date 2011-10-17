	/*
     * This script translates English to mock-Swedish a-la the Swedish Chef
     * The translation rules were taken from Andriy Rozeluk <andriy.rozeluk@utoronto.ca>
     * Source at http://www.tuco.de/home/jschef.htm   
     */

var delimiters = " \n\t\\,<.>/?;:'\"[{]}|=+-_!@#$%^&*()~`";
var delimterLen = delimiters.length;

/*helper*/
function findLowest(line,low){
	var e = 0;
	for (i=0;i<delimterLen;i++){
        e=line.indexOf(delimiters.charAt(i));
        if (e > -1 && low > e){
        	low=e;
    	}
    }
    return low
}
/*
* removes everything up to and including the first token from line
*/
function removeToken(line,lowest){
    if (lowest >= line.length - 1) return "";
    return line.substring(lowest + 1, line.length);
}
/*
* returns the first token delimiter found in line
*/
function getToken(line,lowest){
    if (lowest === line.length + 1) return "";
    return line.charAt(lowest);
}
/*
* returns everything up to the first token delimiter found in line
*/
function nextToken(line,lowest){
    if (lowest === line.length + 1) return line; 
    else if (lowest === line.length - 1) return line.substring(0,line.length - 1);
    return line.substring(0, lowest);
}
/*
* translates a String by breaking it up into words and calling
* encheferizeWord(). These words are re-assembled and added to the
* variable 'strOut'.
*/
function encheferizeLine(line){
  var word = "";
  var t = "";
  var returnStr = "";

  while(line.length > 0){
     word = nextToken(line,findLowest(line,line.length));
     t = getToken(line,findLowest(line,line.length+1));
     line = removeToken(line,findLowest(line,line.length+1));
     returnStr += encheferizeWord(word) + t;
  }
  if(t === ".") {
     returnStr += "\nBork Bork Bork!";
  }
  return returnStr;
}

/*
* translates a word given by the rules
*/
function encheferizeWord(word){

	if(word.toLowerCase() === "bork") return word;
  
	var letter = '',
		count=0,
	  	len=word.length,
	  	buff="",
	  	i_seen=false,
	  	isLast=0;
  
	while(count<len){
		isLast = count==(len-1);
		letter=word.charAt(count);
	      
		if(count===0){ //Beginning-of-word rules
			switch(letter){
				case 'e':
					buff+="i";
		   			count++;
		   			continue;
		   		case 'E':
		   			buff+="I";
		   			count++;
		   			continue;
		   		case 'o':
		   			buff+="oo";
		   			count++;
		   			continue;
		   		case 'O':
		   			buff+="Oo";
		   			count++;
		   			continue;
			}
		} 
		else {  //End of Beginning-of-word rules, Start of In-Word rules
			switch(letter){
				case 'e':
					if(!isLast && word.charAt(count+1)=='w'){
	      				buff += "oo";
	      				count+=2;
	      				continue;
	   				} 
	   				else if(isLast){
						buff += "e-a";
						count++;
						continue;
	   				}
		   		case 'f':
		   			buff += "ff";
					count++;
					continue;
		   		case 'i':
		   			if(!isLast && word.charAt(count+1)=='r'){
						buff += "ur";
						count+=2;
						continue;
					}
					else if(!i_seen){
						buff += "ee";
						count++;
						i_seen=true;
						continue;
					}
		   		case 'o':
		   			if(!isLast && word.charAt(count+1)=='w'){
	    				buff += "oo";
						count+=2;
						continue;
					} 
					else {
						buff += "u";
						count++;
						continue;
					}
				case 't':
					if(count<=len-4 && word.charAt(count+1)=='i' && word.charAt(count+2)=='o' && word.charAt(count+3)=='n'){
						buff += "shun";
						count+=4;
						continue;
					}
				case 'u':
					buff += "oo";
					count++;
					continue;
				case 'U':
					buff += "Oo";
					count++;
					continue;
			}
		}
		//Word-placement rules, Start of Anywhere rules
		if (letter==='A' && !isLast){
			switch (word.charAt(count+1)){
				case 'n':
					buff += "Un";
					count+=2;
					continue;
				case 'u':
					buff += "Oo";
					count+=2;
					continue;
				default:
					buff += "E";
					count++;
					continue;
			}
		}
		else if (letter==='a' && !isLast){
			switch (word.charAt(count+1)){
				case 'n':
					buff += "un";
					count+=2;
					continue;
				case 'u':
					buff += "oo";
					count+=2;
					continue;
				default:
					buff += "e";
					count++;
					continue;
			}
		}
		else if(letter=='e' && !isLast && word.charAt(count+1)=='n' && count==len-2){
			buff = buff + "ee";
			count+=2;
			continue;
		} 
		else if(letter=='t'){
			if(count==len-2 && word.charAt(count+1)=='h'){
				buff += "t";
				count+=2;
				continue;
			} 
			else if(count<=len-3 && word.charAt(count+1)=='h' && word.charAt(count+2)=='e'){
				buff += "zee";
				count+=3;
				continue;
			} 
		}
		else if(count<=len-3 && word.charAt(count+1)=='h' && word.charAt(count+2)=='e'){
			switch (letter){
				case 'T':
					buff += "Zee";
					count+=3;
					continue;
				case 'v':
					buff += "f";
					count++;
					continue;
				case 'V':
					buff += "F";
					count++;
					continue;
				case 'w':
					buff += "v";
					count++;
					continue;
				case 'W':
					buff += "V";
					count++;
					continue;
			}
		}
		//End of rules.  Whatever is left stays itself
		buff += letter;
		count++;
	}
	return(buff);
}		
	
exports.cheferize = function(str){
	return encheferizeLine(str);
}