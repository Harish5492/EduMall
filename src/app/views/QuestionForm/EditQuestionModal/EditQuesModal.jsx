import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Modal } from 'react-bootstrap';
import { IoCloseSharp } from "react-icons/io5";
import * as Yup from 'yup';
import "./EditQuesModal.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from 'react-redux';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { MenuItem, Select } from '@mui/material';
import { updateQuestion } from 'app/views/ApiBackend/ApiBackend';

const EditQuesModal = ({ data, formisOpen, formonClose, isUpdate, handleEdit }) => {

    const token = useSelector((state) => state.authToken);
    const [loading, setLoading] = useState(false);

    const initialValues = {
        questionText: '',
        options: ['', '', '', ''],
        correctOptionIndex: '',
        subject: ''
    };

    const subjects = ["Java", "Solidity", "Reactjs", "Web3js", "HTML", "CSS", "Nextjs", "JavaScript"];

    const validationSchema = Yup.object().shape({
        questionText: Yup.string().required('Question text is required'),
        options: Yup.array().of(Yup.string().required('Option is required')).min(4, 'At least 4 options are required'),
        correctOptionIndex: Yup.number().required('Correct option index is required').min(0, 'Index must be between 0 and 3').max(3, 'Index must be between 0 and 3'),
        subject: Yup.string().required('Subject text is required'),

    });

    const onSubmit = async (values, actions) => {

        console.log("this is patch", data._id, "Vslurs ", values);
        setLoading(true);

        // const res = await updateQuestion(token, id, values);
        const res = await handleEdit(data._id, values);
        // const res = await Questions(token, values);
        if (res.status === 200) {
            setTimeout(() => {
                formonClose();
            }, 2000);
        }

        // toast.success("Questions Added Successfully", {
        //     position: "top-center",
        //     autoClose: 1000,
        //     theme: "colored"
        // })

        // // }
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        // actions.resetForm({
        //     values: initialValues,
        //     errors: {},
        //     touched: {},
        //     isSubmitting: false,
        // });

    };



    return (
        <> {data &&
            <Modal show={formisOpen} onHide={formonClose} centered className='Ques_modal'>
                <Modal.Header>
                    <Modal.Title>Edit Form</Modal.Title>
                    <IoCloseSharp onClick={formonClose} style={{ cursor: 'pointer' }} />
                </Modal.Header>
                <Modal.Body>
                    <div className="outerWin">
                        <div className="mcq-form">
                            {/* <h1 className='mcq_head'></h1> */}
                            <Formik
                                initialValues={{ ...initialValues, ...data }}
                                enableReinitialize={true}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {formik => (
                                    <div className="ques_form">
                                        <Form>
                                            <div className="form-group">
                                                <label htmlFor="questionText" className='ques_field'>Question Text: </label>
                                                <Field type="text" id="questionText" name="questionText" className="form-control" />
                                                <ErrorMessage name="questionText" component="div" className="error-message" />
                                            </div>

                                            <div className="form-group">
                                                <label className='ques_field'>Options: </label>
                                                {formik.values.options.map((option, index) => (
                                                    <ol start={index} key={index} className="">
                                                        <li >
                                                            <Field type="text" name={`options[${index}]`} className="form-control" />
                                                            <ErrorMessage name={`options[${index}]`} component="div" className="error-message" />
                                                        </li>
                                                    </ol>
                                                ))}
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="correctOptionIndex" className='ques_field'>Correct Option Index: </label>
                                                <Field type="number" id="correctOptionIndex" name="correctOptionIndex" className="form-control" />
                                                <ErrorMessage name="correctOptionIndex" component="div" className="error-message" />
                                            </div>
                                            {/* <div className="form-group">
                                                <label htmlFor="subject" className='ques_field'>Subject: </label>
                                                <Field type="text" id="subject" name="subject" className="form-control" />
                                                <ErrorMessage name="subject" component="div" className="error-message" />
                                            </div> */}
                                            <div className="form-group">
                                                <label htmlFor="subject" className='ques_field'>Subject: </label>
                                                <Field
                                                    // as={Select}  // Render a Select element
                                                    id="subject"
                                                    name="subject"
                                                    className="form-control"
                                                    disabled={true}
                                                    label="Subject"
                                                >
                                                </Field>
                                                <ErrorMessage name="subject" component="div" className="error-message" />
                                            </div>

                                            <div className='sub_btn'>

                                                <LoadingButton
                                                    className='sub_btnn'
                                                    type="submit"
                                                    disabled={!formik.isValid || formik.isSubmitting}
                                                    color="primary"
                                                    loading={loading}
                                                    variant="contained"
                                                    sx={{ my: 2 }}>
                                                    Save Details
                                                </LoadingButton>
                                            </div>
                                        </Form>
                                    </div>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        }
            <ToastContainer />
        </>
    )
};

export default EditQuesModal;