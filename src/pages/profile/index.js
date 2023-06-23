import useStore from "../globalstore";
import { uid } from "uid";

// -----------------------------------------------
// !--- The Profile Page / Components does not work properly yet, its just a placeholder and Object to later development
// -----------------------------------------------

export default function Profile() {
  const usersData = useStore((state) => state.usersData) || [];

  if (!usersData || usersData.length < 3) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ProfileWrapper">
      <h1>Here will be the Profile of {usersData[0].name}</h1>
      <h3>Dynamically generated Info about user:</h3>
      <ul>
        <li>Location: {usersData[0].street}</li>
      </ul>

      <br />
      <br />

      <h3>Preferred Payment Methods</h3>
      <ul>
        {usersData[0].preferredPaymentMethod.map((method) => (
          <li key={uid()}>{method}</li>
        ))}
      </ul>

      <br />
      <br />

      <h3>Saved Payment Details</h3>
      <ul>
        {usersData[0].paymentCache.map((cache) => (
          <li key={uid()}>
            Payment Method: {cache.paymentMethod} ,
            {cache.userName ? `User Name: ${cache.userName} ` : null}
            {cache.ccNumber ? `Credit Card Number: ${cache.ccNumber} ` : null}
            {cache.name ? `Name on Card: ${cache.name} ` : null}
            {cache.valid.length > 1
              ? `Valid until: ${cache.valid.join("/")}`
              : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
