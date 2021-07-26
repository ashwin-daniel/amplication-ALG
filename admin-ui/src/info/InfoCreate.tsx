import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const InfoCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Image" source="image" />
        <TextInput label="Message" source="message" />
        <TextInput label="Title" source="title" />
      </SimpleForm>
    </Create>
  );
};
