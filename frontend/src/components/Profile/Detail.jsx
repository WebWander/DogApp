/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import Friends from "./Friends";
import { DogsContext } from "../../DogsProvider";
import { Link, useParams } from "react-router-dom";


const Detail = () => {
  const { getDogById } = useContext(DogsContext);
  const [dog, setDog] = useState(null);
  const { id } = useParams();

 // Fetch the dog by id
 useEffect(() => {
  const main = async () => {
    const fetch = await getDogById(id);
    setDog(fetch);
  };
  main();
}, [id, getDogById]);

  if (dog) {
    return (
      <div className="infodiv">
        <p>
          Name: {dog.name} <Link to={`/edit/${dog.id}`}>Edit</Link>
        </p>
        <p>Nick: {dog.nick}</p>
        <p>Age: {dog.age}</p>
        <p>Bio: {dog.bio}</p>
        <br />
        Friends:
        <Friends />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default Detail;
