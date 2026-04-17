import { useState, useEffect, useRef, useCallback } from "react";
import {
  LayoutDashboard, CheckSquare, User, Sun, Bell,
  Search, Clock, AlertCircle, CheckCircle2, Plus, X,
  Eye, EyeOff, Upload, Zap, Target, FileText, Edit3,
  Save, ChevronRight, Star, Award, Trash2, RefreshCw,
} from "lucide-react";
import {
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area, Legend,
} from "recharts";

// 🔥 FORMAT FUNCTIONS (ADD HERE)
const formatText = (text) => {
  if (!text) return "";
  return text
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const toBackendFormat = (text) => {
  if (!text) return "";
  return text.toLowerCase().replace(" ", "-");
};
/* ─────────────────────────────────────────────
   DESIGN TOKENS (single source of truth)
───────────────────────────────────────────── */
const T = {
  bg:        "#07090f",
  surface:   "#0d1117",
  surfaceUp: "#111827",
  border:    "rgba(255,255,255,0.07)",
  borderAmt: "rgba(245,158,11,0.18)",
  amber:     "#f59e0b",
  amberDark: "#d97706",
  amberGlow: "rgba(245,158,11,0.25)",
  navy:      "#0f2744",
  navyLight: "#1e3a5f",
  textPri:   "#f1f5f9",
  textSec:   "#64748b",
  textMuted: "#334155",
  green:     "#22c55e",
  red:       "#ef4444",
  indigo:    "#818cf8",
  font:      "'Sora', sans-serif",
};

/* ─────────────────────────────────────────────
   GLOBAL STYLES injected once
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; }
  body { background: #07090f; font-family: 'Sora', sans-serif; color: #f1f5f9; }

  ::-webkit-scrollbar       { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.25); border-radius: 4px; }

  @keyframes fadeUp   { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes slideIn  { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
  @keyframes slideDown{ from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse    { 0%,100%{ opacity:1; } 50%{ opacity:0.4; } }
  @keyframes spin     { to { transform:rotate(360deg); } }
  @keyframes shimmer  {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }

  .page-enter  { animation: fadeUp 0.32s cubic-bezier(0.22,1,0.36,1) both; }
  .card-hover  { transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease; }
  .card-hover:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 48px rgba(0,0,0,0.45);
    border-color: rgba(245,158,11,0.18) !important;
  }
  .btn-press:active { transform: scale(0.96); }

  .skeleton {
    background: linear-gradient(90deg, #111827 25%, #1a2540 50%, #111827 75%);
    background-size: 400px 100%;
    animation: shimmer 1.4s infinite linear;
    border-radius: 8px;
  }

  select, input, textarea {
    font-family: 'Sora', sans-serif;
    color: #f1f5f9;
    outline: none;
  }
  select option { background: #111827; color: #f1f5f9; }
`;

/* ─────────────────────────────────────────────
   BADGE MAPS
───────────────────────────────────────────── */
const PRIORITY_MAP = {
  High:   { bg:"rgba(239,68,68,0.12)",  color:"#ef4444", border:"1px solid rgba(239,68,68,0.28)"  },
  Medium: { bg:"rgba(245,158,11,0.12)", color:"#f59e0b", border:"1px solid rgba(245,158,11,0.28)" },
  Low:    { bg:"rgba(129,140,248,0.12)",color:"#818cf8", border:"1px solid rgba(129,140,248,0.28)"},
};
const STATUS_MAP = {
  Completed:    { bg:"rgba(34,197,94,0.12)",  color:"#22c55e", border:"1px solid rgba(34,197,94,0.28)"  },
  "In Progress":{ bg:"rgba(245,158,11,0.12)", color:"#f59e0b", border:"1px solid rgba(245,158,11,0.28)" },
  Pending:      { bg:"rgba(100,116,139,0.12)",color:"#64748b", border:"1px solid rgba(100,116,139,0.22)"},
};

function Badge({ label, map }) {
  const s = (map && map[label]) || {};
  return (
    <span style={{
      background:s.bg, color:s.color, border:s.border,
      borderRadius:6, padding:"2px 9px",
      fontSize:10, fontWeight:700, letterSpacing:0.6,
      textTransform:"uppercase", whiteSpace:"nowrap",
    }}>
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────────
   TOAST SYSTEM
───────────────────────────────────────────── */
function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  }, []);
  const remove = useCallback(id => setToasts(p => p.filter(t => t.id !== id)), []);
  return { toasts, add, remove };
}

