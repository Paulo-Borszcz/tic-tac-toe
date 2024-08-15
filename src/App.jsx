import React, { useEffect, useState } from 'react'
import styles from './App.module.css';
import { Modal } from './components/Modal';

export function App() {
        const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        const [player, setPlayer] = useState(1);
        const [isOpen, setIsOpen] = useState(false);
        const [winningCombo, setWinningCombo] = useState(null);
        const [message, setMessage] = useState('');
        const winnerCombinations = [
                // Horizontal
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                // Vertical
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                // Diagonal
                [0, 4, 8], [2, 4, 6]
        ];

        const handleClick = (clickedIndex) => {
                setGameData((prev) => {

                        if (gameData[clickedIndex] !== 0) return prev;
                        if (winningCombo) return prev;

                        const newGameData = [...prev];
                        newGameData[clickedIndex] = player;
                        return newGameData;
                })
                setPlayer((prev) => prev === 1 ? 2 : 1);
        }
        const checkWinner = () => {
                let winner = null;
                for (let values of winnerCombinations) {
                        if (
                                gameData[values[0]] === 1 &&
                                gameData[values[1]] === 1 &&
                                gameData[values[2]] === 1
                        ) {
                                winner = 'player 1';
                        }
                        if (
                                gameData[values[0]] === 2 &&
                                gameData[values[1]] === 2 &&
                                gameData[values[2]] === 2
                        ) {
                                winner = 'player 2';
                        }
                        if (winner) {
                                setWinningCombo(values);
                                break;
                        }
                }
        }

        const checkGameEnded = () => {
                if (gameData.every((value) => value !== 0)) {
                        setTimeout(() => {
                                setMessage('Houve um Empate!');
                                setIsOpen(true);
                        }, 200);
                }
        }

        useEffect(() => {
                checkWinner();
                checkGameEnded();
        }, [gameData])

        useEffect(() => {
                if (winningCombo) {
                        setTimeout(() => {
                                setMessage(`O vencedor é ${gameData[winningCombo[0]] === 1 ? 'Jogador 1' : 'Jogadors 2'}`);
                                setIsOpen(true);
                        }, 200);
                }
        }, [winningCombo])

        return (
                <div className={styles.container}>
                        <h1 className={styles.title}>Jogo da Velha</h1>
                        <div className={styles.tictactoe}>
                                {gameData.map((value, index) => (
                                        <div onClick={() => handleClick(index)} className={styles.cell} key={index}>
                                                {value === 1 && '❌'}
                                                {value === 2 && '⭕'}
                                        </div>
                                ))}
                        </div>
                        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                                <span className={styles.message}>{message}</span>
                                <button className={styles.button} onClick={() => {
                                        setIsOpen(false);
                                        setWinningCombo(null);
                                        setGameData([0, 0, 0, 0, 0, 0, 0, 0, 0]);
                                }}>Jogar Novamente</button>
                        </Modal>
                        <button className={styles.button} style={{ backgroundColor: '#f9f9f9' }} onClick={() => {
                                setGameData([0, 0, 0, 0, 0, 0, 0, 0, 0]);
                                setWinningCombo(null);
                                setPlayer(1);
                        }}>Reiniciar</button>
                </div>
        )
}
