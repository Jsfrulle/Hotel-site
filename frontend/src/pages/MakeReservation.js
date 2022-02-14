import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostReservations, GetReservations } from "reducers/reservationList";
import { UpdatehUser } from "reducers/user";
import hotelDetails from "reducers/hotelDetails";
import { ShowReservationComponent } from "components/ShowReservationComponent";

export const MakeReservation = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const reservation = useSelector((store) => store.reservationList.reservation);
  const coins = useSelector((store) => store.user.coins);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = useSelector((store) => store.hotelDetails.totalPrice);

  console.log(parseInt(coins) - parseInt(total));

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    } else {
      dispatch(GetReservations());
      dispatch(PostReservations());
      dispatch(UpdatehUser());

      dispatch(hotelDetails.actions.setRoomName(""));
    }
  }, [accessToken, navigate, dispatch]);

  const onClick = () => {
    navigate("/");
  };

  return (
    <div>
      <section className="ContainerComfirm">
        <ShowReservationComponent item={reservation} />

        <button className="btnUser1" onClick={onClick}>
          Home
        </button>
      </section>
    </div>
  );
};
