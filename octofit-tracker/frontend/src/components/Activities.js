import React, { useEffect, useState } from 'react';
import { getApiUrl } from '../apiConfig';

const formatValue = (value) => {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2);
  }
  return String(value);
};

function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loadData = async () => {
    const endpoint = getApiUrl('activities');
    console.log('Activities endpoint:', endpoint);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint);
      console.log('Activities response status:', response.status);
      const data = await response.json();
      console.log('Activities fetched data:', data);
      const payload = data && typeof data === 'object' && 'results' in data ? data.results : data;
      setItems(Array.isArray(payload) ? payload : []);
    } catch (err) {
      console.error('Activities fetch error:', err);
      setError('Unable to load activities data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = items.length ? Object.keys(items[0]) : [];
  const filteredItems = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <section className="resource-card">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <div>
              <h2 className="h4">Activities</h2>
              <p className="text-muted mb-0">Pull activity data from the backend REST API and view it in a Bootstrap table.</p>
            </div>
            <div className="mt-3 mt-md-0">
              <button type="button" className="btn btn-primary me-2" onClick={loadData} disabled={loading}>
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setFilterText('')}>
                Clear search
              </button>
            </div>
          </div>

          <form className="row g-3 mb-4">
            <div className="col-12 col-md-6">
              <label htmlFor="activitiesFilter" className="form-label">Search activities</label>
              <input
                id="activitiesFilter"
                type="search"
                className="form-control"
                placeholder="Filter activities..."
                value={filterText}
                onChange={(event) => setFilterText(event.target.value)}
              />
            </div>
          </form>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  {columns.length > 0 ? columns.map((column) => <th key={column}>{column}</th>) : <th>No data available</th>}
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={Math.max(columns.length + 1, 2)}>
                      {loading ? 'Loading activities...' : 'No activities found.'}
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item, rowIndex) => (
                    <tr key={item.id ?? rowIndex}>
                      {columns.map((column) => (
                        <td key={column}>
                          <pre className="mb-0 small text-wrap">{formatValue(item[column])}</pre>
                        </td>
                      ))}
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowModal(true);
                          }}
                        >
                          View JSON
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && selectedItem && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Activity details</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)} />
                </div>
                <div className="modal-body">
                  <pre className="small">{JSON.stringify(selectedItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </section>
  );
}

export default Activities;
