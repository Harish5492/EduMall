// const coursemodel = require('../models/coursemodel')
const { Course, Lesson } = require('../models/coursemodel');
const courseRouter = require('../routers/course.router');


class courseController {

  /**
  * @function courseAdd
  * @param  req 
  * @param  res 
  * @returns users
  **/
  async courseAdd(req, res) {
    try {
      //   const newData = new coursemodel.Course({...req.body})
      Course.create({ ...req.body })

      res.json({ message: "added" });
    }
    catch (error) {
      res.status(500).send(error);
    }
  }

  /**
* @function lessonAdd
* @param  req 
* @param  res 
* @returns users
**/

  async lessonAdd(req, res) {
    try {
      Lesson.create({ ...req.body })

      await Course.findOneAndUpdate(
        { _id: req.body.course }, // Find the course by ID
        { $push: { lessons: newData._id } } // Add the new lesson to the 'lesson' array
      );
      res.json({ status: true, message: "added" });
    }
    catch (error) {
      res.status(500).send(error);
    }
  }

  async addMultipleLesson(req,res){ 
    console.log("inside add Multiple Lesson")
    const {lessons,course} = req.body
    lessons.forEach(obj => { 
      obj.course = course;
    });    
    const request  = await Lesson.insertMany(lessons) 
    console.log("requwst",request)   
    const Lessons = request.map(obj => obj._id);
  console.log(Lessons)
    await Course.findByIdAndUpdate(
    { _id: course }, // Find the user by ID
    { $push: {lessons : Lessons  },
    $set: { updatedOn: Date.now() } }, // Add the new email to the 'emails' array

  );
      // console.log("result",result)
    res.json({message: 'succesful'})
  } 

  async updateLesson(req,res){
    try{
      console.log("inside update Lesson")
      const {id} = req.params;
      const updatedLesson = {...req.body, updatedOn : Date.now()}
      const updatedDocument = await Lesson.findByIdAndUpdate(id, updatedLesson, {new:true});
      if(updatedDocument){
        res.json({message:"updated successfully"})
      }else{
        res.status(404).json ({message:"Lesson not found"})
      }
    }
    catch(error){
      res.status(404).send(error)
    }
  }


  async getAllLesson(req, res) {
    try {
      const Lesson = await Lesson.find({ course: req.params.id })
      res.send({ status: true, Lesson })
    }
    catch (error) {
      res.status(500).send({error : "Lesson Not found"});
    }

  }
  async getAllCourses(req, res) {
    try {
    
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const skip = (page - 1) * itemsPerPage;
    const courses = await Course.find()
      .skip(skip)
      .limit(itemsPerPage)
      .exec();
      const totalCourses = await Course.countDocuments();
      res.send({ status: true, courses ,totalCourses })
    }
    catch (error) {
      res.status(500).send(error);
    }

  }

  async getCourseById(req, res) {
    try {
      const course = await Course.findById({_id:req.params.id})
      res.json({ status: true, course })
    }
    catch (error) {
      res.status(500).json({error:"Course Not Found"})
    }
  }

  async deleteCourse(req, res) {
    try {
      console.log("inside delete a course")
      console.log(req.params.id)
      const a = await Course.findByIdAndDelete({ _id: req.params.id })
      console.log(a, "a")
      const del = await Lesson.deleteMany({ course: req.params.id }, (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`${result.deletedCount} documents deleted`);
        }
      }
      )
      console.log(del)
      res.send({ status: true })
    }
    catch (error) {
      res.status(500).send(error)
    }
  }

  async deleteLesson(req, res) {
    try {
      console.log("inside delete a lesson")
      const lesson = await Lesson.findByIdAndDelete(req.params.id)
      console.log("vheck",lesson)
      await Course.findByIdAndUpdate(
        { _id: lesson.course },
        { $pull: { lessons: lesson._id },
        $set: { updatedOn: Date.now() }  },
      ) 
      res.json({ status: true, message: "Delete successfully" })
    }
    catch (error) {
      res.status(500).send({error:"Delete operation failed"})
    }
  }

}

module.exports = new courseController();