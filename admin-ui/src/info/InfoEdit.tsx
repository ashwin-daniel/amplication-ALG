import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const InfoEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Image" source="image" />
        <TextInput label="Message" source="message" />
        <TextInput label="Title" source="title" />
      </SimpleForm>
    </Edit>
  );
};
