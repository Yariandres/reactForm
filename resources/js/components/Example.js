import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReactDOM from 'react-dom';

import "../../sass/App.scss";

class Example extends React.PureComponent {
  state = {
    openStep: 0,
    formInfo: {}
  };


  componentDidMount() {
    window.location.hash = "#first-step";
  }

 
  renderStepOne = () => {
    return (
      <div className="step-container">
        <div className="step-title">Step 1: Your details</div>
        <div id="first-step" className="step-form">
          <Formik
            initialValues={{ "first-name": "", "last-name": "", email: "" }}
            validate={values => {
              let errors = {};

              //Errors validation
              if (!values.email) {
                errors.email = "Email is required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              } else if (!values["first-name"])
                errors["first-name"] = "First name is required";
              else if (!values["last-name"])
                errors["last-name"] = "Last name is required";

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              window.location.hash = "#second-step";
              this.setState({
                formInfo: { ...this.state.formInfo, ...values }
              });
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-field">
                  <label>First name</label>
                  <Field
                    id="first-name"
                    type="text"
                    name="first-name"
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Last name</label>
                  <Field id="last-name" type="text" name="last-name" required />
                </div>
                <div className="form-field">
                  <label>Email</label>
                  <Field id="email" type="email" name="email" required />
                </div>
                <div className="bottom-section">
                  <ErrorMessage
                    className="error-message"
                    name="first-name"
                    component="div"
                  />
                  <ErrorMessage
                    className="error-message"
                    name="last-name"
                    component="div"
                  />
                  <ErrorMessage
                    className="error-message"
                    name="email"
                    component="div"
                  />
                  <button type="submit" disabled={isSubmitting}>
                    Next >
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  };

  renderSecondStep = () => {
    return (
      <div className="step-container">
        <div className="step-title">Step 2: More comments</div>
        <div id="second-step" className="step-form">
          <Formik
            initialValues={{ gender: "male" }}
            validate={values => {
              let errors = {};

              //Errors validation
              if (!values["mobile-number"])
                errors["mobile-number"] = "Mobile number is required";
              else if (!values["gender"])
                errors["gender"] = "Gender is required";
              else if (!values["day-birth"])
                errors["day-birth"] = "Day of birth is required";
              else if (!values["month-birth"])
                errors["month-birth"] = "Month of birth is required";
              else if (!values["day-birth"])
                errors["year-birth"] = "Year of birth is required";

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              window.location.hash = "#third-step";
              this.setState({
                formInfo: { ...this.state.formInfo, ...values }
              });
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-field">
                  <label>Telephone number</label>
                  <Field
                    id="mobile-number"
                    type="text"
                    name="mobile-number"
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Gender</label>
                  <Field component="select" id="gender" name="gender" required>
                    <option value="male" label="Male" />
                    <option value="female" label="Female" />
                    <option value="other" label="Other" />
                  </Field>
                </div>
                <div className="form-field">
                  <label>Date of birth</label>
                  <div className="birth-field">
                    <Field
                      id="day-birth"
                      type="number"
                      name="day-birth"
                      required
                    />
                    <Field
                      id="month-birth"
                      type="number"
                      name="month-birth"
                      required
                    />
                    <Field
                      id="year-birth"
                      type="number"
                      name="year-birth"
                      style={{ width: "4rem" }}
                      required
                    />
                  </div>
                </div>
                <div className="bottom-section">
                  <button type="submit" disabled={isSubmitting}>
                    Next >
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  };

  renderThirdStep = () => {
    return (
      <div className="step-container">
        <div className="step-title">Step 3: Final comments</div>
        <div id="third-step" className="step-form">
          <Formik
            initialValues={{ comments: "" }}
            onSubmit={(values, { setSubmitting }) => {
              const { formInfo } = this.state;

              if (
                !formInfo["first-name"] ||
                !formInfo["last-name"] ||
                !formInfo["email"] ||
                !formInfo["gender"] ||
                !formInfo["mobile-number"] ||
                !formInfo["day-birth"] ||
                !formInfo["month-birth"] ||
                !formInfo["year-birth"]
              ) {
                window.location.hash = "#first-step";
                alert("Some data has not been entered.");
              } else {
                setTimeout(() => {
                  alert(
                    JSON.stringify(
                      { ...this.state.formInfo, ...values },
                      null,
                      2
                    )
                  );
                }, 400);
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-field">
                  <label>Comments</label>
                  <Field component="textarea" id="comments" name="comments" />
                </div>
                <div className="bottom-section">
                  <ErrorMessage
                    className="error-message"
                    name="comments"
                    component="div"
                  />
                  <button type="submit" disabled={isSubmitting}>
                    Next >
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="app">
        {this.renderStepOne()}
        {this.renderSecondStep()}
        {this.renderThirdStep()}
      </div>
    );
  }

}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
