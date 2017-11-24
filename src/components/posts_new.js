import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component{

  //touched is used to identify if the form has been changed
  renderField(field){
    const {meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return(
        <div className={className}>
          <label>{field.label}</label>
          <input 
            className="form-control"
            type="text"
            {...field.input}
          />
          <div className="text-help">
             {touched ? error : ''}
          </div>          
        </div>
      )
  }
  onSubmit(values){
   
    this.props.createPost(values, () =>
    {
      this.props.history.push('/');
    });
  }
  render(){
    const {handleSubmit} = this.props;
    //This line can be explained by 
    // ReduxForm uses handleSubmit to get the values
    // Then it sends it to our helper onSubmit to console.log() or whatever
    // <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
    return(
      <div>
        
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}

          />
          <Field
            label="Categories"
            name="categories"
            component={this.renderField}

          />
          <Field
            label="Contents"
            name="contents"
            component={this.renderField}

          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    )
  }
}
function validate(values){
  //console.log(values) -> {title: 'asdf', categories: 'asdf', content: 'asdf'}
  const errors = {};
  //validate the imputs from 'values' 
  if(!values.title){
    errors.title = 'Enter a title';
  }
  if (!values.categories){
    errors.categories = 'Enter some categories';
  }
  if(!values.contents){
    errors.contents = 'Enter some content please';
  }
  //if errors is  empty, the form is fine to submit
  //if errors has any props the redux  form assumes the form is invalid
  return errors;
}


//reduxForm is kinda like connect for redux
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null,{createPost})(PostsNew) 
);