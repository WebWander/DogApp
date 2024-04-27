/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Image from "../Image/Image";
import Detail from "./Detail";
import Attendance from "./Attendance";
import { DogsContext } from "../../DogsProvider";

const Profile = () => {
  const [dog, setDog] = useState(null);
  const { getDogById } = useContext(DogsContext);
  const { id } = useParams();

 // Fetch the dog by id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDog = await getDogById(id);
        setDog(fetchedDog);
      } catch (error) {
        console.error("Error fetching a dog: ", error);
      }
    };

    fetchData();
  }, [getDogById, id]);

  if (dog) {
    return (
      <>
        <h2 className="greeting">Welcome to {dog.name}&apos;s Profile</h2>
        <div className="main">
          <div className="image">
            <Image />
          </div>
          <Attendance dog={dog} setDog={setDog} />
        </div>
        <Detail dog={dog} setDog={setDog} />
        <Link to="/">
            <button className="home-link">Back to Home Page</button>
        </Link>
        
      </>
    );
  } else {
    return <div>loading...</div>;
  }
}

export default Profile;