function ToastContainer({ toasts, remove }) {
  return (
    <div style={{ position:"fixed", top:20, right:20, zIndex:9999, display:"flex", flexDirection:"column", gap:8 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          display:"flex", alignItems:"center", gap:10,
          background: t.type === "success"
            ? "linear-gradient(135deg,#15803d,#166534)"
            : "linear-gradient(135deg,#b91c1c,#991b1b)",
          border: `1px solid ${t.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
          color:"#fff", padding:"11px 16px", borderRadius:12,
          boxShadow:"0 8px 32px rgba(0,0,0,0.4)",
          minWidth:260, maxWidth:360,
          animation:"slideIn 0.3s cubic-bezier(0.22,1,0.36,1)",
          fontSize:13, fontWeight:500, fontFamily:"'Sora',sans-serif",
        }}>
          {t.type === "success"
            ? <CheckCircle2 size={15} color="#4ade80" />
            : <AlertCircle  size={15} color="#f87171" />}
          <span style={{ flex:1 }}>{t.message}</span>
          <button onClick={() => remove(t.id)} style={{
            background:"none", border:"none", color:"rgba(255,255,255,0.5)",
            cursor:"pointer", padding:2, display:"flex",
          }}>
            <X size={13} />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SKELETON LOADER
───────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div style={{
      background:"#111827", border:"1px solid rgba(255,255,255,0.07)",
      borderRadius:16, padding:"20px 22px",
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
        <div className="skeleton" style={{ height:16, width:"55%" }} />
        <div className="skeleton" style={{ height:16, width:"18%" }} />
      </div>
      <div className="skeleton" style={{ height:12, width:"80%", marginBottom:8 }} />
      <div className="skeleton" style={{ height:12, width:"65%", marginBottom:14 }} />
      <div style={{ display:"flex", gap:8 }}>
        <div className="skeleton" style={{ height:20, width:60 }} />
        <div className="skeleton" style={{ height:20, width:72 }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────── */
function StatCard({ label, value, icon: Icon, accent, sub }) {
  return (
    <div
      className="glass card-hover"
      style={{
        borderRadius: 18,
        padding: "22px 24px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        cursor: "pointer",
        transition: "all 0.25s ease",
      }}
    >
      {/* 🔥 TOP GRADIENT LINE */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${accent}, transparent)`,
        }}
      />

      {/* 🔥 BACKGROUND ICON (IMPROVED) */}
      <div
        style={{
          position: "absolute",
          right: -10,
          bottom: -10,
          opacity: 0.05,
          transform: "scale(2.5)",
        }}
      >
        <Icon size={60} color="#fff" />
      </div>

      {/* 🔹 ICON BOX */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          marginBottom: 16,
          background: `${accent}18`,
          border: `1px solid ${accent}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "0.2s",
        }}
      >
        <Icon size={18} color={accent} strokeWidth={2.2} />
      </div>

      {/* 🔹 LABEL */}
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: 1.2,
          marginBottom: 6,
        }}
      >
        {label}
      </p>

      {/* 🔹 VALUE */}
      <p
        style={{
          fontSize: 36,
          fontWeight: 900,
          color: "#f8fafc",
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {value}
      </p>

      {/* 🔹 SUBTEXT */}
      {sub && (
        <p
          style={{
            fontSize: 12,
            color: accent,
            fontWeight: 600,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   REPORT MODAL  — POST /api/reports (unchanged)
───────────────────────────────────────────── */
function ReportModal({ onClose, toast }) {
  const [form, setForm] = useState({ title:"", description:"", summary:"", hours:"" });
  const [submitting, setSubmitting] = useState(false);

  const setField = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.summary.trim()) {
      toast("Title and Summary are required", "error");
      return;
    }
    setSubmitting(true);
    try {
      await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      toast("Daily report submitted! ☀️", "success");
      onClose();
    } catch {
      toast("Failed to submit report", "error");
    }
    setSubmitting(false);
  };

  const inputStyle = {
    width:"100%", background:"rgba(7,9,15,0.8)",
    border:"1px solid rgba(255,255,255,0.07)", borderRadius:10,
    padding:"10px 13px", fontSize:13, color:"#f1f5f9",
    transition:"border-color 0.2s", boxSizing:"border-box",
    fontFamily:"'Sora',sans-serif",
  };

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.75)",
      backdropFilter:"blur(6px)", zIndex:999,
      display:"flex", alignItems:"center", justifyContent:"center", padding:20,
      animation:"fadeIn 0.2s ease",
    }}>
      <div style={{
        background:"linear-gradient(145deg, #0d1117 0%, #111827 100%)",
        border:"1px solid rgba(245,158,11,0.18)",
        borderRadius:22, padding:30, width:"100%", maxWidth:500,
        boxShadow:"0 32px 80px rgba(0,0,0,0.65)",
        animation:"fadeUp 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{
              width:34, height:34, borderRadius:9,
              background:"rgba(245,158,11,0.12)", border:"1px solid rgba(245,158,11,0.25)",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <FileText size={16} color="#f59e0b" />
            </div>
            <div>
              <h2 style={{ fontSize:17, fontWeight:800, color:"#f1f5f9" }}>Daily Report</h2>
              <p style={{ fontSize:11, color:"#64748b", marginTop:1 }}>Submit your work summary</p>
            </div>
          </div>
          <button onClick={onClose} className="btn-press" style={{
            background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:9, padding:7, cursor:"pointer", color:"#64748b",
            display:"flex", transition:"all 0.2s",
          }}>
            <X size={15} />
          </button>
        </div>

        {[
          { label:"Report Title *", k:"title",       rows:0 },
          { label:"Description",    k:"description", rows:2 },
          { label:"Work Summary *", k:"summary",     rows:3 },
          { label:"Hours Worked",   k:"hours",       rows:0, type:"number" },
        ].map(({ label, k, rows, type }) => (
          <div key={k} style={{ marginBottom:14 }}>
            <label style={{ display:"block", fontSize:10, fontWeight:700, color:"#64748b",
              textTransform:"uppercase", letterSpacing:1, marginBottom:5 }}>
              {label}
            </label>
            {rows > 0 ? (
              <textarea rows={rows} value={form[k]} onChange={e => setField(k, e.target.value)}
                style={{ ...inputStyle, resize:"vertical" }}
                onFocus={e => e.target.style.borderColor="rgba(245,158,11,0.35)"}
                onBlur={e  => e.target.style.borderColor="rgba(255,255,255,0.07)"}
              />
            ) : (
              <input type={type || "text"} value={form[k]} onChange={e => setField(k, e.target.value)}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor="rgba(245,158,11,0.35)"}
                onBlur={e  => e.target.style.borderColor="rgba(255,255,255,0.07)"}
              />
            )}
          </div>
        ))}

        <button onClick={handleSubmit} disabled={submitting} className="btn-press" style={{
          width:"100%", marginTop:6,
          background: submitting ? "rgba(245,158,11,0.4)" : "linear-gradient(135deg,#f59e0b,#d97706)",
          color:"#0f172a", border:"none", borderRadius:11, padding:"12px 0",
          fontSize:14, fontWeight:800, cursor: submitting ? "not-allowed" : "pointer",
          display:"flex", alignItems:"center", justifyContent:"center", gap:8,
          boxShadow: submitting ? "none" : "0 4px 20px rgba(245,158,11,0.3)",
          transition:"all 0.2s", fontFamily:"'Sora',sans-serif",
        }}>
          {submitting
            ? <><RefreshCw size={15} style={{ animation:"spin 0.8s linear infinite" }} /> Submitting…</>
            : <><FileText size={15} /> Submit Report</>}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TASK CARD
   PUT  /api/tasks/:id  — unchanged
   DELETE /api/tasks/:id — unchanged
───────────────────────────────────────────── */
function TaskCard({ task, onUpdate, onDelete, toast }) {
  const [expanded, setExpanded] = useState(false);
  const [status,   setStatus]   = useState(task.status);
  const [note,     setNote]     = useState("");
  const [saving,   setSaving]   = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isOverdue = new Date(task.deadline) < new Date() && status !== "Completed";

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
  status: toBackendFormat(status),
  response: note
}),
      });
      const updated = await res.json();
      onUpdate(task._id, updated);
      toast("Task updated!", "success");
      setExpanded(false);
    } catch {
      toast("Update failed", "error");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await fetch(`http://localhost:5000/api/tasks/${task._id}`, { method: "DELETE" });
      onDelete(task._id);
      toast("Task deleted", "success");
    } catch {
      toast("Delete failed", "error");
    }
    setDeleting(false);
  };

  return (
    <div className="card-hover" style={{
      background:"linear-gradient(145deg, #111827 0%, #0d1117 100%)",
      border:"1px solid rgba(255,255,255,0.07)",
      borderRadius:16, padding:"18px 20px",
      boxShadow:"0 4px 20px rgba(0,0,0,0.25)",
    }}>
      <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
        {/* status dot */}
        <div style={{
          width:8, height:8, borderRadius:"50%", flexShrink:0, marginTop:6,
          background: STATUS_MAP[status]?.color || "#64748b",
          boxShadow:`0 0 8px ${STATUS_MAP[status]?.color || "#64748b"}60`,
        }} />

        {/* body */}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap", marginBottom:5 }}>
            <span style={{ fontSize:14, fontWeight:700, color:"#f1f5f9" }}>{task.title}</span>
            {isOverdue && (
              <span style={{
                fontSize:9, fontWeight:800, color:"#ef4444",
                background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.25)",
                borderRadius:5, padding:"2px 7px", letterSpacing:0.8, textTransform:"uppercase",
              }}>
                Overdue
              </span>
            )}
          </div>
          <p style={{ fontSize:12, color:"#64748b", lineHeight:1.55, marginBottom:10 }}>
            {task.description}
          </p>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
            <Badge label={formatText(task.priority)} map={PRIORITY_MAP} />
            <Badge label={formatText(status)}        map={STATUS_MAP} />
            {task.deadline && (
              <span style={{ fontSize:11, color:"#334155", display:"flex", alignItems:"center", gap:3 }}>
                <Clock size={10} /> {task.deadline}
              </span>
            )}
          </div>
        </div>

        {/* action buttons */}
        <div style={{ display:"flex", gap:6, flexShrink:0 }}>
          <button onClick={() => setExpanded(p => !p)} className="btn-press" style={{
            background: expanded ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.04)",
            border:`1px solid ${expanded ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.07)"}`,
            borderRadius:9, padding:"6px 12px", cursor:"pointer",
            color: expanded ? "#f59e0b" : "#64748b",
            fontSize:12, fontWeight:600,
            display:"flex", alignItems:"center", gap:5,
            transition:"all 0.18s", fontFamily:"'Sora',sans-serif",
          }}>
            <Edit3 size={12} /> {expanded ? "Close" : "Update"}
          </button>
          <button onClick={handleDelete} disabled={deleting} className="btn-press" style={{
            background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)",
            borderRadius:9, padding:"6px 10px", cursor: deleting ? "not-allowed" : "pointer",
            color:"#ef4444", display:"flex", alignItems:"center", gap:4,
            fontSize:12, fontWeight:600, transition:"all 0.18s",
          }}
            onMouseEnter={e => e.currentTarget.style.background="rgba(239,68,68,0.15)"}
            onMouseLeave={e => e.currentTarget.style.background="rgba(239,68,68,0.08)"}
          >
            {deleting
              ? <RefreshCw size={12} style={{ animation:"spin 0.8s linear infinite" }} />
              : <Trash2 size={12} />}
          </button>
        </div>
      </div>

      {/* expanded panel */}
      {expanded && (
        <div style={{
          marginTop:16, paddingTop:16,
          borderTop:"1px solid rgba(255,255,255,0.06)",
          animation:"slideDown 0.2s cubic-bezier(0.22,1,0.36,1)",
        }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
            <div>
              <label style={{ display:"block", fontSize:10, fontWeight:700, color:"#64748b",
                textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>
                Status
              </label>
              <select value={formatText(status)} onChange={e => setStatus(toBackendFormat(e.target.value))} style={{
                width:"100%", background:"rgba(7,9,15,0.8)",
                border:"1px solid rgba(255,255,255,0.07)", borderRadius:9,
                padding:"8px 12px", fontSize:13, color:"#f1f5f9",
                fontFamily:"'Sora',sans-serif",
              }}>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
            <div>
              <label style={{ display:"block", fontSize:10, fontWeight:700, color:"#64748b",
                textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>
                Progress Note
              </label>
              <input value={note} onChange={e => setNote(e.target.value)}
                placeholder="Quick update…" style={{
                  width:"100%", background:"rgba(7,9,15,0.8)",
                  border:"1px solid rgba(255,255,255,0.07)", borderRadius:9,
                  padding:"8px 12px", fontSize:13, color:"#f1f5f9",
                  fontFamily:"'Sora',sans-serif", boxSizing:"border-box",
                }}
              />
            </div>
          </div>
          <button onClick={handleSave} disabled={saving} className="btn-press" style={{
            background: saving ? "rgba(245,158,11,0.35)" : "linear-gradient(135deg,#f59e0b,#d97706)",
            color:"#0f172a", border:"none", borderRadius:9, padding:"9px 18px",
            fontSize:13, fontWeight:700, cursor: saving ? "not-allowed" : "pointer",
            display:"flex", alignItems:"center", gap:6, transition:"all 0.2s",
            boxShadow: saving ? "none" : "0 3px 14px rgba(245,158,11,0.28)",
            fontFamily:"'Sora',sans-serif",
          }}>
            {saving
              ? <><RefreshCw size={13} style={{ animation:"spin 0.8s linear infinite" }} /> Saving…</>
              : <><Save size={13} /> Save Changes</>}
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DASHBOARD TAB
───────────────────────────────────────────── */
function DashboardTab({ tasks, toast, user }) {
  const [showReport, setShowReport] = useState(false);

 const total = tasks.length;

const completed = tasks.filter(t => t.status === "completed").length;
const pending = tasks.filter(t => t.status === "pending").length;
const inProgress = tasks.filter(t => t.status === "in-progress").length;

const pct = total ? Math.round((completed / total) * 100) : 0;
  const PIE_DATA = [
  { name: "Completed", value: completed, color: "#22c55e" },
  { name: "In Progress", value: inProgress, color: "#f59e0b" },
  { name: "Pending", value: pending, color: "#64748b" },
];

  const LINE_DATA = [
    { week:"Wk 1", tasks:3, completed:2 },
    { week:"Wk 2", tasks:5, completed:3 },
    { week:"Wk 3", tasks:4, completed:4 },
    { week:"Wk 4", tasks:7, completed:5 },
    { week:"Wk 5", tasks:6, completed:6 },
    { week:"Wk 6", tasks:8, completed:7 },
  ];

  const hour = new Date().getHours();
  const greeting  = hour < 12 ? "Good Morning"   : hour < 17 ? "Good Afternoon" : "Good Evening";
  const greetIcon = hour < 12 ? "☀️"             : hour < 17 ? "⚡"             : "🌙";

  return (
    <div className="page-enter" style={{ paddingBottom:40 }}>

      {/* greeting banner */}
      <div style={{
        background:"linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(30,58,95,0.25) 100%)",
        border:"1px solid rgba(245,158,11,0.18)",
        borderRadius:18, padding:"20px 26px", marginBottom:24,
        display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:14,
      }}>
        <div>
          <h1 style={{ fontSize:23, fontWeight:800, color:"#f1f5f9", lineHeight:1.2 }}>
            {greetIcon} {greeting}, {(user.name || "").split(" ")[0]}!
          </h1>
          <p style={{ fontSize:13, color:"#64748b", marginTop:5 }}>
            {pct === 100
              ? "🎉 All tasks done — you crushed it today!"
              : `${pending} pending · ${inProgress} in progress. Keep up the momentum!`}
          </p>
        </div>
        <button onClick={() => setShowReport(true)} className="btn-press" style={{
          background:"linear-gradient(135deg,#f59e0b,#d97706)",
          color:"#0f172a", border:"none", borderRadius:11, padding:"10px 20px",
          fontSize:13, fontWeight:700, cursor:"pointer",
          display:"flex", alignItems:"center", gap:8,
          boxShadow:"0 4px 18px rgba(245,158,11,0.32)",
          transition:"all 0.2s", fontFamily:"'Sora',sans-serif",
        }}>
          <Plus size={15} /> Submit Daily Report
        </button>
      </div>

      {/* stat cards */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
    gap: 16,
    marginBottom: 24,
  }}
>        <StatCard label="Total Tasks"  value={total}      icon={Target}       accent="#1e3a5f" sub="Sprint total" />
        <StatCard label="Completed"    value={completed}  icon={CheckCircle2} accent="#22c55e" sub={`${pct}% done`} />
        <StatCard label="In Progress"  value={inProgress} icon={Zap}          accent="#f59e0b" sub="Active now" />
        <StatCard label="Pending"      value={pending}    icon={Clock}        accent="#64748b" sub="Needs attention" />
      </div>

      {/* progress bar */}
 <div style={{
  background: "linear-gradient(145deg, #111827, #0d1117)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 16,
  padding: "18px 22px",
  marginBottom: 20,
  position: "relative",
  overflow: "hidden"
}}>

  {/* 🔥 Glow Effect */}
  <div style={{
    position: "absolute",
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    background: "radial-gradient(circle, rgba(245,158,11,0.25), transparent)",
    filter: "blur(40px)"
  }} />

  {/* 🔹 Header */}
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  }}>
    <span style={{
      fontSize: 13,
      fontWeight: 700,
      color: "#f1f5f9"
    }}>
      Overall Completion
    </span>

    <span style={{
      fontSize: 22,
      fontWeight: 800,
      color: "#f59e0b"
    }}>
      {pct}%
    </span>
  </div>

 {/* 🔹 Progress Track */}
<div style={{
  height: 10,
  background: "rgba(255,255,255,0.05)",
  borderRadius: 100,
  overflow: "hidden",
  position: "relative"
}}>

  {/* 🔥 FILLED BAR */}
  <div
    className="progress-glow"
    style={{
      position: "relative",
      height: "100%",
      width: `${pct}%`,
      borderRadius: 100,
      background: "linear-gradient(90deg,#f59e0b,#fbbf24)",
      transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
      overflow: "hidden"
    }}
  >
      {/* ✨ SHINE EFFECT (FIXED) */}
      <div
        className="progress-shine"
        style={{
        position: "absolute",
        top: 0,
        left: "-40%",
        height: "100%",
        width: "40%",
        background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent)",
        animation: "shine 2s infinite"
      }} />

    </div>

  </div>

  {/* 🔹 Footer */}
  <p style={{
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 10
  }}>
    {completed} of {total} tasks completed
  </p>

</div>

      {/* charts */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1.7fr", gap:18 }}>
        <div style={{
          background:"linear-gradient(145deg, #111827, #0d1117)",
          border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"18px 22px",
        }}>
          <p style={{ fontSize:13, fontWeight:700, color:"#f1f5f9", marginBottom:14 }}>Task Breakdown</p>
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={48} outerRadius={74} paddingAngle={3} dataKey="value">
                {PIE_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{
                background:"#0d1117", border:"1px solid rgba(245,158,11,0.18)",
                borderRadius:10, fontSize:12, fontFamily:"'Sora',sans-serif",
              }} />
              <Legend iconType="circle" iconSize={8}
                wrapperStyle={{ fontSize:12, color:"#64748b", paddingTop:8, fontFamily:"'Sora',sans-serif" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{
          background:"linear-gradient(145deg, #111827, #0d1117)",
          border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"18px 22px",
        }}>
          <p style={{ fontSize:13, fontWeight:700, color:"#f1f5f9", marginBottom:14 }}>Weekly Trend</p>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={LINE_DATA}>
              <defs>
                <linearGradient id="gAmber" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}    />
                </linearGradient>
                <linearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="week" tick={{ fill:"#334155", fontSize:11, fontFamily:"'Sora',sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"#334155", fontSize:11, fontFamily:"'Sora',sans-serif" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{
                background:"#0d1117", border:"1px solid rgba(245,158,11,0.18)",
                borderRadius:10, fontSize:12, fontFamily:"'Sora',sans-serif",
              }} />
              <Area type="monotone" dataKey="tasks"     stroke="#f59e0b" fill="url(#gAmber)" strokeWidth={2} name="Assigned"  />
              <Area type="monotone" dataKey="completed" stroke="#22c55e" fill="url(#gGreen)" strokeWidth={2} name="Completed" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {showReport && <ReportModal onClose={() => setShowReport(false)} toast={toast} />}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TASKS TAB
   onUpdate / onDelete wired to TaskCard
   TaskCard owns the PUT + DELETE fetch calls
───────────────────────────────────────────── */
function TasksTab({ tasks, setTasks, toast }) {
  const [search,         setSearch]         = useState("");
  const [filterStatus,   setFilterStatus]   = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  const handleUpdate = (id, updatedTask) =>
    setTasks(prev => prev.map(t => t._id === id ? updatedTask : t));

  const handleDelete = (id) =>
    setTasks(prev => prev.filter(t => t._id !== id));

  const filtered = tasks.filter(t => {
    const q = search.toLowerCase();
    return (
      ((t.title || "").toLowerCase().includes(q) ||
       (t.description || "").toLowerCase().includes(q)) &&
      (filterStatus   === "All" || t.status   === filterStatus)   &&
      (filterPriority === "All" || t.priority === filterPriority)
    );
  });

  const selStyle = {
    background:"#111827", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10,
    padding:"9px 14px", fontSize:13, color:"#f1f5f9", cursor:"pointer",
    fontFamily:"'Sora',sans-serif",
  };

  return (
    <div className="page-enter" style={{ paddingBottom:40 }}>

      {/* filter bar */}
      <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ flex:1, minWidth:200, position:"relative" }}>
          <Search size={14} style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", color:"#64748b" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks…" style={{
            width:"100%", background:"#111827",
            border:"1px solid rgba(255,255,255,0.07)", borderRadius:10,
            padding:"9px 14px 9px 36px", fontSize:13, color:"#f1f5f9",
            boxSizing:"border-box", transition:"border-color 0.2s", fontFamily:"'Sora',sans-serif",
          }}
            onFocus={e => e.target.style.borderColor="rgba(245,158,11,0.35)"}
            onBlur={e  => e.target.style.borderColor="rgba(255,255,255,0.07)"}
          />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={selStyle}>
{["All","pending","in-progress","completed"].map(o => (
  <option key={o}>{o}</option>
))}        </select>
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} style={selStyle}>
          {["All","High","Medium","Low"].map(o => <option key={o}>{o}</option>)}
        </select>
        <span style={{ fontSize:12, color:"#334155", whiteSpace:"nowrap" }}>
          {filtered.length} task{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* list */}
      {filtered.length === 0 ? (
        <div style={{ textAlign:"center", padding:"64px 0", color:"#334155" }}>
          <Target size={44} style={{ opacity:0.25, marginBottom:12 }} />
          <p style={{ fontSize:15, fontWeight:600, color:"#64748b" }}>No tasks found</p>
          <p style={{ fontSize:12, marginTop:5 }}>Try a different filter or search term</p>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {filtered.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              toast={toast}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROFILE TAB
   PUT /api/users/:id  — unchanged
───────────────────────────────────────────── */
function ProfileTab({ user, setUser, toast }) {
  const [name,     setName]     = useState(user.name || "");
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("••••••••••");
  const [saving,   setSaving]   = useState(false);
  const fileRef = useRef();

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setUser(p => ({ ...p, avatar: ev.target.result }));
    reader.readAsDataURL(file);
    toast("Photo updated! 🌟", "success");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      setUser(p => ({ ...p, name }));
      toast("Profile saved!", "success");
    } catch {
      toast("Save failed", "error");
    }
    setSaving(false);
  };

  const fields = [
    { label:"Full Name",   value:name,             set:setName, disabled:false, note:"Editable"         },
    { label:"Username",    value:user.username,    set:null,    disabled:true,  note:"Read-only"        },
    { label:"Email",       value:user.email,       set:null,    disabled:true,  note:"Contact admin"    },
    { label:"Designation", value:user.designation, set:null,    disabled:true,  note:"Admin-controlled" },
    { label:"Role",        value:user.role,        set:null,    disabled:true,  note:"System-assigned"  },
  ];

  return (
    <div className="page-enter" style={{ paddingBottom:48, maxWidth:620, margin:"0 auto" }}>

      {/* cover */}
      <div style={{ position:"relative", marginBottom:64 }}>
        <div style={{
          height:148, borderRadius:18, overflow:"hidden",
          background:"linear-gradient(135deg, #0f2744 0%, #07090f 45%, #92400e 100%)",
          boxShadow:"0 8px 40px rgba(0,0,0,0.45)", position:"relative",
        }}>
          <div style={{
            position:"absolute", inset:0, opacity:0.07,
            backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 24px,rgba(255,255,255,1) 24px,rgba(255,255,255,1) 25px),repeating-linear-gradient(90deg,transparent,transparent 24px,rgba(255,255,255,1) 24px,rgba(255,255,255,1) 25px)",
          }} />
          <div style={{ position:"absolute", bottom:14, right:18, display:"flex", alignItems:"center", gap:6 }}>
            <Sun size={12} color="rgba(255,255,255,0.3)" />
            <span style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.3)", letterSpacing:1.5 }}>
              JOBEEFIE URJATECH
            </span>
          </div>
        </div>

        {/* avatar */}
        <div style={{ position:"absolute", bottom:-46, left:24 }}>
          <div style={{ position:"relative" }}>
            <div style={{
              width:90, height:90, borderRadius:"50%",
              border:"3px solid #07090f",
              background:"linear-gradient(135deg,#f59e0b,#d97706)",
              overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 8px 32px rgba(0,0,0,0.55)",
            }}>
              {user.avatar
                ? <img src={user.avatar} alt="avatar" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                : <span style={{ fontSize:32, fontWeight:900, color:"#0f172a" }}>{(user.name || "U")[0]}</span>}
            </div>
            <button onClick={() => fileRef.current.click()} className="btn-press" style={{
              position:"absolute", bottom:2, right:2,
              background:"#f59e0b", border:"2px solid #07090f",
              borderRadius:"50%", width:26, height:26,
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer", boxShadow:"0 2px 10px rgba(0,0,0,0.4)",
            }}>
              <Upload size={11} color="#0f172a" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleImageUpload} />
          </div>
        </div>
      </div>

      {/* identity */}
      <div style={{ paddingBottom:18, borderBottom:"1px solid rgba(255,255,255,0.07)", marginBottom:18 }}>
        <h2 style={{ fontSize:20, fontWeight:800, color:"#f1f5f9", marginBottom:3 }}>{user.name}</h2>
        <p style={{ fontSize:13, color:"#f59e0b", fontWeight:700, marginBottom:3 }}>{user.designation}</p>
        <p style={{ fontSize:12, color:"#64748b" }}>
          {user.username} &nbsp;·&nbsp; {user.role} &nbsp;·&nbsp; Joined {user.joinDate}
        </p>
      </div>

      {/* badges */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:22 }}>
        {[
          { icon:Star,  label:"Top Performer", color:"#f59e0b" },
          { icon:Zap,   label:"Fast Closer",   color:"#818cf8" },
          { icon:Award, label:"Solar Expert",  color:"#22c55e" },
        ].map(({ icon:Icon, label, color }) => (
          <div key={label} style={{
            display:"flex", alignItems:"center", gap:5,
            background:`${color}12`, border:`1px solid ${color}28`,
            borderRadius:9, padding:"5px 11px",
          }}>
            <Icon size={11} color={color} />
            <span style={{ fontSize:11, fontWeight:700, color }}>{label}</span>
          </div>
        ))}
      </div>

      {/* edit form */}
      <div style={{
        background:"linear-gradient(145deg, #111827, #0d1117)",
        border:"1px solid rgba(255,255,255,0.07)", borderRadius:18, padding:24,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
          <Edit3 size={15} color="#f59e0b" />
          <span style={{ fontSize:15, fontWeight:700, color:"#f1f5f9" }}>Edit Profile</span>
        </div>

        {fields.map(({ label, value, set, disabled, note }) => (
          <div key={label} style={{ marginBottom:15 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <label style={{ fontSize:10, fontWeight:700, color:"#64748b",
                textTransform:"uppercase", letterSpacing:1 }}>
                {label}
              </label>
              <span style={{ fontSize:9, fontWeight:700, color: disabled ? "#334155" : "#f59e0b" }}>
                {note}
              </span>
            </div>
            <input
              value={value || ""}
              onChange={set ? e => set(e.target.value) : undefined}
              disabled={disabled}
              style={{
                width:"100%",
                background: disabled ? "rgba(7,9,15,0.5)" : "rgba(7,9,15,0.8)",
                border:`1px solid ${disabled ? "rgba(255,255,255,0.04)" : "rgba(245,158,11,0.18)"}`,
                borderRadius:10, padding:"9px 13px", fontSize:13,
                color: disabled ? "#334155" : "#f1f5f9",
                cursor: disabled ? "not-allowed" : "text",
                boxSizing:"border-box", transition:"border-color 0.2s",
                fontFamily:"'Sora',sans-serif",
              }}
              onFocus={e => !disabled && (e.target.style.borderColor="#f59e0b")}
              onBlur={e  => !disabled && (e.target.style.borderColor="rgba(245,158,11,0.18)")}
            />
          </div>
        ))}

        {/* password */}
        <div style={{ marginBottom:22 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
            <label style={{ fontSize:10, fontWeight:700, color:"#64748b",
              textTransform:"uppercase", letterSpacing:1 }}>
              Password
            </label>
            <span style={{ fontSize:9, fontWeight:700, color:"#f59e0b" }}>Security</span>
          </div>
          <div style={{ position:"relative" }}>
            <input
              type={showPass ? "text" : "password"} value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width:"100%", background:"rgba(7,9,15,0.8)",
                border:"1px solid rgba(245,158,11,0.18)", borderRadius:10,
                padding:"9px 42px 9px 13px", fontSize:13, color:"#f1f5f9",
                boxSizing:"border-box", fontFamily:"'Sora',sans-serif",
              }}
            />
            <button onClick={() => setShowPass(p => !p)} style={{
              position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
              background:"none", border:"none", cursor:"pointer", color:"#64748b", display:"flex",
            }}>
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <button onClick={handleSave} disabled={saving} className="btn-press" style={{
          background: saving ? "rgba(245,158,11,0.4)" : "linear-gradient(135deg,#f59e0b,#d97706)",
          color:"#0f172a", border:"none", borderRadius:10, padding:"11px 24px",
          fontSize:14, fontWeight:800, cursor: saving ? "not-allowed" : "pointer",
          display:"flex", alignItems:"center", gap:7, transition:"all 0.2s",
          boxShadow: saving ? "none" : "0 4px 18px rgba(245,158,11,0.3)",
          fontFamily:"'Sora',sans-serif",
        }}>
          {saving
            ? <><RefreshCw size={14} style={{ animation:"spin 0.8s linear infinite" }} /> Saving…</>
            : <><Save size={14} /> Save Changes</>}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT COMPONENT
   GET /api/tasks on mount — unchanged
───────────────────────────────────────────── */
export default function EmployeeDashboard() {
  const [activeTab,   setActiveTab]   = useState("dashboard");
  
  const [tasks,       setTasks]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef();


  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user,        setUser]        = useState({
    name:        "Shobhit Sahoo",
    username:    "@shobhit.sahoo",
    role:        "Employee",
    designation: "Solar Solutions Engineer",
    email:       "Support@jobeefiwurjatech.in",
    avatar:      null,
    joinDate:    "Jan 2024",
  });

  const { toasts, add: addToast, remove: removeToast } = useToast();

  /* GET /api/tasks — unchanged */
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then(res => res.json())
      .then(data => { setTasks(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (notifRef.current && !notifRef.current.contains(e.target)) {
      setShowNotif(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  const NAV = [
    { id:"dashboard", label:"Dashboard", icon:LayoutDashboard },
    { id:"tasks",     label:"Tasks",     icon:CheckSquare     },
    { id:"profile",   label:"Profile",   icon:User            },
  ];

  const pendingCount = tasks.filter(t => t.status === "pending").length;

  const TAB_LABELS = { dashboard:"Overview", tasks:"My Tasks", profile:"My Profile" };

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <div style={{ display:"flex", height:"100vh", background:"#07090f", overflow:"hidden", fontFamily:"'Sora',sans-serif" }}>

        {/* ══════════════ SIDEBAR ══════════════ */}
        <aside style={{
          width: sidebarOpen ? 232 : 64,
          minHeight:"100vh",
          background:"linear-gradient(180deg, #0d1117 0%, #07090f 100%)",
          borderRight:"1px solid rgba(255,255,255,0.07)",
          display:"flex", flexDirection:"column",
          transition:"width 0.3s cubic-bezier(0.4,0,0.2,1)",
          overflow:"hidden", flexShrink:0,
          position:"relative", zIndex:10,
        }}>

          {/* logo */}
          <div style={{
            padding:"17px 14px", borderBottom:"1px solid rgba(255,255,255,0.07)",
            display:"flex", alignItems:"center", gap:10, minHeight:62,
          }}>
            <div style={{
              width:36, height:36, borderRadius:10, flexShrink:0,
              background:"linear-gradient(135deg,#f59e0b,#d97706)",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 4px 14px rgba(245,158,11,0.35)",
            }}>
              <Sun size={18} color="#0f172a" strokeWidth={2.5} />
            </div>
            {sidebarOpen && (
              <div>
                <p style={{ fontSize:13, fontWeight:800, color:"#f1f5f9", lineHeight:1.2 }}>Jobeefie</p>
                <p style={{ fontSize:10, fontWeight:700, color:"#f59e0b", letterSpacing:0.5 }}>UrjaTech</p>
              </div>
            )}
          </div>

          {/* nav items */}
          <nav style={{ flex:1, padding:"10px 8px" }}>
            {NAV.map(({ id, label, icon:Icon }) => {
              const active = activeTab === id;
              return (
                <button key={id} onClick={() => setActiveTab(id)} style={{
                  width:"100%", display:"flex", alignItems:"center",
                  gap:11, padding: sidebarOpen ? "10px 13px" : "10px",
                  marginBottom:3, borderRadius:11, border:"none", cursor:"pointer",
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                  background: active ? "rgba(245,158,11,0.1)" : "transparent",
                  borderLeft: active ? "2px solid #f59e0b" : "2px solid transparent",
                  transition:"all 0.18s ease",
                }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background="rgba(255,255,255,0.04)"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background="transparent"; }}
                >
                  <Icon size={17} color={active ? "#f59e0b" : "#64748b"} strokeWidth={active ? 2.5 : 1.8} />
                  {sidebarOpen && (
                    <span style={{ fontSize:13, fontWeight:active ? 700 : 500, color:active ? "#f59e0b" : "#64748b" }}>
                      {label}
                    </span>
                  )}
                  {id === "tasks" && pendingCount > 0 && (
                    <span style={{
                      marginLeft:"auto", background:"#f59e0b", color:"#0f172a",
                      borderRadius:20, fontSize:10, fontWeight:800,
                      padding: sidebarOpen ? "1px 7px" : "1px 5px", minWidth:18, textAlign:"center",
                    }}>
                      {pendingCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* mini user */}
          <div style={{ padding:"10px 8px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
            <div style={{
              display:"flex", alignItems:"center", gap:9, padding:"9px 11px",
              borderRadius:11, background:"rgba(255,255,255,0.025)",
              border:"1px solid rgba(255,255,255,0.07)",
            }}>
              <div style={{
                width:30, height:30, borderRadius:"50%", flexShrink:0, overflow:"hidden",
                background:"linear-gradient(135deg,#f59e0b,#d97706)",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                {user.avatar
                  ? <img src={user.avatar} style={{ width:30, height:30, objectFit:"cover" }} alt="" />
                  : <span style={{ fontSize:12, fontWeight:800, color:"#0f172a" }}>{(user.name || "U")[0]}</span>}
              </div>
              {sidebarOpen && (
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:12, fontWeight:700, color:"#f1f5f9",
                    whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                    {user.name}
                  </p>
                  <p style={{ fontSize:10, color:"#334155" }}>{user.role}</p>
                </div>
              )}
            </div>
          </div>

          {/* toggle button */}
          <button onClick={() => setSidebarOpen(p => !p)} style={{
            position:"absolute", top:20, right:-13, width:26, height:26,
            background:"#1e3a5f", border:"1px solid rgba(245,158,11,0.2)",
            borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", color:"#f59e0b", zIndex:20, transition:"all 0.2s",
          }}>
            <ChevronRight size={12} style={{
              transform: sidebarOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition:"transform 0.3s",
            }} />
          </button>
        </aside>

        {/* ══════════════ MAIN ══════════════ */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>

          {/* topbar */}
          <header style={{
  height:60,
  background:"rgba(7,9,15,0.92)",
  backdropFilter:"blur(14px)",
  borderBottom:"1px solid rgba(255,255,255,0.07)",
  display:"flex",
  alignItems:"center",
  padding:"0 24px",
  gap:14,
  flexShrink:0,
  position:"relative" // 🔥 IMPORTANT for dropdown positioning
}}>

  <div style={{ flex:1 }}>
    <h2 style={{ fontSize:17, fontWeight:700, color:"#f1f5f9" }}>
      {TAB_LABELS[activeTab]}
    </h2>
  </div>

  {/* online indicator */}
  <div style={{
    display:"flex", alignItems:"center", gap:5,
    background:"rgba(34,197,94,0.08)",
    border:"1px solid rgba(34,197,94,0.2)",
    borderRadius:20, padding:"4px 11px",
  }}>
    <div style={{
      width:6, height:6, borderRadius:"50%",
      background:"#22c55e", animation:"pulse 2s infinite"
    }} />
    <span style={{ fontSize:11, fontWeight:700, color:"#22c55e" }}>
      Online
    </span>
  </div>

  {/* 🔔 bell */}
  {/* 🔔 BELL + DROPDOWN WRAPPER */}
{/* 🔔 BELL + DROPDOWN WRAPPER */}
<div style={{ position: "relative" }}>

  {/* 🔔 BELL BUTTON */}
  <button
    onClick={() => setShowNotif(prev => !prev)}
    style={{
      background:"rgba(255,255,255,0.03)",
      border:"1px solid rgba(255,255,255,0.07)",
      borderRadius:10,
      padding:"7px 8px",
      cursor:"pointer",
      color:"#64748b",
      display:"flex",
      position:"relative",
      transition:"all 0.18s",
    }}

    onMouseEnter={e => {
      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
      e.currentTarget.style.color = "#f1f5f9";
    }}

    onMouseLeave={e => {
      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
      e.currentTarget.style.color = "#64748b";
    }}
  >
    <Bell size={15} />

    {pendingCount > 0 && (
      <span style={{
        position: "absolute",
        top: -6,
        right: -6,
        background: "#ef4444",
        color: "#fff",
        fontSize: 9,
        fontWeight: 700,
        borderRadius: "50%",
        padding: "3px 5px",
        minWidth: 16,
        textAlign: "center",
        boxShadow: "0 0 10px rgba(239,68,68,0.6)"
      }}>
        {pendingCount}
      </span>
    )}
  </button>

  {/* 🔥 DROPDOWN */}
  {showNotif && (
    <div
      ref={notifRef}
      style={{
        position: "absolute",
        top: 45,
        right: 0,
        width: 260,
        background: "rgba(15, 23, 42, 0.98)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        padding: 12,
        boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
        zIndex: 999,
        animation: "fadeIn 0.2s ease"
      }}
    >

      <p style={{
        fontSize: 12,
        color: "#94a3b8",
        marginBottom: 8
      }}>
        Pending Tasks
      </p>

      {tasks.filter(t => t.status === "pending").slice(0, 4).map(task => (
        <div
          key={task._id}
          style={{
            padding: "8px 10px",
            borderRadius: 8,
            background: "rgba(255,255,255,0.03)",
            marginBottom: 6,
            cursor: "pointer",
            transition:"0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.08)"}
          onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.03)"}
          onClick={() => {
            setActiveTab("tasks");
            setShowNotif(false);
          }}
        >
          <p style={{
            fontSize: 12,
            color: "#f1f5f9",
            fontWeight: 600
          }}>
            {task.title}
          </p>
        </div>
      ))}

      {tasks.filter(t => t.status === "pending").length === 0 && (
        <p style={{ fontSize: 11, color: "#64748b" }}>
          No pending tasks 🎉
        </p>
      )}

    </div>
  )}

</div>
  {/* user chip */}
  <button onClick={() => setActiveTab("profile")} style={{
    display:"flex", alignItems:"center", gap:8,
    padding:"5px 12px 5px 5px",
    background:"rgba(255,255,255,0.025)",
    border:"1px solid rgba(255,255,255,0.07)",
    borderRadius:11,
    cursor:"pointer",
    transition:"all 0.18s",
  }}
    onMouseEnter={e => e.currentTarget.style.borderColor="rgba(245,158,11,0.25)"}
    onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}
  >
    <div style={{
      width:28, height:28, borderRadius:"50%",
      overflow:"hidden",
      background:"linear-gradient(135deg,#f59e0b,#d97706)",
      display:"flex", alignItems:"center", justifyContent:"center",
    }}>
      {user.avatar
        ? <img src={user.avatar} style={{ width:28, height:28, objectFit:"cover" }} alt="" />
        : <span style={{ fontSize:11, fontWeight:800, color:"#0f172a" }}>
            {(user.name || "U")[0]}
          </span>}
    </div>

    <span style={{ fontSize:12, fontWeight:600, color:"#f1f5f9" }}>
      {(user.name || "").split(" ")[0]}
    </span>
  </button>

</header>

          {/* page content */}
          <main style={{ flex:1, overflowY:"auto", padding:"26px 28px 0" }} key={activeTab}>
            {loading ? (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : (
              <>
                {activeTab === "dashboard" && <DashboardTab tasks={tasks} toast={addToast} user={user} />}
                {activeTab === "tasks"     && <TasksTab tasks={tasks} setTasks={setTasks} toast={addToast} />}
                {activeTab === "profile"   && <ProfileTab user={user} setUser={setUser} toast={addToast} />}
              </>
            )}
          </main>
        </div>
      </div>

      <ToastContainer toasts={toasts} remove={removeToast} />
    </>
  );
}
