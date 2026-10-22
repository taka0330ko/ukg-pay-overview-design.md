export default function TimeColumn(){return <div className="axis-labels">{['00:00','06:00','12:00','18:00','24:00'].map((t,i)=><span key={t} style={{top:i*90}}>{t}</span>)}</div>}
