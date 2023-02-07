import React, { useState } from 'react';
import './App.css';


const initialBoard = [  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];



function App() {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [redWins, setRedWins] = useState(0);
  const [yellowWins, setYellowWins] = useState(0);
  const [isWin, setIsWin] = useState(null);

  const resetBoard = (board) => {

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = null;
      }
    }
    setBoard(board);
      

    setIsWin(null);
  };

  const handleClick = (columnIndex) => {
    const newBoard = [...board]; 
    if(isWin === 'red' || isWin === 'yellow' || isWin === 'tie'){
      resetBoard(board);
    } else {
      for (let rowIndex = 5; rowIndex >= 0; rowIndex--) {
        if (!newBoard[rowIndex][columnIndex]) {
          newBoard[rowIndex][columnIndex] = currentPlayer;
          setBoard(newBoard);
          checkForWin(newBoard, rowIndex, columnIndex, currentPlayer);
          if (isWin == null) {
            checkForTie(newBoard);
          }
          setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
          break;
        }
      }
    }

    
  };

  const checkForWin = (board) => {
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        const cell = board[rowIndex][columnIndex];
        if (cell) {
          // Check horizontal win
          if (columnIndex <= 3 &&
              board[rowIndex][columnIndex + 1] === cell &&
              board[rowIndex][columnIndex + 2] === cell &&
              board[rowIndex][columnIndex + 3] === cell) {
                if (cell === 'red') {
                  setRedWins(redWins + 1);
                                           
                } else {
                  setYellowWins(yellowWins + 1);
                                
                }
                setIsWin(currentPlayer);
                return;
          }
          // Check vertical win
          if (rowIndex <= 2 &&
              board[rowIndex + 1][columnIndex] === cell &&
              board[rowIndex + 2][columnIndex] === cell &&
              board[rowIndex + 3][columnIndex] === cell) {
                if (cell === 'red') {
                  setRedWins(redWins + 1);
                                           
                } else {
                  setYellowWins(yellowWins + 1);
                                
                }
                setIsWin(currentPlayer);
                return;
                
              }
              // Check diagonal win (top left to bottom right)
              if (rowIndex <= 2 && columnIndex <= 3 &&
                  board[rowIndex + 1][columnIndex + 1] === cell &&
                  board[rowIndex + 2][columnIndex + 2] === cell &&
                  board[rowIndex + 3][columnIndex + 3] === cell) {
                    if (cell === 'red') {
                      setRedWins(redWins + 1);
                                               
                    } else {
                      setYellowWins(yellowWins + 1);
                                    
                    }
                    setIsWin(currentPlayer);
                    return;
                    
              }
              // Check diagonal win (top right to bottom left)
              if (rowIndex <= 2 && columnIndex >= 3 &&
                  board[rowIndex + 1][columnIndex - 1] === cell &&
                  board[rowIndex + 2][columnIndex - 2] === cell &&
                  board[rowIndex + 3][columnIndex - 3] === cell) {
                    if (cell === 'red') {
                  setRedWins(redWins + 1);
                                           
                } else {
                  setYellowWins(yellowWins + 1);
                                
                }
                setIsWin(currentPlayer);
                return;
                  
            }
          }
        }
      }
    };

    const checkForTie = (board) => {
      for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
          if (!board[rowIndex][columnIndex]) {
            return false;
          }
        }
      }
      setIsWin('tie');
      // display message for tie game
    };

  return (
    <body>
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((column, columnIndex) => (
                <td
                    key={columnIndex}
                    className={column === 'red' ? 'red' : column === 'yellow' ? 'yellow' : ''}
                    onClick={() => {
                      handleClick(columnIndex);
                    }}
                  >
                    {column}
              
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
        {isWin === 'red' || isWin === 'yellow' ? (
        <div className="win-message">
          {isWin === 'red' ? "Red Wins!" : "Yellow Wins!"}
        </div> ) : null}
        {isWin === 'tie' ? (
        <div className="win-message">
          Tie game!
        </div> ) : null}
      <div className="scoreboard">
        <div className='game-info'>
          <div className="redp player-content">Red: {redWins}</div>
          <div className="yellowp player-content">Yellow: {yellowWins}</div>
        </div>
      </div>
    </body>
  );
}


export default App;