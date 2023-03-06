import "./countrycard.css";

/* eslint-disable react/prop-types */

function CountryCard(props) {
  return (
    <>
      <a
        href={`country/${props.name}`}
        style={{ textDecoration: "none" }}
        className="card_home"
      >
        <img src={props.flag} />
        <p className="title_card">{props.name}</p>
        <div className="description_card">
          <p className="description_text">
            <b>Population: </b>
            {props.population.toLocaleString("en-US")}
          </p>
          <p className="description_text">
            <b>Region: </b>
            {props.region}
          </p>
          <p className="description_text">
            <b>Capital: </b>
            {props.capital}
          </p>
        </div>
      </a>
    </>
  );
}

export default CountryCard;
