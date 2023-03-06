import "./home.css";
import { BiSearch, BiChevronDown } from "react-icons/bi";
import { useEffect, useState } from "react";
import api from "../../request/axios";
import CountryCard from "./CountryCard/CountryCard";
import { ThreeDots } from "react-loader-spinner";

function Home() {
  const [countries, setCountries] = useState([]);
  const [countriesRes, setCountriesRes] = useState([]);
  //const [random, setRandom] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const iconStyle = {
    color: "white",
    position: "absolute",
    top: "0.75rem",
    right: "1rem",
    cursor: "pointer",
  };

  function fetchFun() {
    setLoading(true);
    api
      .get(`/all/`)
      .then((res) => {
        setCountries(res.data);
        setCountriesRes(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchFun();
  }, []);
  const [regionActive, setRegionActive] = useState(false);

  function Search(countriesEl, search) {
    const searchResult = [];
    const matchingElements = [];
    countriesEl.map((country) => {
      if (
        country.name.common === search ||
        country.name.common === search.toLowerCase()
      ) {
        matchingElements.push(country);
      }
      if (
        country.name.common.toLowerCase() === search ||
        country.name.common.toLowerCase() === search.toLowerCase()
      ) {
        matchingElements.push(country);
      }
      if (
        country.name.common === search ||
        country.name.common === search.toUpperCase()
      ) {
        matchingElements.push(country);
      }
      if (
        country.name.common.toUpperCase() === search ||
        country.name.common.toUpperCase() === search.toUpperCase()
      ) {
        matchingElements.push(country);
      }
      if (
        country.name.common.indexOf(search) >= 0 ||
        country.name.common.indexOf(search.toLowerCase()) >= 0
      ) {
        matchingElements.push(country);
      }
      if (
        country.name.common.indexOf(search) >= 0 ||
        country.name.common.indexOf(search.toUpperCase()) >= 0
      ) {
        matchingElements.push(country);
      }
    });
    matchingElements.map((x) => {
      const el = searchResult.find((k) => k.name.common === x.name.common);
      if (!el) {
        searchResult.push(x);
      }
    });

    if (!searchResult.length) {
      console.log("Not found!");
    } else if (searchResult.length) {
      console.log(searchResult);
      setCountries(searchResult);
    }
  }

  function SortCountries(countriesEl, method) {
    const matchingElementsReg = [];
    countriesEl.map((country) => {
      if (country.region === method) {
        matchingElementsReg.push(country);
      }
    });
    console.log(matchingElementsReg);
    setCountries(matchingElementsReg);
  }

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
          <div className="body_home">
            <div className="head_body_home">
              <div className="form_search">
                <input
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      Search(countriesRes, e.target.value);
                    }
                  }}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      fetchFun();
                    }
                  }}
                  type="text"
                  placeholder="Search for a country..."
                />
                <BiSearch size="30px" style={iconStyle} />
              </div>
              <div className="filter_region">
                <div
                  onClick={() => setRegionActive(!regionActive)}
                  className="btn_filter_region"
                >
                  <p>Filter by region</p>
                  <button>
                    <BiChevronDown
                      style={{
                        backgroundColor: "var(--el-dark-blue)",
                        color: "white",
                        marginTop: "-5px",
                        cursor: "pointer",
                      }}
                      size="30px"
                    />
                  </button>
                </div>
                <div className={regionActive ? "drop_filter_region" : "hide"}>
                  <button
                    onClick={() => {
                      setRegionActive(false);
                      SortCountries(countriesRes, "Africa");
                    }}
                  >
                    Africa
                  </button>
                  <button
                    onClick={() => {
                      setRegionActive(false);
                      SortCountries(countriesRes, "Americas");
                    }}
                  >
                    America
                  </button>
                  <button
                    onClick={() => {
                      setRegionActive(false);
                      SortCountries(countriesRes, "Asia");
                    }}
                  >
                    Asia
                  </button>
                  <button
                    onClick={() => {
                      setRegionActive(false);
                      SortCountries(countriesRes, "Europe");
                    }}
                  >
                    Europe
                  </button>
                  <button
                    onClick={() => {
                      setRegionActive(false);
                      SortCountries(countriesRes, "Oceania");
                    }}
                  >
                    Oceania
                  </button>
                </div>
              </div>
            </div>
            <div className="middle_body_home">
              {countries.map((country) => (
                <>
                  <CountryCard
                    name={country.name.common}
                    population={country.population}
                    region={country.continents}
                    capital={country.capital}
                    flag={country.flags.png}
                  />
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
