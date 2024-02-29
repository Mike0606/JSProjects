
    // ------------------ toggle switch ---------------------------------------
    const checkbox = document.getElementById('checkbox');
    const containerElement = document.querySelector('.container');
    const containerElementHeader = document.querySelector('.container h2');
    const inputTextElement = document.querySelector('.res');
    const inputBtnElements = document.querySelector('.keys input[type="button"]');



    checkbox.addEventListener('change', ()=>{
        document.body.classList.toggle('dark');
        containerElement.classList.toggle('dark');
        containerElementHeader.classList.toggle('dark');
        inputTextElement.classList.toggle('dark');

        const inputBtnElements = Array.from(document.querySelector('.keys input[type="button"]'));
        inputBtnElements.forEach(inputBtnElement => {
            console.log(typeof inputBtnElement);

            inputBtnElement.classList.toggle('dark');
        });
        
    });
    // console.log(inputBtnElement.classList.toggle('dark'));
//_________________________________________________________________

//----------------------- Calculator functionality --------------------------
// const calcDisplay = document.getElementById('res');

// function add(val){
//     console.log(val);
//     calcDisplay.value += val;
//     this.addEventListener("keypress", function(event){
//         if(event.key==="Enter"){
//             // calcDisplay.value="";
//             sol();
//         }
//     })
// }

// function clr(){
//     calcDisplay.value = "";
// }

// function sol(){
//     let expression = calcDisplay.value;
//     // console.log(expression);
//     let result ;
//     try{
//         result=eval(expression);
//         // calcDisplay.value="";
//         calcDisplay.value=result;
//         console.log(result);
//     }
//     catch(error){
//         calcDisplay.value="";
//         alert("Invalid Expression.");
//     }
// }

// document.getElementById('equals').addEventListener("keypress", function(event){
//     if(event.key==="Enter"){
//         console.log(event);
//         console.log(event.key);
//         document.getElementById('equals').click();
//     }
// })


const inputEl = document.getElementById("res");
const equals = document.getElementById("equals");
let stack=[];

function push(x){
    stack.push(x);
    display(x);
}

// REFACTOR - if display function is not need then add its body in the push function itself. 

function display(x){
    inputEl.value+=x;
}

function pop(){
    if(stack.length!==0){
        let delNum = stack.pop();
        let displayString = stack.join("");
        // console.log(stack);
        inputEl.value=displayString; 
    }
    else{
        alert("Input something ")
    }
}

function clr(){
    while(stack.length!==0){
        stack.pop();
    }
    // console.log(stack);
    inputEl.value="";
}

function sol(){
    regexPattern= (/\d+/);
    let expression = inputEl.value;

    //MATCH() doesnt work!!
    // let tokens = expression.match(regex);
    // console.log(`In isValidExp function ${tokens}`);
    // console.log(typeof tokens);
    // return tokens;

    let ops =[];
    let values = [];

    function factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }

    const hasPrecedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3,
        '!': 3,
        '√': 3,
        '%': 3,
        '.': 3
    };

    const hasOperator = (op, b, a) => {
        switch(op){
            case '%': return a ? b/100*a : b/100; // if second operator is a truthy value then b/100*a else b/100.
            case '!': return factorial(b);
            case '^': return Math.pow(a,b);
            case '.': return parseFloat(a.toString() + "." + b.toString());
            case '√': return Math.sqrt(b);
            case '/': return a/b;
            case '*': return a*b;
            case '+': return a+b;
            case '-': return a-b;
        }
    }

    function evaluate(expression){
        for(let i=0;i<expression.length;i++){
            if(regexPattern.test(expression[i])){
                let val=0;
                while(i<expression.length && regexPattern.test(expression[i])){
                    val = (val*10) + (expression[i]-'0');
                    i++;
                    console.log(val);
                }
                values.push(val);
                console.log(`Values Array ${values}`)
                i--;
            }
            else if(expression[i]==='%' || expression[i]==='!' || expression[i]==='+' || expression[i]==='-' || expression[i]==='*' || expression[i]==='/' || expression[i]==='^' || expression[i]==='.' || expression[i]==='√'){
                while(ops.length>0 && (hasPrecedence[expression[i]] <= hasPrecedence[ops[ops.length-1]]) ){
                    values.push(hasOperator(ops.pop(), values.pop(), values.pop()));
                }
                ops.push(expression[i]);
                console.log(`Ops Array ${ops}`)
            }
            else if(expression[i]==='('){
                ops.push(expression[i]);
                console.log(`Ops array ${ops}`);
            }
            else if(expression[i]===')'){
                while(ops[ops.length-1]!=='('){
                    values.push(hasOperator(ops.pop(), values.pop(), values.pop()));
                }
                console.log(`Values Array ${values}`)
                ops.pop(); // to pop '(' from the ops stack.  
            }

        }
        //the entire expression has been parsed. But the Values and Ops array are still not empty. 
            
        while(ops.length>0){
            values.push(hasOperator(ops.pop(), values.pop(), values.pop()));
        }
        // let answer=values.pop();
        // console.log(answer)
        return values.pop();
    }
    inputEl.value=evaluate(expression);
    // evaluate(expression);

}