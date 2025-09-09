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
                href="#"
                onClick={event => {
                  event.preventDefault();
                  handleSortBy('name');
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': searchParams.get('sort') !== 'name',
                      'fa-sort-up':
                        searchParams.get('sort') === 'name' &&
                        !searchParams.has('order'),
                      'fa-sort-down':
                        searchParams.get('sort') === 'name' &&
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
                href="#"
                onClick={event => {
                  event.preventDefault();
                  handleSortBy('sex');
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': searchParams.get('sort') !== 'sex',
                      'fa-sort-up':
                        searchParams.get('sort') === 'sex' &&
                        !searchParams.has('order'),
                      'fa-sort-down':
                        searchParams.get('sort') === 'sex' &&
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
                href="#"
                onClick={event => {
                  event.preventDefault();
                  handleSortBy('born');
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': searchParams.get('sort') !== 'born',
                      'fa-sort-up':
                        searchParams.get('sort') === 'born' &&
                        !searchParams.has('order'),
                      'fa-sort-down':
                        searchParams.get('sort') === 'born' &&
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
                href="#"
                onClick={event => {
                  event.preventDefault();
                  handleSortBy('died');
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': searchParams.get('sort') !== 'died',
                      'fa-sort-up':
                        searchParams.get('sort') === 'died' &&
                        !searchParams.has('order'),
                      'fa-sort-down':
                        searchParams.get('sort') === 'died' &&
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
        {people.map(person => {
          const motherSlug = person.motherName
            ? getMotherOrFatherByName(people, person.motherName)
            : null;

          const fatherSlug = person.fatherName
            ? getMotherOrFatherByName(people, person.fatherName)
            : null;

          return (
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
                  motherSlug ? (
                    <NavLink
                      to={{
                        pathname: `/people/${motherSlug}`,
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
                  fatherSlug ? (
                    <NavLink
                      to={{
                        pathname: `/people/${fatherSlug}`,
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
          );
        })}
      </tbody>
    </table>
  );
};
