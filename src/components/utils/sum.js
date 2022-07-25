export default function sum(props){
    
    let sum = 0;
  
for (let index = 0; index < props.length; index++) {
sum += props[index].amount;
}

return sum;
}