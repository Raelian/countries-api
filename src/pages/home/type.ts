export interface Country {
    cca3: string;
    tld: string[];
    name: {
        common: string;
        official: string;
        nativeName: {
            [key: string]: {
                official: string;
                common: string;
            };
        };
    };
    flags: {
        svg: string;
        png: string;
    };
    population: number;
    region: string;
    subregion: string;
    capital: string[];
    languages: {
        [key: string]: string;
    };
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    borders: string[];
}
  