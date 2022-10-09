import React from 'react';
import './index.scss';

import { Game } from './components/Game'
import { Result } from './components/Result'

let questions = [
  {
  title: 'Вы готовы?',
  variants: [
    'Да',
    'Нет',
  ],
  correct: 0,
},
];

const SetQuestions = (data) => {
  data.map((obj) =>
  {
    questions.push(
      {
        title: obj.question,
        variants: (Object.values(obj.answers)).filter(Boolean),
        correct: (Object.values(obj.correct_answers)).findIndex(i => i == "true")
      }
    )
  })
}

const App = () => {

  var url = new URL('https://quizapi.io/api/v1/questions');
  var params = [['apiKey', 'F2vPTpqtEbEd9489JM5TeVayeUohhXF5hbnXw2iS'], ['limit', '9']]; // , ['category', 'Linux']

  url.search = new URLSearchParams(params).toString();
  React.useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      SetQuestions(data);
    })
    .catch("Ошибка получения данных с сервера.\nПерезагрузите страницу.")
  }, []);

  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const question = questions[step];
  const onClickVariant = (index) => {
      if(question.correct == index){
        setCorrect(correct + 1)
      } 
      setStep(step + 1);
  }

  return (
    <div className="App">
      {
      step != questions.length ? (
        <Game step={step} question={question} onClickVariant={onClickVariant} questions={questions}/>
        ) : (
        <Result correct={correct} length={questions.length}/>
        )}
    </div>
  );
}

export default App;
