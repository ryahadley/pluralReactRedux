import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course saved');
    this.context.router.push('/courses');
  }

  render() {
    return (
      <div>
        <CourseForm
          allAuthors={this.props.authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          course={this.state.course}
          errors={this.state.errors}
          saving={this.state.saving}/>
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if(course) return course[0];  //ES6 filter function returns an array and may contain more than 1 match so we take the first one cuz they should all be the same anyway.
  return null;
}

//mapStateToProps is good place to transform data that is returned to you from an http request to how you need it to display it or what you want to properties named or add new properties like changing dates.

function mapStateToProps(state, ownProps) {
  //many things on ownProps from the path in react router '/course/:id' the colon : is the . peroid here
  const courseId = ownProps.params.id;

  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  if(courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
