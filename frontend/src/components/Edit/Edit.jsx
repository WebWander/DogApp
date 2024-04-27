/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Image from "../Image/Image";
import { DogsContext } from "../../DogsProvider";
import Friends from "../Profile/Friends";

const Edit = () => {
  const [dogs, setDogs] = useState([]);
  const [dog, setDog] = useState(null);
  const { getDogs, getDogById, updateDog } = useContext(DogsContext);
  let friendId = null;
  const { id } = useParams();
  const navigate = useNavigate();

  
  useEffect(() => {
    async function main() {
      const dogs = await getDogs();
      setDogs(dogs);
    }
    main();
  }, [getDogs]);

  // Fetch the dog by id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDog = await getDogById(id);
        setDog(fetchedDog);
      } catch (error) {
        console.error("Error fetching dog:", error);
      }
    };

    fetchData();
  }, [getDogById, id]);


  if (dog) {
    friendId = dog.friends.map((d) => d.fId);
  }

  const editDog = async (event) => {
    event.preventDefault();
    const fName = event.target.friend.value;

    // Update the dog
    const updatedDog = await updateDog(dog.id, dog);
    setDog(updatedDog);

    // Update the friend's list
    if (fName) {
      const friendDog = dogs.find((d) => d.name === fName);
      if (friendDog) {
        const updatedFriendDog = {
          ...friendDog,
          friends: [...friendDog.friends, { fId: dog.id }],
        };
        await updateDog(friendDog.id, updatedFriendDog);

        // Update the dog's friend list
        dog.friends.push({ fId: friendDog.id });
        await updateDog(dog.id, dog);
      }
    }
    // Redirect to the profile page
    navigate(`/profile/${dog.id}`);
  };
  if (dog) {
    return (
      <>
        <h2>Edit Dog</h2>
        <div className="section">
          <form onSubmit={editDog}>
            <Image />
            <div className="form-group">
              Name{" "}
              <input
                type="text"
                id="name"
                value={dog.name}
                onChange={(e) => setDog({ ...dog, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              Nickname{" "}
              <input
                type="text"
                id="nick"
                value={dog.nick}
                onChange={(e) => setDog({ ...dog, nick: e.target.value })}
              />
            </div>
            <div className="form-group">
              Age{" "}
              <input
                type="text"
                id="age"
                value={dog.age}
                onChange={(e) => setDog({ ...dog, age: e.target.value })}
              />
            </div>
            <div className="form-group">
              Bio{" "}
              <input
                type="text"
                id="bio"
                value={dog.bio}
                onChange={(e) => setDog({ ...dog, bio: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Friends:</label>
              <Friends />
            </div>
            <div className="form-group">
              <label>Add a friend:</label>
              <select name="friend" id="friend">
                <option value="">Select a friend</option>
                {dogs.map((d) => {
                  if (d.id !== dog.id && !friendId.includes(d.id)) {
                    return (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <button>Save</button>
          </form>
          <div>
            <Link to="/">
              <button className="back-link">Go to Home Page</button>
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    <div>loading...</div>;
  }
}

export default Edit;
