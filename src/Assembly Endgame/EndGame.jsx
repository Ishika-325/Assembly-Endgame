import Head from "./Heading"
import Status from "./Status"
import "./styleee.css"
import { languages } from "./languages"
import {useState} from "react"
import {nanoid} from "nanoid"
import clsx from 'clsx'
import Confetti  from 'react-confetti'
import { ListWords } from "./List"
export default function EndGame() {


    const [word , setWord] = useState(()=>ListWords())
    const [guess , setguess] = useState([])

    const wrongCount = guess.filter(arr => !word.includes(arr)).length


    const languageEle = languages.map((language, index) => {
       const isLost = index<wrongCount 
       const styles = {
             backgroundColor:language.backgroundColor,
             color:language.color, 
             opacity: isLost ? '0.3' : '1'
       }
    
    return(
        <span className="langchip" style={styles} key={language.name}>{language.name}</span>
    )})


    const gameWon =  word.split("").every(prev => guess.includes(prev)) 
    const gameLost = wrongCount>=8
    const gameOver = gameWon || gameLost 
    const LastGuess = guess[guess.length-1]
    const isLastGuessIncorrect = LastGuess && !word.includes(LastGuess)

    

     const alphabet = "abcdefghijklmnopqrstuvwxyz"


    const words = word.split("").map(letter => {
        const letterclass = clsx("box" , gameLost && !guess.includes(letter) && 'miss')
        return(
        <span key={nanoid()} className={letterclass}>{(gameLost||guess.includes(letter))? letter.toUpperCase() : " "}</span>
    )})

    const letter = alphabet.split("").map(lett => {


        const isGuess = guess.includes(lett) 
        const isCorrect = isGuess && word.includes(lett)
        const isWrong = isGuess && !word.includes(lett)
        const className = `alpha + ${clsx({
            correct: isCorrect,
            wrong: isWrong
    })}`

        return(

        <button onClick={() => clicked(lett)} disabled={gameOver} key={lett} className={className} aria-disabled={guess.includes(lett)}
        aria-label={`Letter ${lett}`}>{lett.toUpperCase()}</button>
    ) }
    )


    

    function clicked(lett) {
        setguess(prev => 
            prev.includes(lett)?prev:[...prev , lett]
        )

    }

    function restart(){
        setWord(ListWords())
        setguess([])
    }

    

   




    return(
        <main id="main">
            <Head />
            <Status  gameWon={gameWon} gameLost={gameLost} gameOver={gameOver} wrongCount={wrongCount} isLastGuessIncorrect ={isLastGuessIncorrect}/>
            <div id="languageBlock">
                {languageEle}
            </div>
            <div id="letterbox">
                 {words}
            </div>
            <div className="keyboard">
                {letter}
            </div>
            {gameOver && <button onClick={restart} id="new">New Game</button>}

            {gameWon && <Confetti />}

             {/* Combined visually-hidden aria-live region for status updates */}
             <section 
                className="sr-only" 
                aria-live="polite" 
                role="status"
            >
                <p>
                    {word.includes(LastGuess) ? 
                        `Correct! The letter ${LastGuess} is in the word.` : 
                        `Sorry, the letter ${LastGuess} is not in the word.`
                    }
                    You have {8 - wrongCount} attempts left.
                </p>
                <p>Current word: {word.split("").map(letter => 
                guess.includes(letter) ? letter + "." : "blank.")
                .join(" ")}</p>
            
            </section>
        </main>
    )
}