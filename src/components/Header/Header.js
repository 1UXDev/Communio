import UserLocation from "./UserLocation";
import Language from "./Language";
import Filter from "./Filter";

export default function Header({ currentUser }) {
  return (
    <div className="headerContainer">
      <UserLocation></UserLocation>
      <Language></Language>
      <Filter></Filter>
    </div>
  );
}
