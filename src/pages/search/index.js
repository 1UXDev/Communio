export default function Search() {
  return (
    <div className="SearchWrapper">
      <h1>Here will be the search</h1>
      <label for="site-search">Explore Organizations and Donations:</label>
      <input type="search" id="site-search" name="q" />
      <button>Search</button>
    </div>
  );
}
