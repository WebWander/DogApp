/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "./Image/Image";
import { DogsContext } from "../DogsProvider";

const Start = () => {
  const { getDogs, deleteDog } = useContext(DogsContext);
  const [dogs, setDogs] = useState([]);

  // Fetch all dogs
  useEffect(() => {
    const main = async () => {
      try {
        const fetch = await getDogs();
        setDogs(fetch);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
   main();
  }, [getDogs]);

  // Handler for deleting a dog
  const deleteHandler = async (id) => {
    try {
      await deleteDog(id);
      setDogs(dogs.filter((dog) => dog.id !== id));
    } catch (error) {
      console.error("Error! :", error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">
        <Link to="/" className="link">
          Dog App
        </Link>
      </h1>
      <h2 className="users">Users</h2>
      <div className="main-profile">
        <ul className="section">
          {dogs.map((d) => (
            <li key={d.id} className="dogs-list">
              <Image />
              <Link
                to={`/profile/${d.id}`}
                style={{ textDecoration: "none" }}
                className={d.present ? "green" : "red"}
              >
                @{d.name}
              </Link>
              <button onClick={() => deleteHandler(d.id)}> X </button>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/create" className="link-button">
        <button className="create-new">Create a New Dog</button>
      </Link>
    </div>
  );
}

export default Start;
