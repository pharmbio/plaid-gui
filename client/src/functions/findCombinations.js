
const splitParenthesis = (str) => {
    let arr = [];
    let start, end;
    for (let i = 0; i < str.length; i++) {
  
      if (str.charAt(i) === "(") {
        start = i;
      }
      if (str.charAt(i) === ")") {
        end = i + 1;
        arr.push(str.substring(start, end))
      }
    }
    return arr;
  }
  const findCombinations = (cmpname) => {
    const regex = RegExp(/^\w*(?<!.)(\([^\(\)\s\t]+\)){1,4}(?=$)/);
  
      if (regex.test(cmpname)) {
        let compoundsInCombos = splitParenthesis(cmpname);
        if(compoundsInCombos.length > 1)
              return(compoundsInCombos); 
      }
    return null;
  }
  
export default findCombinations;