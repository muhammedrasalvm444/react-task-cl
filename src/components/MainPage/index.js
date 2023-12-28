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
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const schema = yup.object({
  segment_name: yup.string().required("Required"),
  schema: yup
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
  const [loading, setLoading] = useState(false);
  const [genderVals, setGenderVals] = useState(["men"]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      segment_name: "",
      schema: [
        {
          first_name: "",
          last_name: "",
          gender: "men",
          age: "",
          account_name: "",
          city: "",
          state: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "schema", // unique name for your Field Array
  });
  const onSubmit = (data) => {
    setLoading(true);
    console.log("data", data);
    const formData = { ...data, gender: genderVals };

    axios
      .post(
        "http://localhost:8080/https://webhook.site/f3fd1acc-dd68-4f2f-8b34-d1e475189c12",

        formData
      )
      .then((response) => {
        // Handle the successful response
        setModalOpen(false);
        toast?.success("Form Submitted succussfully..");
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors
        toast?.error("Failed..");

        setLoading(false);
      });
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
        closeOnEscape
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

            {fields.map((field, index) => (
              <div
                key={"fileds" + index}
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
                  name={`schema[${index}].first_name`}
                  error={
                    errors?.["schema"]?.[index]?.["first_name"]?.["message"]
                  }
                />
                <CustomInputField
                  regular="true"
                  placeholder={"Last name"}
                  control={control}
                  name={`schema[${index}].last_name`}
                  error={
                    errors?.["schema"]?.[index]?.["last_name"]?.["message"]
                  }
                />
                <CustomInputField
                  regular="true"
                  placeholder={"Age"}
                  control={control}
                  name={`schema[${index}].age`}
                  // error={errors["age"]?.message}
                  error={errors?.["schema"]?.[index]?.["age"]?.["message"]}
                />
                {/* <label style={{ fontSize: "13px", marginTop: "5px" }}>
                  Gender
                </label>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue="male"
                  render={({ field }) => (
                    <div style={{ display: "flex", gap: "4px" }}>
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
                    </div>
                  )}
                /> */}
                <label style={{ fontSize: "13px", marginTop: "5px" }}>
                  Gender
                </label>
                <Controller
                  name={`gender[${index}]`}
                  control={control}
                  defaultValue="men"
                  render={({ field }) => (
                    <div style={{ display: "flex", gap: "4px" }}>
                      <Radio
                        label="Men"
                        value="men"
                        checked={field.value === "men"}
                        onChange={() => {
                          // Update the gender value for the current schema
                          const updatedGenderVals = [...genderVals];
                          updatedGenderVals[index] = "men";
                          setGenderVals(updatedGenderVals);
                          field.onChange("men");
                        }}
                      />
                      <Radio
                        label="Women"
                        value="women"
                        checked={field.value === "women"}
                        onChange={() => {
                          const updatedGenderVals = [...genderVals];
                          updatedGenderVals[index] = "women";
                          setGenderVals(updatedGenderVals);
                          field.onChange("women");
                        }}
                      />
                      <Radio
                        label="Other"
                        value="other"
                        checked={field.value === "other"}
                        onChange={() => {
                          const updatedGenderVals = [...genderVals];
                          updatedGenderVals[index] = "other";
                          setGenderVals(updatedGenderVals);
                          field.onChange("other");
                        }}
                      />
                    </div>
                  )}
                />
                {/* ... (Your delete button) */}
                <CustomInputField
                  regular="true"
                  placeholder={"City"}
                  control={control}
                  name={`schema[${index}].city`}
                  error={errors?.["schema"]?.[index]?.["city"]?.["message"]}
                />
                <CustomInputField
                  regular="true"
                  placeholder={"State"}
                  control={control}
                  name={`schema[${index}].state`}
                  error={errors?.["schema"]?.[index]?.["state"]?.["message"]}
                />{" "}
                <CustomInputField
                  regular="true"
                  placeholder={"Account name"}
                  control={control}
                  name={`schema[${index}].account_name`}
                  error={
                    errors?.["schema"]?.[index]?.["account_name"]?.["message"]
                  }
                />
                {fields.length > 1 && (
                  <div style={{ marginBottom: "10px" }}>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        remove(index);
                      }}
                    >
                      <MdDelete style={{ fontSize: "24px", color: "red" }} />
                    </Button>
                  </div>
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
              <Button color="green" loading={loading}>
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
