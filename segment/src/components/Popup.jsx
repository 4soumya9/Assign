import { useState } from "react";
import SchemaDropdown from "./SchemaDropdown";

function Popup({ closePopup }) {
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  // Now we have both user and group traits
  const schemaOptions = [
    { label: "First Name", value: "first_name", type: "user" },
    { label: "Last Name", value: "last_name", type: "user" },
    { label: "Gender", value: "gender", type: "user" },
    { label: "Age", value: "age", type: "user" },
    { label: "Account Name", value: "account_name", type: "group" },
    { label: "City", value: "city", type: "group" },
    { label: "State", value: "state", type: "group" },
  ];

  function handleAddSchema() {
    if (selectedOption === "") {
      alert("Please select a schema first.");
      return;
    }
    if (schemas.includes(selectedOption)) {
      alert("Schema already added.");
      return;
    }
    setSchemas([...schemas, selectedOption]);
    setSelectedOption("");
  }

  function handleRemoveSchema(index) {
    const copy = [...schemas];
    copy.splice(index, 1);
    setSchemas(copy);
  }

  function handleChangeSchema(index, newValue) {
    const updated = [...schemas];
    updated[index] = newValue;
    setSchemas(updated);
  }

  async function handleSaveSegment() {
    if (!segmentName.trim()) {
      alert("Enter segment name");
      return;
    }
    if (schemas.length === 0) {
      alert("Add at least one schema");
      return;
    }

    const dataToSend = {
      segment_name: segmentName,
      schema: schemas.map((s) => {
        const found = schemaOptions.find((o) => o.value === s);
        return { [s]: found ? found.label : s };
      }),
    };

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        alert("Segment saved successfully!");
        closePopup();
      } else {
        alert("Failed to save segment.");
      }
    } catch (err) {
      console.log(err);
      alert("Error while saving.");
    }
  }

  const availableOptions = schemaOptions.filter(
    (opt) => !schemas.includes(opt.value)
  );

  return (
    <>
      <div className="sideOverlay" onClick={closePopup}></div>

      <div className="sidePopup">
        <div className="popupHeader">
          <h3>Saving Segment</h3>
          <button onClick={closePopup} className="closeBtn">
            x
          </button>
        </div>

        <div className="popupBody">
          <label>Enter the Name of the Segment</label>
          <input
            type="text"
            placeholder="Name of the segment"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
          />

          <p className="infoTxt">
            To save your segment, you need to add the schemas to build the query
          </p>

          {/* Trait Legend */}
          <div className="traitLegend">
            <span>
              <span className="dot user"></span> User Traits
            </span>
            <span>
              <span className="dot group"></span> Group Traits
            </span>
          </div>

          {/* Blue box */}
          <div className="blueBox">
            {schemas.map((schema, i) => (
              <SchemaDropdown
                key={i}
                value={schema}
                index={i}
                onChange={handleChangeSchema}
                onRemove={handleRemoveSchema}
                allOptions={schemaOptions}
                selected={schemas}
              />
            ))}
          </div>

          {/* Add new schema dropdown */}
          <div style={{ marginTop: "10px" }}>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              style={{ padding: "6px", borderRadius: "5px", width: "100%" }}
            >
              <option value="">Add schema to segment</option>
              {availableOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <p
              style={{
                color: "teal",
                cursor: "pointer",
                fontSize: "14px",
                marginTop: "5px",
              }}
              onClick={handleAddSchema}
            >
              + Add new schema
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="popupFooter">
          <button className="saveBtn" onClick={handleSaveSegment}>
            Save the Segment
          </button>
          <button className="cancelBtn" onClick={closePopup}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default Popup;
