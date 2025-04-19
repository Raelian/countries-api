import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import {Search, ChevronDown} from 'lucide-react';
import {Country} from "./type";
import "./Home.scss";

const Home = () => {
    const [allCountries, setAllCountries] = useState<Country[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isError, setError] = useState<boolean>(false);
    const [selectedRegion, setSelectedRegion] = useState<string>("All");
    const [searchInput, setSearchInput] = useState<string>("")
    const regions: string[] = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

    const navigate = useNavigate();

    const handleSelect = (region: string): void => {
        setSelectedRegion(region);
        setIsOpen(false);
    }

    useEffect(() => {
        axiosInstance
            .get<Country[]>("all?fields=cca3,tld,name,flags,population,region,capital,subregion,languages,currencies,borders")
            .then((response) => {
                setAllCountries(response.data);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    useEffect(() => {
        const filtered = allCountries.filter((country) => {
            const matchRegion = selectedRegion === "All" || country.region === selectedRegion;
            const searchLower = searchInput.toLowerCase();
            const matchesSearch = country.name.common.toLowerCase().includes(searchLower) ||
                country.capital?.some(cap => cap.toLowerCase().includes(searchLower));
            
            return matchRegion && matchesSearch;
        });

        setFilteredCountries(filtered);
    }, [searchInput, selectedRegion, allCountries]);

    const handleCountryClick = (countryName: string) => {
        const country = filteredCountries.find((c) => c.name.common === countryName);
        navigate("/details", {state: {country, allCountries: allCountries}});
    }

    if(isError) return <p>Failed to fetch countries!</p>;
    if(isLoading) return <p>Loading countries...</p>;

    return (
        <div className="home-container">
            <div className="input-container">
                <Search className="search-icon"/>
                <input
                    className="country-input"
                    value={searchInput} 
                    onChange={(e) => setSearchInput(e.target.value)} 
                    placeholder="Search for a country..."
                />
            </div>
            <div className="filter-container">
                <button className="filter-btn" onClick={() => setIsOpen(!isOpen)}>
                    Filter by Region
                    <ChevronDown className="down-arrow"/>
                </button>
                {isOpen && (
                    <ul className="dropdown-menu">
                        {regions.map((region) =>
                            <li
                                key={region}
                                onClick={() => handleSelect(region)}
                                className="dropdown-item"
                            >
                               {region} 
                            </li>
                        )}
                    </ul>
                )}
            </div>
            <div className="countries-container">
                <ul>
                    {filteredCountries.map((country) =>(
                        <li
                            key={country.name.common}
                            onClick={() => handleCountryClick(country.name.common)}
                        >
                            <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width={100}/>
                            <h3>{country.name.common}</h3>
                            <div>
                                <p>Population: </p>
                                <p>{new Intl.NumberFormat("en-US").format(country.population)}</p>
                            </div>
                            <div>
                                <p>Region: </p>
                                <p>{country.region}</p>
                            </div>
                            <div>
                                <p>Capital: </p>
                                <p>{country.capital}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Home;