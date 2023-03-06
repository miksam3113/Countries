import { useHref } from "react-router";
import { useEffect, useState } from "react";
import api from "../../request/axios";
import "./country.css";
import { MdKeyboardBackspace } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";
import BorderCard from "./BorderCard/BorderCard";

function Country() {
  const countryName = useHref().slice(9);
  // eslint-disable-next-line no-unused-vars
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    api
      .get(`/name/${countryName.toLowerCase()}/`)
      .then((res) => {
        setCountry(res.data[0]);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const objFun = (countryObj, method) => {
    const values = Object.values(countryObj);

    for (const value of values) {
      return value[method];
    }
  };
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
          visible={true}
        />
      ) : (
        <>
          <div className="header">
            <a href="/" className="title_header">
              Countries
            </a>
          </div>
          <div className="body_country">
            <div className="head_body_country">
              <a href="/" className="btn_back_country">
                <MdKeyboardBackspace size="24" />
                <p>Back</p>
              </a>
            </div>
            <div className="middle_body_country">
              <img src={country.flags.svg} />
              <div className="content_middle_country">
                <p className="title_content_middle">{country.name.common}</p>
                <div className="description_content_country">
                  <p className="desc_content_text">
                    <b>Native Name: </b>
                    {objFun(country.name.nativeName, "common")}
                  </p>
                  <p className="desc_content_text">
                    <b>Population: </b>
                    {country.population.toLocaleString("en-US")}
                  </p>
                  <p className="desc_content_text">
                    <b>Region: </b>
                    {country.region}
                  </p>
                  <p className="desc_content_text">
                    <b>Capital: </b>
                    {country.capital[0]}
                  </p>
                  <p className="desc_content_text">
                    <b>Top Level Domain: </b>
                    {country.tld[0]}
                  </p>
                  <p className="desc_content_text">
                    <b>Currencies: </b>
                    {objFun(country.currencies, "name")},{" "}
                    {objFun(country.currencies, "symbol")}
                  </p>
                </div>
                <div className="border_country">
                  <p>Border Countries: </p>
                  {country.borders &&
                    country.borders.map((border) => (
                      <>
                        <BorderCard border={border.toLowerCase()} />
                      </>
                    ))}
                  {!country.borders && (
                    <>
                      <p style={{ marginLeft: "5px", fontWeight: "500" }}>
                        Not Countries
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Country;
