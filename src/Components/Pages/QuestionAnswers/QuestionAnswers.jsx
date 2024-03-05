import React, { useState, useEffect } from "react";
import "./QuestionAnswers.scss";
import { AllQuestions, SubmitAnswers } from "../../Api";
import { useSelector } from "react-redux";

const QuestionAnswers = () => {
    const token = useSelector((state) => state.user.token);
    const [questions, setQuestions] = useState([]);
    const [result, setResult] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
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

    const handleSubmit = async () => {
        try {
            const responses = questions.map((question) => ({
                questionId: question._id,
                selectedOptionIndex: question.options.indexOf(question.selectedOption)
            }));
            const submissionData = {
                responses: responses
            };
            const response = await SubmitAnswers(token, submissionData);
            setResult(response.data);
            console.log("Submission response:", response);
        } catch (error) {
            console.error("Error submitting answers:", error);
        }
    };

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
        </div>
    );
};

export default QuestionAnswers;
