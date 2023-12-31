import React from "react";
import DoctorCard from "../../components/Doctors/DoctorCard";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../config";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetch(`${BASE_URL}/users/appointments/my-appoinments`);
  // console.log(appointments);
  return (
    <div>
      {loading && !error && <Loading />}

      {error && !loading && <Error errorMessage={error} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-5 text-headingColor leading-7 text-[20px] font-semibold text-primaryColor ">
          {" "}
          You did not book any doctor yet
        </h2>
      )}
    </div>
  );
};

export default MyBookings;
