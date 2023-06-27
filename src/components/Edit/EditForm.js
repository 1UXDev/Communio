import styled from "styled-components";
import { uid } from "uid";

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
    <>
      <br></br>
      <h3>Change Data!</h3>
      <br></br>
      <Form onSubmit={handleSubmit}>
        {objectArray.map((attribute) => {
          return typeof attribute[1] !== "object" ? (
            <input
              id={attribute[0]}
              name={attribute[0]}
              placeholder={`${attribute[0]} - ${attribute[1]}`}
              type={typeof attribute[1]}
              defaultValue={attribute[1]}
              key={uid()}
            />
          ) : (
            <ul key={uid()}>
              {" "}
              {/* {Hier passt irgendwas noch nicht um die Products und Cooredinates zu verändern} */}
              <h4>{attribute[0]}</h4>
              {attribute[1].map((object) =>
                attribute[0] === "products" ? (
                  <input
                    id={object._id}
                    name={object._id}
                    placeholder={`${object.productId}`}
                    type={typeof object.productId}
                    defaultValue={object.productId}
                    key={uid()}
                  />
                ) : (
                  <input
                    id={object}
                    name={object}
                    placeholder={`${object}`}
                    type={typeof object}
                    defaultValue={object}
                    key={uid()}
                  />
                )
              )}
            </ul>
          );
        })}
        <button type="submit">Submit Changes</button>
      </Form>
    </>
  );
}
