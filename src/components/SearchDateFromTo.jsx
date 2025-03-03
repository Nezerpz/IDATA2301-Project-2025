import '../static/css/SearchDateFromTo.css';

function SearchDateFromTo() {
  return (
    <form className={"search-date-from-to"}>
        <div className={"input-with-label"}>
            <label htmlFor="from">
                <span>From</span>
                <input type="date" name="dateFrom" id="from" />
            </label>
        </div>
            <label htmlFor="to">
                <span>To</span>
                <input type="date" name="dateTo" id="to" />
            </label>
        <button type="submit">Find car</button>
    </form>
  );
}

export default SearchDateFromTo;