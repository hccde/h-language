// Simple Arithmetics Grammar
// ==========================
//
// Accepts expressions like "2 * (3 + 4)" and computes their value.


Function "Function"
  = _ "function" [ \t\n\r]+ IDentifier _"(" _ ")" _ "{" _ Statement* _ "}" {return '1'}

Statement "Statement"
  = _ IDentifier _ "=" _(IDentifier / Expression )_";"  {return '1'}

Expression
  = head:Term tail:(_ ("+" / "-") _ Term)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "+") { return result + element[3]; }
        if (element[1] === "-") { return result - element[3]; }
      }, head);
    }

Term
  = head:Factor tail:(_ ("*" / "/") _ Factor)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "*") { return result * element[3]; }
        if (element[1] === "/") { return result / element[3]; }
      }, head);
    }

Factor
  = "(" _ expr:Expression _ ")" { return expr; }
  /Double/Integer/IDentifier
  
IDentifier
   =_ [a-zA-Z|_]+ [a-zA-Z|0-9|_]*  {return text().trim()}
   
Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }
  
Double "Double"
  = Integer "." Integer + {return parseFloat(text())}
  
_ "whitespace"
  = [ \t\n\r]*
