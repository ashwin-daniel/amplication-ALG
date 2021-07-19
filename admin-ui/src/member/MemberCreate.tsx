import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  DateInput,
  SelectInput,
} from "react-admin";

export const MemberCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Ace" source="ace" />
        <TextInput label="Avatar" source="avatar" />
        <DateInput label="DOB" source="dob" />
        <DateInput label="DOJ" source="doj" />
        <TextInput label="Email" source="email" type="email" />
        <TextInput label="First Name" source="firstName" />
        <SelectInput
          source="gender"
          label="Gender"
          choices={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
          optionText="label"
          optionValue="value"
        />
        <TextInput label="Last Name" source="lastName" />
      </SimpleForm>
    </Create>
  );
};
