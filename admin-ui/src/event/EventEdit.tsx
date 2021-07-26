import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  DateTimeInput,
  TextInput,
  SelectInput,
} from "react-admin";

export const EventEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
