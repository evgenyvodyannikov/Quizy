import React from 'react';
import styles from './Game.module.scss'

export const Game = ({ step, question, onClickVariant, questions }) => {
    const percent = Math.round(step / questions.length * 100);
  
    return (
      <>
        <div className={styles.Game}>
          <div style={{ width: `${percent}%` }} className={styles.progress__inner}></div>
        </div>
        <h1>{question.title}</h1>
        <ul>
          {
            question.variants.map((text, index) => 
            <li 
            key={index} 
            onClick={() => onClickVariant(index)}>
            {text}
            </li>)
          }
        </ul>
      </>
    );
  }
  