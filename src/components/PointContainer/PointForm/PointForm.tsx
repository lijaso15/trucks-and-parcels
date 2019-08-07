import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Coordinate from "./Coordinate";
import Name from "./Name";
import Value from "./Value";
import { connect } from "react-redux";
import { setPoint, clearCalled } from "../../../actions";

const PointFormSchema = Yup.object().shape({
  x: Yup.number().required(),
  y: Yup.number().required(),
  value: Yup.string()
    .matches(/^\d+$/)
    .required()
});

interface PointFormProps {
  id: number;
  x?: number;
  y?: number;
  value?: number;
  Delete(id: number): any;
  Add(isTruck: boolean): any;
  isLast: boolean;
  Update(
    x: number | undefined,
    y: number | undefined,
    value: number | undefined,
    name: string,
    id: number
  ): any;
  clearCalled(): any;
  name: string;
  isTruck: boolean;
}

class PointForm extends React.Component<PointFormProps> {
  constructor(props) {
    super(props);
    this.handleTouch = this.handleTouch.bind(this);
  }

  handleTouch(e) {
    e.preventDefault();
    if (this.props.isLast) {
      this.props.Add(this.props.isTruck);
    }
  }

  render() {
    const {
      x,
      y,
      value,
      Delete,
      id,
      isLast,
      Update,
      clearCalled,
      name,
      isTruck
    } = this.props;

    return (
      <Formik
        initialValues={{
          x,
          y,
          name,
          value
        }}
        validationSchema={PointFormSchema}
        onSubmit={() => {}}
      >
        {({ errors, touched, values }) => {
          // console.log(errors, touched);
          if (
            !Object.keys(errors).length &&
            (touched.x || touched.y || touched.name || touched.value)
          ) {
            Update(values.x, values.y, values.value, values.name, id);
            clearCalled();
          }
          return (
            <Form>
              <div
                className="control  has-icons-right"
                onClick={this.handleTouch}
                style={{
                  clipPath: isLast
                    ? "polygon(0 0, 100% 0, 100% 70%, 0 70%)"
                    : ""
                }}
              >
                <div
                  className={
                    (errors.x && touched.x) ||
                    (errors.y && touched.y) ||
                    (errors.value && touched.value)
                      ? "input is-danger"
                      : isTruck
                      ? "input is-warning"
                      : "input is-link"
                  }
                >
                  (<Coordinate name="x" />,
                  <Coordinate name="y" />)
                  <Value name="value" isTruck={isTruck} />
                  <Name name="name" />
                </div>
                {!isLast && [
                  <span
                    className="icon is-small is-right"
                    data-tip={
                      isTruck
                        ? "DELETE T" + String(id + 1)
                        : "DELETE P" + String(id + 1)
                    }
                  >
                    <button
                      className="delete"
                      onClick={() => {
                        Delete(id);
                      }}
                    />
                  </span>
                ]}
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Delete: id =>
      dispatch(setPoint("DELETE", null, null, null, null, null, id)),
    Add: isTruck => dispatch(setPoint("ADD", null, null, null, null, isTruck)),
    Update: (x, y, value, name, id) =>
      dispatch(setPoint("UPDATE", x, y, value, name, null, id)),
    clearCalled: () => dispatch(clearCalled("DATA"))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PointForm);
