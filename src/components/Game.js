import React from 'react';
import '../style.css';
import { Board } from './Board'

export class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true
        }
    }
    
    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }
    
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (squares[i] === null && !calculateWinner(squares)) {
            squares[i] = this.state.xIsNext ? 'X': 'O'
            this.setState({
                history: history.concat([{
                    squares: squares,
                }]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext,
            });
        }
    }
    
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares)
        
        const moves = history.map((step, move) => {
            const desc = move ? 'Ir à jogada ' + move : 'Ir pro início do jogo';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })
        
        
        let status;
        if (winner){
            status = 'Vencedor: ' + winner
        } else{
            status = 'Próximo player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}