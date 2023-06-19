export default function Profile({ userData }) {
  return (
    <div className="ProfileWrapper">
      <h1>Here will be the Profile of {userData.name}</h1>
      <h3>Dynamically generated Info about user:</h3>
      <ul>
        <li>Location: {userData.street}</li>
      </ul>

      <br />
      <br />

      <h3>Preferred Payment Methods</h3>
      <ul>
        {userData.preferredPaymentMethod.map((method) => (
          <li>{method}</li>
        ))}
      </ul>

      <br />
      <br />

      <h3>Saved Payment Details</h3>
      <ul>
        {userData.paymentCache.map((cache) => (
          <li>
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
