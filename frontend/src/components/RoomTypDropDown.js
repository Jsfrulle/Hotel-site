import React from "react";
import { useDispatch } from "react-redux";
import roomDetail from "reducers/roomDetail";

const RoomTypDropDown = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <select
        className="FormdropDownItem"
        onChange={(e) =>
          dispatch(roomDetail.actions.setRoomType(e.target.value))
        }
      >
        <option value={"none"}></option>
        <option value={"single"}>Single</option>
        <option value={"twin"}>Twin</option>
        <option value={"double"}>Double</option>
        <option value={"room"}>Room</option>
        <option value={"suite"}>Suite</option>
        <option value={"king"}>King</option>
        <option value={"deluxe"}>Deluxe</option>
      </select>
    </div>
  );
};

export default RoomTypDropDown;
