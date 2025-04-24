// CharacterTable.jsx
import React, { useState } from "react";
import data from "./data/data.json";

const CharacterTable = () => {
  const [openRows, setOpenRows] = useState({});
  const [characters, setCharacters] = useState(data);

  const toggleRow = (index) => {
    setOpenRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const deleteRow = (index) => {
    setCharacters((prev) => prev.filter((_, i) => i !== index));
    setOpenRows((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Characters Table</h1>
      <table className="w-full border border-gray-300">
        <TableHeader />
        <tbody>
          {characters.map((entry, index) => (
            <CharacterRow
              key={index}
              index={index}
              character={entry.data}
              isOpen={openRows[index]}
              toggleRow={toggleRow}
              deleteRow={deleteRow}
              childrenData={entry.children}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableHeader = () => (
  <thead className="bg-gray-100 text-center">
    <tr>
      <th className="p-2">#</th>
      <th className="p-2">Name</th>
      <th className="p-2">Gender</th>
      <th className="p-2">Ability</th>
      <th className="p-2">Minimal distance</th>
      <th className="p-2">Weight</th>
      <th className="p-2">Born</th>
      <th className="p-2">In space since</th>
      <th className="p-2">Beer (l/y)</th>
      <th className="p-2">Knows the answer?</th>
      <th className="p-2 text-center">✖</th>
    </tr>
  </thead>
);

const CharacterRow = ({ index, character, isOpen, toggleRow, deleteRow, childrenData }) => (
  <React.Fragment>
    <tr
      className="cursor-pointer hover:bg-gray-50 transition group"
      onClick={() => toggleRow(index)}
    >
      <td className="p-2">{character.ID}</td>
      <td className="p-2">{character.Name}</td>
      <td className="p-2">{character.Gender}</td>
      <td className="p-2">{character.Ability}</td>
      <td className="p-2">{character["Minimal distance"]}</td>
      <td className="p-2">{character.Weight}</td>
      <td className="p-2">{character.Born}</td>
      <td className="p-2">{character["In space since"]}</td>
      <td className="p-2">{character["Beer consumption (l/y)"]}</td>
      <td className="p-2">{character["Knows the answer?"]}</td>
      <td
        className="p-2 text-center"
        onClick={(e) => {
          e.stopPropagation();
          deleteRow(index);
        }}
      >
        <span className="text-red-500 hover:text-red-700 text-lg cursor-pointer">❌</span>
      </td>
    </tr>
    {isOpen && <CharacterDetails childrenData={childrenData} />}
  </React.Fragment>
);

const CharacterDetails = ({ childrenData }) => (
  <tr>
    <td colSpan="11" className="bg-gray-50 p-4 text-sm">
      <div>
        <p className="font-semibold mb-2">Details:</p>
        {childrenData?.has_nemesis?.records?.length > 0 ? (
          <ul>
            {childrenData.has_nemesis.records.map((nemesis, nIndex) => (
              <li key={nIndex}>
                Nemesis ID: {nemesis.data.ID}, Alive: {nemesis.data["Is alive?"]}, Years:{" "}
                {nemesis.data["Years"] || "N/A"}
                {nemesis.children?.has_secrete?.records?.length > 0 && (
                  <ul className="ml-5 text-pink-600">
                    {nemesis.children.has_secrete.records.map((secret, sIndex) => (
                      <li key={sIndex}>Secret Code: {secret.data["Secrete Code"]}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No nemesis data available.</p>
        )}
      </div>
    </td>
  </tr>
);

export default CharacterTable;