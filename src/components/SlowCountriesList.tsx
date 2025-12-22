export const SlowCountriesList = ({country}: {country: {name: string; code: string;}})=> {
    const start = performance.now();

    while (performance.now() - start < 2) {
        // imitate slow rerendering
    }

    return (
        <li style={{
            display: 'flex',
            flexWrap: 'wrap',
        }}>
            {<span>{country.code}: {country.name}</span>}
        </li>
    )
}