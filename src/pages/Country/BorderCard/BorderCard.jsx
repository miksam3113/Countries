import "./borderCard.css";
import { useEffect, useState } from "react";
import api from "../../../request/axios";
import { ThreeDots } from "react-loader-spinner";

function BorderCard(props) {
  const [borders, setBorders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    api
      // eslint-disable-next-line react/prop-types
      .get(`/alpha/${props.border}/`)
      .then((res) => {
        setBorders(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {loading ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="white"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ justifyContent: "center", marginTop: "20%" }}
          wrapperClassName=""
          visible={false}
        />
      ) : (
        <a href={`/country/${borders.name.common}`} className="border_card">
          <p>{borders.name.common}</p>
        </a>
      )}
    </>
  );
}

export default BorderCard;
