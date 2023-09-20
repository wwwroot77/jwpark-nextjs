import React, { useState } from 'react';
import { TextField } from '@mui/material';
import MultiColumnDropdownTextField from '../../../components/muidropdown';

export default function EditableTextboxWithDropdown() {
  const [fields, setFields] = useState([
    { anchorEl: null, selectedNames: ["강도야"], selectedIds: ["id1"] },
    { anchorEl: null, selectedNames: ["나도야"], selectedIds: ["id2"] },
  ]);

  const handleTextboxClick = (event, index) => {
    const newFields = [...fields];
    newFields[index].anchorEl = event.currentTarget;
    setFields(newFields);
  };

  const handleClose = (index) => {
    const newFields = [...fields];
    newFields[index].anchorEl = null;
    setFields(newFields);
  };

  const handleNameChange = ({ names, ids }, index) => {
    const newFields = [...fields];
    newFields[index].selectedNames = names.split(", ");
    newFields[index].selectedIds = ids.split(", ");
    setFields(newFields);
  };

  return (
    <div style={{ padding: "20px", width: "550px" }}>
      {fields.map((field, index) => (
        <div key={index}>
          <TextField
            variant="outlined"
            onClick={e => handleTextboxClick(e, index)}
            value={field.selectedNames.join(", ") || "Select names..."}
            fullWidth
          />
          <TextField
            variant="outlined"
            value={field.selectedIds.join(", ") || "Select ids..."}
            fullWidth
            disabled
          />
          <MultiColumnDropdownTextField 
            anchorEl={field.anchorEl}
            onClose={() => handleClose(index)}
            onChange={(data) => handleNameChange(data, index)}
            initialSelectedIds={field.selectedIds}
          />
        </div>
      ))}
    </div>
  );
}