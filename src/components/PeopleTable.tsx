/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { getMotherOrFatherByName } from '../utils/getMotherOrFatherByName';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const location = useLocation();
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortBy = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort === value) {
      if (currentOrder) {
        newParams.delete('sort');
        newParams.delete('order');
      } else {
        newParams.set('order', 'desc');
      }
    } else {
      newParams.set('sort', value);
      if (currentOrder) {
        newParams.delete('order');
      }
    }

    setSearchParams(newParams);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a
                href="#/people?sort=name"
                onClick={event => {
                  event.preventDefault();
                  handleSortBy('name');
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !searchParams.has('sort', 'name'),
                      'fa-sort-up':
                        searchParams.has('sort', 'name') &&
                        !searchParams.has('order'),
                      'fa-sort-down':
                        searchParams.has('sort', 'name') &&
                        searchParams.has('order'),
                    })}
                  />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                onClick={event => {
                  event.preventDefault();
                  handleSortBy('sex');
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !searchParams.has('sort', 'sex'),
                      'fa-sort-up':
                        searchParams.has('sort', 'sex') &&
                        !searchParams.has('order'),
                      'fa-sort-down':
                        searchParams.has('sort', 'sex') &&
                        searchParams.has('order'),
                    })}
                  />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                onClick={event => {
                  event.preventDefault();
                  handleSortBy('born');
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !searchParams.has('sort', 'born'),
                      'fa-sort-up':
                        searchParams.has('sort', 'born') &&
                        !searchParams.has('order'),
                      'fa-sort-down':
                        searchParams.has('sort', 'born') &&
                        searchParams.has('order'),
                    })}
                  />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={event => {
                  event.preventDefault();
                  handleSortBy('died');
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !searchParams.has('sort', 'died'),
                      'fa-sort-up':
                        searchParams.has('sort', 'died') &&
                        !searchParams.has('order'),
                      'fa-sort-down':
                        searchParams.has('sort', 'died') &&
                        searchParams.has('order'),
                    })}
                  />
                </span>
              </a>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <NavLink
                to={{
                  pathname: `/people/${person.slug}`,
                  search: location.search,
                }}
                className={cn({ 'has-text-danger': person.sex === 'f' })}
              >
                {person.name}
              </NavLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                getMotherOrFatherByName(people, person.motherName) ? (
                  <NavLink
                    to={{
                      pathname: `/people/${getMotherOrFatherByName(people, person.motherName)}`,
                      search: location.search,
                    }}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </NavLink>
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                getMotherOrFatherByName(people, person.fatherName) ? (
                  <NavLink
                    to={{
                      pathname: `/people/${getMotherOrFatherByName(people, person.fatherName)}`,
                      search: location.search,
                    }}
                  >
                    {person.fatherName}
                  </NavLink>
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
