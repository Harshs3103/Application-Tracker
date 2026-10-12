import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const STATUSES = ["Applied", "Interview", "Rejected", "Offer"];

const badgeClass = {
  Applied: "badge-info",
  Interview: "badge-warning",
  Rejected: "badge-error",
  Offer: "badge-success",
};

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ company: "", role: "", link: "" });
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // one place to handle errors from the server
  const handleError = (err) => {
    if (err.response) {
      if (err.response.status === 401) return logout(); // bad or expired token
      setError(err.response.data.error || err.response.data.message);
    } else {
      setError("Cannot reach server");
    }
  };

  // runs once when the page opens
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        handleError(err);
      }
    };
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addJob = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = { company: form.company, role: form.role };
      if (form.link) data.link = form.link;

      const res = await api.post("/jobs", data);
      setJobs([res.data, ...jobs]); // put the new job at the top
      setForm({ company: "", role: "", link: "" });
    } catch (err) {
      handleError(err);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      const res = await api.put(`/jobs/${id}`, { status });
      setJobs(jobs.map((job) => (job.id === id ? res.data : job)));
    } catch (err) {
      handleError(err);
    }
  };

  const deleteJob = async (id) => {
    try {
      await api.delete(`/jobs/${id}`);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      handleError(err);
    }
  };

  const visibleJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Job Applications</h1>
          <button onClick={logout} className="btn btn-outline btn-sm">Logout</button>
        </div>

        {error && <div className="alert alert-error mb-4">{error}</div>}

        <form onSubmit={addJob} className="card bg-base-100 shadow p-4 mb-6 gap-3">
          <h2 className="font-semibold">Add a job</h2>
          <input name="company" placeholder="Company" className="input input-bordered w-full"
            value={form.company} onChange={handleChange} />
          <input name="role" placeholder="Role" className="input input-bordered w-full"
            value={form.role} onChange={handleChange} />
          <input name="link" placeholder="Job link (optional)" className="input input-bordered w-full"
            value={form.link} onChange={handleChange} />
          <button type="submit" className="btn btn-primary">Add job</button>
        </form>

        <div className="flex gap-2 mb-4 flex-wrap">
          {["All", ...STATUSES].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`btn btn-sm ${filter === s ? "btn-primary" : "btn-outline"}`}>
              {s}
            </button>
          ))}
        </div>

        {visibleJobs.length === 0 && (
          <p className="text-center opacity-60">No jobs here yet.</p>
        )}

        <div className="flex flex-col gap-3">
          {visibleJobs.map((job) => (
            <div key={job.id} className="card bg-base-100 shadow p-4 flex-row justify-between items-center">
              <div>
                <h3 className="font-bold">{job.company}</h3>
                <p className="text-sm">{job.role}</p>
                <p className="text-xs opacity-60">
                  {new Date(job.appliedDate).toLocaleDateString()}
                </p>
                {job.link && (
                  <a href={job.link} target="_blank" rel="noreferrer" className="link link-primary text-xs">
                    Open link
                  </a>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`badge ${badgeClass[job.status]}`}>{job.status}</span>
                <select className="select select-bordered select-sm" value={job.status}
                  onChange={(e) => changeStatus(job.id, e.target.value)}>
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
                <button onClick={() => deleteJob(job.id)} className="btn btn-error btn-xs">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Jobs;