import React, { useState } from "react";
import "./SearchableFieldTable.css";

function SearchableFieldTable({ data, columns, rowKey, children }) {
    const [search, setSearch] = useState("");

    // Filter data based on search input
    const filteredData = data.filter((row) =>{
        const searchTerms = search.toLowerCase().split(" ").filter(Boolean);
        return searchTerms.every((term) =>
            columns.some((column) =>
                String(row[column]).toLowerCase().includes(term)
            )
        );
    }
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search attributes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={"searchable-input"}
            />

            <table className={"searchableFieldTable"}>
                <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column} className={"searchableFieldTableHeading"}>
                            {column.charAt(0).toUpperCase() + column.slice(1)}
                        </th>
                    ))}
                    <th className={"searchableFieldTableHeading"}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((row) => (
                    <tr key={row[rowKey]}>
                        {columns.map((column) => (
                            <td key={column} className={"searchableFieldTableRow"} data-header={column.charAt(0).toUpperCase() + column.slice(1) + ": "}>
                                {row[column]}
                            </td>
                        ))}
                        <td className={"searchableFieldTableRow"} data-header="Actions">
                            {React.Children.map(children, (child) =>
                                React.cloneElement(child, { row })
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SearchableFieldTable;
