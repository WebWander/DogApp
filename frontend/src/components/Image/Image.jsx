import { useState, useEffect } from "react";
import axios from "axios";

const Image = () => {
  const [Image, setImage] = useState("");

  useEffect(() => {
    // Fetch image of random dog from the given url
    const fetchImage = async () => {
      try {
        const resp = await axios.get("https://dog.ceo/api/breeds/image/random");
        if (resp.status !== 200) {
          throw new Error("Error fetching dog image");
        }
        const dog = resp.data;
    
        setImage(dog.message);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="images">
      <img src={Image} alt="" width="200px" height="200px" />
    </div>
  );
}
export default Image;
