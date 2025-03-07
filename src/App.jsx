import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [p1Score, setP1Score] = useState(0)
    const [p2Score, setP2Score] = useState(0)
    const [p1Word, setp1Word] = useState('')
    const [p2Word, setp2Word] = useState('')
    const [player1, setplayer1] = useState([])
    const [player2, setplayer2] = useState([])
    const [p1Msg, setP1msg] = useState("")
    const [p2Msg, setP2msg] = useState("")

    const error_missmatch = "Error: Word needs to start with "
    const error_length = "Word has to be of 4 length"
    const error_repeat = "No repeating words allowed"
    const error_invalid = "Not a word!"

    const enter = async (player) => {

        var nextInput = player == 1 ? document.querySelector(`input[name=player2]`) : document.querySelector(`input[name=player1]`)
        var currInput = player == 1 ? document.querySelector('input[name=player1]') : document.querySelector('input[name=player2]') 

        var last = player == 1 ? p2Word : p1Word
        var curr = player == 1 ? p1Word : p2Word

        var lastChar = last == '' ? null : last.charAt(last.length - 1)
        var firstChar = curr.charAt(0)

        if (lastChar && lastChar != firstChar) {
            player == 1 ? setP1msg(error_missmatch + lastChar) : setP2msg(error_missmatch + lastChar)
            console.log('returned')
            return
        } else if (curr.length < 4) {
            player == 1 ? setP1msg(error_length) : setP2msg(error_length)
            return
        } else if (player1.includes(curr) || player2.includes(curr)) {
            player == 1 ? setP1msg(error_repeat) : setP2msg(error_repeat)
            return
        }
        

        var res = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${curr}`
        )
        if (res.ok) {
            if (player == 1) {
                setplayer1([...player1, curr])
                setP1Score(p1Score + 1)
            } else {
                setplayer2([...player2, curr])
                setP2Score(p2Score + 1)
            }
            currInput.value = ""
            nextInput.focus()
            nextInput.placeholder = curr.charAt(curr.length - 1)
        } else {
            player == 1 ? setP1msg(error_invalid) : setP2msg(error_invalid)
            console.log('not a word')
            return
        }

        setP1msg('')
        setP2msg('')

        console.log(p1Word)
        console.log(p2Word)

        console.log('player1', player1)
        console.log('player2', player2)
    }

    return (
        <>
            <div className='row'>
                <div className='col'>
                    <span>Score: {p1Score}</span>
                    <input className='row' name='player1'
                        onKeyDown={async (e) => { if (e.key == "Enter") enter(1) }}
                        onChange={(e) => setp1Word(e.target.value)}
                    ></input>
                    <span className='row'>{p1Msg}</span>
                    <ul className='row'>
                        {player1.map((item) => (
                            <li>{item}</li>
                        )
                        )}
                    </ul>
                </div>
                <div className='col'>
                    <span>Score: {p2Score}</span>

                    <input className='row' name='player2'
                        onKeyDown={async (e) => { if (e.key == "Enter") enter(2) }}
                        onChange={(e) => setp2Word(e.target.value)}
                    ></input>
                    <span className='row'>{p2Msg}</span>
                    <ul className='row'>
                        {player2.map((item) => (
                            <li>{item}</li>
                        )
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}


export default App
