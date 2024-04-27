/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { DogsContext } from "../../DogsProvider";

const Attendance = ({ dog, setDog }) => {
  const { updateDog } = useContext(DogsContext);
  const [check, setCheck] = useState(dog.present);

  // Handler for change the dogs presence when clicked
  const presentHandler = async (event) => {
    event.preventDefault();
    setCheck(!check);
    const data = await updateDog(dog.id, {
      ...dog,
      present: !check,
    });
    setDog({ ...dog, present: data.present });
  };

  return (
    <div className="prsentdiv">
      Present
      <input
        type="checkbox"
        name="present"
        onChange={presentHandler}
        checked={check}
      />{""}
    </div>
  );
}

export default Attendance;
