import styled from "styled-components";
import useStore from "../../pages/globalstore";
import { useEffect } from "react";
import { uid } from "uid";

// -------------------------
// THis whole thing only exists to currently (for future test purposes) change the user
// -------------------------

const Select = styled.select`
  width: 100%;
  margin-bottom: 24px;
  padding: 12px;
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
    <>
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
    </>
  );
}
