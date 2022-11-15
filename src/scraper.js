import neatCsv from 'neat-csv';
import axios from 'axios';
const url = 'https://covid.ourworldindata.org/data/owid-covid-data.csv';
export async function scrape() {
    const response = await axios.get(url, {
        headers: {
            Accept: 'text/csv'
        }
    });

    const csv = await neatCsv(response.data);
    const chronological = {};

    for (const entry of csv) {
        if (!chronological[entry.location]) {
            chronological[entry.location] = {
                iso_code: entry.iso_code,
                continent: entry.continent,
                location: entry.location,
                data: [],
                corona_data: []
            };
        }

        chronological[entry.location].corona_data.push({
            date: entry.date,
            total_cases: entry.total_cases,
            new_cases: entry.new_cases,
            new_cases_smoothed: entry.new_cases_smoothed,
            total_deaths: entry.total_deaths,
            new_deaths: entry.new_deaths,
            new_deaths_smoothed: entry.new_deaths_smoothed,
            total_cases_per_million: entry.total_cases_per_million,
            new_cases_per_million: entry.new_cases_per_million,
            new_cases_smoothed_per_million:
                entry.new_cases_smoothed_per_million,
            total_deaths_per_million: entry.total_deaths_per_million,
            new_deaths_per_million: entry.new_deaths_per_million,
            new_deaths_smoothed_per_million:
                entry.new_deaths_smoothed_per_million,
            reproduction_rate: entry.reproduction_rate,
            icu_patients: entry.icu_patients,
            icu_patients_per_million: entry.icu_patients_per_million,
            hosp_patients: entry.hosp_patients,
            hosp_patients_per_million: entry.hosp_patients_per_million,
            weekly_icu_admissions: entry.weekly_icu_admissions,
            weekly_icu_admissions_per_million:
                entry.weekly_icu_admissions_per_million,
            weekly_hosp_admissions: entry.weekly_hosp_admissions,
            weekly_hosp_admissions_per_million:
                entry.weekly_hosp_admissions_per_million,
            new_tests: entry.new_tests,
            total_tests: entry.total_tests,
            total_tests_per_thousand: entry.total_tests_per_thousand,
            new_tests_per_thousand: entry.new_tests_per_thousand,
            new_tests_smoothed: entry.new_tests_smoothed,
            new_tests_smoothed_per_thousand:
                entry.new_tests_smoothed_per_thousand,
            positive_rate: entry.positive_rate,
            tests_per_case: entry.tests_per_case,
            tests_units: entry.tests_units,
            total_vaccinations: entry.total_vaccinations,
            people_vaccinated: entry.people_vaccinated,
            people_fully_vaccinated: entry.people_fully_vaccinated,
            total_boosters: entry.total_boosters,
            new_vaccinations: entry.new_vaccinations,
            new_vaccinations_smoothed: entry.new_vaccinations_smoothed,
            total_vaccinations_per_hundred:
                entry.total_vaccinations_per_hundred,
            people_vaccinated_per_hundred: entry.people_vaccinated_per_hundred,
            people_fully_vaccinated_per_hundred:
                entry.people_fully_vaccinated_per_hundred,
            total_boosters_per_hundred: entry.total_boosters_per_hundred,
            new_vaccinations_smoothed_per_million:
                entry.new_vaccinations_smoothed_per_million,
            stringency_index: entry.stringency_index
        });

        chronological[entry.location].data.push({
            date: entry.date,
            population: entry.population,
            population_density: entry.population_density,
            median_age: entry.median_age,
            aged_65_older: entry.aged_65_older,
            aged_70_older: entry.aged_70_older,
            gdp_per_capita: entry.gdp_per_capita,
            extreme_poverty: entry.extreme_poverty,
            cardiovasc_death_rate: entry.cardiovasc_death_rate,
            diabetes_prevalence: entry.diabetes_prevalence,
            female_smokers: entry.female_smokers,
            male_smokers: entry.male_smokers,
            handwashing_facilities: entry.handwashing_facilities,
            hospital_beds_per_thousand: entry.hospital_beds_per_thousand,
            life_expectancy: entry.life_expectancy,
            human_development_index: entry.human_development_index,
            excess_mortality_cumulative_absolute:
                entry.excess_mortality_cumulative_absolute,
            excess_mortality_cumulative: entry.excess_mortality_cumulative,
            excess_mortality: entry.excess_mortality,
            excess_mortality_cumulative_per_million:
                entry.excess_mortality_cumulative_per_million
        });
    }

    for (const key in chronological) {
        if (Object.hasOwnProperty.call(chronological, key)) {
            chronological[key].data.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
            chronological[key].corona_data.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
        }
    }
    return { csv, chronological };
}
