import React, { useState } from "react";
import Confetti from 'react-confetti'
import './main.css'
import { nanoid } from 'nanoid'
import Die from "./Die";


export default function Main() {
    const [diceNumbers,setDiceNumbers] = React.useState(allNewDice);
    const [tenzies,setTenzies] = React.useState(false);
    React.useEffect(() => {
        const result = allAreEqual(diceNumbers);
        
        result? setTenzies(true) : console.log('no')
             
        //diceNumbers => diceNumbers.every( v => v.value === diceNumbers[0].value )
        //console.log('state changed'+ result)

      },[diceNumbers]);
      function allAreEqual(diceNumbers) {
        const result = diceNumbers.every(element => {
          if (element.value === diceNumbers[0].value && element.isHeld === true) {
            return true;
          }
        });
      
        return result;
      } 
    function allNewDice (){
        const randomNumbers = Array.from({length: 10}, () => Math.floor(Math.random() * 7));
            const diceObject = randomNumbers.map((number)=>{
                 return {
                    value: number,
                    isHeld: false,
                    id: nanoid(),
                 }
            })
    
            console.log("dice functin running")
            
            return diceObject;
    }
    
    const dices = diceNumbers.map((item)=>{
        return(<Die value={item.value} isHeld={item.isHeld} holding={()=>holdDice(item.id)}></Die>)
    })
    function holdDice(id) {
        // const newArray =diceNumbers;
        // newArray.map((item)=>{
        //     if(item.id=== id)
        //     {
        //         item.isHeld=true;
        //     }
        // })
        // setDiceNumbers(newArray);
        // console.log(diceNumbers)
        setDiceNumbers(prevDiceNumbers=> prevDiceNumbers.map(die=>{
            return die.id ===id ? {...die, isHeld: !die.isHeld} : die
        }))
        
    }
    function resetDice() {
       
        if(tenzies)
        { setTenzies(false)
            setDiceNumbers(allNewDice)}
         setDiceNumbers(prevDiceNumbers=> prevDiceNumbers.map(die =>{
             return die.isHeld ? die : { ...die, value : Math.floor(Math.random() * 7)}
        }))
    }
    return (
        <div className="box">
            <div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className="row1">
            {dices}
                
            </div>
            <button className="rollBtn" onClick={resetDice}>{tenzies ? "New Game": "Roll"}</button>  
            {tenzies && <Confetti></Confetti>}
          
            
        </div>
    )
}