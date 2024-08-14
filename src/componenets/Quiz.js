import axios from 'axios';
import './all.css';
import React, { useEffect, useState } from 'react';
import { firestore_database } from '../Firebase';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';


const Quiz = () => {
     const location=useLocation()
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
    const [options, setOptions] = useState([]);
    const [compelete, set_compelete] = useState(false)
    const [fetched_data, set_fetched_data] = useState([])
    const [quiz_diff,set_quiz_diffi] = useState(location.state.selectedDifficulty)
    const [quiz_cate,set_quiz_cate]= useState(location.state.selectedCategory)
   

    useEffect(() => {
        fetchQuestions();
        getData()
    }, []);


    useEffect(() => {
        if (questions.length > 0) {
            const currentQuestion = questions[currentQuestionIndex];
            const newOptions = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
            setOptions(newOptions);
        }
    }, [questions, currentQuestionIndex]);


    const fetchQuestions = () => {
        axios.get(`https://opentdb.com/api.php?amount=10&category=${quiz_cate}&difficulty=${quiz_diff}&type=multiple`)
       
        .then(response => {
                setQuestions(response.data.results);
            })
            .catch(err => {
                console.log(err);
            });
    };


    const getData = async () => {
        const q = query(collection(firestore_database, 'game_data'), where('uid', "==", localStorage.getItem('uid')))
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        set_fetched_data(data)
    }



    const handleOptionClick = (option) => {
        setSelectedAnswer(option);
    };


    const handleNextClick = () => {
        const currentQuestion = questions[currentQuestionIndex];
        if (currentQuestion.correct_answer === selectedAnswer && correctAnswerCount < questions.length) {
            setCorrectAnswerCount(correctAnswerCount + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer('');
        }

        if (currentQuestionIndex == questions.length - 1) {
            set_compelete(true)
        }
    };


   const AddData = async () => {
    if (correctAnswerCount === 10) {
        fetched_data[0].star = (fetched_data[0].star || 0) + 3;
    } else if (correctAnswerCount >= 6) {
        fetched_data[0].star = (fetched_data[0].star || 0) + 2;
    } else if (correctAnswerCount >= 4) {
        fetched_data[0].star = (fetched_data[0].star || 0) + 1;
    }

    let newLevel = fetched_data[0].level || 'Beginner';
    let newStarForNextLevel = fetched_data[0].star_for_next_level || 50;

    if (fetched_data[0].star >= 200) {
        newLevel = 'Grandmaster';
        newStarForNextLevel = 200; // Grandmaster level threshold
    } else if (fetched_data[0].star >= 150) {
        newLevel = 'Master';
        newStarForNextLevel = 200;
    } else if (fetched_data[0].star >= 100) {
        newLevel = 'Legend';
        newStarForNextLevel = 150;
    } else if (fetched_data[0].star >= 50) {
        newLevel = 'Epic';
        newStarForNextLevel = 100;
    } else if (fetched_data[0].star >= fetched_data[0].star_for_next_level) {
        newLevel = 'Pro';
        newStarForNextLevel = 50;
    }

    if (fetched_data.length > 0) {
        const data_ref = doc(firestore_database, 'game_data', fetched_data[0].id);
        await updateDoc(data_ref, {
            total_quest: (fetched_data[0].total_quest || 0) + questions.length,
            corret_quest: (fetched_data[0].corret_quest || 0) + correctAnswerCount,
            star: fetched_data[0].star,
            level: newLevel,
            star_for_next_level: newStarForNextLevel
        })
            .then(() => {
                alert('Data Updated');
                navigate('/profile');
            })
            .catch(err => {
                console.log('Error updating document:', err);
            });
    } else {
        console.log('No data found to update');
    }
};
    

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="quiz-container">
                {questions.length > 0 && (
                    <div className="question-block">
                        <p className="question">{questions[currentQuestionIndex].question}</p>
                        <ul className="options">
                            {options.map((option, index) => (
                                <li
                                    key={index}
                                    className={`option ${selectedAnswer === option ? 'selected' : ''}`}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {!compelete &&
                    <button className="next-button" onClick={handleNextClick}>
                        Next
                    </button>
                }

                {compelete &&
                    <button className="next-button" onClick={AddData}>
                        Submit
                    </button>
                }
                <p>{currentQuestionIndex + 1} of {questions.length} questions</p>
                <p>Correct Answers: {correctAnswerCount}</p>
            </div>
        </div>
    );
};

export default Quiz;
