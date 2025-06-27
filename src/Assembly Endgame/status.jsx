import { languages } from "./languages"
import { getFarewellText } from './utils'

export default function Status(props) {
  

    function main(){
        if(!props.gameOver && props.isLastGuessIncorrect){
            return(
                <div className="showmsg" style={{backgroundColor: "rgb(173, 71, 173)" , color: '#D9D9D9'}}>
                    <p>{getFarewellText(languages[props.wrongCount-1].name)}</p>
                </div>
            )
        }


        if(props.gameOver){
        if(props.gameWon){
            return(
                <div className="showmsg" style={{backgroundColor: "green"}}>
                    <h2>You Win</h2>
                    <p>Congratulations! Well done </p>

                </div>
            )
         }

         else if(props.gameLost){
            return(
                <div className="showmsg" style={{backgroundColor: "red" , color:"white"}}>
                    <h2>You Lose</h2>
                    <p>Go back to learn Assembly</p>

                </div>
            )
        }

       }
    }
   


    return(
        <div id='stat'>
            {main()}
        </div>
    )
}