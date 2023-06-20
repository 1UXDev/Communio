import { useStore } from "@/pages/globalstore";
import styled from "styled-components";

// THis whole thing only exists to currently (for future test purposes) change the user

const Select = styled.select`
  width: 100%;
  margin-bottom: 24px;
  padding: 12px;
`;

export default function AppSettings({ onSelect }) {
  const allUserData = useStore((state) => state.allUserData);
  return (
    <>
      <h4>Select the Mock-User</h4>
      <Select onChange={onSelect}>
        {allUserData.map((user) => {
          return <option value={user._id}>User: {user._id}</option>;
        })}
      </Select>
    </>
  );
}
