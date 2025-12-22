import {useState, useEffect, memo} from "react";
import {SlowCountriesList} from './SlowCountriesList.tsx';
import {useDidUpdate} from "../hooks/useDidUpdate.ts";
import {countries} from "../data/countries.ts";

let timerId: number;

type Country = typeof countries[number];

const fetchCountries = async () => {
    clearTimeout(timerId);
    return new Promise<Country[]>((resolve) => {
        timerId = setTimeout(async () => {
            resolve(countries);
        }, 2000)
    })
};

export const SlowCountries = memo(function SlowCountries({ query }:  {query: string}) {
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState<Country[]>([]);

    query = query.toLowerCase();

    useEffect(() => {
        fetchCountries().then((countries) => {
            setCountries(countries);
            setLoading(false);
        })
    }, []);

    useDidUpdate(() => {
        console.log('I run only after the data loads and the UI updates excluding intermediate effects', {query});
    }, [query])

    return (
        <ul className="items">
            {loading ? <h4>Loading data...</h4> : countries.filter(({name}) => name.toLowerCase().includes(query)).map(country => (
                    <SlowCountriesList key={`${country.code}:${country.name}`} country={country} />
                ))}
        </ul>
    );
});