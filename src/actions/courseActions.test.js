import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';

//Test a sync action
describe('Course Actions', () => {
  describe('courseCreateSuccess', () => {
    it('should create a CREATE_COURSES_SUCCESS action', () => {
      //arrange
      const course = {id: 'clean-code', title: 'Clean Code'};
      const expectedAction = {
        type: types.CREATE_COURSES_SUCCESS,
        course: course
      };

      //act
      const action = courseActions.createCourseSuccess(course);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});
