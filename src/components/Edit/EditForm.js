import styled from "styled-components";
import { uid } from "uid";

const FormWrapper = styled.section`
  display: flex;
  flex-flow: column;
  gap: 12px;
`;

const Form = styled.form`
  display: flex;
  flex-flow: column;
  gap: 8px;
  padding: 0px 12px;
`;

export default function EditForm({ object, onEditFormSubmit }) {
  const objectArray = Object.entries(object);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onEditFormSubmit(data, event);
  }

  return (
    <FormWrapper>
      <h3>Change your Data</h3>
      <hr></hr>
      <Form onSubmit={handleSubmit} key={uid()}>
        {objectArray.map((attribute) => {
          const [key, value] = attribute;
          if (typeof value !== "object") {
            return (
              <input
                id={key}
                name={key}
                placeholder={`${key} - ${value}`}
                type={typeof value}
                defaultValue={value}
                key={uid()}
              />
            );
          } else {
            return (
              <ul key={uid()}>
                <h4 key={uid()}>{key}:</h4>
                {value &&
                  value.map((item, i) => {
                    if (typeof item !== "object") {
                      return (
                        <>
                          <input
                            id={`${attribute[0]}[${i}]`}
                            name={`${attribute[0]}[${i}]`}
                            placeholder={item}
                            type={typeof item}
                            defaultValue={item}
                            key={uid()}
                          />
                          <br />
                        </>
                      );
                    } else {
                      const itemArray = Object.entries(item);

                      return itemArray.map((itemArrayItem) => {
                        const [itemKey, itemValue] = itemArrayItem;
                        return (
                          <>
                            <input
                              id={`${attribute[0]}[${i}].${itemKey}`}
                              name={`${attribute[0]}[${i}].${itemKey}`}
                              placeholder={itemKey}
                              type={typeof itemValue}
                              defaultValue={itemValue}
                              key={uid()}
                            />
                            <br />
                          </>
                        );
                      });
                    }
                  })}
              </ul>
            );
          }
        })}
        <button type="submit">Submit Changes</button>
      </Form>
    </FormWrapper>
  );
}
