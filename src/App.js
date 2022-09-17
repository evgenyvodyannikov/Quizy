import React from 'react';
import './index.scss';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

const Result = ({correct}) => {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Ваш результат {correct} из {questions.length}</h2>
      <a href="/">
      <button>Попробовать снова</button>
      </a> 
    </div>
  );
}

const Game = ({ step, question, onClickVariant }) => {
  const percent = Math.round(step / questions.length * 100);

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percent}%` }} className="progress__inner"></div>
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

const App = () => {

  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const question = questions[step];

  const onClickVariant = (index) => {
      if(question.correct == index){
        setCorrect(correct + 1)
      } 
      setStep(step + 1);
  }


  var url = new URL('https://quizapi.io/api/v1/questions');

  var params = [['apiKey', 'F2vPTpqtEbEd9489JM5TeVayeUohhXF5hbnXw2iS'], ['limit', '5'], ['category', 'Linux']];

  url.search = new URLSearchParams(params).toString();
  React.useEffect(() => {
    fetch(url).then(res => res.json()).then((json) => {
      console.log(json);
    })
  }, []);
  

  return (
    <div className="App">
      {
      step != questions.length ? (
        <Game step={step} question={question} onClickVariant={onClickVariant} />
        ) : (
        <Result correct={correct}/>
        )}
    </div>
  );
}

export default App;
