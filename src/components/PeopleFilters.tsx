import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);

    if (key === 'centuries') {
      const allCenturies = searchParams.getAll('centuries');

      if (value === null) {
        newParams.delete(key);
      } else if (allCenturies.includes(value)) {
        const updated = allCenturies.filter(c => c !== value);

        newParams.delete(key, value);
        updated.forEach(c => newParams.append(key, c));
      } else {
        newParams.append(key, value);
      }

      setSearchParams(newParams);

      return;
    }

    if (value === null) {
      newParams.delete(key);
    } else if (!searchParams.has(key, value)) {
      if (searchParams.has(key)) {
        newParams.delete(key);
      }

      newParams.append(key, value);
    }

    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          href="#"
          className={cn({ 'is-active': !searchParams.has('sex') })}
          onClick={event => {
            event.preventDefault();
            updateSearchParams('sex', null);
          }}
        >
          All
        </a>
        <a
          href="#"
          className={cn({
            'is-active':
              searchParams.has('sex') && searchParams.get('sex') === 'm',
          })}
          onClick={event => {
            event.preventDefault();
            updateSearchParams('sex', 'm');
          }}
        >
          Male
        </a>
        <a
          href="#"
          className={cn({
            'is-active':
              searchParams.has('sex') && searchParams.get('sex') === 'f',
          })}
          onClick={event => {
            event.preventDefault();
            updateSearchParams('sex', 'f');
          }}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.get('query') || ''}
            onChange={event => {
              event.preventDefault();

              const value = event.target.value;

              updateSearchParams('query', value ? value : null);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className={cn('button mr-1', {
                'is-info':
                  searchParams.has('centuries') &&
                  searchParams
                    .getAll('centuries')
                    .some(century => century === '16'),
              })}
              href="#"
              onClick={event => {
                event.preventDefault();

                updateSearchParams('centuries', '16');
              }}
            >
              16
            </a>

            <a
              data-cy="century"
              className={cn('button mr-1', {
                'is-info':
                  searchParams.has('centuries') &&
                  searchParams
                    .getAll('centuries')
                    .some(century => century === '17'),
              })}
              href="#"
              onClick={event => {
                event.preventDefault();

                updateSearchParams('centuries', '17');
              }}
            >
              17
            </a>

            <a
              data-cy="century"
              className={cn('button mr-1', {
                'is-info':
                  searchParams.has('centuries') &&
                  searchParams
                    .getAll('centuries')
                    .some(century => century === '18'),
              })}
              href="#"
              onClick={event => {
                event.preventDefault();

                updateSearchParams('centuries', '18');
              }}
            >
              18
            </a>

            <a
              data-cy="century"
              className={cn('button mr-1', {
                'is-info':
                  searchParams.has('centuries') &&
                  searchParams
                    .getAll('centuries')
                    .some(century => century === '19'),
              })}
              href="#"
              onClick={event => {
                event.preventDefault();

                updateSearchParams('centuries', '19');
              }}
            >
              19
            </a>

            <a
              data-cy="century"
              className={cn('button mr-1', {
                'is-info':
                  searchParams.has('centuries') &&
                  searchParams
                    .getAll('centuries')
                    .some(century => century === '20'),
              })}
              href="#"
              onClick={event => {
                event.preventDefault();

                updateSearchParams('centuries', '20');
              }}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#"
              onClick={event => {
                event.preventDefault();

                updateSearchParams('centuries', null);
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#"
          onClick={event => {
            event.preventDefault();

            setSearchParams({});
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
