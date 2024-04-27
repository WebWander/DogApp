/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { DogsContext } from "../../DogsProvider";
import { Link, useNavigate, useParams } from "react-router-dom";

const Friends = () => {
  const { getDogs, updateDog, getDogById } = useContext(DogsContext);
  const [dogs, setDogs] = useState([]);
  const [dog, setDog] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

 // Fetch all dogs
  useEffect(() => {
    const main = async() => {
      try {
        const fetch = await getDogs();
        setDogs(fetch);
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    }
    main();
  }, [getDogs]);

  // Fetch the dog by id
  useEffect(() => {
    async function fetchDog() {
      try {
        const d = await getDogById(id);
        setDog(d);
      } catch (error) {
        console.error("Error fetching dog:", error);
      }
    }
    fetchDog();
  }, [getDogById, id]);

  // Handler for deleting a friend
  const deleteHandler = async (e, friendId) => {
    e.preventDefault();
    const newFriends = dog.friends.filter((friend) => friend.fId !== friendId);

    // Update the dog's friends list
    const updatedDog = {
      ...dog,
      friends: newFriends,
    };

    await getDogById(dog.id, updatedDog);
    const matchedDog = dogs.find((d) => d.id === friendId);

    // Update the friend's friends list
    const dogFriends = matchedDog.friends.filter(
      (friend) => friend.fId !== dog.id
    );

    // Update the friend's friends list if matched
    if (matchedDog) {
      const updatedMatchedDog = {
        ...matchedDog,
        friends: dogFriends,
      };

      await updateDog(matchedDog.id, updatedMatchedDog);
    }

    setDog(updatedDog);

    // Redirect to the profile page
    navigate(`/profile/${dog.id}`);
  };

  if (dog) {
    return (
      <ul className="friendList">
        {dog.friends.map((friend) => {
          const matchedDog = dogs.find((d) => d.id === friend.fId);
          if (matchedDog) {
            return (
              <li key={friend.fId} className="friend-list">
                <Link
                  to={`/profile/${matchedDog.id}`}
                  style={{ textDecoration: "none" }}
                >
                  @{matchedDog.name}
                </Link>
                <button onClick={(e) => deleteHandler(e, friend.fId)}>
                  X
                </button>
              </li>
            );
          }
        })}
      </ul>
    );
  } else {
    return <div>Loading</div>;
  }
}

export default Friends;
