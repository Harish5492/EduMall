import React, { useState, useEffect } from "react";
import "./QuestionAnswers.scss";
import { AllQuestions, SubmitAnswers } from "../../Api";
import { useSelector } from "react-redux";
<<<<<<< HEAD
=======
import { useParams } from 'react-router-dom'; // Import useParams

>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f

const QuestionAnswers = () => {
    const token = useSelector((state) => state.user.token);
    const [questions, setQuestions] = useState([]);
<<<<<<< HEAD
    const [result, setResult] = useState(null); 
=======
    const [result, setResult] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [showPage, setShowPage] = useState(false)
    const { subject } = useParams();
    console.log(questions,"questions");

>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f

    useEffect(() => {
        const fetchData = async () => {
            try {
<<<<<<< HEAD
                const res = await AllQuestions(token);
                console.log(res.data);
                setQuestions(res.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchData();
    }, [token]);

    const handleOptionChange = (e, questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].selectedOption = e.target.value;
        setQuestions(updatedQuestions);
    };

=======
                const resp = await AllQuestions(subject, token); 
                console.log("All questions for subject:", subject, resp.data);
                setQuestions(resp.data.questions);
            } catch (error) {
                console.error("Error fetching questions for subject:", subject, error);
            }
        };
        fetchData();
    }, [subject,token]);

    const handleOptionChange = (e) => {
        const newIndex = parseInt(e.target.value, 10); 
        setSelectedOptionIndex(newIndex);
            const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].selectedOptionIndex = newIndex;
        setQuestions(updatedQuestions);
    };

    const handleNext = () => {
        if (selectedOptionIndex !== null) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            setSelectedOptionIndex(null);
        }
    };

>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
    const handleSubmit = async () => {
        try {
            const responses = questions.map((question) => ({
                questionId: question._id,
<<<<<<< HEAD
                selectedOptionIndex: question.options.indexOf(question.selectedOption)
=======
                selectedOptionIndex: question.selectedOptionIndex !== undefined ? question.selectedOptionIndex : -1
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
            }));
            const submissionData = {
                responses: responses
            };
<<<<<<< HEAD
            const response = await SubmitAnswers(token, submissionData);
            setResult(response.data);
            console.log("Submission response:", response);
=======
            const response = await SubmitAnswers(token, submissionData,subject);
            setResult(response.data);
            setShowPage(true);
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
        } catch (error) {
            console.error("Error submitting answers:", error);
        }
    };
<<<<<<< HEAD

    return (
        <div className="container">
            <div className="quiz_container">
                {questions && questions.map((question, index) => (
                    <div key={index}>
                        <h1>{index + 1}. {question.questionText}</h1>
                        <div className="options">
                            {question.options.map((option, optionIndex) => (
                                <label key={optionIndex}>
                                    {String.fromCharCode(65 + optionIndex)}.
                                    <input
                                        type="radio"
                                        name={`question${index}`}
                                        value={option}
                                        onChange={(e) => handleOptionChange(e, index)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="result">
            <button className="submit_answers" onClick={handleSubmit}>Submit</button>
            {result && ( 
                <div className="answers">
                    <p>Your Score: {result.score}</p>
                    <p>Total Questions: {result.totalQuestions}</p>
                    <p>Percentage: {result.percentage}%</p>
                </div>
            )}
            </div>
=======
    
    
    return (
        <div className="container">
            {showPage === false ? (
                <>
                    <div className="question_header">
                        <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
                    </div>
                    <div className="quiz_container">
                        {questions.length > 0 && currentQuestionIndex < questions.length && (
                            <div key={currentQuestionIndex}>
                                <h1>{currentQuestionIndex + 1}. {questions[currentQuestionIndex].questionText}</h1>
                                <div className="options">
                                    {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                                        <label key={optionIndex}>
                                            {String.fromCharCode(65 + optionIndex)}.
                                            <input
                                                type="radio"
                                                name={`question${currentQuestionIndex}`}
                                                value={optionIndex} 
                                                onChange={handleOptionChange}
                                                checked={selectedOptionIndex === optionIndex}
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                                
                                {currentQuestionIndex !== questions.length - 1 && (
                                    <button className="next_button" onClick={handleNext}>Next &#x276F;</button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="result">
                        {currentQuestionIndex === questions.length - 1 && (
                                <button className="submit_answers" onClick={handleSubmit}>Submit</button>
                        )}
                    </div>
                </>
            ) : (
                <>
                    {result && (
                        <div className="answers animate__animated animate__swing">
                            <h1>Result</h1>
                            <p>Your Score: {result.score}</p>
                            <p>Total Questions: {result.totalQuestions}</p>
                            <p>Percentage: {result.percentage}%</p>
                            {result.percentage < 50 ? (
                                <p className="warn">You must study much harder!</p>
                            ) : (
                                <p className="success">You are on a good track.</p>
                            )}
                        </div>
                    )}
                </>
            )}
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
        </div>
    );
};

export default QuestionAnswers;
