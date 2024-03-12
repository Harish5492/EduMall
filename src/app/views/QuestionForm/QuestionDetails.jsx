import React from 'react'
import PaginationTable from '../material-kit/tables/PaginationTable'
import AppTable from '../material-kit/tables/AppTable'
import AppSnackbar from '../material-kit/snackbar/AppSnackbar'
import { useState, useEffect } from "react";
import { Button } from '@mui/material'
import McqForm from './QuestionForm';
import "./Detail.css"
import { SubDetail, questionById, updateQuestion } from '../ApiBackend/ApiBackend';
import { useSelector } from 'react-redux';
import { Questions } from '../ApiBackend/ApiBackend';
import EditQuesModal from './EditQuestionModal/EditQuesModal';


const QuestionDetails = () => {
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setEditForm] = useState(false);
    const [subDetail, setSubDetail] = useState([]);
    const token = useSelector((state) => state.authToken);
    const [updating, setUpdating] = useState(false);
    const [selected, setSelected] = useState({})
    const showFormModal = () => {
        console.log("show form modal");

        setShowForm(true);
    }
    const closeFormModal = () => {

        setShowForm(false);
    }
    const closeEditModal = () => {

        setEditForm(false);
    }
    const fetchSubject = async () => {
        try {
            const response = await SubDetail(token);
            console.log("this is repsosne from allQues api", response);
            setSubDetail(response.data.questions);
            console.log("this is data .response", response)
        }
        catch (error) {
            console.error("Error fetcing requests,", error);
        }
    }
    const handleSubmit = async (values) => {
        setUpdating(true);
        const res = await Questions(token, values);
        setTimeout(() => {
            setUpdating(false);
        }, 1000);
        return res;
    }
    const handleUpdate = async (id, values) => {
        setUpdating(true);
        const res = await updateQuestion(token, id, values);
        setTimeout(() => {
            setUpdating(false);
        }, 1000);
        return res;
    }
    const onSelected = async (id) => {
        console.log("i am in onSelected", id);

        try {
            const response = await questionById(token, id);
            if (response.data.status) {
                console.log("i am in onSelected finding quesytion", response.data.questions);

                setSelected(response.data.questions);
                setEditForm(true);
            }
            else {
                console.log("error in fetching data", response.data.message);
            }



        }
        catch (error) {
            console.log("error in fetching data", error);
        }
    }
    useEffect(() => {

        fetchSubject();
    }, []);

    return (
        <div className='container'>
            <div>




                <div className="detailes">
                    <div className='ques_form'>
                        <div className='add_ques_btn'>

                            <button className=' add_question' onClick={showFormModal}>Add Question</button>
                        </div>
                        <PaginationTable onSelected={onSelected} isUpdate={updating} className="pag_table" />


                    </div>
                    <div>
                        <EditQuesModal data={selected} formisOpen={showEditForm} formonClose={closeEditModal} handleEdit={handleUpdate} />
                    </div>
                    <div>


                        <McqForm handleSubmit={handleSubmit} formisOpen={showForm} formonClose={closeFormModal} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default QuestionDetails