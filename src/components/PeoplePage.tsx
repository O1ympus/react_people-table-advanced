import { Loader } from './Loader';
import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { arePeopleEmpty } from '../utils/arePeopleEmpty';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  const name = searchParams.get('query')?.toLowerCase();
  const sex = searchParams.get('sex')?.toLowerCase();
  const centuries = searchParams.getAll('century');

  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
        const data = await getPeople();

        setPeople(data);
        setAllPeople(data);
      } catch {
        setErrorMessage('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  useEffect(() => {
    const fetchFilteredPeople = async () => {
      try {
        let filtered = [...allPeople];

        if (name) {
          filtered = filtered.filter(
            person =>
              person.name.toLowerCase().includes(name.toLowerCase()) ||
              person.fatherName?.toLowerCase().includes(name.toLowerCase()) ||
              person.motherName?.toLowerCase().includes(name.toLowerCase()),
          );
        }

        if (sex) {
          filtered = filtered.filter(person => person.sex === sex);
        }

        if (centuries.length) {
          filtered = filtered.filter(person =>
            centuries.some(
              century => Math.ceil(person.born / 100) === +century,
            ),
          );
        }

        if (sortParam) {
          const multiplier = orderParam ? -1 : 1;

          filtered.sort((person1, person2) => {
            switch (sortParam) {
              case 'name':
                return multiplier * person1.name.localeCompare(person2.name);
              case 'sex':
                return multiplier * person1.sex.localeCompare(person2.sex);
              case 'born':
                return multiplier * (person1.born - person2.born);
              case 'died':
                return multiplier * (person1.died - person2.died);
              default:
                return 0;
            }
          });
        }

        setPeople(filtered);
      } catch {
        setErrorMessage('Something went wrong');
      }
    };

    fetchFilteredPeople();
  }, [allPeople, name, sex, centuries, sortParam, orderParam]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !errorMessage && people.length && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  errorMessage
                </p>
              )}

              {!isLoading && !errorMessage && arePeopleEmpty(people) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !errorMessage && !arePeopleEmpty(people) && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
