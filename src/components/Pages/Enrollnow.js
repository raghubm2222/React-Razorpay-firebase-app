import React from "react";
import Grid from "@material-ui/core/Grid";
import Grids from "../ResuableComponents/Grids/Grids";

const courseData = [
  {
    title: "JAVA FULLSTACK",
    imageURL:
      "https://stackify.com/wp-content/uploads/2018/09/Java-Debugging-Tips-1280x720.jpg",
    details:
      "Java offers a great opportunity for you to scale your career as a developer. Fro basics to advanced, this course helps you master Java programming Now @RS 2000.",
  },
  {
    title: "SOFTWARE TESTING",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/project-91a3d.appspot.com/o/World%E2%80%99s-Top-Software-Testing-Professionals.jpg?alt=media&token=53176822-dd3b-4cd6-b1b6-6c198d02b4a7",
    details:
      "This Course gives the desired knowledge on various software testing methodologies Become an industry-ready expert software testerEnroll Now @RS 2000.",
  },
  {
    title: "EMBEDED SYSTEM",
    imageURL:
      "https://www.eletimes.com/wp-content/uploads/2019/12/Embedded-Systems-booost.jpg",
    details:
      "Impart a solid understanding of role of embedded systems design. Learn from an Industry level approach. Get exposure to C, C++ or embedded. Now @RS 2000.",
  },
];

export default function AutoGrid() {
  return (
    <div style={{ marginTop: "50px" }}>
      <div style={{ textAlign: "center" }}>
        <h2>ENROLL NOW</h2>
        <h4>Courses Available</h4>
      </div>
      <div className="enroll-courses">
        <Grid container>
          {courseData.map((course) => (
            <Grids
              key={course.title}
              label={course.title}
              image={course.imageURL}
              details={course.details}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
}
