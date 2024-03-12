import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { allQuestions, deleteQuestion } from "app/views/ApiBackend/ApiBackend";
// import { use } from "echarts";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./PaginationTable.css";
import { LoadingButton } from "@mui/lab";
import EditQuesModal from "app/views/QuestionForm/EditQuestionModal/EditQuesModal";
import { indexOf } from "lodash";


// import { Button } from "react-bootstrap";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 30, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 30, width: "fit-content" } },
  },
}));



const PaginationTable = ({ onSelected, isUpdate }) => {
  const [page, setPage] = useState(0);
  const token = useSelector((state) => state.authToken);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [questions, setQuestions] = useState({});

  // const fetchQUestions = async () => {
  //   try {
  //     const response = await allQuestions(token);
  //     console.log("this is repsosne from allQues api", response);
  //   }
  //   catch (error) {
  //     console.error("Error fetcing requests,", error);
  //   }
  // }

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleDelete = async (_id) => {
    console.log("this is _id", _id);
    try {
      const response = await deleteQuestion(token, _id);
      console.log("this is repsosne from delete api", response);
      fetchQUestions();
    }
    catch (error) {
      console.error("Error fetcing requests,", error);
    }

  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const fetchQUestions = async () => {
    try {
      const response = await allQuestions(token);
      console.log("this is repsosne from allQues api", response);
      let quuesArray = response.data.questions.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB - dateA;
      });
      console.log("this isresponse", quuesArray)
      setQuestions(response.data.questions);
      console.log("this is data .response", response.data.questions)
      console.log("this is data .response", response.data.questions?.length)
    }
    catch (error) {
      console.error("Error fetcing requests,", error);
    }
  }


  useEffect(() => {

    fetchQUestions();
  }, [isUpdate]);

  return (
    <div className="main_body">
      <Box width="100%" overflow="auto" className="quesTable_container">
        <StyledTable className="tb_ques">
          <TableHead>
            <TableRow>
              {/* <TableCell align="left">S.No</TableCell> */}
              <TableCell align="center" className="tb_head tb_h_question">Question</TableCell>
              <TableCell align="center" className="tb_head">Created Date</TableCell>
              <TableCell align="center" className="tb_head">Subject</TableCell>
              <TableCell align="center" className="tb_head">Action</TableCell>

            </TableRow>
          </TableHead>
          <TableBody className="tb_body">
            {questions && questions.length > 0 && questions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((subscriber, index) => (
                <TableRow key={index}>
                  <TableCell align="left" padding="normal" className="td_ques">{subscriber.questionText}</TableCell>
                  <TableCell align="center">{new Date(subscriber.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="center">{subscriber.subject}</TableCell>
                  <TableCell align="right" className="">
                    <div className="atn_btn">
                      <LoadingButton color="error" onClick={() => handleDelete(subscriber._id)}>Delete</LoadingButton>
                      <LoadingButton color="success" onClick={() => onSelected(subscriber._id)}>Edit</LoadingButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </StyledTable>

        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={questions?.length || 0}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
      </Box>

    </div>
  );
};

export default PaginationTable;
