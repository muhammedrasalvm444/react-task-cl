import React from 'react'
import { Button, Input, Label, Modal } from 'semantic-ui-react'
import { useState } from 'react';
import "./style.css"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Controller ,useFieldArray} from "react-hook-form";
import CustomInputField from '../CustomInputField/CustomInputField';


const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required()


const MainPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      })
      const { fields, append, remove,  } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "schemas", // unique name for your Field Array
      });
      console.log("fields",fields);
  return (
    <div>    <Button  basic color='green' onClick={()=>setModalOpen(true)}>Save Segment</Button>
      <Modal
      onClose={() => setModalOpen(false)}
      open={modalOpen}
    >
      <Modal.Header>Saving Segment</Modal.Header>
      <Modal.Content >
        
      </Modal.Content>
      <form onSubmit={handleSubmit()}>
      <label>Enter the name of segment</label>
     
      <CustomInputField
            placeholder={"enter_full_name"}
            label={"full_name_"}
            control={control}
            name="full_name"
            error={errors["full_name"]?.message}
          ></CustomInputField>
      <p>{errors.firstName?.message}</p>
      <p>To save your segment,you need to add the schemas to build the query</p>
      {fields.map((field, index) => (
        <>
        <CustomInputField
             
                regular="true"
                placeholder={"first_name"}
                control={control}
                name={`items[${index}].first_name`}
                error={errors?.["items"]?.[index]?.["first_name"]?.["message"]}
              />
               <CustomInputField
             
                regular="true"
                placeholder={"last_name"}
                control={control}
                name={`items[${index}].last_name`}
                error={errors?.["items"]?.[index]?.["last_name"]?.["message"]}
               
              />
               <CustomInputField
             
                regular="true"
                placeholder={"age"}
                control={control}
                name={`items[${index}].age`}
                // error={errors["age"]?.message}
                error={errors?.["items"]?.[index]?.["age"]?.["message"]}
              />
               <CustomInputField
                regular="true"
                placeholder={"gender"}
                control={control}
                name={`items[${index}].gender`}
                // error={errors["gender"]?.message}
                error={errors?.["items"]?.[index]?.["gender"]?.["message"]}
              />
                             <CustomInputField
             
             regular="true"
             placeholder={"city"}
             control={control}
             name={`items[${index}].city`}
             // error={errors["city"]?.message}

             error={errors?.["items"]?.[index]?.["city"]?.["message"]}
             // label="Quantity"
             // helperText={"Name needs to be 'a'"}
           />              
            <CustomInputField
             regular="true"
             placeholder={"state"}
             control={control}
             name={`items[${index}].state`}

             error={errors?.["items"]?.[index]?.["state"]?.["message"]}
    
           />  <CustomInputField
             
             regular="true"
             placeholder={"Account name"}
             control={control}
             name={`items[${index}].account_name`}
   error={errors?.["items"]?.[index]?.["account_name"]?.["message"]}

           />
           {fields.length > 1 && (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    remove(index);
                  }}
                >
            delete
                </Button>)}
              
              </>
              
    ))}
    
    <Button
            onClick={(e) => {
              // e.preventDefault();
              append({ first_name: "",last_name:"",gender:"",age:"",account_name:"",city:"",state:"" });
            }}
          >
Add schema to segment</Button>
      </form>

      
      {/* <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions> */}
    </Modal>
    </div>
  )
}

export default MainPage