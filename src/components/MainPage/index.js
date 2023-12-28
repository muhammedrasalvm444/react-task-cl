import React from "react";
import { Button, Input, Label, Modal, Radio } from "semantic-ui-react";
import { useState } from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useFieldArray } from "react-hook-form";
import CustomInputField from "../CustomInputField/CustomInputField";
import { IoIosAdd } from "react-icons/io";

const schema = yup.object({
  segment_name: yup.string().required("Required"),
  schemas: yup
    .array()
    .of(
      yup.object().shape({
        first_name: yup.string().required("Required"),
        last_name: yup.string().required("Required"),
        account_name: yup.string().required("Required"),
        age: yup
          .number()
          .required("Required")
          .typeError("Please enter a number"),
        city: yup.string().required("Required"),
        state: yup.string().required("Required"),
      })
    )
    .required(),
});

const MainPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [genderVal, setGenderVal] = useState("men");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "schemas", // unique name for your Field Array
  });
  console.log("fields", errors);
  const onSubmit = (data) => {
    console.log("data", data);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Button basic color="green" onClick={() => setModalOpen(true)}>
          Save Segment
        </Button>
      </div>
      <Modal
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        closeOnDimmerClick
        closeIcon
        size="tiny"
      >
        <Modal.Header>Saving Segment</Modal.Header>

        <Modal.Content>
          <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{ gap: "10px", display: "flex", flexDirection: "column" }}
            >
              <label
                style={{ fontSize: "20px", Bottom: "10px", marginTop: "3px" }}
              >
                Enter the name of segment
              </label>
              <CustomInputField
                placeholder={"Name of the segment"}
                control={control}
                name="segment_name"
                error={errors["segment_name"]?.message}
              ></CustomInputField>
              <p style={{ color: "red" }}>{errors.name_of_segment?.message}</p>
            </div>
            <p>
              To save your segment,you need to add the schemas to build the
              query
            </p>
            <p
              className="add-schema-ptag"
              onClick={(e) => {
                append({
                  first_name: "",
                  last_name: "",
                  gender: "",
                  age: "",
                  account_name: "",
                  city: "",
                  state: "",
                });
              }}
            >
              <IoIosAdd />
              Add schema to segment
            </p>
            {fields.map((field, index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column ",
                  gap: "10px",
                }}
              >
                <CustomInputField
                  regular="true"
                  placeholder={"First name"}
                  control={control}
                  name={`schemas[${index}].first_name`}
                  error={
                    errors?.["schemas"]?.[index]?.["first_name"]?.["message"]
                  }
                />
                <CustomInputField
                  regular="true"
                  placeholder={"Last name"}
                  control={control}
                  name={`schemas[${index}].last_name`}
                  error={
                    errors?.["schemas"]?.[index]?.["last_name"]?.["message"]
                  }
                />
                <CustomInputField
                  regular="true"
                  placeholder={"Age"}
                  control={control}
                  name={`schemas[${index}].age`}
                  // error={errors["age"]?.message}
                  error={errors?.["schemas"]?.[index]?.["age"]?.["message"]}
                />
                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <Radio
                        label="Men"
                        value="men"
                        checked={genderVal === "men"}
                        onChange={() => setGenderVal("men")}
                      />
                      <Radio
                        label="Women"
                        value="women"
                        checked={genderVal === "women"}
                        onChange={() => setGenderVal("women")}
                      />
                      <Radio
                        label="Other"
                        value="other"
                        checked={genderVal === "other"}
                        onChange={() => setGenderVal("other")}
                      />
                    </>
                  )}
                />
                {/* <Controller
                  name="selectedOption"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Radio
                      label="Option 2"
                      value="option2"
                      checked={field.value === "option2"}
                      onChange={() => field.onChange("option2")}
                    />
                  )}
                /> */}
                <CustomInputField
                  regular="true"
                  placeholder={"City"}
                  control={control}
                  name={`schemas[${index}].city`}
                  error={errors?.["schemas"]?.[index]?.["city"]?.["message"]}
                />
                <CustomInputField
                  regular="true"
                  placeholder={"State"}
                  control={control}
                  name={`schemas[${index}].state`}
                  error={errors?.["schemas"]?.[index]?.["state"]?.["message"]}
                />{" "}
                <CustomInputField
                  regular="true"
                  placeholder={"Account name"}
                  control={control}
                  name={`schemas[${index}].account_name`}
                  error={
                    errors?.["schemas"]?.[index]?.["account_name"]?.["message"]
                  }
                />
                {fields.length > 1 && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      remove(index);
                    }}
                  >
                    delete
                  </Button>
                )}
                {/* {fields.length > 1 && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      remove(index);
                    }}
                  >
                    delete
                  </Button>
                )} */}
              </div>
            ))}
            <p
              className="add-schema-ptag"
              onClick={(e) => {
                append({
                  first_name: "",
                  last_name: "",
                  gender: "",
                  age: "",
                  account_name: "",
                  city: "",
                  state: "",
                });
              }}
            >
              <IoIosAdd />
              Add schema to segment
            </p>
            <div className="button_div">
              <Button color="green" loading={false}>
                Save the segment
              </Button>
              <Button
                inverted
                color="red"
                loading={false}
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default MainPage;
