import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

  //******* 5 major pieces to a react Container Component *******

class CoursesPage extends React.Component {

  // 1: constructor - will initialState
  //                - call bind functions

  constructor(props, context) {
    super(props, context);


    //do binding of funcitons in constructor to increase preformance. if you did bind in the
    //render function, a new function would be created on each render.
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  // 2: child functions - which are called by render to pass values from user to state

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  // 3: render function - usually call a child(ren) component(s)

  render() {
    const {courses} = this.props;

    return (
      <div>
        <h1>Courses</h1>
        <input
          type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage} />
          
        <CourseList courses={courses}/>
      </div>
    );
  }
}

// 4: PropTypes - validate our prop types, so values come in as expected

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// 5: Redux, Connect, and related functions - dispatch actions to the store

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

//function mapDispatchToProps(){}  second param of connect, without define your own connect will set a dispatch property of props for you

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
