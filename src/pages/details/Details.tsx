import { useLocation, useNavigate } from "react-router-dom";
import {Country} from "../home/type";
import {ArrowLeft, Home} from "lucide-react";
import './Details.scss';

interface LocationState{
    country: Country;
    allCountries: Country[];
}

const Details = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {country, allCountries} = location.state as LocationState;

    const nativeName = Object.values(country.name.nativeName)[0]?.common || country.name.common;
    const currencyList = Object.values(country.currencies).map(c => c.name);
    const currencyName = currencyList.length === 1 ? currencyList[0] : currencyList.join(", ");
    const languages = Object.values(country.languages).join(", ");

    const handleBorderCountryClick = (borderCountryCode: string) => {
        const borderCountry = allCountries.find(c => c.cca3 === borderCountryCode);
        if(borderCountry) {
            navigate("/details", {state: {country: borderCountry, allCountries}});
        }
    };

    return (
        <div className="details-container">
            <div className="buttons-container">
                <button onClick={() => navigate(-1)}>
                    <ArrowLeft className="icon"/>
                    Back
                </button>
                <button onClick={() => navigate("/")}>
                    <Home className="icon"/>
                    Home
                </button>
            </div>
            <div className="country-container">
                <img src={country.flags.svg} alt={country.name.common} width={500}/>
                <div className="country-details">
                    <h2>{country.name.common}</h2>
                    <div className="country-stats">
                        <div className="stats">
                            <p>
                                <strong>Native Name: </strong>
                                {nativeName}
                            </p>
                            <p>
                                <strong>Population: </strong> 
                                {new Intl.NumberFormat("en-US").format(country.population)}
                            </p>
                            <p>
                                <strong>Region: </strong>
                                {country.region}
                            </p>
                            <p>
                                <strong>Sub Region: </strong>
                                {country.subregion}
                            </p>
                            <p>
                                <strong>Capital: </strong>
                                {country.capital[0]}
                            </p>
                        </div>
                        <div className="stats">
                            <p>
                                <strong>Top Level Domain: </strong>
                                {country.tld}
                            </p>
                            <p>
                                <strong>Currencies: </strong>
                                {currencyName}
                            </p>
                            <p>
                                <strong>Languages: </strong>
                                {languages}
                            </p>
                        </div>
                    </div>
                    <div className="border-countries-container">
                        <p> 
                            <strong>Border Countries:</strong>
                        </p>
                        <div className="border-countries">
                            {country.borders?.length ? (
                                country.borders.map((borderCountryCode) => {
                                    const borderCountry = allCountries.find(c => c.cca3 === borderCountryCode);
                                    return (
                                        borderCountry ? (
                                            <button
                                                key={borderCountry.cca3}
                                                onClick={() => handleBorderCountryClick(borderCountry.cca3)}
                                            >
                                                {borderCountry.name.common}
                                            </button>
                                        ) : null
                                    );
                                })
                            ) : (
                                <p>None</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Details;