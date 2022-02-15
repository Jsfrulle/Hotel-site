import React from "react";
import { useDispatch } from "react-redux";
import roomDetail from "reducers/roomDetail";

const IndividualsDropDown = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <select
        onChange={(e) =>
          dispatch(roomDetail.actions.setIndividuals(e.target.value))
        }
      >
        <option value={0}></option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </div>
  );
};

export default IndividualsDropDown;
