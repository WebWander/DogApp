/* eslint-disable react/prop-types */ // Disable prop-types linting for this file
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DogsContext } from "../../DogsProvider";
import Image from "../Image/Image";

const Create = () => {
  const [dogs, setDogs] = useState([]);
  const { getDogs, createDog, updateDog } = useContext(DogsContext);
  const [friend, setfriend] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const main = async() => {
      const fetch = await getDogs();
      setDogs(fetch);
    }
    main();
  }, [getDogs]);

  const addDog = async (event) => {
    event.preventDefault();

    // Create a friend object
    const createFriend = (friendName) => {
      if (friendName) {
        const findedDog = dogs.find((d) => d.name === friendName);
        const friend = {
          fId: findedDog.id,
        };
        return friend;
      }
    };

    // Create the dog data
    const dogData = {
      name: event.target.name.value,
      nick: event.target.nick.value,
      age: event.target.age.value,
      bio: event.target.bio.value,
      present: true,
      friends: createFriend(event.target.friend.value),
    };

    // Create the new dog
    const newDog = await createDog(dogData);
    setDogs([...dogs, newDog]);

    // Update the friend's list
    if (friend) {
      const matchedFriend = dogs.find((dog) => dog.name === friend);
      if (matchedFriend) {
        matchedFriend.friends.push({ fId: newDog.id });
        await updateDog(matchedFriend.id, matchedFriend);
      }
    }

    // Redirect to the home page
    navigate("/");
  };

  return (
    <>
      <div className="create">
        <h2 >Create New Profile</h2>
      </div>
      <div className="section">
        <div className="image">
          <Image />
        </div>
        <form onSubmit={addDog}>
          Name <input id="name" type="text" placeholder="Enter name" required />
          <br />
          Nickname{" "}
          <input id="nick" type="text" placeholder="Enter nickname" required />
          <br />
          Age <input type="number" id="age" placeholder="Enter age" required />
          <br />
          Bio <input id="bio" type="text" placeholder="Enter bio" required />
          <br />
          <br />
          <select
            name="friend"
            value={friend}
            onChange={(e) => setfriend(e.target.value)}
          >
            <option value="" >Select a friend</option>
            {dogs.map((dog) => (
              <option key={dog.id} value={dog.name}>
                {dog.name}
              </option>
            ))}
          </select>
          <br />
          <button>Create</button>
          <Link to="/">
            <button className="back-link">Back to Home Page</button>
          </Link>
        </form>
        <br />
        
        
       
      </div>
    </>
  );
}

export default Create;
