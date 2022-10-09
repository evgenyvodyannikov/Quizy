import React from 'react';
import styles from './Result.module.scss'

export const Result = ({correct, length}) => {
    return (
      <div className={styles.result}>
        <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
        <h2>Ваш результат {correct} из {length}</h2>
        <a href="/">
        <button>Попробовать снова</button>
        </a> 
      </div>
    );
  }