import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  DateTimeInput,
  TextInput,
  SelectInput,
} from "react-admin";

export const EventCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <DateTimeInput label="Event Date" source="eventDate" />
        <TextInput label="Title" source="title" />
        <SelectInput
          source="type"
          label="Type"
          choices={[
            { label: "birthday", value: "Birthday" },
            { label: "workiversary", value: "Workiversary" },
            { label: "event", value: "Event" },
          ]}
          optionText="label"
          allowEmpty
          optionValue="value"
        />
      </SimpleForm>
    </Create>
  );
};
