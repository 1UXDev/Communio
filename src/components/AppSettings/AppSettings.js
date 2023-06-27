import styled from "styled-components";
import useStore from "../../pages/globalstores";
import { useEffect } from "react";
import { uid } from "uid";

// -------------------------
// THis whole thing only exists to currently (for future test purposes) change the user
// -------------------------

const SelectWrapper = styled.div`
  width: 100%;
  background: linear-gradient(266.86deg, #43b4d8 8.28%, #7343d8 91.96%);
  margin-bottom: 12px;
  text-align: center;
  padding-bottom: 12px;
  h4 {
    color: white;
    padding: 4px;
  }
`;

const Select = styled.select`
  width: 80%;
`;

export default function AppSettings({ usersDataBackup }) {
  const usersData = useStore((state) => state.usersData);
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const setCurrentUserID = useStore((state) => state.setCurrentUserID);

  function onSelect(event) {
    const selectedUserId = event.target.value;
    const selectedUser = usersData.find((user) => user._id === selectedUserId);
    setCurrentUser(selectedUser);
    setCurrentUserID(selectedUserId);
  }

  return (
    <SelectWrapper>
      <h4>Select the Mock-User</h4>
      <Select onChange={onSelect} value={currentUser._id}>
        {usersDataBackup.map((user) => {
          return (
            <option value={user._id} key={uid()}>
              User: {user._id} - {user.name}
            </option>
          );
        })}
      </Select>
    </SelectWrapper>
  );
}
