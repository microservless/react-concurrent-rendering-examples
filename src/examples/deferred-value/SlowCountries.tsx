import { useState, useEffect, memo, useTransition } from "react";
import { SlowCountriesList } from './SlowCountriesList.tsx';
import { useDidUpdate } from "../../hooks/useDidUpdate.ts";
import { countries } from "../../data/countries.ts";

type Country = typeof countries[number];

const fetchCountries = async () => {
    return new Promise<Country[]>((resolve) => {
        setTimeout(() => {
            resolve(countries);
        }, 2000);
    })
};

export const SlowCountries = memo(function SlowCountries({ query }: { query: string }) {
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState<Country[]>([]);
    const [_, startTransition] = useTransition();

    query = query.toLowerCase();

    useEffect(() => {
        let canceled = false;

        fetchCountries().then((countries) => {
            if (!canceled) {
                startTransition(() => {
                    setCountries(countries);
                    setLoading(false);
                })
            }

        })

        return () => {
            canceled = true;
        }
    }, []);

    useDidUpdate(() => {
        console.log('I run only after the data loads and the UI updates excluding intermediate effects', { query });
    }, [query])

    if (loading) {
        return <h4>Loading data...</h4>
    }

    return countries.filter(({ name }) => name.toLowerCase().includes(query)).map(country => (
        <SlowCountriesList key={`${country.code}:${country.name}`} country={country} />
    ));
});